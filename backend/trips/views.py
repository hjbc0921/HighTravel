from django.contrib.auth.models import User
from trips.models import Trip
from trips.serializers import TripSerializer
from rest_framework import generics
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

#Class TripList
#Class TripDetail