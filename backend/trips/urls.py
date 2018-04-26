from django.conf.urls import url
from trips import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^api/trips/$',views.TripList.as_view()),
    url(r'^api/trips/(?P<pk>[0-9]+)/$', views.TripDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)


