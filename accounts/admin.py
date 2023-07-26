from django.contrib import admin
from .models import boards, comment

# Register your models here.
admin.site.register(boards)
admin.site.register(comment)