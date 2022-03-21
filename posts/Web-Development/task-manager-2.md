---
title: 'Build a Task Management web app using React.js, Node.Js and  Mongodb - day 2'
date: 'February 19, 2022'
excerpt: 'Day 2: access token and refresh token (Backend)'
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
        ├ ├── refresh.js
        ├ ├── task.js
        ├ └── user.js
        └── routes 
          ├── task.js
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
2. we hash password which is stored in database 
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
```
3.  we need to generate access token and refresh token using jsonwebtoken and store into database for authorization 

> access token and refresh token workflow:
>> server -> refresh token (long term), access token (short term) -> login user

>> user -- access token --> server -- required data --> user

>> Once access token is expired.  user -- refresh token --> server --> new access token --> user

```
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const accessToken = jwt.sign(
    {_id: user._id.toString()},
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: '30s'},
  );
  const refreshToken = jwt.sign(
    {_id: user._id.toString()},
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: '30d'},
  );
  user.tokens = user.tokens.concat({token:refreshToken});
  await user.save();
  return {accessToken, refreshToken};
}
...

```
3. handle generate new access token 
```
// in controller/refresh.js
export async function refresh(req, res) {
  try {
    if (!req.cookies?.jwt) {
      throw new Error();
    }
    const refreshToken = req.cookies.jwt;

    // find user
    const user = await userModel.findOne({'tokens.token': refreshToken});
    if (!user) {
      throw new Error();
    }
    // verify jwt
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (error, decode) => {
      // if refreshToken has expired, delete refresh token in database
      if (error || decode._id != user._id) {
        user.tokens = user.tokens.filter((token) => {
          return token.token !== refreshToken;
        });
        await user.save();
        res.clearCookie('jwt');
        return res.status(401).send({error: 'please auth'});
      }
      // generate new access token
      const accessToken = jwt.sign(
        {_id: user._id.toString()},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '30s'},
      );
      res.send({accessToken});
    });
  } catch (error) {
    res.clearCookie('jwt');
    res.status(401).send({error: 'please auth'});
  }
}
```
4. Let's finish createUser function

```
// in controllers/user.js 
import userModel from '../models/user.js';

export async function createUser (req) {
   const user = new userModel(req.body)
   try {
      const {accessToken, refreshToken} = await user.generateAuthToken();
      res.cookie('jwt', refreshToken, {httpOnly:true, sameSite: 'None', secure:true, maxAge: 24*60*60*60*1000})
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


