from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import employee, USER, competence, diplomes, conge, langue, Experience, fiche

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = employee
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = competence
        fields = '__all__'

class EXPERIENCESerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'
        
class DIPLOMESerializer(serializers.ModelSerializer):
    class Meta:
        model = diplomes
        fields = '__all__'

class CONGESerializer(serializers.ModelSerializer):
    class Meta:
        model = conge
        fields = '__all__'


class LANGUESerializer(serializers.ModelSerializer):
    class Meta:
        model = langue
        fields = '__all__'

class FICHESerializer(serializers.ModelSerializer):
    class Meta:
        model = fiche
        fields = '__all__'

class LoginSerializer(serializers.Serializer):
  email = serializers.CharField()
  password = serializers.CharField()

  def validate(self, data):
    user = authenticate(**data)
    if user and user.is_active:
      return user
    raise serializers.ValidationError("Incorrect Credentials")
        