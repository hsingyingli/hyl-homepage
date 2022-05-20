---
title: 'Travel Map App (React.js, Style components, RapidAPI, GoogleMap) - Day 2'
app: 'Travel Map App'
date: 'May 2, 2022'
excerpt: 'Day 2: render google map'
cover_image: '/images/posts/Web-Development/travel-map.png'
id: 'travel map 2'
---

### Daily Progress
- render google map

### Source Code 
[github](https://github.com/hsingyingli/travel-map) 
### Demo 
[Link](https://travel-map-rust.vercel.app/)

### Install required packages via npm: 
* @react-google-maps/api

#### Current Directory structure
```
src
 ├── contexts
 ├── components
 ├── hooks
 ├── lib
 ├── pages
 ├── index.js
 ├── index.css
 └─── App.js
```

#### Render Google Map
* step1: import requrie components
```
import {
  GoogleMap,
} from '@react-google-maps/api';
```

* step2: provide google api key and options
```
 const options = useMemo(
    () => ({
      mapId: process.env.REACT_APP_DARK_MAP_ID,
      disableDefaultUI: true,
      clickableIcons: true,
    }),
    [],
  );
```
* step3: render google map
```
<GoogleMap
  zoom={}
  center={}
  onLoad={}
  options={options}
>
  {  
    In here, we can add some useful components. 
    ex: direction between two place (provide latitude and longitude),
        mark where you interest in and show some imformation about that place
  }     
</GoogleMap>
```

#### Add Marker on Map 
just provide latitude and longitude
```
import {
  Marker
} from @reac-google-map/api

...

<GoogleMap
  ...
>
  <Marker position={{latitude, longitude}}>

</GoogleMap>
```

#### provide route between two place 

In order to prevent DirectionsService keep requesting for directions and updating the dom tree, I use useMemo hook to request for directions when destination change or center change.

```
import {
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api';


const directions = useMemo(() => {
    if (location === null || center === null) return null;

    return (
      <DirectionsService
        // required
        options={{
          destination: location,
          origin: center,
          travelMode: 'DRIVING',
        }}
        // required
        callback={(res) => {
          if (res !== null) {
            if (res.status === 'OK') {
              setResponse(res);
            } else {
              console.log('response: ', res);
            }
          }
        }}
      />
    );
  }, [location, center]);

  const routes = useMemo(() => {
    if (response === null) return null;
    return (
      <DirectionsRenderer
        options={{
          directions: response,
        }}
      />
    );
  }, [response]);

<GoogleMap
  ...
>

</GoogleMap>

```




#### Conclusion
- render google map
- add marker 
- add route between two location

#### Next Step
- rapid api
