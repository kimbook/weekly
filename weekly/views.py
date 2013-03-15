# Create your views here.
from django.http import HttpResponseRedirect,HttpResponse
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.contrib import auth
from django.contrib.auth.views import login,logout
from weekly.models import Report
from django.core import serializers

import json


def weekly_do(request):
    """docstring for action"""
    if not request.user.username:
         return render_to_response('weekly/login.htm',
             context_instance=RequestContext(request)
         )

    if request.method == 'GET':
        cosplay = request.GET.get('cosplay')
        id = request.GET.get('id')
        starttime = request.GET.get('starttime')
        endtime = request.GET.get('endtime')
        title = request.GET.get('title')
        body = request.GET.get('body')
        week = request.GET.get('week')
        if cosplay == 'save':
            rp = Report.objects.create(name=request.user.username, number=id, title=title, body=body, starttime=starttime, endtime=endtime, week=week)
            rp.save()
            return HttpResponse('save success');
        elif  cosplay == 'updateTime':
            Report.objects.filter(name=request.user.username, number=id).update(starttime=starttime, endtime=endtime)
            return HttpResponse('updatetime success');
        elif cosplay == 'update':
            Report.objects.filter(name=request.user.username, number=id).update(starttime=starttime, endtime=endtime, title=title, body=body)
            return HttpResponse('update success');
        elif cosplay == 'delete':
            rp = Report.objects.filter(name=request.user.username, number=id)
            rp.delete()
            return HttpResponse('delete success');

def weekly_show(request):
    """docstring for weekly_show"""
    report = Report.objects.all()
    #json_serializer = serializers.get_serializer("json")()
    #x = json_serializer.serialize(report, ensure_ascii=False)
    echo = {}
    array = []
    for x in report:
        if x:
            echo['id'] = x.number
            echo['name'] = x.name
            echo['title'] = x.title
            echo['body'] = x.body
            echo['start'] = x.starttime
            echo['end'] = x.endtime
            array.append(echo)

    return HttpResponse(json.dumps(array))

def home(request):
    """docstring for home"""
    if not request.user.username:
         return render_to_response('weekly/login.htm',
             context_instance=RequestContext(request)
         )

    result = {'welcome': (request.user.username)}
    return render_to_response('weekly/home.htm', 
            result
        , context_instance=RequestContext(request)
    )


def action_login(request):
    if request.method == 'POST':
        account = request.POST.get('account')
        pwd = request.POST.get('password')
        result = {'success': False,'msg': '','redirect': 'http://localhost:8000/'}
        user = auth.authenticate(username=account,password=pwd)
        if user:
            if user.is_active:
                result['msg'] = 'success'
                result['success'] = True
                auth.login(request, user)
            else:
                result['msg'] = 'this user is not active'
        else:
            result['msg'] = 'username and password is not valid'
        return HttpResponse(json.dumps(result))
    else:
        return render_to_response('weekly/login.htm',
               result
            , context_instance=RequestContext(request)
        )
