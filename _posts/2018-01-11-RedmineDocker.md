---
layout: post
title: Redmine-docker컨테이너와 플러그인..
img : 
tags: [redmine, docker]
---

가끔 레드마인을 프로젝트 및 테스트 관리 도구로 컨설팅시 제안을 하는 경우가 있습니다.  
이때 용이한 관리를 위해 docker 이미지 형태로 만들어 배포를 했었는데 문제가 있었으니 레드마인의 플러그인들을 사용하기가 좀 어렵다는 점입니다. (Agile Plugin, Checklist Plugin을 정말 쓰고 싶었습니다  T_T)

구글 신에게도 물어 봤지만 별 답이 나오지 않아 마침 하루 시간이 비어 날잡아 삽질을 해 보았고 그 기록을 여기에 적어보려 합니다. 

제가 사용한 redmine-docker 이미지는 https://github.com/bitnami/bitnami-docker-redmine 에 있는 bitnami-redmine 입니다 (Redmine 버전 3.4.4)

설치하면 로컬 서버와 볼륨을 공유하는데 위치는 아래와 같습니다. 

```
>> cd /var/lib/docker/volumes/root_redmine_data/_data/redmine
>> ls
conf  files  plugins  public
```

원하는 플러그인을 다운 받아 plugin 디렉토리에 unzip을 해 줍니다. 저는 2개의 플러그인을 unzip 했습니다. 

```
>>cd /var/lib/docker/volumes/root_redmine_data/_data/redmine/plugin
>>ls
README  redmine_agile  redmine_checklists
```


redmine컨테이너에 접속해 봅니다. 

```
>> docker exec -i -t root_redmine_1 /bin/bash
root@07f6484a2359:/#
```

> ### bundle install --no-deployment 의 수행 

이 명령은 redmine 컨테이너에서 실행해야 합니다.  하지만 redmine 컨테이너에는 최소한의 운영 파일만 들어 있어 설치하면 무수한 에러를 만나게 됩니다. bundle install시에는 c컴파일러 및 make가 작동되게 되는데 이를 위한 환경을 만들어 줘야 합니다. 

#### 1.  apt-get의 업데이트

```
root@07f6484a2359:/# apt-get update
```

#### 2.  gcc설치

```
root@07f6484a2359:/# apt-get install gcc
```

#### 3. make설치

```
root@07f6484a2359:/# apt-get install make
```

#### 4. pkg-config 설치 

```
root@07f6484a2359:/# apt-get install pkg-config
```

이제 c컴파일을 위한 환경은 만들었읍니다. 이제 필요 라이브러리를 차례로 설치합니다. 

#### 5. libxml2 설치 
nokogiri를 위한 libxml2를 설치 합니다. 

```
root@07f6484a2359:/# apt-get install libxml2 
```

#### 6.  libmysqlclient-dev설치
mysql접속을 위한  libmysqlclient-dev를 설치합니다. 

```
root@07f6484a2359:/# apt-get install libmysqlclient-dev
```

#### 7. libpq-dev 설치
PostgreSQL 접속을 위한 libpq-dev를 설치합니다. 

```
root@07f6484a2359:/# apt-get install libpq-dev
```

#### 8. imagemagick, libmagickcore-dev, libmagickwand-dev 설치
image 핸들링을 위한 라이브러리를 설치 합니다. 

```
root@07f6484a2359:/# apt-get install imagemagick libmagickcore-dev libmagickwand-dev
```
<br><br>

이제 remine의 Gemfile이 위치한 곳으로 가서 bundle install을 수행합니다. 

```
root@07f6484a2359:/# cd /opt/bitnami/redmine/
root@07f6484a2359:/# bundle install --no-deployment
```

<br>

> ### Redmine의 재시작

다른 docker bitnami서비스들은 재시작 shell script이 있던데 redmine의 경우는 못찾았습니다. 그냥 로컬 서버에서 docker 컨테이너를 stop했다가 start하면 되는(또는 restart하면 되는) 거였습니다. mariadb컨테이너까지 같이 해 줘야 합니다. 

```
>> docker restart root_redmine_1 
>> docker restart root_mariadb_1
```

결과는 아래 그림처럼 올라와야 합니다. 

<img src='https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/J8k/image/yue7bWvt17fhHaFSHz3ys2QOpbg.png'>
