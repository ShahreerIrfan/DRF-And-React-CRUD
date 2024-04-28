from django.db import models

# Create your models here.
class Todo_models(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    isComplted = models.BooleanField(default=False)