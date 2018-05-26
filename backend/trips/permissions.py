from rest_framework import permissions

class IsParticipantOrReadOnly(permissions.BasePermission):
    """
        Custom permission to only allow partipants of trip to put or delete
        In other case, Read-Only
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            return request.user in obj.users.all()

class IsSpenderOrReadOnly(permissions.BasePermission):
    """
        Custom permission to only allow spender of expense to put or delete
        In other case, Read-Only
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            return request.user == obj.spender

class IsCreatorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self,request,view,obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            return request.user == obj.creator

class IsWriterOrReadOnly(permissions.BasePermission):
    """
        Custom permission to only allow writer of diary to put or delete
        In other case, Read-Only
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            return request.user == obj.writer
