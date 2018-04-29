from django.conf.urls import url
from django.urls import path
from trips import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^trips/$',views.TripList.as_view()),
    url(r'^trips/(?P<pk>[0-9]+)/$', views.TripDetail.as_view()),
    url(r'^users/$',views.UserList.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
    url(r'^expenses/$',views.ExpenseList.as_view()),
    url(r'^expenses/(?P<pk>[0-9]+)/$', views.ExpenseDetail.as_view()),
    path('expenses/trip/<int:tripId>/', views.ExpenseOfTrip.as_view()),
    url(r'^photos/$',views.PhotoList.as_view()),
    url(r'^photos/(?P<pk>[0-9]+)/$', views.PhotoDetail.as_view()),
    path('photos/trip/<int:tripId>/', views.PhotoOfTrip.as_view()),
    url(r'^diaries/$',views.DiaryList.as_view()),
    url(r'^diaries/(?P<pk>[0-9]+)/$', views.DiaryDetail.as_view()),
    path('diaries/trip/<int:tripId>/user/<int:userId>/', views.DiaryOfTrip.as_view()),
    url(r'^todos/$',views.TodoList.as_view()),
    url(r'^todos/(?P<pk>[0-9]+)/$', views.TodoDetail.as_view()),
    path('todos/trip/<int:tripId>/', views.TodoOfTrip.as_view()),
    url(r'^rules/$',views.RuleList.as_view()),
    url(r'^rules/(?P<pk>[0-9]+)/$', views.RuleDetail.as_view()),
    path('rules/trip/<int:tripId>/', views.RuleOfTrip.as_view()),
    url(r'^schedules/$',views.ScheduleList.as_view()),
    url(r'^schedules/(?P<pk>[0-9]+)/$', views.ScheduleDetail.as_view()),
    path('schedules/trip/<int:tripId>/', views.ScheduleOfTrip.as_view()),
    url(r'^markers/$',views.MarkerList.as_view()),
    url(r'^markers/(?P<pk>[0-9]+)/$', views.MarkerDetail.as_view()),
    path('markers/trip/<int:tripId>/', views.MarkerOfTrip.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)


