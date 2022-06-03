---
title: 'Google Document Clone (React.js, Style components, Draft.js) - Day 1'
app: 'Google Document Clone'
date: 'May 4, 2022'
excerpt: 'Day 1: '
cover_image: '/images/posts/Web-Development/google-doc-clone.png'
id: 'google doc 1'
---

## Dynamic Routing and CLR practice

### Source Code 
[github](https://github.com/hsingyingli/google-doc-clone) 
### Demo 
[Link](https://drive.google.com/file/d/1sdMaLQ2JaQowXs5LWoHbS8dDGnhrCcwI/view?usp=sharing)

### Dynamic Route 

set up docId as variable 
***<Route path='/doc/:docId' element={<Doc/>}/>***
```
// in app.js

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Doc from './pages/Doc';
import Home from './pages/Home';
function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/doc/:docId' element={<Doc/>}/>
      </Routes>
    </Router>
  );
}

export default App;

```

we can get the variable using ***useParam***. And then, we can rendor the page according the ID using CLR

```
import {useParams} from 'react-router-dom'
import { Container } from './style';
import TextEditor from '../../components/TextEditor';
export default function Doc() {
  const params = useParams();
  return (
    <Container>
      <TextEditor _id={params.docId}/>
    </Container>
  )
}
```
### Client Side Rending 
The content of page is decided when the component is mounting. We can use ***useEffect*** hook to query the content by docId in ***componentDidMount life cycle***.

```
...

export default function TextEditor({_id}) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
    const content = convertToRaw(editorState.getCurrentContent());
    updateDocAPI(_id, content)
  }

  useEffect(()=> {
    const getDoc = async () => {
      const data = await getDocAPI(_id)
      console.log(JSON.parse(data.data))
      if (data?.data) {
        setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(data.data))));
      }
    }
    getDoc();
  }, [])
  return (
    <Container>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbar"
        wrapperClassName="wrapper"
        editorClassName="editor"     
        onEditorStateChange={onEditorStateChange}
    />
    </Container>
  )

}
```

