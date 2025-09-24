from rest_framework import serializers
from apps.ecommerce.models.customer import Customer

class CustomerProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)
    full_name = serializers.SerializerMethodField()
    created_at = serializers.DateTimeField(read_only=True)
    profile_picture = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Customer
        fields = [
            "id",
            "first_name",
            "last_name",
            "full_name",
            "email",
            "phone_number",
            "created_at",
            "profile_picture",
        ]

    def get_full_name(self, obj):
        return obj.user.get_full_name() or obj.user.username

