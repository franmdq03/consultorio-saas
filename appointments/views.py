from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Appointment
from .serializers import AppointmentSerializer


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    # 🔥 ENDPOINT: /appointments/my/
    @action(detail=False, methods=["get"])
    def my(self, request):
        user = request.user

        # 👨‍⚕️ Doctor
        if user.groups.filter(name="Doctor").exists():
            appointments = Appointment.objects.filter(doctor__user=user)

        # 👤 Paciente
        elif user.groups.filter(name="Paciente").exists():
            appointments = Appointment.objects.filter(patient__user=user)

        # 🛑 otro rol
        else:
            appointments = Appointment.objects.none()

        serializer = self.get_serializer(appointments, many=True)
        return Response(serializer.data)

    # 🔐 SEGURIDAD BÁSICA EN UPDATE
    def perform_update(self, serializer):
        user = self.request.user

        # ❌ Paciente no puede editar turnos
        if user.groups.filter(name="Paciente").exists():
            raise PermissionError("No tienes permisos para editar turnos")

        serializer.save()

    # 🔐 SEGURIDAD BÁSICA EN DELETE
    def perform_destroy(self, instance):
        user = self.request.user

        # ❌ Paciente no puede eliminar
        if user.groups.filter(name="Paciente").exists():
            raise PermissionError("No tienes permisos para eliminar turnos")

        instance.delete()
