import os
from django.test import TestCase
from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from trips.models import Trip, Budget, Expense, Diary, Photo, Todo, Rule, Schedule, Marker, Folder
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

    def test_post_trip(self):
        user = create_user(username='swpp1', password='High_Travel')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        # Bad Request Check (sinceWhen < tilWhen)
        resp = client.post(reverse('trips'), {'title': 'Europe', 'sinceWhen': '2018-09-27', 'tilWhen': '2018-06-27', 'creator': 'swpp1'})
        self.assertEqual(resp.status_code, 400)
        resp = client.post(reverse('trips'), {'title': 'Europe', 'sinceWhen': '2018-05-27', 'tilWhen': '2018-06-27', 'creator': 'swpp1'})
        self.assertEqual(resp.status_code, 201)


class TripDetailViewTest(TestCase):

    def test_no_trip(self):
        resp = self.client.get(reverse('trip-detail', args=(1,)))
        self.assertEqual(resp.status_code, 404)

    def test_get_trip_detail(self):
        user = create_user(username="swpp1", password="High_Travel")
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        url = reverse('trip-detail', args=(new_trip.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_patch_trip(self):
        user = create_user(username='swpp1', password='High_Travel')
        user2 = create_user(username='swpp2', password='HighTravel')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('trips'), {'title': 'Europe', 'sinceWhen': '2018-05-27', 'tilWhen': '2018-06-27', 'creator': 'swpp1'})
        self.assertEqual(resp.status_code, 201)

        # patch for change trip users (add) // it would be done by admin user
        resp = client.patch(reverse('trip-detail', args=(1,)), {'users': [user.id, user2.id]})
        self.assertEqual(resp.status_code, 200)

        # patch for change trip users (delete) // it would be done by admin user
        resp = client.patch(reverse('trip-detail', args=(1,)), {'users': [1]})
        self.assertEqual(resp.status_code, 200)

        # patch for change trip title
        resp = client.patch(reverse('trip-detail', args=(1,)), {'title': 'Osaka'})
        self.assertEqual(resp.status_code, 200)

        # patch with valid date
        resp = client.patch(reverse('trip-detail', args=(1,)), {'sinceWhen': '2018-03-27', 'tilWhen': '2018-05-27'})
        self.assertEqual(resp.status_code, 200)

        # invalid date is not checked...
        resp = client.patch(reverse('trip-detail', args=(1,)), {'sinceWhen': '2018-09-27'})
        #self.assertEqual(resp.status_code, 400)
        resp = client.patch(reverse('trip-detail', args=(1,)), {'tilWhen': '2018-02-27'})
        #self.assertEqual(resp.status_code, 400)

    def test_put_trip(self):
        user = create_user(username='swpp1', password='High_Travel')
        user2 = create_user(username='swpp2', password='HighTravel')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('trips'), {'title': 'Europe', 'sinceWhen': '2018-05-27', 'tilWhen': '2018-06-27', 'creator': 'swpp1'})
        self.assertEqual(resp.status_code, 201)
        data = resp.data
        data['users'] = [user.id] 

        # 200 Response after title changed
        title_changed = data.copy()
        title_changed['title'] = 'Osaka'
        resp = client.put(reverse('trip-detail', args=(1,)), title_changed)
        self.assertEqual(resp.status_code, 200)

        # 400 Response when invalid sinceWhen ( > tilWhen ) given
        invalid_sinceWhen = data.copy()
        invalid_sinceWhen['sinceWhen'] = '2018-09-27'
        resp = client.put(reverse('trip-detail', args=(1,)), invalid_sinceWhen)
        self.assertEqual(resp.status_code, 400)

        # 400 Response when invalid tilWhen ( < sinceWhen ) given
        invalid_tilWhen = data.copy()
        invalid_tilWhen['tilWhen'] = '2018-02-27'
        resp = client.put(reverse('trip-detail', args=(1,)), invalid_tilWhen)
        self.assertEqual(resp.status_code, 400)

        # 200 Response when valid tilWhen & sinceWhen given (both data is changed & valid)
        valid_date = data.copy()
        valid_date['sinceWhen'] = '2018-03-27'
        valid_date['tilWhen'] = '2018-05-27'
        resp = client.put(reverse('trip-detail', args=(1,)), valid_date)
        self.assertEqual(resp.status_code, 200)

        # 200 Response after user is added / deleted in trip
        user_added = data.copy()
        user_added['users'] = [user.id, user2.id]
        resp = client.put(reverse('trip-detail', args=(1,)), user_added)
        self.assertEqual(resp.status_code, 200)
        user_deleted = data.copy()
        user_deleted['users'] = [user.id]
        resp = client.put(reverse('trip-detail', args=(1,)), user_deleted)
        self.assertEqual(resp.status_code, 200)

    def test_delete_trip(self):
        user = create_user(username='swpp1', password='High_Travel')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('trips'), {'title': 'Europe', 'sinceWhen': '2018-05-27', 'tilWhen': '2018-06-27', 'creator': 'swpp1'})
        self.assertEqual(resp.status_code, 201)
        resp = client.delete(reverse('trip-detail', args=(1,)))
        self.assertEqual(resp.status_code, 204)


