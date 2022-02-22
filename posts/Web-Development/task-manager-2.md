---
title: 'Build a Task Management web app using React.js, Node.Js and  Mongodb - day 2'
date: 'February 19, 2022'
excerpt: 'This series is about how to build a task management web app use React.Js、Node.Js and Mongodb.'
cover_image: '/images/posts/Web-Development/task-manager-2.jpg'
id: 'task manager 2'
---

> This series aim to learning React Js, Node Js and Mongodb by building a task management web app. 
> This app support user authorization, create tasks which stored in Mongodb, assign task to other user, etc.

### Daily Progress
- create routes using express 
- hash user password using bcrypt package 
- define pre function of user scheme
#### Current Directory structure
```
root
├── Backend
     ├── package.json
     ├── .env
     └─── src
        ├── server.js
        └── models
          ├── ...
          └── user.js
```

### Create routes using express
Express is a flexible Node.js web application framework that provides a robust set of features for web app. We can install it using npm:
```
npm i express --save
```
It is simple to start our server 
```
// in .env file 
SERVER_PORT=3001

// in server.js 
import express from 'express'
const app = express();

app.listen(process.env.SERVER_PORT, () => {
  console.log('Server is ready')
})

// expect result 
Server is ready
```
We create routes folder, controllers folder and user.js in each folder to handle request about user
```
root
├── Backend
     ├── package.json
     ├── .env
     └─── src
        ├── server.js
        ├── models ...
        ├── controllers
        ├ └── user.js
        └── routes
          └── user.js
```
In controllers/users.js, we handle the logic of each kind of request(post, get, delete and patch, etc.) about user. 


```
// in controllers/user.js
import user from './../models/user.js'

export async function createUser(req, res){...}
export async function getUser(req, res){...}
export async function deleteUser(req, res){...}
export async function updateUser(req, res){...}
```
In routes/users.js, we define routes about users
```
// in routes/user.js
import express from 'express'
import {createUser, getUser, deleteUser, updateUser} from './../controller/user.js'

// all routes in here are starting with /users   
const router = express.Router();
// create user 
router.post('/', createUser);

// get user info 
router.get('/', getUser);

// delete user
router.delete('/', deleteUser);

// update user
router.patch('/', updateUser);

export default router
```
After define routes, we can define middleware in server.js

```
// in server.js 

...
import userRouter from './routes/user.js';

const app = express();

// ROUTES
app.use('/users', userRouter);
...
```
#### Create a user


To test our api, we use **Postman**


