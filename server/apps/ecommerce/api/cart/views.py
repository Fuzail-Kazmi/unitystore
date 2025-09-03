from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import NotAuthenticated
from django.shortcuts import get_object_or_404

from apps.ecommerce.models.cart import Cart, CartItem
from apps.ecommerce.models.product import Product
from apps.ecommerce.serializers.cart import (
    CartSerializer,
    CartItemAddSerializer,
    CartItemUpdateSerializer,
)


# Get current user’s cart
class CartRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        user = self.request.user
        if not user.is_authenticated:
            raise NotAuthenticated("You must be logged in to view your cart.")
        return Cart.objects.get_or_create(customer=user.customer)[0]


# Add item to cart
class CartAddItemAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = CartItemAddSerializer(data=request.data)
        if serializer.is_valid():
            customer = request.user.customer
            cart, _ = Cart.objects.get_or_create(customer=customer)

            try:
                product = Product.objects.get(id=serializer.validated_data["product_id"])
            except Product.DoesNotExist:
                return Response({
                    "success": False,
                    "message": "Product not found",
                    "errors": {"product_id": ["Invalid product ID"]}
                }, status=status.HTTP_400_BAD_REQUEST)

            cart.add_item(
                product=product,
                quantity=serializer.validated_data["quantity"],
                price=serializer.validated_data["price"],
            )

            return Response({
                "success": True,
                "message": "Item added to cart successfully",
                "data": CartSerializer(cart).data
            }, status=status.HTTP_200_OK)

        return Response({
            "success": False,
            "message": "Validation failed",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


# Update cart item
class CartUpdateItemAPIView(APIView):
    def put(self, request, item_id, *args, **kwargs):
        serializer = CartItemUpdateSerializer(data=request.data)
        if serializer.is_valid():
            customer = request.user.customer
            cart = get_object_or_404(Cart, customer=customer)
            item = get_object_or_404(CartItem, id=item_id, cart=cart)

            if serializer.validated_data["action"] == "remove":
                item.delete()
                message = "Item removed from cart"
            else:
                item.quantity = serializer.validated_data["quantity"]
                item.save()
                message = "Item updated successfully"

            cart.calculate_totals()
            cart.save()

            return Response({
                "success": True,
                "message": message,
                "data": CartSerializer(cart).data
            }, status=status.HTTP_200_OK)

        return Response({
            "success": False,
            "message": "Validation failed",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


# Remove item from cart
class CartRemoveItemAPIView(APIView):
    def delete(self, request, item_id, *args, **kwargs):
        customer = request.user.customer
        cart = get_object_or_404(Cart, customer=customer)
        item = get_object_or_404(CartItem, id=item_id, cart=cart)
        item.delete()

        cart.calculate_totals()
        cart.save()

        return Response({
            "success": True,
            "message": "Item removed from cart successfully",
            "data": CartSerializer(cart).data
        }, status=status.HTTP_200_OK)


# Clear cart
class CartClearAPIView(APIView):
    def post(self, request, *args, **kwargs):
        customer = request.user.customer
        cart = get_object_or_404(Cart, customer=customer)

        cart.items.all().delete()
        cart.calculate_totals()
        cart.save()

        return Response({
            "success": True,
            "message": "Cart cleared successfully",
            "data": CartSerializer(cart).data
        }, status=status.HTTP_200_OK)
