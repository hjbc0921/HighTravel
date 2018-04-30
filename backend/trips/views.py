from django.contrib.auth.models import User
from trips.models import Trip, Budget, Expense, Photo, Diary, Todo, Rule, Schedule, Marker
from trips.serializers import TripSerializer, UserSerializer, BudgetSerializer, ExpenseSerializer, PhotoSerializer, DiarySerializer, TodoSerializer, RuleSerializer, ScheduleSerializer, MarkerSerializer  
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from trips.permissions import IsParticipant

# api/trips/ url view
class TripList(generics.ListCreateAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    # override post method to check condition of sinceWhen and tilWhen
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            if serializer.validated_data['sinceWhen'] > serializer.validated_data['tilWhen']:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            #return Response(serializer.data, status=status.HTTP_201_CREATED)
        #return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return self.create(request,*args,**kwargs)

    def perform_create(self, serializer):
        serializer.save()

# api/trips/id/ url view
class TripDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsParticipant,)

    # override put method to check condition of sinceWhen and tilWhen
    def put(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            if serializer.validated_data['sinceWhen'] >= serializer.validated_data['tilWhen']:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUESt)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# api/users/ url view
class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# api/users/id url view
class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


#class Signin
#class Signout


# api/expenses/ url view
class ExpenseList(generics.ListCreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer


# api/expenses/id/ url view
class ExpenseDetail(generics.RetrieveAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer


# api/expenses/trip/tripId url view
class ExpenseOfTrip(generics.ListAPIView):
    queryset = Expense.objects.all()
    #queryset = Expense.objects.filter(tripID=tripId)
    serializer_class = ExpenseSerializer


# api/photos/ url view
class PhotoList(generics.ListCreateAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer


# api/photos/id/ url view
class PhotoDetail(generics.RetrieveAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer


# api/photos/trip/tripId url view
class PhotoOfTrip(generics.ListAPIView):
    queryset = Photo.objects.all()
    #queryset = Photo.objects.filter(tripID=tripId)
    serializer_class = PhotoSerializer


# api/diaries/ url view
class DiaryList(generics.ListCreateAPIView):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer


# api/diaries/id/ url view
class DiaryDetail(generics.RetrieveAPIView):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer


# api/diaries/trip/tripId/user/userId url view
class DiaryOfTrip(generics.ListAPIView):
    queryset = Diary.objects.all()
    #queryset = Diary.objects.filter(tripID=tripId, writer=UserId)
    serializer_class = DiarySerializer


# api/todos/ url view
class TodoList(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


# api/todos/id/ url view
class TodoDetail(generics.RetrieveAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer



# api/todos/trip/tripId url view
class TodoOfTrip(generics.ListAPIView):
    queryset = Todo.objects.all()
    #queryset = Todo.objects.filter(tripID=tripId)
    serializer_class = TodoSerializer


# api/rules/ url view
class RuleList(generics.ListCreateAPIView):
    queryset = Rule.objects.all()
    serializer_class = RuleSerializer


# api/rules/id/ url view
class RuleDetail(generics.RetrieveAPIView):
    queryset = Rule.objects.all()
    serializer_class = RuleSerializer
    

# api/rules/trip/tripId url view
class RuleOfTrip(generics.ListAPIView):
    queryset = Rule.objects.all()
    #queryset = Rule.objects.filter(tripID=tripId)
    serializer_class = RuleSerializer


# api/schedules/ url view
class ScheduleList(generics.ListCreateAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer


# api/schedules/id/ url view
class ScheduleDetail(generics.RetrieveAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    

# api/schedules/trip/tripId url view
class ScheduleOfTrip(generics.ListAPIView):
    queryset = Schedule.objects.all()
    #queryset = Schedule.objects.filter(tripID=tripId)
    serializer_class = ScheduleSerializer


# api/markers/ url view
class MarkerList(generics.ListCreateAPIView):
    queryset = Marker.objects.all()
    serializer_class = MarkerSerializer


# api/markers/id/ url view
class MarkerDetail(generics.RetrieveAPIView):
    queryset = Marker.objects.all()
    serializer_class = MarkerSerializer
    

# api/markers/trip/tripId url view
class MarkerOfTrip(generics.ListAPIView):
    queryset = Marker.objects.all()
    #queryset = Marker.objects.filter(tripID=tripId)
    serializer_class = MarkerSerializer
