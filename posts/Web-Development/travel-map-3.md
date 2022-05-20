---
title: 'Travel Map App (React.js, Style components, RapidAPI, GoogleMap) - Day 3'
app: 'Travel Map App'
date: 'May 3, 2022'
excerpt: 'Day 3: rapid api'
cover_image: '/images/posts/Web-Development/travel-map.png'
id: 'travel map 3'
---

### Daily Progress
- rapid api

### Source Code 
[github](https://github.com/hsingyingli/travel-map) 
### Demo 
[Link](https://travel-map-rust.vercel.app/)

### Install required packages via npm: 
* axios
#### Current Directory structure
```
src
 ├── contexts
 ├── api
 ├── components
 ├── hooks
 ├── lib
 ├── pages
 ├── index.js
 ├── index.css
 └─── App.js
```
#### RapidAPI
* signup rapid api
* search "travel advisor" and get api key.
[RapidAPI](https://rapidapi.com/apidojo/api/travel-advisor)

#### Create api 
* RapidAPI provide endpoins and example code 
```
import axios from 'axios';

export const getPlacesData = async (type, boundary) => {
  try {
    const options = {
      method: 'GET',
      url: `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      params: {
        bl_latitude: boundary.south.toString(), 
        tr_latitude: boundary.north.toString(), 
        bl_longitude: boundary.west.toString(), 
        tr_longitude: boundary.east.toString(), 
        limit: '30',
      },
      headers: {
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY,
      },
    };

    const {
      data: {data},
    } = await axios.request(options);
    return data;
  } catch (e) {
    console.log(e);
  }
};
```

#### Conclusion
- Day 1: Ceate global theme which includes color, breakpoints, fontsize .etc.
- Day 2: Render Google Map using @react-google-maps/api. They provide a very clean documentation [link](https://react-google-maps-api-docs.netlify.app/)
- Day 3: Use RapidAPI to query realtime informations  
- all detail can be found in [github](https://github.com/hsingyingli/travel-map) 
- see demo [here](https://travel-map-rust.vercel.app/)





