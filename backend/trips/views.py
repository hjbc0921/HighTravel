from django.contrib.auth.models import User
from trips.models import Trip
from trips.serializers import TripSerializer
from rest_framework import generics
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

# trip/ url view
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


# trip/id/ url view
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

# user/ url view
class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# user/id url view
class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


#class Signin
#class Signout


# expense/ url view
class ExpenseList(generics.ListAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer


# expense/id/ url view
class ExpenseDetail(generics.RetrieveAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer


# photo/ url view
class PhotoList(generics.ListAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer


# photo/id/ url view
class PhotoDetail(generics.RetrieveAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer


# diary/ url view
class DiaryList(generics.ListAPIView):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer


# diary/id/ url view
class DiaryDetail(generics.RetrieveAPIView):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer


# todo/ url view
class TodoList(generics.ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


# todo/id/ url view
class TodoDetail(generics.RetrieveAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer



# rule/ url view
class RuleList(generics.ListAPIView):
    queryset = Rule.objects.all()
    serializer_class = RuleSerializer


# rule/id/ url view
class RuleDetail(generics.RetrieveAPIView):
    queryset = Rule.objects.all()
    serializer_class = RuleSerializer
    

# schedule/ url view
class ScheduleList(generics.ListAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer


# schedule/id/ url view
class ScheduleDetail(generics.RetrieveAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    

# marker/ url view
class MarkerList(generics.ListAPIView):
    queryset = Marker.objects.all()
    serializer_class = MarkerSerializer


# marker/id/ url view
class MarkerDetail(generics.RetrieveAPIView):
    queryset = Marker.objects.all()
    serializer_class = MarkerSerializer
    

