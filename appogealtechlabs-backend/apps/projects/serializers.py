from rest_framework import serializers
from .models import TechStack, Project


class TechStackSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechStack
        fields = ['id', 'name', 'slug', 'icon', 'description']


class ProjectListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for project listings"""
    technologies = TechStackSerializer(many=True, read_only=True)
    is_case_study = serializers.ReadOnlyField()
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'category', 'short_description',
            'cover_image', 'live_url', 'github_url', 'technologies',
            'featured', 'is_case_study', 'created_at'
        ]


class ProjectDetailSerializer(serializers.ModelSerializer):
    """Full serializer with case study details"""
    technologies = TechStackSerializer(many=True, read_only=True)
    is_case_study = serializers.ReadOnlyField()
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'category', 'short_description',
            'cover_image', 'live_url', 'github_url',
            'challenge_text', 'solution_text', 'results_metrics',
            'technologies', 'featured', 'is_case_study',
            'created_at', 'updated_at'
        ]
