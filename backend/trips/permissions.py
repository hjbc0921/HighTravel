from rest_framework import permissions

class IsParticipant(permissions.BasePermission):
    def has_object_permission(self,request,view,obj):
       return True 
