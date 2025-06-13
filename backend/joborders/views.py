from rest_framework import viewsets
from .models import JobOrder
from .serializers import JobOrderSerializer

class JobOrderViewSet(viewsets.ModelViewSet):
    queryset = JobOrder.objects.all().order_by('-created_at')
    serializer_class = JobOrderSerializer