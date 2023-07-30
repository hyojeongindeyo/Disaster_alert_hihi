from django.contrib import admin

# Register your models here.
from .models import *

# Register your models here.
admin.site.register(Board)
admin.site.register(Comment)
admin.site.register(RegionCategory)
