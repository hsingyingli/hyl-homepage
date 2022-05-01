---
title: 'Travel Map App (React.js, Style components, RapidAPI, GoogleMap) - Day 1'
app: 'Travel Map App'
date: 'May 1, 2022'
excerpt: 'Day 1: theming'
cover_image: '/images/posts/Web-Development/travel-map.png'
id: 'travel map 1'
---

### Daily Progress
1.  setup global Theme (breakpoints, size, color) using styled components


### Source Code 
[github](https://github.com/hsingyingli/travel-map) 


#### 1. Global theme

Styled components provide the ***createGlobalStyle*** function to setup global styles. first, we create globalStyles.js file where we define our global styles. 

```
// in globalStyles.js

import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({theme})=> theme.body};
    color: ${({theme})=> theme.text};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    ...
  }
`
```

if you want to provide theme switching, you can creact theme.js which define dark theme and light theme. furthermore, you can define breakpoints and size,.etc.

```
// in /lib/theme/theme.js
export const lightTheme = {
  body: '#FFFF',
  ...
}

export const darkTheme = {
  body: '#363537',
  ...
}

// in /lib/theme/breakpoints.js 

const breakpoints = {
  sm: 'max-width: 30em',
  md: 'max-width: 48em',
  lg: 'max-width: 62em',
  xl: 'max-width: 80em',
  '2xl': 'max-width: 96em',
};

export default breakpoints

// in /lib/theme/size.js
onst fontSize = {
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
  '9xl': '8rem',
};
const container = {
  xxs: '300px',
  xs: '350px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};

const size = {
  fontSize,
  container,
};

export default size;
```

Define StyleProvider which provide theme switching, theming context. 

```
// in context/styled-provider.js

import { useState, createContext } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../components/globalStyles";
import { darkTheme, lightTheme } from "../lib/theme/theme";

const ThemeContext = createContext({});

export function StyledProvider({children}) {
  const [theme, setTheme] = useState('dark');
  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

  const themeToggle = () => {
    setTheme((prev)=> (prev==='dark'?'light': 'dark'))
  }
  return (
    <ThemeContext.Provider value={{theme, themeToggle}}>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyles/>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeContext;
```

Creact useTheme hook.
```
// in hooks/useTheme.js 

import { useContext } from "react";
import ThemeContext from "../contexts/style-provider";

const useTheme = () => {
  return useContext(ThemeContext)
}

export default useTheme
// const {theme, themeToggle} = useTheme();
```

Last step: place app.js inside the styleprovider

```
// in index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {StyledProvider} from './contexts/style-provider';

ReactDOM.render(
  <React.StrictMode>
    <StyledProvider>
      <App />
    </StyledProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
```

#### Conclusion

- We define global theme, dark theme, ligt theme, breakpoints and size of components. 

#### Next Step

- render google map



