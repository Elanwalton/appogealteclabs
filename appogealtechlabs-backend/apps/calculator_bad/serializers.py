from rest_framework import serializers
from .models import CalculatorOption

class CalculatorOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalculatorOption
        fields = ['id', 'category', 'name', 'label', 'price', 'description', 'icon', 'is_active']
