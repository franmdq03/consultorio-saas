from rest_framework import serializers
from .models import Appointment

class AppointmentSerializer(serializers.ModelSerializer):

    doctor_name = serializers.CharField(
        source='doctor.user.username',
        read_only=True
    )

    patient_name = serializers.CharField(
        source='patient.user.username',
        read_only=True
    )

    class Meta:
        model = Appointment
        fields = [
            'id',
            'doctor',
            'patient',
            'doctor_name',
            'patient_name',
            'date',
            'time',
            'status',
            'notes'
        ]

    # 🔥 VALIDACIÓN BÁSICA (opcional pero recomendado)
    def validate(self, data):
        if not data.get("date"):
            raise serializers.ValidationError("La fecha es obligatoria")

        if not data.get("time"):
            raise serializers.ValidationError("La hora es obligatoria")

        return data