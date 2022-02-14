---
layout: post
title: nginx-unit docker image https적용
tags: [nginx, SSL]
---



이번에는 nginx-unit docker image의 SSL적용 과정을 참고로 기록해 본다. 



apt를 사용하여 certibot을 install 한다. 

```
$ sudo apt-get update #apt-get 업데이트
$ sudo apt-get install software-properties-common #선행 소프트웨어 설치
$ sudo add-apt-repository ppa:certbot/certbot #저장소 추가
$ sudo apt-get update #apt-get 업데이트
$ sudo apt-get install certbot #certbot 설치
```



Certibot의 인증 방법은 Standalone 방식 및 Webroot방식이 있는데, 여기서는 standalone을 사용한다. 이 방법은 잠시 80이나 443을 사용하는 서비스를 다운시켜야 한다. 

다운 시킨 후에..

```
sudo certbot certonly –standalone -d [도메인명]
```



그럼 많은 내용들이 출력되는데.. 중요한 것은 pem파일들의 위치를 캐치해야 한다.

```
...
Congratulations! Your certificate and chain have been saved at:
/etc/letsencrypt/live/[도메인명]/fullchain.pem
Your key file has been saved at:
/etc/letsencrypt/live/[도메인명]/privkey.pem
Your cert will expire on 2022-05-14. To obtain a new or tweaked
version of this certificate in the future, simply run certbot
again. To non-interactively renew *all* of your certificates, run
"certbot renew"
```



`fullchain.pem`, `privkey.pem` 을 nginx unit에 적용하기 위해서는 하나로 합쳐 주어야 한다. cat을 이용하여 bundle1.pem으로 합친다

```
cat /etc/letsencrypt/live/[도메인명]/fullchain.pem /etc/letsencrypt/live/[도메인명]/privkey.pem > bundle1.pem
```



docker 이미지에서 bundle1.pem은 `/docker-entrypoint.d/` 에 있어야 한다. DockerFile에서 이를 추가한다. 이전 포스팅 [NGINX UNIT으로 MSA](https://cheuora.github.io/2022/02/11/ngixunit/) 에 있는 Docker파일로 작업하겠다. 



```
# Using base image provided by nginx unit

# nginx unit node16이 깔려있는 버전 받아옴(1.26.1-node16)
FROM nginx/unit:1.26.1-node16

# docker 이미지 내 /docker-entrypoint.d/ 디렉토리에 설정한 config.json 파일 복사
COPY config.json /docker-entrypoint.d/config.json
COPY bundle1.pem /docker-entrypoint.d/bundle1.pem 

# express의 메인 js파일인 app.js 복사. 기타 다른 라이브러리 있으면 같이 /www/에 복사
COPY app.js /www/

# grapeql서버를 위한 install
RUN cd /www && npm install express express-graphql graphql --save

# Express를 위한 nginx unit-http install
RUN cd /www && npm install -g --unsafe-perm unit-http
RUN cd /www && npm link unit-http

# 사용하려는 포트 expose
EXPOSE 8080
```



8행 `COPY bundle1.pem /docker-entrypoint.d/bundle1.pem`이 추가되었다. 



config.json파일도 맞추어 바꿔야 한다. 

```json
{
    "listeners": {
        "*:8080": {
            "pass": "applications/express",
            "tls":{
                    "certificate": "bundle1"
            }
        }
    },

    "applications": {
        "express": {
            "type": "external",
            "working_directory": "/www/",
            "executable": "/usr/bin/env",
            "arguments": [
                "node",
                "--loader",
                "unit-http/loader.mjs",
                "--require",
                "unit-http/loader",
                "app.js"
            ]
        }
    }
}
```



5행부터 "tls" 부분이 추가된 영역이며, "certificate"에 pem파일명을 적으면 된다. 



이제 수정은 끝났다. docker build를 해 주면 끝.



`docker build --tag=expressql .`



https://[도메인]:8080 으로 접속해서 정상적으로 화면이 출력되면 된다. 



