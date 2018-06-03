from django.contrib.auth.models import User
from trips.models import Trip, Budget, Expense, Folder, Photo, Diary, Todo, Rule, Schedule, Marker
from trips.serializers import UserRegSerializer, TripSerializer, TripDetailSerializer, UserSerializer, BudgetSerializer, ExpenseSerializer, FolderSerializer, PhotoSerializer, DiarySerializer, TodoSerializer, RuleSerializer, ScheduleSerializer, MarkerSerializer  
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from trips.permissions import IsParticipantOrReadOnly, IsCreatorOrReadOnly, IsSpenderOrReadOnly, IsWriterOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser

# api/trips/ url view
class TripList(generics.ListCreateAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    # override post method to check condition of sinceWhen and tilWhen
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            if serializer.validated_data['sinceWhen'] >= serializer.validated_data['tilWhen']:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return self.create(request,*args,**kwargs)
    def perform_create(self,serializer):
        serializer.save(users=[self.request.user])
        serializer.save(creator=self.request.user.username)

# api/trips/id/ url view
class TripDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripDetailSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsCreatorOrReadOnly,)

    # override put method to check condition of sinceWhen and tilWhen
    def put(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            if serializer.validated_data['sinceWhen'] >= serializer.validated_data['tilWhen']:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return self.update(request,*args,**kwargs)

class UserRegister(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegSerializer
    permission_classes = (permissions.AllowAny,)    

# api/users/ url view
class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

# api/users/id url view
class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


# api/budget/ url view
class BudgetList(generics.ListCreateAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

# api/budget/id/ url view
class BudgetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

# api/budget/trip/tripId url view
class BudgetOfTrip(generics.ListAPIView):
    serializer_class = BudgetSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

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
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(spender=self.request.user)

# api/expenses/id/ url view
class ExpenseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsSpenderOrReadOnly)

# api/expenses/trip/tripId url view
class ExpenseOfTrip(generics.ListAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        """
        This view should return a list of all expenses in tripId
        """

        tripId = self.kwargs['tripId']
        return Expense.objects.filter(tripID__id=tripId)


# api/folders/ url view
class FolderList(generics.ListCreateAPIView):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

# api/folders/id/ url view
class FolderDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

# api/folders/trip/tripId url view
class FolderOfTrip(generics.ListAPIView):
    serializer_class = FolderSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        """
        This view should return a list of all folder in tripId
        """

        tripId = self.kwargs['tripId']
        return Folder.objects.filter(tripID__id=tripId)


# api/photos/ url view
class PhotoList(generics.ListCreateAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    parser_classes = (MultiPartParser, FileUploadParser, FormParser)
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(image=request.FILES['file'])
            #serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# api/photos/id/ url view
class PhotoDetail(generics.RetrieveDestroyAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

# api/photos/trip/tripId url view
class PhotoOfTrip(generics.ListAPIView):
    serializer_class = PhotoSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

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
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(writer=self.request.user)

# api/diaries/id/ url view
class DiaryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsWriterOrReadOnly)

# api/diaries/trip/tripId/user/userId url view
class DiaryOfTrip(generics.ListAPIView):
    serializer_class = DiarySerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

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
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

# api/todos/id/ url view
class TodoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

# api/todos/trip/tripId url view
class TodoOfTrip(generics.ListAPIView):
    serializer_class = TodoSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

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
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

# api/rules/id/ url view
class RuleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Rule.objects.all()
    serializer_class = RuleSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

# api/rules/trip/tripId url view
class RuleOfTrip(generics.ListAPIView):
    serializer_class = RuleSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

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
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    # override post method to check condition of sinceWhen and tilWhen
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            if serializer.validated_data['sinceWhen'] >= serializer.validated_data['tilWhen']:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return self.create(request,*args,**kwargs)

# api/schedules/id/ url view
class ScheduleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    # override put method to check condition of sinceWhen and tilWhen
    def put(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            if serializer.validated_data['sinceWhen'] >= serializer.validated_data['tilWhen']:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return self.update(request,*args,**kwargs)

# api/schedules/trip/tripId url view
class ScheduleOfTrip(generics.ListAPIView):
    serializer_class = ScheduleSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

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
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

# api/markers/id/ url view
class MarkerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Marker.objects.all()
    serializer_class = MarkerSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    
# api/markers/trip/tripId url view
class MarkerOfTrip(generics.ListAPIView):
    serializer_class = MarkerSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        """
        This view should return a list of all markers in tripId
        """

        tripId = self.kwargs['tripId']
        return Marker.objects.filter(tripID__id=tripId)