class AddUserViewTest(TestCase):

    def test_post_user(self):
        resp = self.client.post(reverse('adduser'), {'username': 'swpp', 'password': 'High_Travel'})
        self.assertEqual(resp.status_code, 201)

class UserListViewTest(TestCase):

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/users/')
        self.assertEqual(resp.status_code, 200)

    def test_view_url_accessible_by_name(self):
        resp = self.client.get(reverse('users'))
        self.assertEqual(resp.status_code, 200)


class UserDetailViewTest(TestCase):

    def test_no_user(self):
        resp = self.client.get(reverse('user-detail', args=(1,)))
        self.assertEqual(resp.status_code, 404)

    def test_get_user_detail(self):
        user = create_user(username="swpp1", password="High_Travel")
        url = reverse('user-detail', args=(user.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_patch_user(self):
        user = create_user(username='swpp1', password='High_Travel')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        
        # patch for change user username
        resp = client.patch(reverse('user-detail', args=(1,)), {'username': 'SWPP'})
        self.assertEqual(resp.status_code, 200)

        # patch for change user password
        resp = client.patch(reverse('user-detail', args=(1,)), {'password': 'hightravel'})
        self.assertEqual(resp.status_code, 200)

    def test_put_user(self):
        resp = self.client.post(reverse('adduser'), {'username': 'swpp', 'password': 'High_Travel'})
        self.assertEqual(resp.status_code, 201)
        token = Token.objects.get(user__username='swpp')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        data = resp.data

        # 200 Response after username changed
        username_changed = data.copy()
        username_changed['username'] = 'SWPP'
        resp = client.put(reverse('user-detail', args=(1,)), username_changed)
        self.assertEqual(resp.status_code, 200)

        # 200 Response after password changed 
        password_changed = data.copy()
        password_changed['password'] = 'hightravel'
        resp = client.put(reverse('user-detail', args=(1,)), password_changed)
        self.assertEqual(resp.status_code, 200)

    def test_delete_user(self):
        user = create_user(username='swpp1', password='High_Travel')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.delete(reverse('user-detail', args=(1,)))
        self.assertEqual(resp.status_code, 204)

class BudgetListViewTest(TestCase):

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/budgets/')
        self.assertEqual(resp.status_code, 200)

    def test_view_url_accessible_by_name(self):
        resp = self.client.get(reverse('budgets'))
        self.assertEqual(resp.status_code, 200)

    def test_post_budget(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('budgets'), {'contents': 'flight', 'money': 100, 'tripID': new_trip.id})
        self.assertEqual(resp.status_code, 201)


class BudgetDetailViewTest(TestCase):

    def test_no_budget(self):
        resp = self.client.get(reverse('budget-detail', args=(1,)))
        self.assertEqual(resp.status_code, 404)

    def test_get_budget_detail(self):
        user = create_user(username="swpp1", password="High_Travel")
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        new_budget = Budget.objects.create(contents="flight", money=100, tripID=new_trip)
        url = reverse('budget-detail', args=(new_budget.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_patch_budget(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('budgets'), {'contents': 'flight', 'money': 100, 'tripID': new_trip.id})
        self.assertEqual(resp.status_code, 201)
        
        # patch for change budget contents
        resp = client.patch(reverse('budget-detail', args=(1,)), {'contents': 'Entrance fee'})
        self.assertEqual(resp.status_code, 200)

        # patch for change budget money
        resp = client.patch(reverse('budget-detail', args=(1,)), {'money': 10})

    def test_put_budget(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('budgets'), {'contents': 'flight', 'money': 100, 'tripID': new_trip.id})
        self.assertEqual(resp.status_code, 201)
        data = resp.data

        # 200 Response after contents changed
        contents_changed = data.copy()
        contents_changed['contents'] = 'Entrance fee'
        resp = client.put(reverse('budget-detail', args=(1,)), contents_changed)
        self.assertEqual(resp.status_code, 200)

        # 200 Response after money changed 
        money_changed = data.copy()
        money_changed['money'] = 10
        resp = client.put(reverse('budget-detail', args=(1,)), money_changed)
        self.assertEqual(resp.status_code, 200)

    def test_delete_budget(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('budgets'), {'contents': 'flight', 'money': 100, 'tripID': new_trip.id})
        self.assertEqual(resp.status_code, 201)
        resp = client.delete(reverse('budget-detail', args=(1,)))
        self.assertEqual(resp.status_code, 204)


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

    def test_post_expense(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('expenses'), {'date': '2018-05-27', 'contents': 'flight', 'money': 100, 'tripID': new_trip.id, 'spender': user.id})
        self.assertEqual(resp.status_code, 201)



class ExpenseDetailViewTest(TestCase):

    def test_no_diary(self):
        resp = self.client.get(reverse('expense-detail', args=(1,)))
        self.assertEqual(resp.status_code, 404)

    def test_get_expense_detail(self):
        user = create_user(username="swpp1", password="High_Travel")
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        new_expense = Expense.objects.create(date="2018-05-27", contents="flight", money=100, spender=user, tripID=new_trip)
        url = reverse('expense-detail', args=(new_expense.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_patch_expense(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('expenses'), {'contents': 'flight', 'money': 100, 'tripID': new_trip.id, 'spender': user.id, 'date': '2018-05-27'})
        self.assertEqual(resp.status_code, 201)
        
        # patch for change expense date
        resp = client.patch(reverse('expense-detail', args=(1,)), {'date': '2018-05-28'})
        self.assertEqual(resp.status_code, 200)
        
        # patch for change expense contents
        resp = client.patch(reverse('expense-detail', args=(1,)), {'contents': 'Entrance fee'})
        self.assertEqual(resp.status_code, 200)

        # patch for change expense money
        resp = client.patch(reverse('expense-detail', args=(1,)), {'money': 10})
        self.assertEqual(resp.status_code, 200)

    def test_put_expense(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('expenses'), {'contents': 'flight', 'money': 100, 'tripID': new_trip.id, 'spender': user.id, 'date': '2018-05-27'})
        self.assertEqual(resp.status_code, 201)
        data = resp.data

        # 200 Response after date changed
        date_changed = data.copy()
        date_changed['date'] = '2018-05-28'
        resp = client.put(reverse('expense-detail', args=(1,)), date_changed)
        self.assertEqual(resp.status_code, 200)

        # 200 Response after contents changed
        contents_changed = data.copy()
        contents_changed['contents'] = 'Entrance fee'
        resp = client.put(reverse('expense-detail', args=(1,)), contents_changed)
        self.assertEqual(resp.status_code, 200)

        # 200 Response after money changed 
        money_changed = data.copy()
        money_changed['money'] = 10
        resp = client.put(reverse('expense-detail', args=(1,)), money_changed)
        self.assertEqual(resp.status_code, 200)

    def test_delete_expense(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('expenses'), {'contents': 'flight', 'money': 100, 'tripID': new_trip.id, 'spender': user.id, 'date': '2018-05-27'})
        self.assertEqual(resp.status_code, 201)
        resp = client.delete(reverse('expense-detail', args=(1,)))
        self.assertEqual(resp.status_code, 204)


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

    def test_post_diary(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('diaries'), {'date': '2018-05-27', 'contents': 'First Day in Paris', 'tripID': new_trip.id, 'writer': user.id})
        self.assertEqual(resp.status_code, 201)



class DiaryDetailViewTest(TestCase):

    def test_no_diary(self):
        resp = self.client.get(reverse('diary-detail', args=(1,)))
        self.assertEqual(resp.status_code, 404)

    def test_get_diary_detail(self):
        user = create_user(username="swpp1", password="High_Travel")
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        new_diary = Diary.objects.create(date="2018-05-27", contents="First Day in Paris", writer=user, tripID=new_trip)
        url = reverse('diary-detail', args=(new_diary.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_patch_diary(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('diaries'), {'contents': 'First Day in Paris', 'tripID': new_trip.id, 'writer': user.id, 'date': '2018-05-27'})
        self.assertEqual(resp.status_code, 201)
        
        # patch for change diary date
        resp = client.patch(reverse('diary-detail', args=(1,)), {'date': '2018-05-28'})
        self.assertEqual(resp.status_code, 200)
        
        # patch for change diary contents
        resp = client.patch(reverse('diary-detail', args=(1,)), {'contents': 'Second day in Paris'})
        self.assertEqual(resp.status_code, 200)

    def test_put_diary(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('diaries'), {'contents': 'First Day in Paris', 'tripID': new_trip.id, 'writer': user.id, 'date': '2018-05-27'})
        self.assertEqual(resp.status_code, 201)
        data = resp.data

        # 200 Response after date changed
        date_changed = data.copy()
        date_changed['date'] = '2018-05-28'
        resp = client.put(reverse('diary-detail', args=(1,)), date_changed)
        self.assertEqual(resp.status_code, 200)

        # 200 Response after contents changed
        contents_changed = data.copy()
        contents_changed['contents'] = 'Second Day in Paris'
        resp = client.put(reverse('diary-detail', args=(1,)), contents_changed)
        self.assertEqual(resp.status_code, 200)

    def test_delete_diary(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('diaries'), {'contents': 'First Day in Paris', 'tripID': new_trip.id, 'writer': user.id, 'date': '2018-05-27'})
        self.assertEqual(resp.status_code, 201)
        resp = client.delete(reverse('diary-detail', args=(1,)))
        self.assertEqual(resp.status_code, 204)

class DiariesOfTripViewTest(TestCase):

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/diaries/trip/1/user/1/')
        self.assertEqual(resp.status_code, 200)

    def test_view_url_accessible_by_name(self):
        resp = self.client.get(reverse('diaries-of-trip-user', args=(1, 1)))
        self.assertEqual(resp.status_code, 200)


class FolderListViewTest(TestCase):

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/folders/')
        self.assertEqual(resp.status_code, 200)

    def test_view_url_accessible_by_name(self):
        resp = self.client.get(reverse('folders'))
        self.assertEqual(resp.status_code, 200)

    def test_post_folder(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('folders'), {'name': '20180101_Paris', 'tripID': new_trip.id, 'done': False})
        self.assertEqual(resp.status_code, 201)


class FolderDetailViewTest(TestCase):

    def test_no_folder(self):
        resp = self.client.get(reverse('folder-detail', args=(1,)))
        self.assertEqual(resp.status_code, 404)

    def test_get_folder_detail(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        new_folder = Folder.objects.create(name="20180101_Paris", tripID=new_trip)
        url = reverse('folder-detail', args=(new_folder.name,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_patch_folder(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('folders'), {'name': '20180101_Paris', 'tripID': new_trip.id, 'done': False})
        self.assertEqual(resp.status_code, 201)
        
        # patch for change folder name
        resp = client.patch(reverse('folder-detail', args=('20180101_Paris',)), {'name': '20180102_Paris'})
        self.assertEqual(resp.status_code, 200)
        
    def test_put_folder(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('folders'), {'name': '20180101_Paris', 'tripID': new_trip.id, 'done': False})
        self.assertEqual(resp.status_code, 201)
        self.assertEqual(resp.status_code, 201)
        data = resp.data

        # 200 Response after name changed
        name_changed = data.copy()
        name_changed['name'] = "20180102_Paris"
        resp = client.put(reverse('folder-detail', args=("20180101_Paris",)), name_changed)
        self.assertEqual(resp.status_code, 200)

    def test_delete_folder(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('folders'), {'name': '20180101_Paris', 'tripID': new_trip.id, 'done': False})
        self.assertEqual(resp.status_code, 201)
        resp = client.delete(reverse('folder-detail', args=("20180101_Paris",)))
        self.assertEqual(resp.status_code, 204)


class FolderOfTripViewTest(TestCase):

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/folders/trip/1/')
        self.assertEqual(resp.status_code, 200)

    def test_view_url_accessible_by_name(self):
        resp = self.client.get(reverse('folders-of-trip', args=(1,)))
        self.assertEqual(resp.status_code, 200)

class PhotoListViewTest(TestCase):

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/photos/')
        self.assertEqual(resp.status_code, 200)

    def test_view_url_accessible_by_name(self):
        resp = self.client.get(reverse('photos'))
        self.assertEqual(resp.status_code, 200)

    def test_post_photo(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        new_folder = Folder.objects.create(name='180301_cafe', tripID=new_trip)
        new_diary = Diary.objects.create(date="2018-05-27", contents="First Day in Paris", writer=user, tripID=new_trip)
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        image = SimpleUploadedFile(name='test_image_new.jpg', content=open('./test_image.jpg', 'rb').read(), content_type='image/jpeg')
        resp = client.post(reverse('photos'), {'file': image, 'tripID': new_trip.id, 'folder': new_folder.name, 'diaries': [new_diary.id]})
        self.assertEqual(resp.status_code, 201)


class PhotoDetailViewTest(TestCase):

    def test_no_photo(self):
        resp = self.client.get(reverse('photo-detail', args=(1,)))
        self.assertEqual(resp.status_code, 404)

    def test_get_photo_detail(self):
        user = create_user(username="swpp1", password="High_Travel")
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        new_folder = Folder.objects.create(name='180301_cafe', tripID=new_trip)
        new_photo = Photo.objects.create(folder=new_folder, tripID=new_trip)
        url = reverse('photo-detail', args=(new_photo.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_delete_photo(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        new_diary = Diary.objects.create(date="2018-05-27", contents="First Day in Paris", writer=user, tripID=new_trip)
        new_folder = Folder.objects.create(name='180301_cafe', tripID=new_trip)
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        image = SimpleUploadedFile(name='test_image_new.jpg', content=open('./test_image.jpg', 'rb').read(), content_type='image/jpeg')
        resp = client.post(reverse('photos'), {'file': image, 'tripID': new_trip.id, 'folder': new_folder.name, 'diaries': [new_diary.id]})
        self.assertEqual(resp.status_code, 201)
        resp = client.delete(reverse('photo-detail', args=(1,)))
        self.assertEqual(resp.status_code, 204)


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

    def test_post_todo(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('todos'), {'contents': 'Go to Eiffel Tower', 'tripID': new_trip.id, 'done': False})
        self.assertEqual(resp.status_code, 201)



class TodoDetailViewTest(TestCase):

    def test_no_todo(self):
        resp = self.client.get(reverse('todo-detail', args=(1,)))
        self.assertEqual(resp.status_code, 404)

    def test_get_todo_detail(self):
        user = create_user(username="swpp1", password="High_Travel")
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        new_todo = Todo.objects.create(contents="flight", tripID=new_trip, done=False)
        url = reverse('todo-detail', args=(new_todo.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_patch_todo(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('todos'), {'contents': 'Go to Eiffel Tower', 'tripID': new_trip.id, 'done': False})
        self.assertEqual(resp.status_code, 201)
        
        # patch for change todo done
        resp = client.patch(reverse('todo-detail', args=(1,)), {'done': False})
        self.assertEqual(resp.status_code, 200)
        
        # patch for change todo contents
        resp = client.patch(reverse('todo-detail', args=(1,)), {'contents': 'Go to Guell Park'})
        self.assertEqual(resp.status_code, 200)

    def test_put_todo(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('todos'), {'contents': 'Go to Eiffel Tower', 'tripID': new_trip.id, 'done': False})
        self.assertEqual(resp.status_code, 201)
        self.assertEqual(resp.status_code, 201)
        data = resp.data

        # 200 Response after done changed
        done_changed = data.copy()
        done_changed['done'] = True
        resp = client.put(reverse('todo-detail', args=(1,)), done_changed)
        self.assertEqual(resp.status_code, 200)

        # 200 Response after contents changed
        contents_changed = data.copy()
        contents_changed['contents'] = 'Go to Guell Park'
        resp = client.put(reverse('todo-detail', args=(1,)), contents_changed)
        self.assertEqual(resp.status_code, 200)

    def test_delete_todo(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('todos'), {'contents': 'Go to Eiffel Tower', 'tripID': new_trip.id, 'done': False})
        self.assertEqual(resp.status_code, 201)
        resp = client.delete(reverse('todo-detail', args=(1,)))
        self.assertEqual(resp.status_code, 204)


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

    def test_post_rule(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('rules'), {'contents': 'Wake up at 7AM', 'tripID': new_trip.id})
        self.assertEqual(resp.status_code, 201)


class RuleDetailViewTest(TestCase):

    def test_no_rule(self):
        resp = self.client.get(reverse('rule-detail', args=(1,)))
        self.assertEqual(resp.status_code, 404)

    def test_get_rule_detail(self):
        user = create_user(username="swpp1", password="High_Travel")
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        new_rule = Rule.objects.create(contents="flight", tripID=new_trip)
        url = reverse('rule-detail', args=(new_rule.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_patch_rule(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('rules'), {'contents': 'Wake up at 7AM', 'tripID': new_trip.id})
        self.assertEqual(resp.status_code, 201)
        
        # patch for change rule contents
        resp = client.patch(reverse('rule-detail', args=(1,)), {'contents': 'Sleep before 11:30PM'})
        self.assertEqual(resp.status_code, 200)

    def test_put_rule(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('rules'), {'contents': 'Wake up at 7AM', 'tripID': new_trip.id})
        self.assertEqual(resp.status_code, 201)
        data = resp.data

        # 200 Response after contents changed
        contents_changed = data.copy()
        contents_changed['contents'] = 'sleep before 11:30PM'
        resp = client.put(reverse('rule-detail', args=(1,)), contents_changed)
        self.assertEqual(resp.status_code, 200)

    def test_delete_rule(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('rules'), {'contents': 'Wake up at 7AM', 'tripID': new_trip.id})
        self.assertEqual(resp.status_code, 201)
        resp = client.delete(reverse('rule-detail', args=(1,)))
        self.assertEqual(resp.status_code, 204)


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

    def test_post_schedule(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('schedules'), {'sinceWhen': '2018-05-27', 'tilWhen': '2018-06-27', 'contents': 'stay in Paris', 'tripID': new_trip.id})
        self.assertEqual(resp.status_code, 201)



class ScheduleDetailViewTest(TestCase):

    def test_no_schedule(self):
        resp = self.client.get(reverse('schedule-detail', args=(1,)))
        self.assertEqual(resp.status_code, 404)

    def test_get_schedule_detail(self):
        user = create_user(username="swpp1", password="High_Travel")
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        new_schedule = Schedule.objects.create(sinceWhen="2018-05-27", tilWhen="2018-05-30", contents="stay in Paris", tripID=new_trip)
        url = reverse('schedule-detail', args=(new_schedule.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_patch_schedule(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('schedules'), {'sinceWhen': '2018-05-27', 'tilWhen': '2018-06-27', 'contents': 'stay in Paris', 'tripID': new_trip.id})
        self.assertEqual(resp.status_code, 201)
        
        # patch for change schedule contents
        resp = client.patch(reverse('schedule-detail', args=(1,)), {'contents': 'stay in Rome'})
        self.assertEqual(resp.status_code, 200)

        # patch with valid date
        resp = client.patch(reverse('schedule-detail', args=(1,)), {'sinceWhen': '2018-03-27', 'tilWhen': '2018-05-27'})
        self.assertEqual(resp.status_code, 200)

        # invalid date is not checked...
        # patch for change schedule sinceWhen
        resp = client.patch(reverse('schedule-detail', args=(1,)), {'sinceWhen': '2018-05-28'})
        #self.assertEqual(resp.status_code, 400)
        # patch for change schedule tilWhen
        resp = client.patch(reverse('schedule-detail', args=(1,)), {'tilWhen': '2018-04-29'})
        #self.assertEqual(resp.status_code, 400)

    def test_put_schedule(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('schedules'), {'sinceWhen': '2018-05-27', 'tilWhen': '2018-06-27', 'contents': 'stay in Paris', 'tripID': new_trip.id})
        self.assertEqual(resp.status_code, 201)
        data = resp.data

        # 200 Response after contents changed
        contents_changed = data.copy()
        contents_changed['contents'] = 'stay in Rome'
        resp = client.put(reverse('schedule-detail', args=(1,)), contents_changed)
        self.assertEqual(resp.status_code, 200)

        # 200 Response after date changed
        date_changed = data.copy()
        date_changed['date'] = '2018-05-28'
        resp = client.put(reverse('schedule-detail', args=(1,)), date_changed)
        self.assertEqual(resp.status_code, 200)

        # 400 Response when invalid sinceWhen ( > tilWhen ) given
        invalid_sinceWhen = data.copy()
        invalid_sinceWhen['sinceWhen'] = '2018-09-27'
        resp = client.put(reverse('schedule-detail', args=(1,)), invalid_sinceWhen)
        self.assertEqual(resp.status_code, 400)

        # 400 Response when invalid tilWhen ( < sinceWhen ) given
        invalid_tilWhen = data.copy()
        invalid_tilWhen['tilWhen'] = '2018-02-27'
        resp = client.put(reverse('schedule-detail', args=(1,)), invalid_tilWhen)
        self.assertEqual(resp.status_code, 400)

    def test_delete_expense(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('schedules'), {'sinceWhen': '2018-05-27', 'tilWhen': '2018-06-27', 'contents': 'stay in Paris', 'tripID': new_trip.id})
        self.assertEqual(resp.status_code, 201)
        resp = client.delete(reverse('schedule-detail', args=(1,)))
        self.assertEqual(resp.status_code, 204)


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

    def test_post_marker(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('markers'), {'place': 'EiffelTower', 'tripID': new_trip.id})
        self.assertEqual(resp.status_code, 201)



class MarkerDetailViewTest(TestCase):

    def test_no_marker(self):
        resp = self.client.get(reverse('marker-detail', args=(1,)))
        self.assertEqual(resp.status_code, 404)

    def test_get_marker_detail(self):
        user = create_user(username="swpp1", password="High_Travel")
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        new_marker = Marker.objects.create(place="Eiffel Tower", tripID=new_trip)
        url = reverse('marker-detail', args=(new_marker.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_patch_marker(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('markers'), {'place': 'EiffelTower', 'tripID': new_trip.id})
        self.assertEqual(resp.status_code, 201)
        
        # patch for change marker place
        resp = client.patch(reverse('marker-detail', args=(1,)), {'place': 'Guell Park'})
        self.assertEqual(resp.status_code, 200)
        
    def test_put_expense(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('markers'), {'place': 'EiffelTower', 'tripID': new_trip.id})
        self.assertEqual(resp.status_code, 201)
        data = resp.data

        # 200 Response after place changed
        place_changed = data.copy()
        place_changed['place'] = 'Guel Park'
        resp = client.put(reverse('marker-detail', args=(1,)), place_changed)
        self.assertEqual(resp.status_code, 200)

    def test_delete_marker(self):
        user = create_user(username='swpp1', password='High_Travel')
        new_trip = create_trip(title="Europe", sinceWhen="2018-05-27", tilWhen="2018-06-27", creator='swpp1')
        token = Token.objects.get(user__username='swpp1')
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = client.post(reverse('markers'), {'place': 'EiffelTower', 'tripID': new_trip.id})
        self.assertEqual(resp.status_code, 201)
        resp = client.delete(reverse('marker-detail', args=(1,)))
        self.assertEqual(resp.status_code, 204)


class MarkerOfTripViewTest(TestCase):

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/markers/trip/1/')
        self.assertEqual(resp.status_code, 200)

    def test_view_url_accessible_by_name(self):
        resp = self.client.get(reverse('markers-of-trip', args=(1,)))
        self.assertEqual(resp.status_code, 200)
