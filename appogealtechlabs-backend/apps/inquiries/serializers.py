from rest_framework import serializers
from .models import ContactForm


class ContactFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactForm
        fields = [
            'id', 'name', 'email', 'phone', 'company',
            'inquiry_type', 'subject', 'message'
        ]
        read_only_fields = ['id']
