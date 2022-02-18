---
title: 'Build a Task Management web app using React.js, Node.Js and  Mongodb - day 1'
date: 'February 18, 2022'
excerpt: 'This series is about how to build a task management web app use React.Js、Node.Js and Mongodb.'
cover_image: '/images/posts/Web-Development/task-manager-1.png'
---

> This series aim to learning React Js, Node Js amd Mongodb by building a task management web app. 
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
#### Mongodb
Install required packages via npm: 
```
npm i mongoose dotenv nodemon 
```

After installing mongoose, we can connect to Mongodb which hosted in local.
```
# in .env 
DB_CONNECTION=mongodb://127.0.0.1:27017/task-manager

# in server.js 
import mongoose from "mongoose";
import 'dotenv/config' 

mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log('connect to DB')
})

# expect result   
connect to DB
```

#### Work on User Schema  
