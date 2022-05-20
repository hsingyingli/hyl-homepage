---
title: 'Container(slice, map, list)'
date: 'May 20, 2022'
excerpt: 'Container(slice, map, list)'
cover_image: '/images/posts/Golang/golang.png'
id: 'Container(slice, map, list)'
---

### Slice 
***var name [number]T***
***make([]T, size, cap)***

```
var a [1]int
var b [...]int{1, 2, 3, 4}
c := make([]int, 2, 10)

/*
  len(a) = 1 
  len(b) = 4 
  len(c) = 2
*/
```

### Map 
***map[KeyType]ValueType***

```
a := map[int]int{
  1: 2,
  2: 3,
  3: 4,
}

b := make(map[int][int])


// value = 3, ok = true
value, ok = map[2]

//  ok = false
value, ok = map[5]

delete(a, 1)
/*
a => {2:3, 3:4}
*/
```

### List 

***name := list.New()*** or ***var name list.List***

```
l := list.New()
l.PushBack("first")
element := l.PushFront(1)
l.InsertAfter('hello', element)
l.InsertBefire('hi', element)
l.Remove(element)

/*
first
1, first 
1, hello, first 
hi, 1, hello, first 
hi, hello, first
*/



for i:= l.Front(); i!= nil ; i=i.Next() {
  // 
}

```


