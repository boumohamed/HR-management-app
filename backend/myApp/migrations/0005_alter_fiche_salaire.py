# Generated by Django 3.2.4 on 2021-06-29 17:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myApp', '0004_fiche'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fiche',
            name='salaire',
            field=models.DecimalField(decimal_places=2, max_digits=8, null=True),
        ),
    ]
