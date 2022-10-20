Run rabbitmq docker image using below command

docker run -p 5672:5672 rabbitmq

rabbitmq is use for communitcation between services.

to run mongodb run below commands on command promot

mongod
mongo

auth-service is use for registering new user and login.

-- api details for register user  
url : localhost:5000/api/auth/register
method : post
body : 

{
    "name" : "sachin",
    "password" : "abc123",
    "email" : "sachin@gmail.com"
}

-- api details for login which returns auth token

url : localhost:5000/api/auth/login
method : post

body :

{
    "password" : "abc123",
    "email" : "sachin@gmail.com"
}

-- api dteails for creating pensioner

url : localhost:5002/api/pensioner
method : post

body :

{
    "name" : "sachin",
    "dob": "ddj",
    "pan" : "urhfb7384m",
    "aadhar" : "753486898989",
    "salary_earned" : "1900000",
    "allowances" : "",
    "classification" : "self",
    "bank_detail" : {
        "bank_name" : "ICICI",
        "account_number" : "84657768",
        "bank_type" : "private"
    }
}

-- api details for process pension

 url : localhost:5001/processpension

 method : post

 body :

 {
    "aadhar" : "753486898989"
}




