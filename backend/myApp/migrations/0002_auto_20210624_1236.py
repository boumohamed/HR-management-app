# Generated by Django 3.2.4 on 2021-06-24 11:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='conge',
            name='dateDebut',
            field=models.CharField(blank=True, max_length=210, null=True),
        ),
        migrations.AlterField(
            model_name='conge',
            name='dateFin',
            field=models.CharField(blank=True, max_length=210, null=True),
        ),
    ]
