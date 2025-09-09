from rest_framework import generics
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from apps.ecommerce.models.category import Category
from apps.ecommerce.serializers.category import CategorySerializer, CategoryTreeSerializer


# List all categories (flat)
class CategoryListAPIView(generics.ListAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.all().order_by("name")


# Category detail with products
class CategoryDetailAPIView(generics.RetrieveAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    lookup_field = "pk"  

    def get_object(self):
        try:
            category = super().get_object()
            return category
        except Category.DoesNotExist:
            raise NotFound("Category not found")

    def retrieve(self, request, *args, **kwargs):
        category = self.get_object()
        serializer = self.get_serializer(category)
        data = serializer.data

        products = category.product_set.all() 
        from apps.ecommerce.serializers.product import ProductListSerializer
        data["products"] = ProductListSerializer(products, many=True, context={"request": request}).data
        return Response(data)
