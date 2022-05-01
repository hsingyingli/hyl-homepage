---
title: 'Build a Task Management web app using React.js, Node.Js and  Mongodb - day 6'
app: 'Task Management App'
date: 'March 02, 2022'
excerpt: 'Day 6: auth context (frontend)'
cover_image: '/images/posts/Web-Development/task-manager.jpg'
id: 'task manager 6'
---

> This series aim to learning React Js, Node Js and Mongodb by building a task management web app. 
> This app support user authorization, create tasks which stored in Mongodb, assign task to other user, etc.

### Daily Progress
- create auth context and useAuth hook 

#### Current Directory structure
```
root
├── frontend
     ├── ...
     └─── src
        ├── context
        ├ ├── auth-context.js
        ├ └── emotion-theme.js
        ├── lib
        ├ └── theme.js
        ├── hooks
        ├ └── useTheme.js
        ├── index.css
        ├── index.js
        └── App.js
```

#### AuthProvider

1 create auth context
```
// in context/auth-context.js

import { createContext, useState } from "react";

const AuthContext = createContext({});

export function AuthProvider({children}) {
  const [auth, setAuth] = useState(null)

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  ) 
}

export default AuthContext
```
2 create useAuth hook
```
// in hooks/useAuth.js

import {useContext} from 'react'
import AuthContext from '../context/auth-context'

const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth
```

3
```
// in index.js

import {AuthProvider} from './context/auth-context';

ReactDOM.render(
  <React.StrictMode>
    <EmotionProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </EmotionProvider>
  </React.StrictMode>,
  document.getElementById('root'),
```
#### Conclusion
- we finish auth context and useAuth hooks
#### Next Step
- Create protect routes 
