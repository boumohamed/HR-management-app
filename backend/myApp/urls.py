from django.urls import path
from  .views import *



urlpatterns = [
    path('employees', Employees.as_view(), name='employeeslist'),
    path('employees/<str:idemp>',Employee.as_view(),name="oneemployee"),
    path('employees/update/<str:idEmp>',UPDATEEmployee.as_view(),name="updateemployee"),
    path('employees/details/<str:idemp>',EmployeeDetails.as_view(),name="employeedetails"),
    path('user/add', ADD_USER.as_view(), name='adduser'),
    path('skill/add', ADD_SKILL.as_view(),name="addskill"),
    path('skills/<str:idemp>', skills.as_view(),name="skills"),
    path('experience/add', ADD_EXPERIENCE.as_view(),name="addexpr"),
    path('experiences/<str:idemp>', experiences.as_view(),name="experiences"),
    path('diplomes/<str:idemp>',Diplomes.as_view(),name="diplomes"),
    path('diplome/add', ADD_DIPLOME.as_view(),name="ajouterdiplome"),
    path('langue/add', ADD_LANGUE.as_view(),name="ajouterlangue"),
    path('langues/<str:idemp>',langues.as_view(),name="langues"),
    path('fiche/add', ADD_Fiche.as_view(),name="ajouterfiche"),
    path('fiche/<str:idmEmp>', FICHE.as_view(),name="onefiche"),
    path('fiche/update/<str:idfiche>', UPDATEFiche.as_view(),name="updatefiche"),
    path('conge/add', ADD_CONGE.as_view(),name="addconge"),
    path('conge/update/<str:idconge>', ConfirmConge.as_view(),name="confirmconge"),
    path('conge/delete/<str:idconge>', DELETEConge.as_view(),name="deleteconge"),
    path('conges', Conges.as_view(),name="conges"),
    path('conge/<str:idemp>', CongeByEmpl.as_view(),name="congebyemp"),
    path('conges/<str:idconge>',Conge.as_view(),name="oneconge"),
    path('informations/add', ADD_INFORMATION.as_view(),name="addinfo"),
    path('login', LoginAPI.as_view(),name="login"),
    path('test', ADD_TEST.as_view(),name="test"),
    
]
