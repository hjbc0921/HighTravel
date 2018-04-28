from django.conf.urls import url
from trips import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^api/trips/$',views.TripList.as_view()),
    url(r'^api/trips/(?P<pk>[0-9]+)/$', views.TripDetail.as_view()),
    url(r'^api/users/$',views.UserList.as_view()),
    url(r'^api/users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
    url(r'^api/expenses/$',views.ExpenseList.as_view()),
    url(r'^api/expenses/(?P<pk>[0-9]+)/$', views.ExpenseDetail.as_view()),
    path('/api/expenses/trip/<int:tripId>/', views.ExpenseOfTrip.as_view()),
    url(r'^api/photos/$',views.PhotoList.as_view()),
    url(r'^api/photos/(?P<pk>[0-9]+)/$', views.PhotoDetail.as_view()),
    path('/api/photos/trip/<int:tripId>/', views.PhotoOfTrip.as_view()),
    url(r'^api/diaries/$',views.DiaryList.as_view()),
    url(r'^api/diaries/(?P<pk>[0-9]+)/$', views.DiaryDetail.as_view()),
    path('/api/diaries/trip/<int:tripId>/user/<int:userId>/', views.DiaryOfTrip.as_view()),
    url(r'^api/todos/$',views.TodoList.as_view()),
    url(r'^api/todos/(?P<pk>[0-9]+)/$', views.TodoDetail.as_view()),
    path('/api/todos/trip/<int:tripId>/', views.TodoOfTrip.as_view()),
    url(r'^api/rules/$',views.RuleList.as_view()),
    url(r'^api/rules/(?P<pk>[0-9]+)/$', views.RuleDetail.as_view()),
    path('/api/rules/trip/<int:tripId>/', views.RuleOfTrip.as_view()),
    url(r'^api/schedules/$',views.ScheduleList.as_view()),
    url(r'^api/schedules/(?P<pk>[0-9]+)/$', views.ScheduleDetail.as_view()),
    path('/api/schedules/trip/<int:tripId>/', views.ScheduleOfTrip.as_view()),
    url(r'^api/markers/$',views.MarkersList.as_view()),
    url(r'^api/markers/(?P<pk>[0-9]+)/$', views.MarkersDetail.as_view()),
    path('/api/markers/trip/<int:tripId>/', views.MarkersOfTrip.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)


