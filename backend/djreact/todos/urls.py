from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="todo-home"),
    path('todo/', views.todo, name="todo-main"),
]
