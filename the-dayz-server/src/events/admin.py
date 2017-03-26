from django.contrib import admin

# Register your models here.
from .models import Event

class EventModelAdmin(admin.ModelAdmin):
	list_display = ["title", "date", "type", "summary", "content", "image_url", "is_lunar"]
	list_display_links = ["title"]
	list_editable = ["summary", "content"]
	list_filter = ["date", "type"]

	search_fields = ["date", "title"]
	class Meta:
		model = Event


admin.site.register(Event, EventModelAdmin)