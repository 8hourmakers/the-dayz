from django.db.models import Q
from datetime import datetime

from rest_framework.filters import (
        SearchFilter,
        OrderingFilter,
    )
from django.http import Http404
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    ListCreateAPIView,
    UpdateAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView,
    RetrieveUpdateDestroyAPIView
    )


from rest_framework.response import Response

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,

    )

from events.models import Event

from .serializers import (
    EventListSerializer,
    EventDetailSerializer
    )

from django.shortcuts import get_object_or_404

class EventDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = EventDetailSerializer
    queryset = Event.objects.all()
    permission_classes = [AllowAny]


class EventListAPIView(ListCreateAPIView):
    serializer_class = EventListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self, *args, **kwargs):
        queryset_list = Event.objects.all()
        month_q = self.request.GET.get("month")
        date_q = self.request.GET.get('date')
        type_q = self.request.GET.get('type')



        if month_q:
            queryset_list = queryset_list.filter(date__month=month_q)
        if date_q:
            date_q_filter = datetime.strptime(date_q, '%m-%d')
            queryset_list = queryset_list.filter(
                Q(date__month=date_q_filter.month)&
                Q(date__day=date_q_filter.day)
            )
        if type_q:
            queryset_list = queryset_list.filter(type=type_q)

        return queryset_list



