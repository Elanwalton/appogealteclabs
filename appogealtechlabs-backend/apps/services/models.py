from django.db import models
from django.utils.text import slugify
from apps.core.models import TimeStampedModel


class Service(TimeStampedModel):
    """Service offering (e.g., Web Development, Mobile App)"""
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    description = models.TextField()
    icon = models.CharField(
        max_length=50,
        blank=True,
        help_text="Icon class name (e.g., 'fa-code' for Font Awesome)"
    )
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['name']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.name


class ServicePackage(TimeStampedModel):
    """Pricing tier for a service (Basic, Standard, Premium)"""
    
    TIER_CHOICES = [
        ('basic', 'Basic'),
        ('standard', 'Standard'),
        ('premium', 'Premium'),
    ]
    
    service = models.ForeignKey(
        Service,
        on_delete=models.CASCADE,
        related_name='packages'
    )
    tier = models.CharField(max_length=20, choices=TIER_CHOICES)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    timeline_days = models.PositiveIntegerField(
        help_text="Estimated delivery time in days"
    )
    description = models.TextField(blank=True, help_text="Short description of the package")
    features = models.JSONField(
        help_text='List of features to display. Structure: [{"text": "Feature Name", "included": true/false}]'
    )
    is_popular = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['service', 'price']
        unique_together = ['service', 'tier']
    
    def __str__(self):
        return f"{self.service.name} - {self.get_tier_display()}"
