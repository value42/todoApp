from rest_framework.generics import ListAPIView, RetrieveAPIView
from django.contrib.auth.models import User
from todos.models import Todo
from .serializers import TodoSerializer, UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import permissions


class TodosListView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        todo = Todo.objects.all()
        serializer = TodoSerializer(todo, many=True)
        return Response(serializer.data)

    def post(self, request):
        todo = TodoSerializer(data=request.data)
        if todo.is_valid():
            todo.save()
        return Response(status=201)


class TodosEditView(APIView):
    permission_classes = [permissions.AllowAny]

    def put(self, request, pk):
        todo = Todo.objects.get(pk=pk)
        serializer = TodoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        todo = Todo.objects.get(pk=pk)
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TodoListView(ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


class TodoDetailView(RetrieveAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


class UsersListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@api_view(["PUT", ])
def api_update_tasks(request, slug):
    try:
        task = Todo.objects.get(slug=slug)
    except Todo.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "PUT":
        serializer = TodoSerializer
        data = {}
        if serializer.is_valid():
            serializer.save()
            data['success'] = "upd successful"
            return Response(data=data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



