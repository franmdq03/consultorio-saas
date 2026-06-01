from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Patient

class PatientSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source='user.username',
        read_only=True
    )

    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all()
    )

    class Meta:
        model = Patient
        fields = [
            'id',
            'user',
            'username',
            'dni',
            'birth_date',
            'phone'
        ]