from django.contrib import admin
from .models import CalculatorOption

@admin.register(CalculatorOption)
class CalculatorOptionAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'is_active', 'created_at']
    list_filter = ['category', 'is_active']
    search_fields = ['name', 'label']
