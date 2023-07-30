from django.urls import path
from . import views

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('', views.main_page, name='main'),
    path('board/', views.board_list, name='board_list'),
    path('board/post/', views.board_post, name='board_post'),
    path('board/<int:pk>/', views.board_detail, name='board_detail'),
    path('board/update/<int:pk>/', views.board_update, name='board_update'),
    path('board/delete/<int:pk>/', views.board_delete, name='board_delete'),

    path('comment/post/<int:pk>/', views.comment_create, name='comment_create'),
    path('comment/delete/<int:board_id>/<int:comment_id>', views.comment_delete, name='comment_delete'),
    # path('<int:pk>/comment/create/', views.comment_create, name='comment_create'),
    # path('comment/list/', views.comment_list, name='comment_list'),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

