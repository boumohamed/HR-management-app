from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class Responsable(BaseUserManager):
    
    def create_user(self, email, password = None):
        if not email:
            raise ValueError('EMAIL IS REQUIRED ')
        user = self.model(
            email = self.normalize_email(email)
        )
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self, email, password = None):
        user = self.create_user(
            email = self.normalize_email(email),
            password = password
        )
        user.is_admin = True
        user.is_staff = True
        user.save()
        return user
    def create_staffuser(self, email, password = None):
        user = self.create_user(
            email = self.normalize_email(email),
            password = password
        )
        user.is_staff = True
        user.save()
        return user


class USER(AbstractBaseUser):
    email = models.EmailField(max_length=80, unique=True)
    dateCreation = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    objects = Responsable()
    def __str__(self):
        return self.email 
    def has_perm(self, perm, obj = None):
        return True
    def has_module_perms(self, app_label):
        return True

# Create your models here.
class employee(models.Model):
    user=models.ForeignKey(USER,on_delete=models.SET_NULL,null=True)
    nom=models.CharField(max_length=210,null=True,blank=True)
    prenom=models.CharField(max_length=220,null=True,blank=True)
    adresse=models.CharField(max_length=220,null=True,blank=True)
    tel=models.CharField(max_length=15, null=True,blank=True)
    cnss=models.CharField(max_length=220,null=False,blank=False)
    cin=models.CharField(max_length=10,null=False,blank=False)
    role=models.CharField(max_length=100,null=False,blank=False)   

    def __str__(self):
        return self.nom + '___' + self.prenom

class competence(models.Model):
    employee=models.ForeignKey(employee,on_delete=models.SET_NULL,null=True)
    nom=models.CharField(max_length=210,null=True,blank=True)
    
 

    def __str__(self):
        return self.nom

class langue(models.Model):
    employee=models.ForeignKey(employee,on_delete=models.SET_NULL,null=True)
    nom=models.CharField(max_length=210,null=True,blank=True)
 

    def __str__(self):
        return self.nom

class Experience(models.Model):
    employee=models.ForeignKey(employee,on_delete=models.SET_NULL,null=True)
    Poste=models.CharField(max_length=210,null=True,blank=True)
    Entreprise=models.CharField(max_length=210,null=True,blank=True)
    duree=models.IntegerField(null=True)
 
    def __str__(self):
       return self.Poste + ' à ' + self.Entreprise


class diplomes(models.Model):
    employee=models.ForeignKey(employee,on_delete=models.SET_NULL,null=True)
    nom=models.CharField(max_length=210,null=True,blank=True)
    date=models.CharField(max_length=210,null=True,blank=True)

    def __str__(self):
        return self.nom
    

class conge(models.Model):
    employee=models.ForeignKey(employee,on_delete=models.SET_NULL,null=True)
    type=models.CharField(max_length=210,null=True,blank=True)
    dateDebut=models.CharField(max_length=210,null=True,blank=True)
    dateFin=models.CharField(max_length=210,null=True,blank=True)
    confirm = models.BooleanField(default=False)

    def __str__(self):
        return self.type

class fiche(models.Model):
    employee=models.ForeignKey(employee,on_delete=models.SET_NULL,null=True)
    salaire=models.DecimalField(max_digits=8,decimal_places=2,null=True)

    def __str__(self):
        return str(self.salaire)

class test(models.Model):
    nom=models.CharField(max_length=210,null=True,blank=True)
    prenom=models.CharField(max_length=210,null=True,blank=True)
   
    def __str__(self):
        return self.nom   