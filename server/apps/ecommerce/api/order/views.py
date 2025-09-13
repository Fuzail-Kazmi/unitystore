from rest_framework import generics, status, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from apps.ecommerce.models.order import Order, OrderItem, OrderStatus
from apps.ecommerce.models.cart import Cart
from apps.ecommerce.serializers.order import OrderSerializer


class OrderListAPIView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        print("==== DEBUG REQUEST HEADERS ====")
        print(self.request.headers)
        print("==== DEBUG USER ====")
        print(self.request.user)
        print("===============================")
        return Order.objects.filter(
            customer=self.request.user.customer
        ).order_by("-order_date")


class OrderDetailAPIView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "pk"

    def get_queryset(self):
        return Order.objects.filter(customer=self.request.user.customer)


class OrderCreateAPIView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        customer = request.user.customer
        cart = get_object_or_404(Cart, customer=customer)

        if not cart.items.exists():
            return Response(
                {"detail": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST
            )

        order = Order.objects.create(
            customer=customer,
            delivery_address=getattr(customer, "default_address", None),
        )

        for cart_item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
                price=cart_item.price,
                amount=cart_item.amount,
                uom=cart_item.product.uom.name if cart_item.product.uom else None,
                price_list=None,
            )

        order.calculate_total()
        order.save()

        # clear cart
        cart.items.all().delete()
        cart.calculate_totals()
        cart.save()

        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class OrderCancelAPIView(generics.UpdateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "pk"

    def get_queryset(self):
        return Order.objects.filter(customer=self.request.user.customer)

    def update(self, request, *args, **kwargs):
        order = self.get_object()

        if order.status not in [OrderStatus.PENDING, OrderStatus.SHIPPED]:
            return Response(
                {"detail": "Order cannot be canceled"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        order.status = OrderStatus.CANCELED
        order.save()
        return Response(OrderSerializer(order).data, status=status.HTTP_200_OK)
