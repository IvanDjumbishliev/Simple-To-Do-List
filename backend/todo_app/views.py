from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import TaskSerializer, UserSerializer
from .models import Task
from rest_framework.response import Response

class TaskListCreate(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permissoin_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(author=self.request.user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TaskDelete(generics.DestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(author=self.request.user)

    def perform_destroy(self, instance):
        if instance.author == self.request.user:
            instance.delete()
            return Response({"detail": "Task deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"detail": "You do not have permission to delete this task."}, status=status.HTTP_403_FORBIDDEN)

class TaskUpdate(generics.UpdateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(author=self.request.user)

    def perform_update(self, serializer):
        instance = self.get_object()
        if instance.author == self.request.user:
            serializer.save()
            return Response(
                {"detail": "Task updated successfully."}, 
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"detail": "You do not have permission to edit this task."}, 
                status=status.HTTP_403_FORBIDDEN
            )

class TaskCompleted(generics.UpdateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(author=self.request.user)

    def perform_update(self, serializer):
        instance = self.get_object()
        if instance.author == self.request.user:
            instance.completed = not instance.completed
            instance.save()
            serializer.save(instance)
            return Response(
                {"detail": "Task marked as completed."}, 
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"detail": "You do not have permission to mark this task as completed."}, 
                status=status.HTTP_403_FORBIDDEN
            )

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

