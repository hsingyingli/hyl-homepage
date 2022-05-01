---
title: 'Build a Task Management web app using React.js, Node.Js and  Mongodb - day 5'
app: 'Task Management App'
date: 'March 01, 2022'
excerpt: 'Day 5: global theme (frontend)'
cover_image: '/images/posts/Web-Development/task-manager.jpg'
id: 'task manager 5'
---

> This series aim to learning React Js, Node Js and Mongodb by building a task management web app. 
> This app support user authorization, create tasks which stored in Mongodb, assign task to other user, etc.

### Daily Progress
- finish global theme

#### Current Directory structure
> npx create-react-app frontend
> delete unnecessary files
```
root
├── frontend
     ├── ...
     └─── src
        ├── context
        ├ └── emotion-theme.js
        ├── lib
        ├ └── theme.js
        ├── hooks
        ├ └── useTheme.js
        ├── index.css
        ├── index.js
        └── App.js
```
#### install requires package:
```
npm install axios react-router-dom @emotion/react @emotion/styled
```
#### Theme Provider
1 we define dark theme and light theme here
```
// in lib/theme.js

export const darkTheme = {
  color: {
    bgColor: '#1A202C'
    ...
  },
  ...
}

export const lightTheme = {
  color: {
    bgColor: 'white'
    ...
  },
  ...
}
```

2 Define EmotionProvider
```
// in context/emotion-theme.js
import {createContext, useState} from 'react';
import {ThemeProvider} from '@emotion/react';
import {darkTheme, lightTheme} from '../lib/theme';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0;
  background-color: ${props => props.theme.color.bgColor};
  color: ${props=>props.theme.color.textColor};
  font-family: ${props=>props.theme.fonts.text};
`;
const ThemeContext = createContext({});

export function EmotionProvider({children}) {
  const [theme, setTheme] = useState('dark');
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <ThemeProvider theme={currentTheme}>
        <Container>{children}</Container>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
```

3 Create first custom hook 
```
// in hooks/useTheme.js

import { useContext } from "react";
import  ThemeContext  from "../context/emotion-theme";

const useTheme = () => {
  return useContext(ThemeContext)
}

export default useTheme

// we can change theme by   
// const {setTheme} = useTheme();  setTheme('light');
```

4 
```
// in index.js

import {EmotionProvider} from './context/emotion-theme';

ReactDOM.render(
  <React.StrictMode>
    <EmotionProvider>
      <App />
    </EmotionProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

```

#### Conclusion
- we finish global theme and our first very simple custom hooks

#### Next Step
- create auth context and hook for authorization
