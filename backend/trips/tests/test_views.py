from django.test import TestCase
from django.test.utils import setup_test_environment
from django.contrib.auth.models import User
from trips.models import Trip, Budget, Expense, Diary, Photo, Todo, Rule, Schedule, Marker
from django.urls import reverse

def create_user(username, password):
    # Create user with the given username, password 
    return User.objects.create(username=username, password=password)


def create_trip(title, sinceWhen, tilWhen, creator):
    # Create trip with the given title, sinceWhen, tilWhen, creator
    return Trip.objects.create(title=title, sinceWhen=sinceWhen, tilWhen=tilWhen, creator=creator)

class TripListViewTest(TestCase):

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/trips/')
        self.assertEqual(resp.status_code, 200)

    def test_view_url_accessible_by_name(self):
        resp = self.client.get(reverse('trips'))
        self.assertEqual(resp.status_code, 200)

    # post check should be added


class TripDetailViewTest(TestCase):

    def test_no_trip(self):
        resp = self.client.get(reverse('trip-detail', args=(1,)))
        self.assertEqual(resp.status_code, 404)

    def test_get_trip_detail(self):
        admin = create_user(username="swpp1", password="High_Travel")
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator=admin)
        url = reverse('trip-detail', args=(new_trip.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)


class BudgetListViewTest(TestCase):

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/budgets/')
        self.assertEqual(resp.status_code, 200)

    def test_view_url_accessible_by_name(self):
        resp = self.client.get(reverse('budgets'))
        self.assertEqual(resp.status_code, 200)

    # post check should be added


class BudgetDetailViewTest(TestCase):

    def test_no_budget(self):
        resp = self.client.get(reverse('budget-detail', args=(1,)))
        self.assertEqual(resp.status_code, 404)

    def test_get_budget_detail(self):
        admin = create_user(username="swpp1", password="High_Travel")
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator=admin)
        new_budget = Budget.objects.create(contents="flight", money=100, tripID=new_trip)
        url = reverse('budget-detail', args=(new_budget.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)


class BudgetOfTripViewTest(TestCase):

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/budgets/trip/1/')
        self.assertEqual(resp.status_code, 200)

    def test_view_url_accessible_by_name(self):
        resp = self.client.get(reverse('budgets-of-trip', args=(1,)))
        self.assertEqual(resp.status_code, 200)


class ExpenseListViewTest(TestCase):

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/expenses/')
        self.assertEqual(resp.status_code, 200)

    def test_view_url_accessible_by_name(self):
        resp = self.client.get(reverse('expenses'))
        self.assertEqual(resp.status_code, 200)

    # post check should be added


class ExpenseDetailViewTest(TestCase):

    def test_no_diary(self):
        resp = self.client.get(reverse('expense-detail', args=(1,)))
        self.assertEqual(resp.status_code, 404)

    def test_get_expense_detail(self):
        admin = create_user(username="swpp1", password="High_Travel")
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator=admin)
        new_expense = Expense.objects.create(date="2018-05-27", contents="flight", money=100, spender=admin, tripID=new_trip)
        url = reverse('expense-detail', args=(new_expense.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)


class ExpenseOfTripViewTest(TestCase):

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/expenses/trip/1/')
        self.assertEqual(resp.status_code, 200)

    def test_view_url_accessible_by_name(self):
        resp = self.client.get(reverse('expenses-of-trip', args=(1,)))
        self.assertEqual(resp.status_code, 200)


class DiaryListViewTest(TestCase):

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/diaries/')
        self.assertEqual(resp.status_code, 200)

    def test_view_url_accessible_by_name(self):
        resp = self.client.get(reverse('diaries'))
        self.assertEqual(resp.status_code, 200)

    # post check should be added


class DiaryDetailViewTest(TestCase):

    def test_no_diary(self):
        resp = self.client.get(reverse('diary-detail', args=(1,)))
        self.assertEqual(resp.status_code, 404)

    def test_get_diary_detail(self):
        admin = create_user(username="swpp1", password="High_Travel")
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator=admin)
        new_diary = Diary.objects.create(date="2018-05-27", contents="First Day in Paris", writer=admin, tripID=new_trip)
        url = reverse('diary-detail', args=(new_diary.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)


class DiariesOfTripViewTest(TestCase):

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/diaries/trip/1/user/1/')
        self.assertEqual(resp.status_code, 200)

    def test_view_url_accessible_by_name(self):
        resp = self.client.get(reverse('diaries-of-trip-user', args=(1, 1)))
        self.assertEqual(resp.status_code, 200)


class PhotoListViewTest(TestCase):

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/photos/')
        self.assertEqual(resp.status_code, 200)

    def test_view_url_accessible_by_name(self):
        resp = self.client.get(reverse('photos'))
        self.assertEqual(resp.status_code, 200)

    # post check should be added


class PhotoDetailViewTest(TestCase):

    def test_no_photo(self):
        resp = self.client.get(reverse('photo-detail', args=(1,)))
        self.assertEqual(resp.status_code, 404)

    def test_get_photo_detail(self):
        admin = create_user(username="swpp1", password="High_Travel")
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator=admin)
        new_photo = Photo.objects.create(date="2018-05-27", contents="flight", folder="in cafe", tripID=new_trip)
        url = reverse('photo-detail', args=(new_photo.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)


class PhotoOfTripViewTest(TestCase):

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/photos/trip/1/')
        self.assertEqual(resp.status_code, 200)

    def test_view_url_accessible_by_name(self):
        resp = self.client.get(reverse('photos-of-trip', args=(1,)))
        self.assertEqual(resp.status_code, 200)


class TodoListViewTest(TestCase):

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/todos/')
        self.assertEqual(resp.status_code, 200)

    def test_view_url_accessible_by_name(self):
        resp = self.client.get(reverse('todos'))
        self.assertEqual(resp.status_code, 200)

    # post check should be added


class TodoDetailViewTest(TestCase):

    def test_no_todo(self):
        resp = self.client.get(reverse('todo-detail', args=(1,)))
        self.assertEqual(resp.status_code, 404)

    def test_get_todo_detail(self):
        admin = create_user(username="swpp1", password="High_Travel")
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator=admin)
        new_todo = Todo.objects.create(contents="flight", tripID=new_trip, done=False)
        url = reverse('todo-detail', args=(new_todo.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)


class TodoOfTripViewTest(TestCase):

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/todos/trip/1/')
        self.assertEqual(resp.status_code, 200)

    def test_view_url_accessible_by_name(self):
        resp = self.client.get(reverse('todos-of-trip', args=(1,)))
        self.assertEqual(resp.status_code, 200)


class RuleListViewTest(TestCase):

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/rules/')
        self.assertEqual(resp.status_code, 200)

    def test_view_url_accessible_by_name(self):
        resp = self.client.get(reverse('rules'))
        self.assertEqual(resp.status_code, 200)

    # post check should be added


class RuleDetailViewTest(TestCase):

    def test_no_rule(self):
        resp = self.client.get(reverse('rule-detail', args=(1,)))
        self.assertEqual(resp.status_code, 404)

    def test_get_rule_detail(self):
        admin = create_user(username="swpp1", password="High_Travel")
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator=admin)
        new_rule = Rule.objects.create(contents="flight", tripID=new_trip)
        url = reverse('rule-detail', args=(new_rule.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)


class RuleOfTripViewTest(TestCase):

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/rules/trip/1/')
        self.assertEqual(resp.status_code, 200)

    def test_view_url_accessible_by_name(self):
        resp = self.client.get(reverse('rules-of-trip', args=(1,)))
        self.assertEqual(resp.status_code, 200)


class ScheduleListViewTest(TestCase):

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/schedules/')
        self.assertEqual(resp.status_code, 200)

    def test_view_url_accessible_by_name(self):
        resp = self.client.get(reverse('schedules'))
        self.assertEqual(resp.status_code, 200)

    # post check should be added


class ScheduleDetailViewTest(TestCase):

    def test_no_schedule(self):
        resp = self.client.get(reverse('schedule-detail', args=(1,)))
        self.assertEqual(resp.status_code, 404)

    def test_get_schedule_detail(self):
        admin = create_user(username="swpp1", password="High_Travel")
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator=admin)
        new_schedule = Schedule.objects.create(sinceWhen="2018-05-27", tilWhen="2018-05-30", contents="stay in Paris", tripID=new_trip)
        url = reverse('schedule-detail', args=(new_schedule.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)


class ScheduleOfTripViewTest(TestCase):

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/schedules/trip/1/')
        self.assertEqual(resp.status_code, 200)

    def test_view_url_accessible_by_name(self):
        resp = self.client.get(reverse('schedules-of-trip', args=(1,)))
        self.assertEqual(resp.status_code, 200)


class MarkerListViewTest(TestCase):

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/markers/')
        self.assertEqual(resp.status_code, 200)

    def test_view_url_accessible_by_name(self):
        resp = self.client.get(reverse('markers'))
        self.assertEqual(resp.status_code, 200)

    # post check should be added


class MarkerDetailViewTest(TestCase):

    def test_no_marker(self):
        resp = self.client.get(reverse('marker-detail', args=(1,)))
        self.assertEqual(resp.status_code, 404)

    def test_get_marker_detail(self):
        admin = create_user(username="swpp1", password="High_Travel")
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator=admin)
        new_marker = Marker.objects.create(place="Eiffel Tower", tripID=new_trip)
        url = reverse('marker-detail', args=(new_marker.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)


class MarkerOfTripViewTest(TestCase):

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/markers/trip/1/')
        self.assertEqual(resp.status_code, 200)

    def test_view_url_accessible_by_name(self):
        resp = self.client.get(reverse('markers-of-trip', args=(1,)))
        self.assertEqual(resp.status_code, 200)

