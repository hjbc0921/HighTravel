from django.db import IntegrityError
from django.test import TestCase
from trips.models import create_auth_token
from trips.models import Trip, Budget, Expense, Diary, Photo, Todo, Rule, Schedule, Marker, Folder
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.db.models.signals import pre_save
from django.db.models.signals import post_save
from django.dispatch import receiver

class UserModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        user = User.objects.create(username="swpp1",password="High_Travel")

    def testcase(self):
        error = ""
        user1 = User.objects.get(id=1)
        try:
            self.token = Token.objects.create(user=user1)
        except IntegrityError as e :
            if 'UNIQUE constraint' in e.args[0]:
                error = "token already exists"
        self.assertEqual(error,"token already exists")
        
class TripModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        #Set up non-nodified objects used by all test methods
        admin = User.objects.create(username="swpp1", password="High_Travel")
        trip = admin.my_trips.create(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')

    def test_title_max_length(self):
        trip = Trip.objects.get(id=1)
        max_length = trip._meta.get_field('title').max_length
        self.assertEquals(max_length, 50)

    def test_creator_max_length(self):
        trip = Trip.objects.get(id=1)
        max_length = trip._meta.get_field('creator').max_length
        self.assertEquals(max_length, 50)


class BudgetModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        #Set up non-nodified objects used by all test methods
        admin = User.objects.create(username="swpp1", password="High_Travel")
        trip = admin.my_trips.create(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1') 
        budget = Budget.objects.create(contents="flight", money=100, tripID=trip)

    def test_contents_max_length(self):
        budget = Budget.objects.get(id=1)
        max_length = budget._meta.get_field('contents').max_length
        self.assertEquals(max_length, 50)


class ExpensetModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        #Set up non-nodified objects used by all test methods
        admin = User.objects.create(username="swpp1", password="High_Travel")
        trip = admin.my_trips.create(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1') 
        expense = Expense.objects.create(date="2018-05-27", contents="flight", money=100, tripID=trip, spender=admin)

    def test_contents_max_length(self):
        expense = Expense.objects.get(id=1)
        max_length = expense._meta.get_field('contents').max_length
        self.assertEquals(max_length, 50)


class FolderModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        #Set up non-nodified objects used by all test methods
        admin = User.objects.create(username="swpp1", password="High_Travel")
        trip = admin.my_trips.create(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1') 
        folder = Folder.objects.create(name="180301_cafe", tripID=trip)

    def test_folder_max_length(self):
        folder = Folder.objects.get(name="180301_cafe")
        max_length = folder._meta.get_field('name').max_length
        self.assertEquals(max_length, 30)


class PhotoModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        #Set up non-nodified objects used by all test methods
        admin = User.objects.create(username="swpp1", password="High_Travel")
        trip = admin.my_trips.create(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1') 
        folder = Folder.objects.create(name="180301_cafe", tripID=trip)
        photo = Photo.objects.create(tripID=trip, folder=folder)


class TodoModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        #Set up non-nodified objects used by all test methods
        admin = User.objects.create(username="swpp1", password="High_Travel")
        trip = admin.my_trips.create(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1') 
        todo = Todo.objects.create(contents="Go to Eiffel Tower", tripID=trip, done=False)

    def test_contents_max_length(self):
        todo = Todo.objects.get(id=1)
        max_length = todo._meta.get_field('contents').max_length
        self.assertEquals(max_length, 200)


class RuleModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        #Set up non-nodified objects used by all test methods
        admin = User.objects.create(username="swpp1", password="High_Travel")
        trip = admin.my_trips.create(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1') 
        rule = Rule.objects.create(contents="Wake up at 7AM", tripID=trip)

    def test_contents_max_length(self):
        rule = Rule.objects.get(id=1)
        max_length = rule._meta.get_field('contents').max_length
        self.assertEquals(max_length, 200)


class ScheduleModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        #Set up non-nodified objects used by all test methods
        admin = User.objects.create(username="swpp1", password="High_Travel")
        trip = admin.my_trips.create(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1') 
        schedule = Schedule.objects.create(sinceWhen="2018-05-27", tilWhen="2018-05-27", contents="In Paris", tripID=trip)

    def test_contents_max_length(self):
        schedule = Schedule.objects.get(id=1)
        max_length = schedule._meta.get_field('contents').max_length
        self.assertEquals(max_length, 50)


class MarkerModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        #Set up non-nodified objects used by all test methods
        admin = User.objects.create(username="swpp1", password="High_Travel")
        trip = admin.my_trips.create(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1') 
        marker = Marker.objects.create(place="EiffelTower", tripID=trip)

    def test_contents_max_length(self):
        marker = Marker.objects.get(id=1)
        max_length = marker._meta.get_field('place').max_length
        self.assertEquals(max_length, 200)
