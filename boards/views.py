from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect

from .forms import boardForm, commentForm
from .models import *


# Create your views here.

def main_page(request):
    return render(request, 'boards/board_main_page.html')


def board_list(request):
    region_filter = request.GET.get('region', '')  # 주소 필터링 값을 가져옴
    print(region_filter)
    if region_filter:  # 주소 필터링 값이 있다면 해당 주소의 게시글만 필터링
        boards = Board.objects.filter(region=region_filter, complete=False)
    else:  # 주소 필터링 값이 없다면 모든 게시글 표시
        boards = Board.objects.filter(complete=False)

    region_choices = Board.region_choice  # 주소 선택지

    context = {
        'boards': boards,
        'region_choices': region_choices,
        'selected_region': region_filter,  # 선택한 주소를 템플릿으로 전달
    }

    return render(request, 'boards/board_list.html', context)

@login_required
def board_post(request):
    if request.method == 'POST':
        form = boardForm(request.POST, request.FILES)
        if form.is_valid():
            board = form.save(commit=False)
            board.user = request.user

            # 사용자가 선택한 지역 이름
            selected_region_name = request.POST.get('region')

            try:
                # 사용자가 선택한 지역 이름으로 'RegionCategory' 모델에서 인스턴스를 찾음
                selected_region_instance = RegionCategory.objects.get(region_name=selected_region_name)
            except RegionCategory.DoesNotExist:
                # 사용자가 선택한 지역 이름에 해당하는 인스턴스를 찾지 못한 경우에 대한 처리
                # 적절한 예외 처리를 수행하거나 다른 로직을 추가할 수 있습니다.
                return render(request, 'boards/board_create.html', {'form': form, 'region_choices': Board.region_choice})

            board.category = selected_region_instance  # 선택한 지역의 인스턴스를 'category' 필드에 할당
            board.save()
            return redirect('board_list')
    else:
        form = boardForm(request=request)
    return render(request, 'boards/board_create.html', {'form': form, 'region_choices': Board.region_choice})

def board_detail(request,pk):
    board = Board.objects.get(id=pk)
    return render(request, 'boards/board_detail.html', {'board':board})


@login_required
def board_update(request, pk):
    board = get_object_or_404(Board, pk=pk)
    if request.method == 'POST':
        form = boardForm(request.POST, request.FILES, instance=board)
        print(request.POST)
        print(form.is_valid())
        if form.is_valid():
            board.user = request.user
            boards = form.save(commit=False)
            # 사용자가 선택한 지역 이름
            selected_region_name = request.POST.get('region')

            try:
                # 사용자가 선택한 지역 이름으로 'RegionCategory' 모델에서 인스턴스를 찾음
                selected_region_instance = RegionCategory.objects.get(region_name=selected_region_name)
            except RegionCategory.DoesNotExist:
                # 사용자가 선택한 지역 이름에 해당하는 인스턴스를 찾지 못한 경우에 대한 처리
                # 적절한 예외 처리를 수행하거나 다른 로직을 추가할 수 있습니다.
                return render(request, 'boards/board_update.html', {'form': form, 'board':board, 'region_choices': Board.region_choice})

            board.category = selected_region_instance  # 선택한 지역의 인스턴스를 'category' 필드에 할당
            boards.save()
            return redirect('board_detail', pk=board.pk)
    else:
        form = boardForm(request=request, instance=board)
    return render(request, 'boards/board_update.html', {'form': form, 'board':board, 'region_choices': Board.region_choice})

def board_delete(request, pk):
    board = Board.objects.get(id=pk)
    board.delete()
    return redirect('board_list')

def comment_create(request,pk):
    board = Board.objects.get(id=pk)
    if request.method == 'POST':
        form = commentForm(request.POST)
        if form.is_valid():
            description = form.cleaned_data['description']
            comment = Comment.objects.create(description=description, community=board)
            comment.user = request.user
            comment.save()
            return redirect('board_detail', pk)
    else:
        form = commentForm()
    return render(request,'boards/board_detail.html', {'form':form})


def comment_delete(request, board_id, comment_id):
    comment = Comment.objects.get(id=comment_id)
    comment.delete()
    return redirect('board_detail', board_id)

# def region_in_category(request, category_slug=None):
#     current_category = None
#     categories = RegionCategory.objects.all()
#     boards = Board.objects.filter(available_display=True)
#
#     if category_slug :
#         current_category = get_object_or_404(RegionCategory, slug=category_slug)
#         boards = boards.filter(category=current_category)
#
#     return render(request, 'board/list.html', {'current_category':current_category, 'categories':categories, 'boards': boards})
