from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Doctor

class DoctorSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source='user.username',
        read_only=True
    )

    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all()
    )

    class Meta:
        model = Doctor
        fields = [
            'id',
            'user',
            'username',
            'specialty',
            'phone'
        ]