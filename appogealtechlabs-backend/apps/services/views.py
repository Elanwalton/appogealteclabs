from rest_framework import viewsets
from .models import Service
from .serializers import ServiceSerializer


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for services with pricing packages"""
    queryset = Service.objects.filter(is_active=True).prefetch_related('packages')
    serializer_class = ServiceSerializer
    lookup_field = 'slug'
