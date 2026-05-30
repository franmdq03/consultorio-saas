from django.db import models
from django.contrib.auth.models import User

class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    dni = models.CharField(max_length=20)
    birth_date = models.DateField()
    phone = models.CharField(max_length=20)

    def __str__(self):
        return self.user.username
