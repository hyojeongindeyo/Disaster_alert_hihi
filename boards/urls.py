from django.urls import path
from .views import *

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('', main_page, name='main'),
    path('board/', board_list, name='board_list'),
    path('board/post/', board_post, name='board_post'),
    path('board/<int:pk>/', board_detail, name='board_detail'),
    path('board/update/<int:pk>/', board_update, name='board_update'),
    path('board/delete/<int:pk>/', board_delete, name='board_delete'),
    path('board/report/<int:pk>/', board_report, name='board_report'),

    path('comment/post/<int:pk>/', comment_create, name='comment_create'),
    path('comment/delete/<int:board_id>/<int:comment_id>', comment_delete, name='comment_delete'),
    path('comment/report/<int:board_id>/<int:comment_id>', comment_report, name='comment_report'),

    path('region/', region_in_category, name='region_all'),
    path('region/<category_slug>/', detail_in_category, name='region_in_category'),

    path('shelter/', shelter_enter, name='shelter_enter'),
    path('sheltersearch/', shelter_location, name='shelter_location'),

    path('actions/', actions, name='actions'),
    path('manuals_type/<int:card_id>', manual_view, name='manual_view'),
    path('cardnews_type/<int:card_id>', cardnews_view, name='cardnews_view'),
    path('manuals/', manuals, name='manuals'),
    path('cardNews/', cardNews, name='cardNews'),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

