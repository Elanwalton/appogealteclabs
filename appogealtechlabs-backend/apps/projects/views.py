from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import TechStack, Project
from .serializers import TechStackSerializer, ProjectListSerializer, ProjectDetailSerializer


class TechStackViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for tech stack items"""
    queryset = TechStack.objects.all()
    serializer_class = TechStackSerializer
    lookup_field = 'slug'


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for projects with filtering"""
    queryset = Project.objects.filter(is_published=True)
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'featured']
    search_fields = ['title', 'short_description']
    ordering_fields = ['created_at', 'title']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProjectDetailSerializer
        return ProjectListSerializer
