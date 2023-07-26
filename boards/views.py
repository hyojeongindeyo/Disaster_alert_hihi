from django.shortcuts import render, get_object_or_404,redirect
from .forms import boardForm
from .models import boards

# Create your views here.
def post_list(request):
    posts = Post.objects.all()
    return render(request, 'board_list.html', {'posts': posts})

def post_detail(request, pk):
    post = get_object_or_404(Post, id=pk)
    return render(request, 'board_detail.html', {'post': post})

def post_create(request):
    if request.method == 'POST':
        form = boardForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('board_list')
    else:
        form = boardForm()
    return render(request, 'board_create.html', {'form': form})

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

def post_delete(request, pk):
    board = get_object_or_404(boards, id=pk)
    if request.method == 'POST':
        board.delete()
        return redirect('board_list')
    return render(request, 'board_confirm_delete.html', {'board': board})