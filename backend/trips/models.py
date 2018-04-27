from django.db import models
from django.contrib.auth.models import User

class Trip(models.Model):
    title       = models.CharField(max_length=50)
    sinceWhen   = models.DateField()
    tilWhen     = models.DateField()
    users       = models.ManyToManyField(User)

class Budget(models.Model):
    contents    = models.CharField(max_length=50)
    money       = models.IntegerField()
    tripId      = models.ForeignKey(Trip,related_name="trip_budget",on_delete=models.CASCADE)

class Expense(models.Model):
    date        = models.DateField()
    contents    = models.CharField(max_length=50)
    money       = models.IntegerField()
    spender     = models.ForeignKey(User,related_name="spender",on_delete=models.CASCADE)
    tripID      = models.ForeignKey(Trip,related_name="trip_expense",on_delete=models.CASCADE)

class Diary(models.Model):
    contents    = models.TextField()
    writer      = models.ForeignKey(User,related_name="writer",on_delete=models.CASCADE)
    tripID      = models.ForeignKey(Trip,related_name="trip_diary",on_delete=models.CASCADE)
    date        = models.DateField()

class Photo(models.Model):
    contents    = models.TextField()
    image       = models.ImageField()
    folder      = models.CharField(max_length=20)
    date        = models.DateField()
    diaries     = models.ManyToManyField(Diary)
    tripID      = models.ForeignKey(Trip,related_name="trip_photo",on_delete=models.CASCADE)

class Todo(models.Model):
    contents    = models.CharField(max_length=200)
    tripID      = models.ForeignKey(Trip,related_name="trip_todo",on_delete=models.CASCADE)

class Rule(models.Model):
    contents    = models.CharField(max_length=200)
    tripID      = models.ForeignKey(Trip,related_name="trip_rule",on_delete=models.CASCADE)




