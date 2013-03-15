from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import ugettext_lazy as _

#create Role
class Role(models.Model):
    """the role for all angles"""
    name = models.CharField(_("role name"), max_length=20, blank=False)
    
    class Meta:
       verbose_name = _("role") 
       verbose_name_plural = _("roles")
    
    def __unicode__(self):
        return self.name
    
    @models.permalink
    def get_absolute_url(self):
        return ('/role/%s/' % (self.id) )

#create Angel
class Angel(models.Model):
    """all of employees"""
    name = models.CharField(_("angel name"), max_length=20, blank=False)
    #name = models.ForeignKey(User, verbose_name = 'angel name', blank=False)
    password = models.CharField(max_length=20, blank=False)
    role = models.ForeignKey(Role,verbose_name = 'role', null=False)
    gender = models.CharField(max_length=6, blank=True)
    birth = models.DateField(_("angel birth"), blank=True, null=True)
    address = models.CharField(_("angel address"), max_length=100, blank=True)
    email = models.EmailField(_("angel email"), max_length=75, blank=True)
    #leaders = models.CharField(_("angel leaders"), max_length=100, blank=True)
    #inferior = models.CharField(_("angel inferior"), max_length=100, blank=True)
    leaders = models.ForeignKey("self", related_name="child leader", null=True, blank=True)
    inferior = models.ManyToManyField("self", related_name="child inferior", null=True, blank=True)

    class Meta:
        verbose_name = _("angel")
        verbose_name_plural = _("angels")
    
    def __unicode__(self):
        return self.name
    
    @models.permalink
    def get_absolute_url(self):
        return ('/angel/%s/' % (self.name) )

#create Reporttype
class Reporttype(models.Model):
    """the type of report"""
    name = models.CharField(_("report type"), max_length=20, blank=False)
    
    class Meta:
        verbose_name = _("reporttype")
        verbose_name_plural = _("reporttype")
        
    def __unicode__(self):
        return self.name
    
    @models.permalink
    def get_absolute_url(self):
        return ('/reporttype/%s/' % (self.id) )




#create State
class Reportstate(models.Model):
    """the report of state"""
    name = models.CharField(_("state name"), max_length=20, blank=False)
    
    class Meta:
       verbose_name = _("reportstate") 
       verbose_name_plural = _("reportstate")
    
    def __unicode__(self):
        return self.name
        
    @models.permalink
    def get_absolute_url(self):
        return ('/reportstate/%s/' % (self.id) )

#create Report
class Report(models.Model):
    """the weekly of report"""
    #name = models.ForeignKey(Angel, verbose_name='name', null=False)
    name = models.CharField(_("report name"), max_length=20, null=False)
    number = models.CharField(_("report number"), max_length=20, blank=False)
    title = models.CharField(_("report title"), max_length=200, blank=False)
    body = models.TextField(_("report body"), blank=True, null=True)
    starttime = models.IntegerField(_("report start time"), blank=True, null=True)
    endtime = models.IntegerField(_("report end time"), blank=True, null=True)
    week = models.CharField(_("week"), max_length=10, blank=True)
    #r_type = models.ForeignKey(Reporttype, related_name="child type", null=False)
    #send = models.CharField(max_length=20, blank=True)
    #r_state = models.ForeignKey(Reportstate, related_name="child state", null=False)
    memo = models.TextField(_("report memo"), blank=True, null=True)
    
    class Meta:
        verbose_name = _("report")
        verbose_name_plural = _("reports")
    
    def __unicode__(self):
        return self.name
        
    @models.permalink
    def get_absolute_url(self):
        return ('/report/%s/' % (self.id) )
