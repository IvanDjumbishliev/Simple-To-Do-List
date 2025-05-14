from rest_framework import serializers
from .models import Task
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'created_at', 'due_date', 'completed', 'user']
        read_only_fields = ['created_at', 'user', 'id' ]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user