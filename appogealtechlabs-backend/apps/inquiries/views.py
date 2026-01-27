from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import ContactForm
from .serializers import ContactFormSerializer


class ContactFormViewSet(viewsets.ModelViewSet):
    """API endpoint for contact form submissions"""
    queryset = ContactForm.objects.all()
    serializer_class = ContactFormSerializer
    http_method_names = ['post']  # Only allow POST
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response(
            {
                'message': 'Thank you for contacting us! We will get back to you soon.',
                'data': serializer.data
            },
            status=status.HTTP_201_CREATED
        )
