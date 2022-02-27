---
title: 'Build a Task Management web app using React.js, Node.Js and  Mongodb - day 2'
date: 'February 19, 2022'
excerpt: 'This series is about how to build a task management web app use React.Js、Node.Js and Mongodb.'
cover_image: '/images/posts/Web-Development/task-manager.jpg'
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
##### Before we work on createUser function, we need to deal with hash user's password and generate authorization token.
1. install required package
```
npm i bcryptjs jsonwebtoken 
```
2. we write more code about hashing and generate token in models/user.js 
```
// in models/user.js 
// we first hash user's password before saving into our database using bcryptjs.
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

...
userSchema.pre('save', async function(next) {
  const user = this 
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(
      user.password,
      parseInt(process.env.HASH_SALT),
    );
  }
  next();
})

// we need to generate auth token using jsonwebtoken and store into database for authorization 

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
}
...

```
3. Let us finish createUser function

```
// in controllers/user.js 
import userModel from '../models/user.js';

export async function createUser (req) {
   const user = new userModel(req.body)
   try {
      const token = user.generateAuthToken(); // here, we generate auth token and save user 
      res.status(201).send({message: 'create a user'})
   } catch (error) {
      res.status(400).send({error})
   }
}
```
4. We can test our api using ***Postman***

#### Conclusion
- create routes using express 
- hash user password using bcrypt package 
- generate jwt token for authorization
#### Next Step
- finish get, patch, delete user.
- write auth method in middleware


