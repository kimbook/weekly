from django.contrib import admin
from weekly.models import Angel, Role, Report, Reporttype, Reportstate

class AngelAdmin(admin.ModelAdmin):
    """docstring for AngelAdmin"""
    list_display = ('name')

admin.site.register(Angel)
admin.site.register(Role)
admin.site.register(Report)
admin.site.register(Reporttype)
admin.site.register(Reportstate)
