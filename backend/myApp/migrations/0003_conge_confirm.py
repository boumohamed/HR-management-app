# Generated by Django 3.2.4 on 2021-06-26 23:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myApp', '0002_auto_20210624_1236'),
    ]

    operations = [
        migrations.AddField(
            model_name='conge',
            name='confirm',
            field=models.BooleanField(default=False),
        ),
    ]
