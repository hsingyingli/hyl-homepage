---
title: 'Segmantic Segmentation'
date: 'March 29, 2022'
excerpt: 'Segmantic Segmentation (python)'
cover_image: '/images/posts/Machine-Learning/segmantic.png'
id: 'segmantic segmentation``'
---

# Introduction
I implemented Fully Convolutional Dense Net(FCDenseNet) and experiment on semantic segmentaton with CamVid dataset. Moreover, because of the lost of feature of image is caused by maxpooling layer, we use a convolutional layer with two stride instead of maxpooling layer. The experiment result achieve better perfromance than original FC-DenseNet which is using maxpooling.

### Source Code 
You can find the experiment result and all the detail in this github repository
[github](https://github.com/hsingyingli/FC-DenseNet)






