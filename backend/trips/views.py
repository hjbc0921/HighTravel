from django.contrib.auth.models import User
from trips.models import Trip, Budget, Expense, Photo, Diary, Todo, Rule, Schedule, Marker
from trips.serializers import TripSerializer, UserSerializer, BudgetSerializer, ExpenseSerializer, PhotoSerializer, DiarySerializer, TodoSerializer, RuleSerializer, ScheduleSerializer, MarkerSerializer  
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from trips.serializer import IsParticipant

# trips/ url view
class TripList(generics.ListCreateView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    # override post method to check condition of sinceWhen and tilWhen
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            if serializer.validated_data['sinceWhen'] > serializer.validated_data['tilWhen']:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return self.update(request, *args, **kwargs)


# trips/id/ url view
class TripDetail(generics.RetrieveUpdateDestroyView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, IsParticipant,)

    # override put method to check condition of sinceWhen and tilWhen
    def put(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            if serializer.validated_data['sinceWhen'] >= serializer.validated_data['tilWhen']:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUESt)

        return self.update(request, *args, **kwargs)


# users/ url view
class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# users/id url view
class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


#class Signin
#class Signout


# expenses/ url view
class ExpenseList(generics.ListAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer


# expenses/id/ url view
class ExpenseDetail(generics.RetrieveAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer


# photos/ url view
class PhotoList(generics.ListAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer


# photos/id/ url view
class PhotoDetail(generics.RetrieveAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer


# photos/trip/tripId url view
class PhotoOfTrip(generics.ListAPIView):
    queryset = Photo.objects.filter(tripID=tripId)
    serializer_class = PhotoSerializer


# diaries/ url view
class DiaryList(generics.ListAPIView):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer


# diaries/id/ url view
class DiaryDetail(generics.RetrieveAPIView):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer


# diaries/trip/tripId/user/userId url view
class DiaryOfTrip(generics.ListAPIView):
    queryset = Diary.objects.filter(tripID=tripId, writer=UserId)
    serializer_class = DiarySerializer


# todos/ url view
class TodoList(generics.ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


# todos/id/ url view
class TodoDetail(generics.RetrieveAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer



# todos/trip/tripId url view
class TodoOfTrip(generics.ListAPIView):
    queryset = Todo.objects.filter(tripID=tripId)
    serializer_class = TodoSerializer


# rules/ url view
class RuleList(generics.ListAPIView):
    queryset = Rule.objects.all()
    serializer_class = RuleSerializer


# rules/id/ url view
class RuleDetail(generics.RetrieveAPIView):
    queryset = Rule.objects.all()
    serializer_class = RuleSerializer
    

# rules/trip/tripId url view
class RuleOfTrip(generics.ListAPIView):
    queryset = Rule.objects.filter(tripID=tripId)
    serializer_class = RuleSerializer


# schedules/ url view
class ScheduleList(generics.ListAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer


# schedules/id/ url view
class ScheduleDetail(generics.RetrieveAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    

# schedules/trip/tripId url view
class ScheduleOfTrip(generics.ListAPIView):
    queryset = Schedule.objects.filter(tripID=tripId)
    serializer_class = ScheduleSerializer


# markers/ url view
class MarkerList(generics.ListAPIView):
    queryset = Marker.objects.all()
    serializer_class = MarkerSerializer


# markers/id/ url view
class MarkerDetail(generics.RetrieveAPIView):
    queryset = Marker.objects.all()
    serializer_class = MarkerSerializer
    

# markers/trip/tripId url view
class MarkerOfTrip(generics.ListAPIView):
    queryset = Marker.objects.filter(tripID=tripId)
    serializer_class = MarkerSerializer
