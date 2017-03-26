from rest_framework.serializers import (
    HyperlinkedIdentityField,
    ModelSerializer,
    SerializerMethodField,
    DateField,
    )

from events.models import Event
from lunardate import LunarDate

class EventDetailSerializer(ModelSerializer):

    class Meta:
        model = Event
        fields = [
            'date',
            'title',
            'type',
            'is_lunar',
            'summary',
            'image_url',
            'content'
        ]

class EventListSerializer(ModelSerializer):


    class Meta:
        model = Event
        fields = [
            'date',
            'title',
            'type',
            'is_lunar',
            'content',
            'summary',
            'image_url'
        ]
        extra_kwargs = {"content": {"write_only": True}}

    def validate_date(self, value):
        date = value
        data = self.get_initial()
        is_lunar = data.get("is_lunar")
        if is_lunar:
            date = LunarDate(date.year, date.month, date.day).toSolarDate()
        return date


    def create(self, validated_data):
        event = Event(
            date=validated_data.get('date'),
            title=validated_data.get('title'),
            content=validated_data.get('content'),
            type=validated_data.get('type'),
            is_lunar=validated_data.get('is_lunar'),
            summary=validated_data.get('summary'),
            image_url=validated_data.get('image_url')
        )
        event.save()
        return event