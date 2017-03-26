from django.conf.urls import url
from django.contrib import admin

from .views import (
    EventListAPIView,
	EventDetailAPIView
)


urlpatterns = [
	url(r'^$', EventListAPIView.as_view(), name='list'),
	url(r'^(?P<pk>\d+)/$', EventDetailAPIView.as_view(), name='detail')
]
