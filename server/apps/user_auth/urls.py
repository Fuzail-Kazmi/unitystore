from django.urls import path
from apps.user_auth.api import LoginAPI
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path("api/login", LoginAPI.as_view(), name="login"),
    path("api/login/refresh", TokenRefreshView.as_view(), name="refresh-jwt-token"),

]