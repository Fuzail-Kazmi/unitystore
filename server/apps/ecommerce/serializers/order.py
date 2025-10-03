from rest_framework import serializers
from apps.ecommerce.models.order import Order, OrderItem
from apps.ecommerce.serializers.customer import CustomerProfileSerializer
from apps.ecommerce.serializers.product import ProductListSerializer
from apps.ecommerce.serializers.address import AddressSerializer


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)
    subtotal = serializers.DecimalField(source="amount", max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = OrderItem
        fields = ["id", "product", "quantity", "price", "subtotal"]


class OrderSerializer(serializers.ModelSerializer):
    customer = CustomerProfileSerializer(read_only=True)
    items = OrderItemSerializer(many=True, read_only=True)
    delivery_address = AddressSerializer(read_only=True)
    delivery_address_snapshot = serializers.JSONField(read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "order_id",
            "customer",
            "cancel_reason",
            "status",
            "total_amount",
            "total_qty",
            "order_date",
            "items",
            "delivery_address",
            "delivery_address_snapshot",
        ]
