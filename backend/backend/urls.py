from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from todo_app.views import CreateUserView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('api/users/', CreateUserView.as_view(), name='register'),
    path('api-auth/', include('rest_framework.urls')), 
    path('api/', include('todo_app.urls')),  
] 