#from django.shortcuts import render
from .serializers import *
from django.contrib.auth.hashers import make_password, check_password

from .models import competence, diplomes, employee, USER, langue, Experience, conge

from rest_framework.views  import APIView
from rest_framework.response import Response
from rest_framework import status


# Create your views here.

class Employee(APIView):
    def get(self,request,idemp):        
        if employee.objects.filter(user_id=idemp).exists():
            emp=employee.objects.get(user_id=idemp)
            serialized_emp=EmployeeSerializer(emp,many=False)
            return Response(serialized_emp.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class Employees(APIView):
    def get(self,request):
        employees = employee.objects.all()
        employees= EmployeeSerializer(employees,many=True)
        return Response(employees.data)

class EmployeeDetails(APIView):
    def get(self,request,idemp):        
        if employee.objects.filter(id=idemp).exists():
            emp=employee.objects.get(id=idemp)
            serialized_emp=EmployeeSerializer(emp,many=False)
            return Response(serialized_emp.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class UPDATEEmployee(APIView):
    def put(self,request,idEmp):  
        Emp=employee.objects.get(id=idEmp)
        serializer = EmployeeSerializer(Emp, data=request.data, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ADD_USER(APIView):
     def post(self,request):
        data={
            "email":request.data.get("email"),
            "password":make_password(request.data.get("password")),
        }
        user_to_add=UserSerializer(data=data,many=False)
        if user_to_add.is_valid():
            user_to_add.save()
            return Response(user_to_add.data,status=status.HTTP_201_CREATED)
        else:
            return Response(user_to_add.errors,status=status.HTTP_400_BAD_REQUEST)



class ADD_SKILL(APIView):
     def post(self,request):
        data={
            "employee":request.data.get("employee"),
            "nom":request.data.get("nom"),
           
        }
        skill_to_add=SkillSerializer(data=data,many=False)
        if skill_to_add.is_valid():
            skill_to_add.save()
            return Response(skill_to_add.data,status=status.HTTP_201_CREATED)
        else:
            return Response(skill_to_add.errors,status=status.HTTP_400_BAD_REQUEST)
class skills(APIView):
    def get(self,request, idemp):

        if competence.objects.filter(employee_id=idemp).exists():
            skill_s = competence.objects.filter(employee_id=idemp)
            skill_s= SkillSerializer(skill_s,many=True)
            return Response(skill_s.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)



class ADD_EXPERIENCE(APIView):
     def post(self,request):
        data={
            "employee":request.data.get("employee"),
            "Poste":request.data.get("poste"),
            "Entreprise":request.data.get("entreprise"),
            "duree":request.data.get("duree"),
           
        }
        expr_to_add=EXPERIENCESerializer(data=data,many=False)
        if expr_to_add.is_valid():
            expr_to_add.save()
            return Response(expr_to_add.data,status=status.HTTP_201_CREATED)
        else:
            return Response(expr_to_add.errors,status=status.HTTP_400_BAD_REQUEST)
class experiences(APIView):
    def get(self,request, idemp):

        if Experience.objects.filter(employee_id=idemp).exists():
            expr_s = Experience.objects.filter(employee_id=idemp)
            expr_s= EXPERIENCESerializer(expr_s,many=True)
            return Response(expr_s.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class ADD_LANGUE(APIView):
     def post(self,request):
        data={
            "employee":request.data.get("employee"),
            "nom":request.data.get("nom"),
           
        }
        langue_to_add=LANGUESerializer(data=data,many=False)
        if langue_to_add.is_valid():
            langue_to_add.save()
            return Response(langue_to_add.data,status=status.HTTP_201_CREATED)
        else:
            return Response(langue_to_add.errors,status=status.HTTP_400_BAD_REQUEST)
class langues(APIView):
    def get(self,request, idemp):

        if langue.objects.filter(employee_id=idemp).exists():
            langue_s = langue.objects.filter(employee_id=idemp)
            langue_s= LANGUESerializer(langue_s,many=True)
            return Response(langue_s.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)




class ADD_DIPLOME(APIView):
     def post(self,request):
        data={
            "employee":request.data.get("employee"),
            "nom":request.data.get("nom"),
            "date":request.data.get("date"),
        }
        diplome_to_add=DIPLOMESerializer(data=data,many=False)
        if diplome_to_add.is_valid():
            diplome_to_add.save()
            return Response(diplome_to_add.data,status=status.HTTP_201_CREATED)
        else:
            return Response(diplome_to_add.errors,status=status.HTTP_400_BAD_REQUEST)
class Diplomes(APIView):
    def get(self,request, idemp):

        if diplomes.objects.filter(employee_id=idemp).exists():
            #diplome_s = diplomes.objects.get(employee_id=idemp)
            diplome_s = diplomes.objects.filter(employee_id=idemp)
            diplome_s= DIPLOMESerializer(diplome_s,many=True)
            return Response(diplome_s.data, status=status.HTTP_200_OK)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)

        


class ADD_CONGE(APIView):
     def post(self,request):
        data={
            "employee":request.data.get("employee"),
            "type":request.data.get("type"),
            "dateDebut":request.data.get("dateDebut"),
            "dateFin":request.data.get("dateFin"),
        }
        conge_to_add=CONGESerializer(data=data,many=False)
        if conge_to_add.is_valid():
            conge_to_add.save()
            return Response(conge_to_add.data,status=status.HTTP_201_CREATED)
        else:
            return Response(conge_to_add.errors,status=status.HTTP_400_BAD_REQUEST)

class Conges(APIView):
    def get(self,request):
        conges = conge.objects.all()
        conges= CONGESerializer(conges,many=True)
        return Response(conges.data)

class Conge(APIView):
    def get(self,request,idconge):        
        if conge.objects.filter(id=idconge).exists():
            cge=conge.objects.get(id=idconge)
            serialized_conge=CONGESerializer(cge,many=False)
            return Response(serialized_conge.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class CongeByEmpl(APIView):
    def get(self,request, idemp):

        if diplomes.objects.filter(employee_id=idemp).exists():
            conge_s = conge.objects.filter(employee_id=idemp)
            conge_s= CONGESerializer(conge_s,many=True)
            return Response(conge_s.data, status=status.HTTP_200_OK)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)

class ConfirmConge(APIView):
    def put(self,request,idconge):  
        cge=conge.objects.get(id=idconge)
        serializer = CONGESerializer(cge, data=request.data, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class DELETEConge(APIView):
    def delete(self,request,idconge):  
        if request.method == 'DELETE':
            cge=conge.objects.get(id=idconge)
            cge.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)





class ADD_INFORMATION(APIView):
     def post(self,request):
        data={
            "user":request.data.get("user"),
            "nom":request.data.get("nom"),
            "prenom":request.data.get("prenom"),
            "adresse":request.data.get("adresse"),
            "tel":request.data.get("tel"),
            "cnss":request.data.get("cnss"),
            "cin":request.data.get("cin"),
            "role":request.data.get("role"),
        }
        data_to_add=EmployeeSerializer(data=data,many=False)
        if data_to_add.is_valid():
            data_to_add.save()
            return Response(data_to_add.data,status=status.HTTP_201_CREATED)
        else:
            return Response(data_to_add.errors,status=status.HTTP_400_BAD_REQUEST)
            
class LoginAPI(APIView):
     def post(self, request):

        email = request.data.get("email")
        password = request.data.get("password")
        
        user = USER.objects.get(email=email)
        serialized_user = UserSerializer(user ,many=False)
        is_ok = check_password( password, serialized_user.data.get("password"))
        if(is_ok):
            return Response(serialized_user.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serialized_user.errors,status=status.HTTP_400_BAD_REQUEST)
    


class ADD_Fiche(APIView):
     def post(self,request):
        data={
            "employee":request.data.get("employee"),
            "salaire":request.data.get("salaire"),
        }
        fiche_to_add=FICHESerializer(data=data,many=False)
        if fiche_to_add.is_valid():
            fiche_to_add.save()
            return Response(fiche_to_add.data,status=status.HTTP_201_CREATED)
        else:
            return Response(fiche_to_add.errors,status=status.HTTP_400_BAD_REQUEST)

class UPDATEFiche(APIView):
    def put(self,request,idfiche):  
        ficheData=fiche.objects.get(id=idfiche)
        serializer = FICHESerializer(ficheData, data=request.data, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

class FICHE(APIView):
    def get(self,request,idmEmp):        
        if fiche.objects.filter(employee_id=idmEmp).exists():
            data_fiche=fiche.objects.get(employee_id=idmEmp)
            serialized_conge=FICHESerializer(data_fiche,many=False)
            return Response(serialized_conge.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class ADD_TEST(APIView):
     def post(self,request):
        data={
            "prenom":request.data.get("nom"),
            "nom": "bouzri",
            
        }
        skill_to_add=SkillSerializer(data=data,many=False)
        if skill_to_add.is_valid():
            skill_to_add.save()
            return Response(skill_to_add.data,status=status.HTTP_201_CREATED)
        else:
            return Response(skill_to_add.errors,status=status.HTTP_400_BAD_REQUEST)