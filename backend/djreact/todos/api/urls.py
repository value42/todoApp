from django.urls import path
from .views import TodoListView, TodoDetailView, UsersListView, TodosListView, TodosEditView
from django.urls import path, include



urlpatterns = [
    path('users/', UsersListView.as_view()),
    path('tasks/', TodoListView.as_view()),
    path('tasks/<pk>', TodoDetailView.as_view()),
    path('auth/', include('djoser.urls')),
    path('auth/token/', include('djoser.urls.authtoken')),
    path('todos/', TodosListView.as_view()),
    path('todos/<int:pk>/', TodosEditView.as_view()),

]