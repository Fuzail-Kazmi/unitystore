from django.db import models
from . import BaseModel
from .category import Category

class Product(BaseModel):
    product_name = models.TextField()
    description = models.TextField(null=True, blank=True)
    category = models.ForeignKey(Category,null=True, on_delete=models.SET_NULL)
    cover_image = models.ImageField(blank=True, null=True)

    def  __str__(self):
        return self.product_name
    
