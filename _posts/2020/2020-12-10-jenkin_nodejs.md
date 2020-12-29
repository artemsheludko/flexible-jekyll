---
layout: post
title: jenkins에서 npm빌드 추가하기(nodejs plugin)
tags: [jenkins, docker, nodejs,npm] 
---



jenkins를 docker image로 설치하는데 이점은 많이 있다. 

* 별도로 apache나 jvm설치 및 설정이 필요 없다.
* sandbox로 운영되기 때문에 레거시 환경과 충돌 우려가 없다. 

docker jenkins image는 jenkins/jenkins를 사용하는 것을 전제조건으로 한다.

그냥 nodejs 플러그인을 jenkins에 설치하고 jenkins pipeline등에서 사용하려 하면 엄청난 에러를 만난다. 

그런데 그 에러 로그를 보면 눈에 확 들어오는 부분이 있다.

```
make failed. 
```







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

