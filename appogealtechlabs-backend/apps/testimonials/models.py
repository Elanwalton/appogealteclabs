from django.db import models
from apps.core.models import TimeStampedModel


class Testimonial(TimeStampedModel):
    """Client testimonial/review"""
    client_name = models.CharField(max_length=200)
    client_position = models.CharField(
        max_length=200,
        blank=True,
        help_text="e.g., 'CEO at Company X'"
    )
    client_photo = models.ImageField(
        upload_to='testimonials/',
        blank=True,
        null=True
    )
    company_name = models.CharField(max_length=200, blank=True)
    
    testimonial_text = models.TextField()
    rating = models.PositiveSmallIntegerField(
        default=5,
        help_text="Rating out of 5"
    )
    
    # Related project (optional)
    project = models.ForeignKey(
        'projects.Project',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='testimonials'
    )
    
    is_approved = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.client_name} - {self.company_name or 'No Company'}"
