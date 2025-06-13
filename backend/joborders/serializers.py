from rest_framework import serializers
from .models import JobOrder

class JobOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobOrder
        fields = ['id', 'title', 'description', 'created_at']