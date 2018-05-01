from django.contrib.auth.models import User
from rest_framework import serializers
from trips.models import *

class DiarySerializer(serializers.ModelSerializer):
    photos = serializers.PrimaryKeyRelatedField(many=True,queryset=Photo.objects.all())
    class Meta:
        model = Diary
        fields = ('id','contents','writer','date','tripID','photos')

class UserSerializer(serializers.ModelSerializer):
    my_trips    = serializers.PrimaryKeyRelatedField(many=True,queryset=Trip.objects.all())
    class Meta:
        model = User
        fields = ('id','username','password','spent','my_diary','my_trips')
    def create(self,validated_data):
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
class AddUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username')

class TripSerializer(serializers.ModelSerializer):
    users   = AddUserSerializer(read_only=True,many=True)
    class Meta:
        model = Trip
        fields = ('id','title','sinceWhen','tilWhen','users','trip_budget','trip_expense','trip_photo','trip_diary','trip_todo','trip_rule','trip_schedule','trip_marker')

class TripDetailSerializer(serializers.ModelSerializer):
    users = AddUserSerializer(many=True)
    class Meta:
        model = Trip
        fields = ('id','title','sinceWhen','tilWhen','users','trip_budget','trip_expense','trip_photo','trip_diary','trip_todo','trip_rule','trip_schedule','trip_marker')
    def update(self,instance,validated_data):
        instance.title = validated_data.get('title',instance.title)
        instance.sinceWhen = validated_data.get('sinceWhen',instance.sinceWhen)
        instance.tilWhen = validated_data.get('tilWhen',instance.tilWhen)
        '''
        users_list = []
        #instance.users.clear()
        users_data = validated_data.get('users')
        for user in users_data:
            userobj = User.objects.get(username=user["username"])
            instance.users.add(userobj)
        '''
        instance.save()
        return instance
    
class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ('id','contents','money','tripID')

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ('id','date','contents','money','spender','tripID')
 
class PhotoSerializer(serializers.ModelSerializer):
    diaries = DiarySerializer(read_only=True,many=True)
    class Meta:
        model = Photo
        fields = ('id','date','contents','folder','image','tripID','diaries')

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id','contents','tripID')

class RuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rule
        fields = ('id','contents','tripID')

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ('id','sinceWhen','tilWhen','contents','tripID')

class MarkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marker
        fields = ('id','place','tripID')


