"""jaenani URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('boards.urls')),
    # path('comment/', include('comment.urls')), #이거 안되는걸로 알아요...
    path('accounts/', include('accounts.urls')),
    path('accounts/password_reset/done/',
         auth_views.PasswordResetDoneView.as_view(template_name='resetmail.html'),
         name='password_reset_done'),
    path('accounts/reset/<uidb64>/<token>/',
         auth_views.PasswordResetConfirmView.as_view(template_name='pwreset.html'),
         name='password_reset_confirm'),
    path('accounts/reset/done/',
         auth_views.PasswordResetCompleteView.as_view(template_name='pwchange.html'),
         name='password_reset_complete'),
]


