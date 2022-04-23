---
title: 'Event loop'
date: 'April 23, 2022'
excerpt: 'Event loop'
cover_image: '/images/posts/Javascript/js.png'
id: 'Event loop'
---
## Example
```
console.log('Starting')

setTimeout(() => {
  console.log('2 sec timer')
}, 2000)

setTimeout(() => {
  console.log('0 sec timer')
}, 0)

console.log('End')

--------console-------------
Starting 
End 
0 sec timer
2 sec timer
```

## What happened behind the scene?
* Call stack: LIFO (last in, first out)
* Callback Queue: FIFO (first in, first out)
* Event Loop needs to wait for the call stakc to be empty (img 4)

1. 
![](https://i.imgur.com/4gQJ7vy.png)
2. 
![](https://i.imgur.com/WziunbD.png)
3. 
![](https://i.imgur.com/GKWSW8E.png)
4. 
![](https://i.imgur.com/dFA6TFq.png)
5. 
![](https://i.imgur.com/CHecJNN.png)
6. 
![](https://i.imgur.com/iQ9xeDe.png)
7. 
![](https://i.imgur.com/MdR24Xn.png)


