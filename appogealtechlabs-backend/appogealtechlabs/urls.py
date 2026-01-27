from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

from apps.projects.views import TechStackViewSet, ProjectViewSet
from apps.services.views import ServiceViewSet
from apps.testimonials.views import TestimonialViewSet
from apps.inquiries.views import ContactFormViewSet

# API Router
router = DefaultRouter()
router.register(r'tech-stack', TechStackViewSet, basename='techstack')
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'testimonials', TestimonialViewSet, basename='testimonial')
router.register(r'contact', ContactFormViewSet, basename='contact')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
