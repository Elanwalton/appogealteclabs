from django.contrib import admin
from .models import Testimonial


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['client_name', 'company_name', 'rating', 'is_approved', 'is_featured', 'created_at']
    list_filter = ['is_approved', 'is_featured', 'rating', 'created_at']
    search_fields = ['client_name', 'company_name', 'testimonial_text']
    list_editable = ['is_approved', 'is_featured']
    
    fieldsets = (
        ('Client Information', {
            'fields': ('client_name', 'client_position', 'client_photo', 'company_name')
        }),
        ('Testimonial', {
            'fields': ('testimonial_text', 'rating', 'project')
        }),
        ('Moderation', {
            'fields': ('is_approved', 'is_featured')
        }),
    )
