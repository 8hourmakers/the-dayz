from django.db.models import Q
from datetime import datetime, timedelta
from rest_framework.views import APIView
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


class EventNearDetailAPIView(APIView):
    serializer_class = EventDetailSerializer
    queryset = Event.objects.all()
    permission_classes = [AllowAny]

    def get(self, request):
        result_event = None
        queryset_list = Event.objects.all().order_by('month', 'day')

        today = datetime.today() + timedelta(hours=9)
        if len(queryset_list) == 0:
            # 행사가 없을 경우
            return Response(status=404)

        month_equal_query = queryset_list.filter(month=today.month)
        if len(month_equal_query) != 0:
            # 같은 달에 이벤트가 있을 때
            day_gte_query = month_equal_query.filter(day__gte=today.day)
            # day로 오늘 이후 행사
            if len(day_gte_query) != 0:
                # 오늘 이후 행사가 있을 경우
                result_event = day_gte_query[0]
        if result_event is None:
            month_gte_query = queryset_list.filter(month__gt=today.month)
            if len(month_gte_query) !=0:
                # 이번달 이후 행사가 있을 경우
                result_event = month_gte_query[0]
        if result_event is None:
            # 올해 더 이상 행사가 없을 경우, 연초의 행사 반환
            result_event = queryset_list[0]

        serializer = EventDetailSerializer(result_event)
        return Response(serializer.data)

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



