from django.db import models
from django.contrib.auth.models import User

class Trip(models.Model):
    title       = models.CharField(max_length=50)
    sinceWhen   = models.DateField()
    tilWhen     = models.DateField()
    users       = models.ManyToManyField(User)
    #todoList    = models.ListField()
    #ruleList    = models.ListField()
    diary       = models.ForeignKey(Diary,related_name="diaries",on_delete=models.CASCADE) 
    photo       = models.ForeignKey(Photo,related_name="photos",on_delete=models.CASCADE)

class Expense(models.Model):
    date        = models.DateField()
    contents    = models.CharField(max_length=50)
    money       = models.IntegerField()
    spender     = models.ForeignKey(User,related_name="spender",on_delete=models.CASCADE)

class Diary(models.Model):
    contents    = models.TextField()
    onePhoto    = models.ForeignKey(Photo,related_name="onePhoto",on_delete=models.CASCADE)
    writer      = models.ForeignKey(User,related_name="writer",on_delete=models.CASCADE)
    date        = models.DateField()

class Photo(models.Model):
    contents    = models.TextField()
    image       = models.ImageField()
    folder      = models.CharField(max_length=20)
    date        = models.DateField()
    




