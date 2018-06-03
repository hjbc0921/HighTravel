from django.conf.urls import url
from django.urls import path
from trips import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^trips/$',views.TripList.as_view(), name='trips'),
    url(r'^trips/(?P<pk>[0-9]+)/$', views.TripDetail.as_view(), name='trip-detail'),
    url(r'^users/$',views.UserList.as_view(), name='users'),
    url(r'^addusers/',views.UserRegister.as_view(), name='adduser'),
    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view(), name='user-detail'),
    url(r'^budgets/$',views.BudgetList.as_view(), name='budgets'),
    url(r'^budgets/(?P<pk>[0-9]+)/$', views.BudgetDetail.as_view(), name='budget-detail'),
    path('budgets/trip/<int:tripId>/', views.BudgetOfTrip.as_view(), name='budgets-of-trip'),
    url(r'^expenses/$',views.ExpenseList.as_view(), name='expenses'),
    url(r'^expenses/(?P<pk>[0-9]+)/$', views.ExpenseDetail.as_view(), name='expense-detail'),
    path('expenses/trip/<int:tripId>/', views.ExpenseOfTrip.as_view(), name='expenses-of-trip'),
    url(r'^folders/$',views.FolderList.as_view(), name='folders'),
    url(r'^folders/(?P<pk>\w+)/$', views.FolderDetail.as_view(), name='folder-detail'),
    path('folders/trip/<int:tripId>/', views.FolderOfTrip.as_view(), name='folders-of-trip'),
    url(r'^photos/$',views.PhotoList.as_view(), name='photos'),
    url(r'^photos/(?P<pk>[0-9]+)/$', views.PhotoDetail.as_view(), name='photo-detail'),
    path('photos/trip/<int:tripId>/', views.PhotoOfTrip.as_view(), name='photos-of-trip'),
    path('photos/trip/<int:tripId>/date/<int:date_of_photo>/', views.PhotoOfDate.as_view(), name='photos-of-date'),
    url(r'^diaries/$',views.DiaryList.as_view(), name='diaries'),
    url(r'^diaries/(?P<pk>[0-9]+)/$', views.DiaryDetail.as_view(), name='diary-detail'),
    path('diaries/trip/<int:tripId>/user/<int:userId>/', views.DiaryOfTrip.as_view(), name='diaries-of-trip-user'),
    url(r'^todos/$',views.TodoList.as_view(), name='todos'),
    url(r'^todos/(?P<pk>[0-9]+)/$', views.TodoDetail.as_view(), name='todo-detail'),
    path('todos/trip/<int:tripId>/', views.TodoOfTrip.as_view(), name='todos-of-trip'),
    url(r'^rules/$',views.RuleList.as_view(), name='rules'),
    url(r'^rules/(?P<pk>[0-9]+)/$', views.RuleDetail.as_view(), name='rule-detail'),
    path('rules/trip/<int:tripId>/', views.RuleOfTrip.as_view(), name='rules-of-trip'),
    url(r'^schedules/$',views.ScheduleList.as_view(), name='schedules'),
    url(r'^schedules/(?P<pk>[0-9]+)/$', views.ScheduleDetail.as_view(), name='schedule-detail'),
    path('schedules/trip/<int:tripId>/', views.ScheduleOfTrip.as_view(), name='schedules-of-trip'),
    url(r'^markers/$',views.MarkerList.as_view(), name='markers'),
    url(r'^markers/(?P<pk>[0-9]+)/$', views.MarkerDetail.as_view(), name='marker-detail'),
    path('markers/trip/<int:tripId>/', views.MarkerOfTrip.as_view(), name='markers-of-trip'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
