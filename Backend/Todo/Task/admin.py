from django.contrib import admin
from .models import Todo_models
# Register your models here.
class TodoAdmin(admin.ModelAdmin):
    list_display = ['title','isComplted']


admin.site.register(Todo_models,TodoAdmin)