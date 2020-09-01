# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2018-09-27 19:50
from __future__ import unicode_literals

import awx.main.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0052_v340_remove_project_scm_delete_on_next_update'),
    ]

    operations = [
        migrations.AddField(
            model_name='workflowjob',
            name='char_prompts',
            field=awx.main.fields.JSONField(blank=True, default=dict),
        ),
        migrations.AddField(
            model_name='workflowjob',
            name='inventory',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='workflowjobs', to='main.Inventory'),
        ),
        migrations.AddField(
            model_name='workflowjobtemplate',
            name='ask_inventory_on_launch',
            field=awx.main.fields.AskForField(blank=True, default=False),
        ),
        migrations.AddField(
            model_name='workflowjobtemplate',
            name='inventory',
            field=models.ForeignKey(blank=True, default=None, help_text='Inventory applied to all job templates in workflow that prompt for inventory.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='workflowjobtemplates', to='main.Inventory'),
        ),
    ]
