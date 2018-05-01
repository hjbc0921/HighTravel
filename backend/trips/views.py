from django.contrib.auth.models import User
from trips.models import Trip, Budget, Expense, Photo, Diary, Todo, Rule, Schedule, Marker
from trips.serializers import TripSerializer, TripDetailSerializer, UserSerializer, BudgetSerializer, ExpenseSerializer, PhotoSerializer, DiarySerializer, TodoSerializer, RuleSerializer, ScheduleSerializer, MarkerSerializer  
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
    #permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    # override post method to check condition of sinceWhen and tilWhen
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            if serializer.validated_data['sinceWhen'] > serializer.validated_data['tilWhen']:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return self.create(request,*args,**kwargs)

    def perform_create(self, serializer):
        serializer.save(users=[self.request.user])

# api/trips/id/ url view
class TripDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripDetailSerializer
    #permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsParticipant,)

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


# api/budget/ url view
class BudgetList(generics.ListCreateAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer


# api/budget/id/ url view
class BudgetDetail(generics.RetrieveAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer


# api/budget/trip/tripId url view
class BudgetOfTrip(generics.ListAPIView):
    serializer_class = BudgetSerializer

    def get_queryset(self):
        """
        This view should return a list of all budgets in tripId
        """

        tripId = self.kwargs['tripId']
        return Budget.objects.filter(tripID__id=tripId)



# api/expenses/ url view
class ExpenseList(generics.ListCreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    def perform_create(self, serializer):
        serializer.save(spender=self.request.user)


# api/expenses/id/ url view
class ExpenseDetail(generics.RetrieveAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer


# api/expenses/trip/tripId url view
class ExpenseOfTrip(generics.ListAPIView):
    #queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        """
        This view should return a list of all expenses in tripId
        """

        tripId = self.kwargs['tripId']
        return Expense.objects.filter(tripID__id=tripId)


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
    #queryset = Photo.objects.all()
    serializer_class = PhotoSerializer

    def get_queryset(self):
        """
        This view should return a list of all photos in tripId
        """

        tripId = self.kwargs['tripId']
        return Photo.objects.filter(tripID__id=tripId)


# api/diaries/ url view
class DiaryList(generics.ListCreateAPIView):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer

    def perform_create(self, serializer):
        serializer.save(writer=self.request.user)


# api/diaries/id/ url view
class DiaryDetail(generics.RetrieveAPIView):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer


# api/diaries/trip/tripId/user/userId url view
class DiaryOfTrip(generics.ListAPIView):
    #queryset = Diary.objects.all()
    serializer_class = DiarySerializer

    def get_queryset(self):
        """
        This view should return a list of all diaries in tripId of userId
        """

        tripId = self.kwargs['tripId']
        userId = self.kwargs['userId']
        return Diary.objects.filter(tripID__id=tripId, writer__id=userId)


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
    #queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def get_queryset(self):
        """
        This view should return a list of all todos in tripId
        """

        tripId = self.kwargs['tripId']
        return Todo.objects.filter(tripID__id=tripId)


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
    #queryset = Rule.objects.all()
    serializer_class = RuleSerializer

    def get_queryset(self):
        """
        This view should return a list of all rules in tripId
        """

        tripId = self.kwargs['tripId']
        return Rule.objects.filter(tripID__id=tripId)


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
    #queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

    def get_queryset(self):
        """
        This view should return a list of all schedules in tripId
        """

        tripId = self.kwargs['tripId']
        return Schedule.objects.filter(tripID__id=tripId)


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
    #queryset = Marker.objects.all()
    serializer_class = MarkerSerializer

    def get_queryset(self):
        """
        This view should return a list of all markers in tripId
        """

        tripId = self.kwargs['tripId']
        return Marker.objects.filter(tripID__id=tripId)

