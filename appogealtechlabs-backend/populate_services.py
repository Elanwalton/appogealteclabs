
import os
import django
import json

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "appogealtechlabs.settings")
django.setup()

from apps.services.models import Service, ServicePackage

def populate_services():
    # 1. Create the main "Web Development" service wrapper
    service, created = Service.objects.get_or_create(
        name="Web Application Development",
        defaults={
            "description": "Comprehensive web solutions tailored to your business needs.",
            "icon": "Code"
        }
    )
    
    if created:
        print(f"Created Service: {service.name}")
    else:
        print(f"Service already exists: {service.name}")

    # 2. Define the packages (from frontend)
    packages_data = [
      {
        'tier': 'basic',
        'price': 50000.00,
        'timeline_days': 21,
        'is_popular': False,
        'description': 'Perfect for small projects and MVPs. Get your product to market quickly.',
        'features': [
          { 'text': 'Single page application', 'included': True },
          { 'text': 'Responsive design', 'included': True },
          { 'text': 'Basic SEO optimization', 'included': True },
          { 'text': 'Contact form integration', 'included': True },
          { 'text': '1 month support', 'included': True },
          { 'text': 'Backend development', 'included': False },
          { 'text': 'Database integration', 'included': False },
          { 'text': 'Custom animations', 'included': False },
        ]
      },
      {
        'tier': 'standard',
        'price': 150000.00,
        'timeline_days': 42,
        'is_popular': True,
        'description': 'Ideal for growing businesses. Full-stack solution with backend integration.',
        'features': [
          { 'text': 'Multi-page application', 'included': True },
          { 'text': 'Responsive & mobile-first', 'included': True },
          { 'text': 'Advanced SEO optimization', 'included': True },
          { 'text': 'Form & email integration', 'included': True },
          { 'text': '3 months support', 'included': True },
          { 'text': 'Backend development', 'included': True },
          { 'text': 'Database integration', 'included': True },
          { 'text': 'Custom animations', 'included': True },
          { 'text': 'Admin dashboard', 'included': True },
          { 'text': 'API development', 'included': True },
        ]
      },
      {
        'tier': 'premium',
        'price': 350000.00,
        'timeline_days': 84,
        'is_popular': False,
        'description': 'Enterprise-grade solution with advanced features and dedicated support.',
        'features': [
          { 'text': 'Complex web application', 'included': True },
          { 'text': 'Fully responsive design', 'included': True },
          { 'text': 'Enterprise SEO & analytics', 'included': True },
          { 'text': 'Advanced integrations', 'included': True },
          { 'text': '6 months priority support', 'included': True },
          { 'text': 'Full-stack development', 'included': True },
          { 'text': 'Multi-database support', 'included': True },
          { 'text': 'Advanced animations & 3D', 'included': True },
          { 'text': 'Custom admin panel', 'included': True },
          { 'text': 'RESTful API & webhooks', 'included': True },
          { 'text': 'Third-party integrations', 'included': True },
          { 'text': 'Performance optimization', 'included': True },
          { 'text': 'Security audit', 'included': True },
          { 'text': 'Deployment & hosting setup', 'included': True },
        ]
      }
    ]

    for pkg_data in packages_data:
        package, created = ServicePackage.objects.update_or_create(
            service=service,
            tier=pkg_data['tier'],
            defaults={
                'price': pkg_data['price'],
                'timeline_days': pkg_data['timeline_days'],
                'is_popular': pkg_data['is_popular'],
                'description': pkg_data['description'],
                'features': pkg_data['features']
            }
        )
        print(f"{'Created' if created else 'Updated'} package: {pkg_data['tier']}")

if __name__ == '__main__':
    populate_services()
