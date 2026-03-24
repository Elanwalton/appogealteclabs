from rest_framework import viewsets
from .models import CalculatorOption
from .serializers import CalculatorOptionSerializer

class CalculatorOptionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CalculatorOption.objects.filter(is_active=True)
    serializer_class = CalculatorOptionSerializer
