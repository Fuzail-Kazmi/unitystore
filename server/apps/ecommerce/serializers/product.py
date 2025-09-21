from rest_framework import serializers
from apps.ecommerce.models.product import Product, UOM, Brand
from apps.ecommerce.models.category import Category
from apps.ecommerce.serializers.category import CategorySerializer


class BrandSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Brand
        fields = ["id", "name", "description", "image"]

    def get_image(self, obj: Brand):
        if not obj.image:
            return None
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url) if request else obj.image.url
    
class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source="category",
        write_only=True
    )
    brand = BrandSerializer(read_only=True)
    brand_id = serializers.PrimaryKeyRelatedField(
        queryset=Brand.objects.all(),
        source="brand",
        write_only=True
    )
    uom = serializers.CharField(source="uom.name", read_only=True)
    uom_id = serializers.PrimaryKeyRelatedField(
        queryset=UOM.objects.all(),
        source="uom",
        write_only=True,
        required=False,
        allow_null=True
    )
    images = serializers.SerializerMethodField()
    cover_image = serializers.SerializerMethodField()
    final_price = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        source="annotated_final_price",
        read_only=True
    )

    class Meta:
        model = Product
        fields = [
            "id",
            "product_name",
            "description",
            "category",
            "category_id",
            "brand",
            "brand_id",
            "uom",
            "uom_id",
            "price",
            "discount_price",
            "final_price",
            "rating",
            "cover_image",
            "images",
            "created_at",
            "updated_at",
        ]

    def get_images(self, obj: Product):
        request = self.context.get("request")
        images = []
        for image_obj in obj.images.all():
            if image_obj.image:
                url = request.build_absolute_uri(image_obj.image.url) if request else image_obj.image.url
                images.append(url)
        return images

    def get_cover_image(self, obj: Product):
        if not obj.cover_image:
            return None
        request = self.context.get("request")
        return request.build_absolute_uri(obj.cover_image.url) if request else obj.cover_image.url


class ProductListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    brand = BrandSerializer(read_only=True)
    uom = serializers.CharField(source="uom.name", read_only=True)
    cover_image = serializers.SerializerMethodField()
    final_price = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        source="annotated_final_price",
        read_only=True
    )

    class Meta:
        model = Product
        fields = [
            "id",
            "product_name",
            "category",
            "brand",
            "cover_image",
            "uom",
            "final_price",
            "rating",
        ]

    def get_cover_image(self, obj: Product):
        if not obj.cover_image:
            return None
        request = self.context.get("request")
        return request.build_absolute_uri(obj.cover_image.url) if request else obj.cover_image.url
