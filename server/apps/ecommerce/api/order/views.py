from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from django.shortcuts import get_object_or_404
from apps.ecommerce.models.order import Order, OrderItem
from apps.ecommerce.models.cart import Cart, CartItem
from apps.ecommerce.serializers.order import OrderSerializer


# List Orders for Logged-in Customer
class OrderListAPIView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(customer=self.request.user.customer).order_by("-order_date")


# Order Detail
class OrderDetailAPIView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "pk"

    def get_queryset(self):
        return Order.objects.filter(customer=self.request.user.customer)


# Create Order (convert from Cart → Order)
class OrderCreateAPIView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        customer = request.user.customer
        cart = get_object_or_404(Cart, customer=customer)

        if not cart.items.exists():
            return Response({"detail": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)

        # Create the Order
        order = Order.objects.create(customer=customer, delivery_address=customer.default_address if hasattr(customer, "default_address") else None)

        # Transfer cart items → order items
        for cart_item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
                price=cart_item.price,
                uom=cart_item.uom,
                price_list=cart_item.price_list,
            )

        # Clear cart
        cart.items.all().delete()
        cart.calculate_totals()
        cart.save()

        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# Cancel Order
class OrderCancelAPIView(generics.UpdateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "pk"

    def get_queryset(self):
        return Order.objects.filter(customer=self.request.user.customer)

    def update(self, request, *args, **kwargs):
        order = self.get_object()

        if order.status not in ["pending", "shipped"]:
            return Response({"detail": "Order cannot be canceled"}, status=status.HTTP_400_BAD_REQUEST)

        order.status = "canceled"
        order.save()
        return Response(OrderSerializer(order).data, status=status.HTTP_200_OK)
