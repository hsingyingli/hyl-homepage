---
title: 'Build a Task Management web app using React.js, Node.Js and  Mongodb - day 1'
date: 'February 18, 2022'
excerpt: 'This series is about how to build a task management web app use React.Js、Node.Js and Mongodb.'
cover_image: '/images/posts/Web-Development/task-manager-1.png'
id: 'task manager 1'
---

> This series aim to learning React Js, Node Js and Mongodb by building a task management web app. 
> This app support user authorization, create tasks which stored in Mongodb, assign task to other user, etc.

### Daily Progress
- Connect to a Mongodb using NodeJs and Mongoose
- Data validation  
#### Current Directory structure
```
root
├── Backend
     ├── package.json
     ├── .env
     └─── src
        └── server.js
```
#### Connect to Mongodb
Install required packages via npm: 
```
npm i mongoose validator dotenv nodemon 
```

After installing mongoose, we can connect to Mongodb which hosted in local.
```
// in .env 
DB_CONNECTION=mongodb://127.0.0.1:27017/task-manager

// in server.js 
import mongoose from "mongoose";
import 'dotenv/config' 

mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log('connect to DB')
})

// expect result   
connect to DB
```

#### Work on User Schema  
We create models folder in which we define all kinds of scheme. 
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

Mongoose scheme defines the structure of the document, default values, validators, etc. For example:

```
// in models/user.js 
import mongoose from 'mongoose';
import validator from 'validator';

const userScheme = new mongoose.Schema({
  name: {...},
  password: {...},
  email: {
    type: String,      // define data type
    unique: true,      // must be unique in collection 
    trim: true,        // ignore white space 
    validate(value) {  // data validation using validator
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalidate');
      }
    },
  },
  groups: [{group: {type: String, required: false}}],
  tokens: [...]
});

const user = mongoose.model('user', userScheme);

export default user;
```
We can simply test it 
```
// after connect to db 
// in models/user.js 

...
const user = mongoose.model('user', userScheme);
const dummy_data = {
  name: 'test',
  password: '123456789',
  email: 'yourpassword@gmail.com',
}
...

// run node user.js and check database. 

```


#### Conclusion

- We connect to Mongodb using NodeJs 
- Store environment variable in .env file 
- Finish basic data vaidation using mongoose scheme

#### Next Step

- create routes using express 
- hash user password using bcrypt package 
- define pre function of user scheme

