# task-manager-API
Postman Documentation: [POSTMAN](https://documenter.getpostman.com/view/7655378/2s8ZDeVKus)

## Created a Task Manger API endpoints with the help of NodeJS, Express. 
Other Libraries Used:
  * JWT
  * bcrypt
  * sharp
  * multer
  * validator
 ## Also provided a email functionality using SendGrid API.
 ## Database used: MongoDB
 
 #EndPoints:
 User:
## 1. /users: To create a New User.
              When this API is executed a Token is saved in the local environment variable and used throughout the application for the authentication whenever a request is send from the user. 
              * Type: POST
              * Payload:
                {
                    "name":"",
                    "email":"",
                    "password":""
                }
## 2. /user/:id: To fetch the details of an individual user.
              * Type: GET
                      
## 3. /users/update: To update the user details currently supporting updation of name & password.
              * Type: PATCH
              * Payload:
                {
                    "name":"",
                    "password":""
                }
## 4. /users/me: To Delte a user
              * Type: DEL
## 5. /users/me: To Read user Profile
              * Type: GET
## 6. /user/me/avatar: To View User Profile
              * Type: GET
## 7. /user/login: To login a user.
              * Type: POST
              * Payload:
                {
                    "email":"",
                    "password":""
                }
## 8. /user/logout: To logout a user
              * Type: POST
## 9. /user/logoutAll: To logout all the users.
              * Type: POST
## 10. /user/me/avatar: To upload user profile pic by passing a avatar key as a file.
              * Type: POST
## 11. /user/me/avatar: To delete user Profile pic
              * Type: DEL
## 12. /tasks: To create task that will be linked to current user logged in that wil be authenticated using the current saved token in the local environment variable.
              * Type: POST
              * Payload:
                {
                  "description":"fourth",
                  "completed":"false"
                }
## 13. /tasks/: To read task for the current user logged in.
              * Type: GET
## 14. tasks/:id: To get the task by providing it's id.
              * Type: GET
## 15. /tasks/:id: To update the task by providing it's id.
              * Type: PATCH
## 16. /tasks/:id: To delete a task by providing it's id.
              * Type: DEL
