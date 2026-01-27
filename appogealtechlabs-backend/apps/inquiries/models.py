from django.db import models
from apps.core.models import TimeStampedModel


class ContactForm(TimeStampedModel):
    """Contact form submission"""
    
    INQUIRY_TYPE_CHOICES = [
        ('general', 'General Inquiry'),
        ('quote', 'Request Quote'),
        ('support', 'Support'),
        ('partnership', 'Partnership'),
    ]
    
    STATUS_CHOICES = [
        ('new', 'New'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
    ]
    
    # Contact info
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    company = models.CharField(max_length=200, blank=True)
    
    # Inquiry details
    inquiry_type = models.CharField(
        max_length=20,
        choices=INQUIRY_TYPE_CHOICES,
        default='general'
    )
    subject = models.CharField(max_length=300)
    message = models.TextField()
    
    # Admin fields
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='new'
    )
    admin_notes = models.TextField(blank=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Contact Form Submission"
        verbose_name_plural = "Contact Form Submissions"
    
    def __str__(self):
        return f"{self.name} - {self.subject[:50]}"
