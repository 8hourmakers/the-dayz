# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-26 06:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0003_auto_20170326_0558'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='summary',
            field=models.TextField(null=True),
        ),
    ]
