from rest_framework import serializers
from .models import Service, ServicePackage


class ServicePackageSerializer(serializers.ModelSerializer):
    tier_display = serializers.CharField(source='get_tier_display', read_only=True)
    
    class Meta:
        model = ServicePackage
        fields = ['id', 'tier', 'tier_display', 'price', 'timeline_days', 'features', 'is_popular']


class ServiceSerializer(serializers.ModelSerializer):
    packages = ServicePackageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Service
        fields = ['id', 'name', 'slug', 'description', 'icon', 'packages']
