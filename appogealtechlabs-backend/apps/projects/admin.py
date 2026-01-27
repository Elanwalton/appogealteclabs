from django.contrib import admin
from .models import TechStack, Project


@admin.register(TechStack)
class TechStackAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'featured', 'is_published', 'created_at']
    list_filter = ['category', 'featured', 'is_published', 'created_at']
    search_fields = ['title', 'short_description']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ['technologies']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'category', 'short_description', 'cover_image')
        }),
        ('Links', {
            'fields': ('live_url', 'github_url')
        }),
        ('Case Study (Optional)', {
            'fields': ('challenge_text', 'solution_text', 'results_metrics'),
            'classes': ('collapse',)
        }),
        ('Technologies & Meta', {
            'fields': ('technologies', 'featured', 'is_published')
        }),
    )
