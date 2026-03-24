
import os
import django
import sys

# Add project root to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "appogealtechlabs.settings")
django.setup()

from apps.calculator.models import CalculatorOption

def populate_calculator():
    # 1. Project Types
    project_types = [
        {
            'name': 'Web Application',
            'label': 'Web Application',
            'price': 50000.00,
            'description': 'Custom web application built with React/Next.js',
            'icon': 'Globe'
        },
        {
            'name': 'Mobile App',
            'label': 'Mobile App',
            'price': 80000.00,
            'description': 'Native or cross-platform mobile application',
            'icon': 'Smartphone'
        },
        {
            'name': 'E-commerce',
            'label': 'E-commerce',
            'price': 100000.00,
            'description': 'Online store with payment processing',
            'icon': 'ShoppingCart'
        },
        {
            'name': 'Custom Software',
            'label': 'Custom Software',
            'price': 150000.00,
            'description': 'Tailored software solution for specific needs',
            'icon': 'Cpu'
        }
    ]

    for item in project_types:
        CalculatorOption.objects.get_or_create(
            category='type',
            name=item['name'],
            defaults={
                'label': item['label'],
                'price': item['price'],
                'description': item['description'],
                'icon': item['icon']
            }
        )
        print(f"Ensured Project Type: {item['name']}")

    # 2. Features
    features = [
        {
            'name': 'User Authentication',
            'label': 'User Authentication',
            'price': 15000.00,
            'icon': 'Users'
        },
        {
            'name': 'Payment Integration',
            'label': 'Payment Integration',
            'price': 25000.00,
            'icon': 'CreditCard'
        },
        {
            'name': 'Admin Dashboard',
            'label': 'Admin Dashboard',
            'price': 30000.00,
            'icon': 'LayoutDashboard'
        },
        {
            'name': 'API Integration',
            'label': 'API Integration',
            'price': 20000.00,
            'icon': 'Server'
        },
        {
            'name': 'Real-time Chat',
            'label': 'Real-time Chat',
            'price': 40000.00,
            'icon': 'MessageSquare'
        },
        {
            'name': 'Analytics',
            'label': 'Analytics',
            'price': 15000.00,
            'icon': 'BarChart'
        },
        {
            'name': 'Multi-language',
            'label': 'Multi-language',
            'price': 20000.00,
            'icon': 'Languages'
        }
    ]

    for item in features:
        CalculatorOption.objects.get_or_create(
            category='feature',
            name=item['name'],
            defaults={
                'label': item['label'],
                'price': item['price'],
                'description': '', # Optional
                'icon': item['icon']
            }
        )
        print(f"Ensured Feature: {item['name']}")

if __name__ == '__main__':
    populate_calculator()
