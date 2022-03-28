---
title: 'Build a Task Management web app using React.js, Node.Js and  Mongodb - day 7'
date: 'March 07, 2022'
excerpt: 'Day 7: protect route (frontend)'
cover_image: '/images/posts/Web-Development/task-manager.jpg'
id: 'task manager 7'
---

> This series aim to learning React Js, Node Js and Mongodb by building a task management web app. 
> This app support user authorization, create tasks which stored in Mongodb, assign task to other user, etc.

### Daily Progress
- Create protect routes 

#### Current Directory structure
```
root
├── frontend
     ├── ...
     └─── src
        ├── context
        ├── lib
        ├── hooks
        ├── index.css
        ├── index.js
        └── App.js
```

#### react-route-dom
> npm i react-route-dom

```
// in App.js
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Home from './pages/Home';
import RequireAuth from './components/require_auth';
import PersistLogin from './components/presist_login';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* public pages*/}
        <Route exact path="/login" element={<SignIn />} />
        <Route exact path="/register" element={<Register />} />


        {/*   Protect Routes: auto refresh our access token here*/}
        <Route element={<PersistLogin />}>

          {/*   Protect Routes: check access token */}
          <Route element={<RequireAuth />}>

            {/* private pages */}
            <Route exact path="/" element={<Home />} />
          </Route>
        </Route>

      </Routes>
    </Router>
  );
}
```
#### SignIn, Register, Home, RequireAuth, PersistLogin 
source code: [github](https://github.com/hsingyingli/task-manager-project/tree/main/frontend) 

#### Conclusion
- Create protect routes 
#### Next Step
- axios
