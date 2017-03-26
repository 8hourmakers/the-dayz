from rest_framework.serializers import (
    HyperlinkedIdentityField,
    ModelSerializer,
    SerializerMethodField
    )

from events.models import Event

class EventDetailSerializer(ModelSerializer):

    class Meta:
        model = Event
        fields = [
            'date',
            'title',
            'type',
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
            'summary',
            'image_url'
        ]
