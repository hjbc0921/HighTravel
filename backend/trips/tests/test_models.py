from django.db import IntegrityError
from django.test import TestCase
from trips.models import create_auth_token
from trips.models import Trip, Budget, Expense, Diary, Photo, Todo, Rule, Schedule, Marker
from django.conf import settings
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token

"""
class UserModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        print("setUpUserTestData: Run once to set up non-modified data for all class methods.")
        user = User.objects.create(username="swpp", password="HighTravel")
        print("you are here")
        user.save()

    def test_create_auth_token(self):
        user2 = User.objects.get(id=1)
        print("you are here")
        print(user2)
        #with self.assertRaises(Exception) as raised:
        token = create_auth_token(settings.AUTH_USER_MODEL, user2, True)
        self.assertEqual(token, "186daf7260b03b3ba6903206a08e3631f71791fb")
        self.assertEqual(IntegrityError, type(raised.exception))
"""


class TripModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        #Set up non-nodified objects used by all test methods
        admin = User.objects.create(username="swpp1", password="High_Travel")
        admin.save()
        trip = admin.my_trips.create(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator=admin) 
        trip.save()

    def test_title_max_length(self):
        trip = Trip.objects.get(id=1)
        max_length = trip._meta.get_field('title').max_length
        self.assertEquals(max_length, 50)


class BudgetModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        #Set up non-nodified objects used by all test methods
        admin = User.objects.create(username="swpp1", password="High_Travel")
        admin.save()
        trip = admin.my_trips.create(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator=admin) 
        trip.save()
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
        admin.save()
        trip = admin.my_trips.create(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator=admin) 
        trip.save()
        expense = Expense.objects.create(date="2018-05-27", contents="flight", money=100, tripID=trip, spender=admin)

    def test_contents_max_length(self):
        expense = Expense.objects.get(id=1)
        max_length = expense._meta.get_field('contents').max_length
        self.assertEquals(max_length, 50)


class PhotoModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        #Set up non-nodified objects used by all test methods
        admin = User.objects.create(username="swpp1", password="High_Travel")
        admin.save()
        trip = admin.my_trips.create(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator=admin) 
        trip.save()
        photo = Photo.objects.create(date="2018-05-27", contents="flight", tripID=trip, folder="cafe")
        #photo = Photo.objects.create(date="2018-05-27", contents="flight", image=SimpleUploadFile(name="test_image.jpg", content=open(image_path, "rb").read(), content_type="image/jpeg"), tripID=trip)

    def test_contents_max_length(self):
        photo = Photo.objects.get(id=1)
        max_length = photo._meta.get_field('folder').max_length
        self.assertEquals(max_length, 20)


class TodoModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        #Set up non-nodified objects used by all test methods
        admin = User.objects.create(username="swpp1", password="High_Travel")
        admin.save()
        trip = admin.my_trips.create(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator=admin) 
        trip.save()
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
        admin.save()
        trip = admin.my_trips.create(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator=admin) 
        trip.save()
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
        admin.save()
        trip = admin.my_trips.create(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator=admin) 
        trip.save()
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
        admin.save()
        trip = admin.my_trips.create(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator=admin) 
        trip.save()
        marker = Marker.objects.create(place="EiffelTower", tripID=trip)

    def test_contents_max_length(self):
        marker = Marker.objects.get(id=1)
        max_length = marker._meta.get_field('place').max_length
        self.assertEquals(max_length, 200)
