from django.db import models
from apps.core.models import TimeStampedModel

class CalculatorOption(TimeStampedModel):
    """Option for the cost calculator (e.g., 'Web App', 'Auth', 'Payment')"""
    
    CATEGORY_CHOICES = [
        ('type', 'Project Type'),
        ('feature', 'Feature'),
    ]

    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    name = models.CharField(max_length=100)
    label = models.CharField(max_length=100, help_text="Display label (e.g., 'User Authentication')")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True, help_text="Lucide icon name")
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['category', 'price']

    def __str__(self):
        return f"{self.get_category_display()} - {self.name} (${self.price})"
