from rest_framework import viewsets, mixins
from .models import Subscriber
from .serializers import SubscriberSerializer
from rest_framework.permissions import AllowAny

class SubscriberViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer
    permission_classes = [AllowAny]
