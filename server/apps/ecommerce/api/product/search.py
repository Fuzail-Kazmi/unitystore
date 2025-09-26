from django.db.models import Q
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.ecommerce.models.product import Product
from apps.ecommerce.serializers.product import ProductListSerializer


class ProductPagination(PageNumberPagination):
    page_size = 50
    page_size_query_param = "page_size"
    max_page_size = 100


class SearchProductAPIView(APIView):
    def get(self, *args, **kwargs):
        request = self.request.GET
        search_query = str(request.get("query", "")).strip()
        min_price = request.get("min_price")
        max_price = request.get("max_price")
        category = request.get("category")
        queryset_filters = Q()

        if search_query:
            queryset_filters &= Q(product_name__icontains=search_query)

        if category:
            queryset_filters &= Q(category__id=category)

        product_queryset = Product.objects.filter(queryset_filters).order_by(
            "-created_at"
        )
        print(product_queryset)
        paginator = ProductPagination()
        paginated_products = paginator.paginate_queryset(product_queryset, self.request)
        serializer = ProductListSerializer(paginated_products, many=True)

        return paginator.get_paginated_response(
            {
                "products": serializer.data,
                "total_count": product_queryset.count(),
                "search_query": search_query,
                "filters": {
                    "min_price": min_price,
                    "max_price": max_price,
                    "category": category,
                },
            }
        )
