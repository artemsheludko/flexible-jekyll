---
layout: post
title: Nginx 프록시 設定記
tags: [nginx,express,proxy]
---

예전에 간단한 pdf변환 + 메일링 시스템을 만들었던 적이 있는데 그 구조는 다음과 같습니다.


![](https://raw.githubusercontent.com/cheuora/cheuora.github.io/master/_posts/2022/2022-12-23-1.drawio.png)

80포트와 3000포트를 사용하는 시스템이었고 이는 AWS ubuntu에서 돌아가고 있었습니다. 

그런데 갑자기 보안 문제로 시스템에서 3000포트가 막히는 일이 발생했읍니다. 쓸 수 있는 포트는 80포트밖에 없는 상황이 된 것이죠.

그래서 express에서 돌아가는 3000포트 서버 프로그램으로 80의 하위 URL로 하나 만들어 프록시 설정을 통해 이 URL과 3000포트를 매칭시기로 했습니다. 

먼저 nginx설정을 좀 수정합니다.

nginx.conf파일내 `html{}` 섹션에 아래를 추가해 줍니다.

```
        upstream mq{
                server 127.0.0.1:3000;
        }
```

`/mq`를 `:3000/` 으로 upstream하는 부분입니다. 이 영역에는 여러개의 서버를 적을 수 있는데 **복수개를 적으면 `/mq`로 들어오는 접속이 라운드로빈 방식으로 복수개의 서버로 분산이 됩니다.**


다름은 sites-availables/default 파일의 `server{}`섹션에 location을 추가합니다. /mq를 프록시에 등록하는 것입니다.

```
        location /mq/ {
                proxy_pass http://mq;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $host;

        }
```

그 다음에는 express서버의 producer.js 파일에서  `app.post('/'...`에서`app.post('/mq'...`로 수정해줘야 합니다.(이 부분에서 많이 해멨음)

```javascript
app.post('/mq', urlencodedParser, async (req, res) => {
  //codes
}
```

nginx를 reload하고 다시 producer.js를 nohub으로 띄우면 됩니다.

기록을 위해 남겨둡니다.

