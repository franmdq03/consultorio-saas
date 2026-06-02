from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import UserViewSet, me

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = router.urls

urlpatterns += [
    path('me/', me),
]