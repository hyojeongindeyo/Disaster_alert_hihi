from django.shortcuts import render, get_object_or_404,redirect
from .models import boards
from .forms import boardForm

from .models import comment
from .forms import commentForm

# Create your views here.
# board
def post_list(request):
    posts = boards.objects.all()
    return render(request, 'board_list.html', {'posts': posts})

# 상세 view
def post_detail(request, pk):
    post = get_object_or_404(boards, id=pk)
    return render(request, 'board_detail.html', {'post': post})

# 작성 view
def post_create(request):
    if request.method == 'POST':
        form = boardForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('board_list')
    else:
        form = boardForm()
    return render(request, 'board_create.html', {'form': form})

# 수정 view
def post_update(request, pk):
    board = get_object_or_404(Post, id=pk)

    if request.method == 'POST':
        form = boardForm(request.POST,instance=board)

        if form.is_valid():
            form.save()
            return redirect('post_list')
    else:
        form = boardForm(instance=board)
    return render(request, 'board_form.html', {'form': form})

# 삭제 view
def post_delete(request, pk):
    board = get_object_or_404(boards, id=pk)
    if request.method == 'POST':
        board.delete()
        return redirect('board_list')
    return render(request, 'board_confirm_delete.html', {'board': board})

# comment
# 생성 view
def comment_create(request):
    if request.method == 'POST':
        form = commentForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('post_detail', pk=form.instance.post.pk)  # 댓글이 달린 게시물 상세 페이지로 리다이렉트

    return render(request, 'comment_create.html', {'form': commentForm()})

# 목록 조회 view
def comment_list(request):
    comments = comment.objects.all()
    return render(request, 'comment_list.html', {'comments': comments})