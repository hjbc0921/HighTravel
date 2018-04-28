from django.contrib.auth.models import User
from rest_framework import serializers
from trips.models import *

class TripSerializer(serializers.ModelSerializer):
    trip_budget     = PrimaryKeyRelatedField(many=True)
    trip_expense    = PrimaryKeyRelatedField(many=True)
    trip_photo      = PrimaryKeyRelatedField(many=True)
    trip_diary      = PrimaryKeyRelatedField(many=True)
    trip_todo       = PrimaryKeyRelatedField(many=True)
    trip_rule       = PrimaryKeyRelatedField(many=True)
    trip_schedule   = PrimaryKeyRelatedField(many=True)
    trip_marker     = PrimaryKeyRelatedField(many=True)
    #users   = PrimaryKeyRelatedField(many=True)
    class Meta:
        model = Trip
        fields = ('id','title','sinceWhen','tilWhen','users','trip_budget','trip_expense','trip_photo','trip_diary','trip_todo','trip_rule','trip_schedule','trip_marker')

        
class UserSerializer(serializers.ModelSerializer):
    spent       = PrimaryKeyRelatedField(many=True)
    my_diary    = PrimaryKeyRelatedField(many=True)
    class Meta:
        model = User
        fields = ('id','username','password','spent','my_diary')
    def create(self,validated_data):
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ('id','contents','money','tripId')

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ('id','date','contents','money','spender','tripId')
 
class PhotoSerializer(serializers.ModelSerializer):
    #diaries = PrimaryKeyRelatedField(many=True)
    class Meta:
        model = Photo
        fields = ('id','date','contents','folder','image','tripId','diaries')

class DiarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary
        fields = ('id','contents','writer','date','tripId')

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id','contents','tripId')

class RuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rule
        fields = ('id','contents','tripId')

class ScheduleSerializer(serializer.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ('id','sinceWhen','tilWhen','contents','tripId')

class MarkerSerializer(serializer.ModelSerializer):
    class Meta:
        model = Marder
        fields = ('id','place','tripId')
