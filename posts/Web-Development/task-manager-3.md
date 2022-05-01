---
title: 'Build a Task Management web app using React.js, Node.Js and  Mongodb - day 3'
app: 'Task Management App'
date: 'February 25, 2022'
excerpt: 'Day 3: express routes and middlewares (Backend)'
cover_image: '/images/posts/Web-Development/task-manager.jpg'
id: 'task manager 3'
---

> This series aim to learning React Js, Node Js and Mongodb by building a task management web app. 
> This app support user authorization, create tasks which stored in Mongodb, assign task to other user, etc.

### Daily Progress
- finish get, patch, delete user.
- write auth method in middleware

#### Current Directory structure
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

#### Finish Auth method
##### Before we work on the get, patch, delete method, we need to make sure only authorized user can modify their data and can't modify other's data.
We create middleware folder
```
root
├── Backend
     ├── package.json
     ├── .env
     └─── src
        ├── server.js
        ├── models ...
        ├── controllers ...
        ├── routes ...
        └── middleware
          └─── auth.js
```
##### authorization process
> get token from request header -> verify token and get user id -> find user in database by id.

```
// in middleware/auth.js

import userModel from '../models/user.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default async function auth(req, res, next) {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await userModel.findOne({_id: decode._id, 'tokens.token': token});

    if (!user) {
      throw new Error()
    }
    req.user = user 
    req.token = token
    next();
  } catch (error) {
    res.status(401).send({error: 'please authenticate.'})
  }
}
```
##### Authorization before get, patch, delete user
```
// in routes/user.js
import auth from '../middlewares/auth.js';
...
// get user info
router.get('/me', auth, getUser);

// delete user
router.delete('/me', auth, deleteUser);

// update user
router.patch('/me', auth, updateUser);
...
```
##### finish get, patch, delete method 
1.Get user data 
because we already authenticate user and store user in request, just send user data
```
export async function getUser(req, res) {
  res.send(req.user);
}
```

2.Update user data
```
export async function updateUser(req, res) {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );

  if (!isValidOperation) {
    res.status(400).send({error: 'Not a validate operation'});
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(500).send({error});
  }
}
```

3.Delete user 
```
export async function deleteUser(req, res) {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send({error: 'try later'});
  }
}
```

#### Conclusion
- finish get, patch, delete user.
- write auth method in middleware

#### Next Step
- login and logout
