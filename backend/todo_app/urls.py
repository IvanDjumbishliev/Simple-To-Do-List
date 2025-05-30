from django.urls import path
from . import views

urlpatterns = [
    path('tasks/', views.TaskListCreate.as_view(), name='task-list-create'),
    path('tasks/delete/<int:pk>/', views.TaskDelete.as_view(), name='task-delete'),
    path('tasks/<int:pk>/update/', views.TaskUpdate.as_view(), name='task-update'),
]