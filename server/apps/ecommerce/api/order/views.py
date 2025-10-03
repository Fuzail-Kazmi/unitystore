from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from apps.ecommerce.models.order import Order, OrderItem, OrderStatus
from apps.ecommerce.models.cart import Cart
from apps.ecommerce.serializers.order import OrderSerializer
from apps.ecommerce.models.customer import Customer
from apps.user_auth.models.base import Address 

class OrderAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, *args, **kwargs):
        user = self.request.user
        order_id = self.request.GET.get("id")
        customer = Customer.objects.filter(user=user).first()

        if not customer:
            return Response(
                {"detail": "Customer not found"}, status=status.HTTP_404_NOT_FOUND
            )

        if order_id:
            try:
                orders_queryset = Order.objects.get(id=order_id)
                serializer = OrderSerializer(orders_queryset)
            except Order.DoesNotExist:
                return Response(
                    {"detail": "Order not found"}, status=status.HTTP_404_NOT_FOUND
                )
            return Response(serializer.data)
        else:
            orders_queryset = Order.objects.filter(customer=customer).order_by(
                "-order_date"
            )
            serializer = OrderSerializer(orders_queryset, many=True)
        return Response(serializer.data)


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
            return Response({"detail": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)

        address_id = request.data.get("address_id")
        if address_id:
            delivery_address = get_object_or_404(Address, id=address_id, user=request.user)
        else:
            delivery_address = Address.objects.filter(user=request.user, default=True).first()

        if not delivery_address:
            return Response({"detail": "No delivery address found"}, status=status.HTTP_400_BAD_REQUEST)

        from apps.ecommerce.serializers.address import AddressSerializer
        address_snapshot = AddressSerializer(delivery_address).data

        order = Order.objects.create(
            customer=customer,
            delivery_address=delivery_address,
            delivery_address_snapshot=address_snapshot, 
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

        if order.status != OrderStatus.PENDING:
            return Response(
                {"detail": "Order cannot be canceled at this stage. Please contact support."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        reason = request.data.get("reason", "")

        order.status = OrderStatus.CANCELED
        order.cancel_reason = reason
        order.save()

        return Response(OrderSerializer(order).data, status=status.HTTP_200_OK)



class AdminOrderListAPIView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAdminUser] 

    def get_queryset(self):
        queryset = Order.objects.all().order_by("-order_date")
        status_filter = self.request.GET.get("status")
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        return queryset

class AdminOrderDetailAPIView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAdminUser] 
    queryset = Order.objects.all()
    lookup_field = "pk" 

class AdminOrderActionAPIView(generics.UpdateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = Order.objects.all()
    lookup_field = "pk"

    def update(self, request, *args, **kwargs):
        order = self.get_object()
        action = request.data.get("action") 

        if action == "accept":
            if order.status == OrderStatus.PENDING:
                order.status = OrderStatus.SHIPPED
                order.save()
                message = "Your order has been accepted and will be delivered in 4–6 working days."
            else:
                return Response({"detail": "Order cannot be accepted now."}, status=400)

        elif action == "reject":
            if order.status == OrderStatus.PENDING:
                order.status = OrderStatus.CANCELED
                order.save()
                message = "Your order has not been placed due to some reasons."
            else:
                return Response({"detail": "Order cannot be rejected now."}, status=400)
        elif action == "delivered":
            if order.status == OrderStatus.SHIPPED:
                order.status = OrderStatus.DELIVERED
                order.save()
                message = "Order has been marked as delivered."
            else:
                return Response({"detail": "Only shipped orders can be marked as delivered."}, status=400)
            
        else:
            return Response({"detail": "Invalid action"}, status=400)

        return Response({
            "order": OrderSerializer(order).data,
            "message": message
        }, status=200)

