from rest_framework.serializers import (
    HyperlinkedIdentityField,
    ModelSerializer,
    SerializerMethodField,
    DateField,
    )
from datetime import datetime
from events.models import Event
from lunardate import LunarDate

class EventDetailSerializer(ModelSerializer):

    converted_date = SerializerMethodField()
    origin_date = SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            'id',
            'origin_date',
            'converted_date',
            'title',
            'type',
            'is_lunar',
            'summary',
            'image_url',
            'content'
        ]

    def get_converted_date(self, obj):
        year = self.context.get('request').GET.get('year')
        is_lunar = obj.is_lunar

        try:
            year = int(year)
        except:
            year = datetime.now().year

        if is_lunar:
            if not year or year == 'null' or (year < 1900 or year >= 2050):
                year = datetime.now().year
            date = LunarDate(year, obj.origin_date.month, obj.origin_date.day).toSolarDate()
        else:
            date = obj.origin_date
        return date.strftime("%m-%d")

    def get_origin_date(self, obj):
        return obj.origin_date.strftime("%m-%d")


class EventListSerializer(ModelSerializer):

    converted_date = SerializerMethodField()
    origin_date = SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            'id',
            'origin_date',
            'converted_date',
            'title',
            'type',
            'is_lunar',
            'content',
            'summary',
            'image_url'
        ]
        extra_kwargs = {"content": {"write_only": True}}

    def get_converted_date(self, obj):
        year = self.context.get('request').GET.get('year')
        is_lunar = obj.is_lunar

        try:
            year = int(year)
        except:
            year = datetime.now().year

        if is_lunar:
            if not year or year == 'null' or (year < 1900 or year >= 2050):
                year = datetime.now().year
            date = LunarDate(year, obj.origin_date.month, obj.origin_date.day).toSolarDate()
        else:
            date = obj.origin_date
        return date.strftime("%m-%d")

    def get_origin_date(self, obj):
        return obj.origin_date.strftime("%m-%d")

    def validate_converted_date(self, value):
        date = value
        data = self.get_initial()
        request = self.context.get("request")
        year = request.GET.get('year')
        is_lunar = data.get("is_lunar")
        if is_lunar:
            if not year or year == 'null':
                year = datetime.now().year
            date = LunarDate(year, date.month, date.day).toSolarDate()
        return date


    def create(self, validated_data):

        event = Event(
            origin_date=validated_data.get('origin_date'),
            converted_date=validated_data.get('converted_date'),
            title=validated_data.get('title'),
            content=validated_data.get('content'),
            type=validated_data.get('type'),
            is_lunar=validated_data.get('is_lunar'),
            summary=validated_data.get('summary'),
            image_url=validated_data.get('image_url')
        )
        event.save()
        return event