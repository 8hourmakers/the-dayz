# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-26 05:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_auto_20170326_0546'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='image_url',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
