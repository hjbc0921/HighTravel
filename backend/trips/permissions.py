from rest_framework import permissions

class IsParticipantOrReadOnly(permissions.BasePermission):
    """
        Custom permission to only allow partipants of trip to put or delete
        In other case, Read-Only
    """

    message = 'You are not a trip member'

    def has_object_permission(self,request,view,obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            return request.user in obj.users.all()
