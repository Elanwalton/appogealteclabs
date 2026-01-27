from rest_framework import serializers
from .models import Testimonial


class TestimonialSerializer(serializers.ModelSerializer):
    project_title = serializers.CharField(source='project.title', read_only=True)
    
    class Meta:
        model = Testimonial
        fields = [
            'id', 'client_name', 'client_position', 'client_photo',
            'company_name', 'testimonial_text', 'rating',
            'project_title', 'is_featured', 'created_at'
        ]
