---
layout: post
title: jenkins docker image에 gcc make 반영 설치...
tags: [jenkins, docker] 
---



jenkins docker image에 build-essential를 반영하여 설치 방법

1. Dockerfile을 작성하여 저장. (파일명 : Dockerfile)

```
FROM jenkins/jenkins:lts
USER root
# ...
RUN apt-get update
RUN apt-get -y install build-essential
```

2. Dockerfile이 존재하는 위치에서 docker build 수행

```
docker build -t jenkinsgcc .
```



기록을 위해 남겨놓는다. 

