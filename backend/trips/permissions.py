from rest_framework import permissions
from trips.models import Trip

class IsSpenderOrAdminOrReadOnly(permissions.BasePermission):
    """
        Custom permission to only allow spender of expense to put or delete
        In other case, Read-Only
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            trip = Trip.objects.get(id=obj.tripID.id)
            return (request.user == obj.spender) | (trip.creator == request.user.username)

class IsCreatorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self,request,view,obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            return request.user.username == obj.creator

class IsWriterOrAdminOrReadOnly(permissions.BasePermission):
    """
        Custom permission to only allow writer of diary to put or delete
        In other case, Read-Only
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            trip = Trip.objects.get(id=obj.tripID.id)
            return (request.user == obj.writer) | (trip.creator == request.user.username)
