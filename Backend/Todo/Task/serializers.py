from rest_framework import serializers
from .models import Todo_models

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo_models
        fields = ['id','title','description','isComplted']