from django.conf.urls.defaults import *
from weekly.views import action_login, home, weekly_do, weekly_show
from django.views.generic.simple import direct_to_template

urlpatterns = patterns('',
    (r'^$', home),
    #(r'^$', direct_to_template, {'template':'weekly/home.htm'}),
    (r'^login/$', direct_to_template, {'template':'weekly/login.htm'}),
    (r'^action/login/$', action_login),
    (r'^weekly/do$',weekly_do),
    (r'^weekly/show$',weekly_show),
    #(r'^materials/$', list_detail.object_list, material_info),
    #(r'^materials/(?P<object_id>\d+)/$', list_detail.object_detail, material_info),
)


