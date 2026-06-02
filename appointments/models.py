from django.db import models
from patients.models import Patient
from doctors.models import Doctor
from django.core.exceptions import ValidationError
from datetime import date

class Appointment(models.Model):

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]

    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)

    date = models.DateField()
    time = models.TimeField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )

    notes = models.TextField(blank=True, null=True)

    def clean(self):
        # ❌ no fechas pasadas
        if self.date < date.today():
            raise ValidationError("No se pueden crear turnos en el pasado")

        # ❌ evitar duplicados doctor + fecha + hora
        exists = Appointment.objects.filter(
            doctor=self.doctor,
            date=self.date,
            time=self.time
        )

        # si estás editando, excluir el mismo registro
        if self.pk:
            exists = exists.exclude(pk=self.pk)

        if exists.exists():
            raise ValidationError(
                "El doctor ya tiene un turno en esa fecha y hora"
            )

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    class Meta:
        unique_together = ('doctor', 'date', 'time')

    def __str__(self):
        return f"{self.patient} - {self.date}"