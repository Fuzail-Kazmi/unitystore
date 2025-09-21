from rest_framework import serializers
from apps.ecommerce.models.customer import Customer


class CustomerProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = Customer
        fields = [
            "id",
            "first_name",
            "last_name",
            "full_name",
            "email",
            "phone_number",
            "address",
            "city",
            "country",
        ]

    def get_full_name(self, obj):
        return obj.user.get_full_name() or obj.user.username
