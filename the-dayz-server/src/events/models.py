
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.core.urlresolvers import reverse
from django.db import models
from django.db.models.signals import pre_save
from django.utils import timezone
from django.utils.safestring import mark_safe
from django.utils.text import slugify

from markdown_deux import markdown

# Create your models here.
# MVC MODEL VIEW CONTROLLER

class Event(models.Model):
    date = models.DateField(null=False)
    title = models.CharField(max_length=120)
    type = models.CharField(max_length=30)
    summary = models.TextField(null=True)
    content = models.TextField()
    image_url = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.title

