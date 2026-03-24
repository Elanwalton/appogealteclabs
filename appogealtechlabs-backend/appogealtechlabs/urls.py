from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

from apps.projects.views import TechStackViewSet, ProjectViewSet
from apps.services.views import ServiceViewSet
from apps.testimonials.views import TestimonialViewSet
from apps.inquiries.views import ContactFormViewSet
from apps.blog.views import PostViewSet, CategoryViewSet, TagViewSet

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from apps.accounts.views import UserProfileView
from apps.newsletter.views import SubscriberViewSet
from apps.calculator.views import CalculatorOptionViewSet

# API Router
router = DefaultRouter()
router.register(r'tech-stack', TechStackViewSet, basename='techstack')
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'testimonials', TestimonialViewSet, basename='testimonial')
router.register(r'contact', ContactFormViewSet, basename='contact')
router.register(r'blog/posts', PostViewSet, basename='blog-posts')
router.register(r'blog/categories', CategoryViewSet, basename='blog-categories')
router.register(r'blog/tags', TagViewSet, basename='blog-tags')
router.register(r'newsletter/subscribe', SubscriberViewSet, basename='newsletter-subscribe')
router.register(r'calculator/options', CalculatorOptionViewSet, basename='calculator-options')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/user/profile/', UserProfileView.as_view(), name='user_profile'),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
