from django.db import models
from django.contrib.auth.models import User


class Todo(models.Model):
    todo_id = models.TextField()
    name = models.TextField()
    complete = models.BooleanField()
    editing = models.BooleanField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

