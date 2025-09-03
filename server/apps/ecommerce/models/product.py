from django.db import models
from django.utils import timezone
from django.db.models import Avg
from .base import BaseModel, UOM
from .category import Category

class Product(BaseModel):
    product_name = models.TextField()
    description = models.TextField(null=True, blank=True)
    category = models.ForeignKey(Category,null=True, on_delete=models.SET_NULL)
    cover_image = models.ImageField(blank=True, null=True)
    uom = models.ForeignKey(
        UOM, on_delete=models.SET_NULL, related_name="products", null=True, blank=True
    )
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    discount_price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    rating = models.FloatField(default=0.0)

    def __str__(self):
        return self.product_name

    def update_rating(self):
        avg_rating = self.reviews.aggregate(avg=Avg("rating"))["avg"]
        self.rating = avg_rating if avg_rating else 0.0
        self.save(update_fields=["rating"])

    @property
    def final_price(self):
        """Return discounted price if available, else normal price"""
        if self.discount_price and self.discount_price < self.price:
            return self.discount_price
        return self.price
    
    @property
    def all_images(self):
        return self.images.all().order_by("display_order").values_list("image", flat=True)


    
class ProductImage(BaseModel):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(upload_to="products/")
    display_order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.product.product_name} - Image {self.display_order}"

