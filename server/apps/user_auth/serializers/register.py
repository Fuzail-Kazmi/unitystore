from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from ..models import User

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "mobile", "password"]
        extra_kwargs = {
            "password": {"write_only": True},
            "mobile": {"required": True}
        }

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        return value

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)
