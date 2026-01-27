from rest_framework import viewsets
from .models import Testimonial
from .serializers import TestimonialSerializer


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for approved testimonials"""
    queryset = Testimonial.objects.filter(is_approved=True).select_related('project')
    serializer_class = TestimonialSerializer
    ordering = ['-is_featured', '-created_at']
