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

from lunardate import LunarDate
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
        year_q = self.request.GET.get("year")
        month_q = self.request.GET.get("month")
        type_q = self.request.GET.get('type')

        if year_q and year_q != 'null':
            try:
                year_q = int(year_q)
            except:
                year_q = datetime.now().year
        else:
            year_q = datetime.now().year

        if type_q and type_q != 'null':
            queryset_list = queryset_list.filter(type=type_q)

        if month_q and month_q != 'null':
            month_q = int(month_q)
            filtered_queryset_list = []
            for each_query in queryset_list:
                if each_query.is_lunar:
                    date = LunarDate(year_q, each_query.origin_date.month, each_query.origin_date.day).toSolarDate()
                else:
                    date = each_query.origin_date
                if date.month == month_q:
                    filtered_queryset_list.append(each_query)
            return filtered_queryset_list
        return queryset_list



