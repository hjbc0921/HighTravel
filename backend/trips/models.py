from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

class Trip(models.Model):
    title       = models.CharField(max_length=50)
    sinceWhen   = models.DateField()
    tilWhen     = models.DateField()
    users       = models.ManyToManyField(User,related_name="my_trips")
    creator     = models.CharField(max_length=50)

class Budget(models.Model):
    contents    = models.CharField(max_length=50)
    money       = models.IntegerField()
    tripID      = models.ForeignKey(Trip,related_name="trip_budget",on_delete=models.CASCADE)

class Expense(models.Model):
    date        = models.DateField()
    contents    = models.CharField(max_length=50)
    money       = models.IntegerField()
    spender     = models.ForeignKey(User,related_name="spent",on_delete=models.CASCADE)
    tripID      = models.ForeignKey(Trip,related_name="trip_expense",on_delete=models.CASCADE)

class Diary(models.Model):
    contents    = models.TextField()
    writer      = models.ForeignKey(User,related_name="my_diary",on_delete=models.CASCADE)
    tripID      = models.ForeignKey(Trip,related_name="trip_diary",on_delete=models.CASCADE)
    date        = models.DateField()

class Folder(models.Model):
    name        = models.CharField(primary_key=True, max_length=30)
    tripID      = models.ForeignKey(Trip,related_name="trip_folder",on_delete=models.CASCADE)

class Photo(models.Model):
    image       = models.ImageField(blank=False,null=False)
    folder      = models.ForeignKey(Folder, related_name="photos_in_folder", on_delete=models.CASCADE)
    diaries     = models.ManyToManyField(Diary,related_name="photos", blank=True)
    tripID      = models.ForeignKey(Trip,related_name="trip_photo",on_delete=models.CASCADE)

class Todo(models.Model):
    contents    = models.CharField(max_length=200)
    tripID      = models.ForeignKey(Trip,related_name="trip_todo",on_delete=models.CASCADE)
    done        = models.BooleanField(default=False)

class Rule(models.Model):
    contents    = models.CharField(max_length=200)
    tripID      = models.ForeignKey(Trip,related_name="trip_rule",on_delete=models.CASCADE)

class Schedule(models.Model):
    sinceWhen   = models.DateField()
    tilWhen     = models.DateField()
    contents    = models.CharField(max_length=50)
    tripID      = models.ForeignKey(Trip,related_name="trip_schedule",on_delete=models.CASCADE)

class Marker(models.Model):
    place       = models.CharField(max_length=200)
    tripID      = models.ForeignKey(Trip,related_name="trip_marker",on_delete=models.CASCADE)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender,instance=None,created=False,**kwargs):
    if created:
        Token.objects.create(user=instance)

