from django.contrib import admin
from .models import Service, ServicePackage


class ServicePackageInline(admin.TabularInline):
    model = ServicePackage
    extra = 1


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'is_active', 'created_at']
    list_filter = ['is_active']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ServicePackageInline]


@admin.register(ServicePackage)
class ServicePackageAdmin(admin.ModelAdmin):
    list_display = ['service', 'tier', 'price', 'timeline_days', 'is_popular']
    list_filter = ['tier', 'is_popular', 'service']
    search_fields = ['service__name', 'description']
