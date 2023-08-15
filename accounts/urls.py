from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views

app_name = 'accounts'

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(template_name='accounts/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('signup/', views.signup, name='signup'),
    path('my_page/<int:pk>/', views.my_page, name='my_page'),
    path('my_page_update/<int:pk>/', views.my_page_update, name='my_page_update'),
    path('my_page_scrap/<int:pk>/', views.my_page_scrap, name='my_page_scrap'),
    path('password_reset/', views.password_reset_request, name="pwfind"),


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
