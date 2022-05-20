---
title: 'flow control'
date: 'May 20, 2022'
excerpt: 'flow control'
cover_image: '/images/posts/Golang/golang.png'
id: 'flow control'
---


### if else 

```
if condition1 {
  ...
} else if condition2 {
  ...
} else {
  ...
}
```

### for loop 

```
for i:=0; i<100; i+= 1 {
  ...
}

for condition {

}

for k, v := range slice {

}
```


### goto 

```
for condition1 {
  ...
  if error{
    goto onExit 
  }
}
...

return 

onExit:
  ...

```
