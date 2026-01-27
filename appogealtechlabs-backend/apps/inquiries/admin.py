from django.contrib import admin
from .models import ContactForm


@admin.register(ContactForm)
class ContactFormAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'inquiry_type', 'status', 'created_at']
    list_filter = ['inquiry_type', 'status', 'created_at']
    search_fields = ['name', 'email', 'company', 'subject', 'message']
    list_editable = ['status']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'phone', 'company')
        }),
        ('Inquiry Details', {
            'fields': ('inquiry_type', 'subject', 'message')
        }),
        ('Admin Management', {
            'fields': ('status', 'admin_notes', 'created_at', 'updated_at')
        }),
    )
