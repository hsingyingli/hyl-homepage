---
title: 'Data Type'
date: 'May 20, 2022'
excerpt: 'Data Type'
cover_image: '/images/posts/Golang/golang.png'
id: 'Data Type'
---


### How to declear variable?
***var name type***
or
***name := value***

```
func main() {
  var integer1 int 
  var float1 float64
  var str1 string 

  var (
    integer2 int
    float2 float64 
    str2 string 
  )
  
  integer3 := 1 
  float3 := 0.2 
  str3 := "Hello World"
}
```

### initialize 
if you dont provide init value, it will auto initialize to 
* int, float: 0
* string: ""
* bool: false 
* slice, func, pointer: nil


### Integer
* int8, uint8
* int16, uint16
* int32, uint32
* int64, uint64
* int , uint

### Floating Number 
* float32 
* float64

### Boolean 
* true, false 

***boolean value cant convert to other datatype***
```
boolean := true 

// error 
fmt.Println(int(boolean) * 2)
```

### String 
* base on UTF-8

```
a := "Hello World"
b := `
  hello 
  world 
  hihihi
`
/*
  len(a) = 11
*/
```

### Char 
* uint8 (byte) : ASCII
* rune (int32): UTF-8

### Slice
***var name []T***
```
a := make([]int, 3)
b := []int{1, 2, 3}
c := "hello world"

/*
b[0:2] : 1, 2
b[1:3] : 2, 3
c[6:]  : world
*/
```

### Pointer
***ptr:= &v***

```
func swap(a, b *int) {
  t := *a 
  *a =*b 
  *b = t
}

func main() {
  x, y := 1, 2 
  swap(&x, &y)
}
```

