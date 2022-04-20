---
layout: post
title: gradle로 Springboot request처리
tags: [gradle, SpringBoot]
---



이 글은 전에 작성했던 **gradle로 Springboot 시작하기** 에 이어서 request 처리 방법을 기록한 것이다. 

환경 설정은 [gradle로 Springboot 시작하기](https://cheuora.github.io/2022/04/12/gralde_Spring시작하기/) 를 참조하기 바란다. 

구글링을 해 보니 여러가지 방법이 있는데 제일 간편한 것이 `javax.servlet.http.HttpServletRequest`를 이용하는 것이었다. 코드는 아래와 같다. 

```
//Controller.java
package com.runTestSample;

import javax.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class Controller {

    @RequestMapping("/")
    public String index(HttpServletRequest request) {
            System.out.println("ID: " + request.getParameter("userId"));
            return "<h1>ID는 ... " + request.getParameter("userId") + "</h1>";
    }

}
```

재미 있는 것은 getParameter()가 방식에 상관은 없다는 점이다(GET, POST모두 처리). 위 코드는 `userId`리퀘스트 파라미터를 읽어들여 `<h1>...</h1>` 태그와 함께 뿌려주는 코드인데, GET, POST모두 동일하게 동작한다. 



개인적으로는 Java와 인연이 거의 없어서 다루질 않았는데 학생들이 대부분 백엔드 서버를 SpringBoot로 하는 바람에 나도 같이 보게 되었다. 

기억을 위해 남겨 놓는다.
