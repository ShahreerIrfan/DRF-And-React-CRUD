from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo_models
# Create your views here.

class TodoView(viewsets.ModelViewSet):
    queryset  = Todo_models.objects.all()
    serializer_class = TodoSerializer
