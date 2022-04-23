---
title: 'life cycle'
date: 'April 23, 2022'
excerpt: 'life cycle'
cover_image: '/images/posts/React/react.png'
id: 'life cycle'
---

## life cycle

1.  mounting   -> componentDidMount
2.  updating   -> componentDidUpdate
3.  unmounting -> componentWillUnmount

```
class App extends Component {
  contructor(props) {...}
  
  // life cycle func when component mounts
  componentDidMount() {
    console.log('the component is loaded')  // call api here
  }

  // life cycle func when component update (props or state change)
  componentDidUpdate(prevProps) {}

  // life cycle func when component unmounts
  componentWillUnmount() {}

  render() {
    return (...)
  }
}
```

## Example (useEffect)

```
Basic usage
// execute when every render 
useEffect(()=> {
  console.log('re-rendered')
})
...
```
### componentDidMount alternative
```
//first mount only! 
useEffect(()=> {
  console.log('first mount')
}, []); // empty dependency array
```
### componentDidUpdate alternative
```
const [value, setValue] = useState('')

// first mount and whenever dependency change!
useEffect(()=> {
  console.log('first mount')
}, [value]);
```

### componentWillUnmount alternative
```
const handleResize = () => {...}
useEffect(()=> {
  window.addEventListener('resize', handleResize);

  // execute when component unmounts. so call cleanup function
  return ()=> {
    window.removeEvemtListener('resize', handleResize);
    console.log('Unmount component')
  }
}, []);
```


## Reference 

[React Lifecycle Methods diagram](https://github.com/wojtekmaj/react-lifecycle-methods-diagram)





