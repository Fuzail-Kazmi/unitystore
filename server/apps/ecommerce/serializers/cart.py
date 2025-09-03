from rest_framework import serializers
from apps.ecommerce.models.cart import Cart, CartItem, Product


class ProductNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "product_name", "cover_image", "description", "category"]


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductNestedSerializer(read_only=True)
    subtotal = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = CartItem
        fields = ["id", "product", "quantity", "price", "amount", "subtotal"]
        read_only_fields = ["amount", "subtotal"]


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ["id", "grand_total", "total_qty", "updated_at", "items"]


class CartItemAddSerializer(serializers.Serializer):
    product_id = serializers.CharField(max_length=255)
    quantity = serializers.DecimalField(max_digits=10, decimal_places=2)

    def validate(self, data):
        if data["quantity"] <= 0:
            raise serializers.ValidationError(
                {"quantity": "Quantity must be greater than zero"}
            )
        return data


class CartItemUpdateSerializer(serializers.Serializer):
    product_id = serializers.CharField(max_length=255)
    quantity = serializers.DecimalField(max_digits=10, decimal_places=2, required=False)
    action = serializers.ChoiceField(choices=["remove", "update"], default="update")

    def validate(self, data):
        try:
            Product.objects.get(id=data["product_id"])
        except Product.DoesNotExist:
            raise serializers.ValidationError({"product_id": "Invalid product ID"})

        if data["action"] == "update" and data.get("quantity") is not None:
            if data["quantity"] < 0:
                raise serializers.ValidationError(
                    {"quantity": "Quantity must be greater than or equal to zero"}
                )
        return data
