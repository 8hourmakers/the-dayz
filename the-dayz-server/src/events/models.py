
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.core.urlresolvers import reverse
from django.db import models
from django.db.models.signals import pre_save
from django.utils import timezone
from django.utils.safestring import mark_safe
from django.utils.text import slugify

from markdown_deux import markdown
from lunardate import LunarDate
from django.db.models.signals import pre_save
from datetime import datetime
# Create your models here.
# MVC MODEL VIEW CONTROLLER


class Event(models.Model):
    origin_date = models.DateField()
    converted_date = models.DateField(null=True)
    is_lunar = models.BooleanField(default=False)
    title = models.CharField(max_length=120)
    type = models.CharField(max_length=30)
    summary = models.TextField(null=True)
    content = models.TextField(blank=True)
    image_url = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.title
