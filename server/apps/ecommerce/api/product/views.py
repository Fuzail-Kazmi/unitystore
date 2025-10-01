import uuid
from django.db.models import Q, Case, When, F
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

from apps.ecommerce.models.product import Product
from apps.ecommerce.serializers.product import ProductSerializer, ProductListSerializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 50


# ----------- LIST + CREATE Products ------------
class ProductListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        queryset = Product.objects.all()

        queryset = queryset.annotate(
            annotated_final_price=Case(
                When(discount_price__isnull=False, discount_price__lt=F("price"), then=F("discount_price")),
                default=F("price"),
            )
        )

        params = self.request.query_params

        # ---- Category Filter ----
        category_id = params.get("category")
        if category_id:
            try:
                category_uuid = uuid.UUID(category_id)
                queryset = queryset.filter(category_id=category_uuid)
            except ValueError:
                return Product.objects.none()

        # ---- Price Range Filter ----
        min_price = params.get("min_price")
        max_price = params.get("max_price")
        if min_price:
            try:
                queryset = queryset.filter(annotated_final_price__gte=float(min_price))
            except ValueError:
                pass
        if max_price:
            try:
                queryset = queryset.filter(annotated_final_price__lte=float(max_price))
            except ValueError:
                pass

        # ---- Search Filter ----
        search = params.get("search")
        if search:
            queryset = queryset.filter(
                Q(product_name__icontains=search) |
                Q(description__icontains=search) |
                Q(category__name__icontains=search) |
                Q(brand__name__icontains=search)
            )

        return queryset.order_by("-created_at")


# ----------- RETRIEVE + UPDATE + DELETE ----------
class ProductDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer
    lookup_field = "pk"

    def get_queryset(self):
        return Product.objects.annotate(
            annotated_final_price=Case(
                When(discount_price__isnull=False, discount_price__lt=F("price"), then=F("discount_price")),
                default=F("price"),
            )
        )

    def get_object(self):
        pk = self.kwargs.get(self.lookup_field)
        try:
            uuid_obj = uuid.UUID(str(pk))
        except ValueError:
            raise NotFound(detail="Invalid product ID")

        try:
            return self.get_queryset().get(pk=uuid_obj)
        except Product.DoesNotExist:
            raise NotFound(detail="Product not found")
