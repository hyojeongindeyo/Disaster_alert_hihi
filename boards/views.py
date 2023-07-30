from django.shortcuts import render, get_object_or_404,redirect

from .forms import boardForm
from .models import Board

from .models import Comment
from .forms import commentForm

# Create your views here.

def main_page_view(request):
    return render(request, 'boards/board_main_page.html')

# board
def post_list(request):
    posts = Board.objects.all()
    return render(request, 'boards/board_list.html', {'posts': posts})

# 상세 view
def post_detail(request, pk):
    post = get_object_or_404(Board, pk=pk)
    return render(request, 'boards/board_detail.html', {'post': post})


# 작성 view
def post_create(request):
    if request.method == 'POST':
        form = boardForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('board_list')
    else:
        form = boardForm()
    return render(request, 'boards/board_create.html', {'form': form})

# 수정 view

# 수정하기는 본인 글에만 보였으면 좋겠다고 했으니까 if문 써서 나중에 유저와 유저가 같을 시에 이렇게 넣으면 될 것 같아유
def post_update(request, pk):
    board = get_object_or_404(Board, pk=pk)

    if request.method == 'POST':
        form = boardForm(request.POST,instance=board)

        if form.is_valid():
            form.save()
            return redirect('post_list')
    else:
        form = boardForm(instance=board)
    return render(request, 'boards/board_update.html', {'form': form})

# 삭제 view
def post_delete(request, pk):
    board = get_object_or_404(Board, id=pk)
    if request.method == 'POST':
        board.delete()
        return redirect('board_list')
    return render(request, 'boards/demo_board_confirm_delete.html', {'board': board})

# comment
# 생성 view
def comment_create(request, pk):
    if request.method == 'POST':
        form = commentForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('post_detail', pk=form.instance.post.pk)  # 댓글이 달린 게시물 상세 페이지로 리다이렉트

    return render(request, 'comments/demo_comment_create.html', {'form': commentForm()})

# 목록 조회 view
def comment_list(request):
    comments = Comment.objects.all()
    return render(request, 'comments/demo_comment_list.html', {'comments': comments})