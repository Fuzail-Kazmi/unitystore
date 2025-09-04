from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, status, serializers
from rest_framework_simplejwt.tokens import RefreshToken

from apps.user_auth.serializers import LoginSerializer, AuthTokenSerializer


class LoginAPI(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            user = authenticate(
                email=serializer.validated_data.get("email"),
                password=serializer.validated_data.get("password"),
            )

            if user is not None:
                # token_object = AuthTokenSerializer.get_token(user)
                # tokens = {
                #     "access": str(token_object.access_token),
                #     "refresh": str(token_object),
                # }
                
                refresh = RefreshToken.for_user(user)
                tokens = {
                    "access": str(refresh.access_token),
                    "refresh": str(refresh)
                }
                return Response(
                    data=tokens,
                    status=status.HTTP_200_OK,
                )

        return Response(
            data={"message": "Invalid user credentials"},
            status=status.HTTP_401_UNAUTHORIZED,
        )


