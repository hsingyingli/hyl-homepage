---
title: 'Build a Task Management web app using React.js, Node.Js and  Mongodb - day 4'
app: 'Task Management App'
date: 'February 26, 2022'
excerpt: 'Day 4: Login and Logout (Backend)'
cover_image: '/images/posts/Web-Development/task-manager.jpg'
id: 'task manager 4'
---

> This series aim to learning React Js, Node Js and Mongodb by building a task management web app. 
> This app support user authorization, create tasks which stored in Mongodb, assign task to other user, etc.

### Daily Progress
- login and logout

#### Current Directory structure
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
        └── middleware ...
```

#### Login 

> require email and password.  
> Two steps: 
> 1.find user by email in database 2.compare given password and hashed password 3. generate authorization token


##### Step 1, 2
```
// in models/user.js

userSchema.statics.findByCredentials = async function(email, password) {
    // 1. find user by email in database
    const user = await userModel.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    // 2. compare given passwod and hashed password
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}
```
##### Step 3 
```
// in controller/user.js

export async function loginUser(req, res) {
  try {
    const user = await userModel.findByCredentials(
      req.body.email,
      req.body.password,
    );
    const {accessToken, refreshToken} = await user.generateAuthToken();

    res.send({user, accessToken});
  } catch (error) {
    res.status(400).send({error});
  }
}
```
#### Logout
> remove token
```
export async function logoutUser(req, res) {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send({message: 'logout'})
    } catch (error) {
        res.status(500).send({error})
    }
}
```
#### Conclusion
- login and logout

#### Next Step
- Start front end 
