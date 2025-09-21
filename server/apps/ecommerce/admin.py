from django.contrib import admin
from .models.product import Product, ProductImage, Brand   # <-- added Brand
from .models.category import Category
from .models.customer import Customer
from .models.order import Order, OrderItem
from .models.cart import Cart, CartItem
from .models.review import ProductReview
from .models.base import UOM


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "parent", "created_at", "updated_at")
    search_fields = ("name",)
    list_filter = ("parent",)


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("product_name", "brand", "category", "price", "discount_price", "rating", "created_at")
    search_fields = ("product_name", "description", "brand__name")
    list_filter = ("category", "uom", "brand")
    inlines = [ProductImageInline]


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at", "updated_at")
    search_fields = ("name",)

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ("user", "phone_number", "city", "country", "created_at")
    search_fields = ("user__email", "user__first_name", "user__last_name", "phone_number")
    list_filter = ("city", "country")


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "customer", "status", "total_amount", "order_date")
    list_filter = ("status", "order_date")
    search_fields = ("id", "customer__user__email")
    inlines = [OrderItemInline]


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ("customer", "grand_total", "total_qty", "updated_at")
    search_fields = ("customer__user__email",)


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ("cart", "product", "quantity", "price", "amount")
    search_fields = ("product__product_name", "cart__customer__user__email")


@admin.register(ProductReview)
class ProductReviewAdmin(admin.ModelAdmin):
    list_display = ("product", "customer", "rating", "created_at")
    list_filter = ("rating", "created_at")
    search_fields = ("product__product_name", "customer__user__email", "comment")


@admin.register(UOM)
class UOMAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at", "updated_at")
    search_fields = ("name",)
