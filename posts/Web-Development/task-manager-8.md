---
title: 'Build a Task Management web app using React.js, Node.Js and  Mongodb - day 8'
date: 'March 10, 2022'
excerpt: 'Day 8: axios (frontend) and demo'
cover_image: '/images/posts/Web-Development/task-manager.jpg'
id: 'task manager 8'
---

> This series aim to learning React Js, Node Js and Mongodb by building a task management web app. 
> This app support user authorization, create tasks which stored in Mongodb, assign task to other user, etc.

### Daily Progress
- axios

### Source Code 
[github](https://github.com/hsingyingli/task-manager-project/tree/main/frontend) 

#### Current Directory structure
```
root
├── frontend
     ├── ...
     └─── src
        ├── api
        ├── context
        ├── lib
        ├── hooks
        ├── index.css
        ├── index.js
        └── App.js
```

#### basic axios setup 

```
// in api/axios.js
import axios from "axios";

// store in .env file 
const BASE_URL = 'http://localhost:3001'

export default axios.create({
  baseURL: BASE_URL
})

export const axiosPrivate =  axios.create({
  baseURL: BASE_URL,
  header: {'Content-Type': 'application/json'},
  withCredentials: true
})
```
#### useRefresh hook 

```
// in hooks/useRefresh.js 
import useAuth from "./useAuth";
import refreshTokenAPI from "../api/refreshToken";

const useRefreshToken = () => {
  const {setAuth} = useAuth();

  const refresh = async () => {
    const res = await refreshTokenAPI()
    setAuth((prev) => {
      return {...prev, user: res.data.uesr, accessToken: res.data.accessToken}})

    localStorage.setItem('user', res.data.user.name)
    return res.data.accessToken
  }
  return refresh
}

export default useRefreshToken

```
#### axios hooks 

```
// in hooks/useAxiosPrivate.js 
import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefresh";
import useAuth from "./useAuth";


const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const {auth} = useAuth();

  useEffect(()=> {

    {/* set up request header before sent to backend*/}

    const reqIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth.accessToken}` 
        }
        return config
      }, (error) => Promise.reject(error)

    )
    
    {/* if our access token is expired, get new one and send request again*/}

    const resIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent){
          prevRequest.sent = true
          const newAccessToken = await refresh();
          prevRequest.headers[`Authorization`] = `Bearer ${newAccessToken}`
          return axiosPrivate(prevRequest)
        }
        return Promise.reject(error)
      }
    )
    return () => {
      axiosPrivate.interceptors.request.eject(reqIntercept)
      axiosPrivate.interceptors.response.eject(resIntercept)
    }
  }, [auth, refresh])
  return axiosPrivate
}

export default useAxiosPrivate

```

#### Conclusion
- we can send private request using useAxiosPrivate hooks 
- auto refresh our access token 
- if refresh token and access token are expired, we need to login again to get new refresh token

    ! [demo] (#### Current Directory structure
```
root
‚îú‚îÄ‚îÄ frontend
     ‚îú‚îÄ‚îÄ ...
     ‚îî‚îÄ‚îÄ‚îÄ src
        ‚îú‚îÄ‚îÄ api
        ‚îú‚îÄ‚îÄ context
        ‚îú‚îÄ‚îÄ lib
        ‚îú‚îÄ‚îÄ hooks
        ‚îú‚îÄ‚îÄ index.css
        ‚îú‚îÄ‚îÄ index.js
        ‚îî‚îÄ‚îÄ App.js
```

#### basic axios setup 

```
// in api/axios.js
import axios from "axios";

// store in .env file 
const BASE_URL = 'http://localhost:3001'

export default axios.create({
  baseURL: BASE_URL
})

export const axiosPrivate =  axios.create({
  baseURL: BASE_URL,
  header: {'Content-Type': 'application/json'},
  withCredentials: true
})
```
#### useRefresh hook 

```
// in hooks/useRefresh.js 
import useAuth from "./useAuth";
import refreshTokenAPI from "../api/refreshToken";

const useRefreshToken = () => {
  const {setAuth} = useAuth();

  const refresh = async () => {
    const res = await refreshTokenAPI()
    setAuth((prev) => {
      return {...prev, user: res.data.uesr, accessToken: res.data.accessToken}})

    localStorage.setItem('user', res.data.user.name)
    return res.data.accessToken
  }
  return refresh
}

export default useRefreshToken

```
#### axios hooks 

```
// in hooks/useAxiosPrivate.js 
import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefresh";
import useAuth from "./useAuth";


const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const {auth} = useAuth();

  useEffect(()=> {

    {/* set up request header before sent to backend*/}

    const reqIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth.accessToken}` 
        }
        return config
      }, (error) => Promise.reject(error)

    )
    
    {/* if our access token is expired, get new one and send request again*/}

    const resIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent){
          prevRequest.sent = true
          const newAccessToken = await refresh();
          prevRequest.headers[`Authorization`] = `Bearer ${newAccessToken}`
          return axiosPrivate(prevRequest)
        }
        return Promise.reject(error)
      }
    )
    return () => {
      axiosPrivate.interceptors.request.eject(reqIntercept)
      axiosPrivate.interceptors.response.eject(resIntercept)
    }
  }, [auth, refresh])
  return axiosPrivate
}

export default useAxiosPrivate

```

#### Conclusion
- we can send private request using useAxiosPrivate hooks 
- auto refresh our access token 
- if refresh token and access token are expired, we need to login again to get new refresh token


[Demo](https://drive.google.com/file/d/1Lyrp9QXk4rrNhHmBheNbunu3a611e694/view?usp=sharing)

