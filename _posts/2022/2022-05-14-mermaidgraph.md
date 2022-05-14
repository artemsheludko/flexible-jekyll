---
layout: post
title: mermaid flowchart가 꼬였을때 팁..
tags: [mermaid.js]
---



mermaid.js로 다이어그램을 그릴 일이 많은데 가끔 잘못 오브젝트들을 배치하면 화살표가 꼬여버리는 일이 있다. 이를 정리하는 방법(개념)을 기록으로 남긴다. 

아래와 같은 다이어그램에서 마지막으로 웹서버에서 사용자로 피드백을 하는 흐름을 하나 더 추가하려 했다. 

[![](https://mermaid.ink/img/pako:eNplU8tO20AU_RVrFhVIRKjbtMoiGKRu2KQ7pgs_JsSSPbbGY6KKIKWQLtqmIhJJW1EHUqlFUEVqoCxCxdd064nUT-idceIY45Efc-fcc8-cO95Hlm8TVEZ1129aDYNxTOUII3OXGUFDE4djcXolznqY2g4jFnd8qr2sYtok5gpG_84__Xhusor4epdMu8nwXpxOxKiN0SqmRhAoxMm1RCQ_L5NJXwBicA3LGqaE2rKUm_L02wr1LU5O4mQyTc4nohMrnkyCVipVWhj9PWtre0_XPbJeJ8TGqOWaOcGgq0bYHmE7oAkokpvOK0w1uB7ql5FQAVX5z53FPd9OmqoESKgYTsXFcP598yW5GIv4Uozi2SCe7yRT4EecMEw39G3F3L2SjE-oGQbP8k9YfxxU9fTt2gqkwguyexBazczKe1GqLEqlwzWlQZpy6A3YkjmhpevLeQY7BBglzXALjFRij49UF97divffZ_176IUmjbjrwFxpw3SBX7Ic5Vg2DKtBFNXHX0Uq8acnPsRp8x-zgNetCDrygtb9Iku2bTEaJL9vM6ICz5Io8ENeJJkdj6WU7ttcOqYPSioWGdGrO5BZKCtJ9CrkwYHKCqgUOUtTsiJ5MKZoDXmEeYZjw7-2L48RRrxBPIJRGT5tUjcil2OE6QFAo8A2ONm0He4zVK4bbkjWkBFxv_aaWqjMWUQWIN0x4NR5c9TBfyCzqmw)](https://mermaid.live/edit#pako:eNplU8tO20AU_RVrFhVIRKjbtMoiGKRu2KQ7pgs_JsSSPbbGY6KKIKWQLtqmIhJJW1EHUqlFUEVqoCxCxdd064nUT-idceIY45Efc-fcc8-cO95Hlm8TVEZ1129aDYNxTOUII3OXGUFDE4djcXolznqY2g4jFnd8qr2sYtok5gpG_84__Xhusor4epdMu8nwXpxOxKiN0SqmRhAoxMm1RCQ_L5NJXwBicA3LGqaE2rKUm_L02wr1LU5O4mQyTc4nohMrnkyCVipVWhj9PWtre0_XPbJeJ8TGqOWaOcGgq0bYHmE7oAkokpvOK0w1uB7ql5FQAVX5z53FPd9OmqoESKgYTsXFcP598yW5GIv4Uozi2SCe7yRT4EecMEw39G3F3L2SjE-oGQbP8k9YfxxU9fTt2gqkwguyexBazczKe1GqLEqlwzWlQZpy6A3YkjmhpevLeQY7BBglzXALjFRij49UF97divffZ_176IUmjbjrwFxpw3SBX7Ic5Vg2DKtBFNXHX0Uq8acnPsRp8x-zgNetCDrygtb9Iku2bTEaJL9vM6ICz5Io8ENeJJkdj6WU7ttcOqYPSioWGdGrO5BZKCtJ9CrkwYHKCqgUOUtTsiJ5MKZoDXmEeYZjw7-2L48RRrxBPIJRGT5tUjcil2OE6QFAo8A2ONm0He4zVK4bbkjWkBFxv_aaWqjMWUQWIN0x4NR5c9TBfyCzqmw)



아래는 추가 후의 모습(꼬였다)



[![](https://mermaid.ink/img/pako:eNplU8tO20AU_RVrFhVIRKjbtMoiGKRu2KQ7pgs_JsSSPbbGY6KKIKWQLtqmIhJJW1EHUqlFUEVqoCxCxdd064nUT-idceIY45Efc-ecc8_cO95Hlm8TVEZ1129aDYNxTOUII3OXGUFDE4djcXolznqY2g4jFnd8qr2sYtok5gpG_84__Xhusor4epdMu8nwXpxOxKiN0SqmRhAoxMm1RCQ_L5NJXwBicA3LGqaE2jKVm-r02wr1LU5O4mQyTc4nohMrncyCVipVWhj9PWtre0_XPbJeJ8TGqOWaOcPgq0bYHmE74AkkkpvOK0w1uB76l5FQAVX6z53FPd9OSlUGJFQMp-JiOP---ZJcjEV8KUbxbBDPd5I58CNOGKYb-rZS7l5JxSfUDINn-SesPw6qfPp2bQWo8AJ2D0KrWbHytShVFqnS4ZqyQJqq0BsoS1YJTa4uZxKUa2txSfEPgU9JM9yCCqtdHB-p9ry7Fe-_z_r30CRNVuiuA3NlGtMFfqlylFPZMKwGUVIffxWlxJ-e-BCnp-KxCjShFUGrXtC6X1TJ9iFGg-T3bSZU0FkKBX7IiyKz47G00n2bo2P6IKVSkRG9ugPMQlopoleBByctS6AocpZSsiR5MKZoDXmEeYZjw0-4L88XRrxBPIJRGT5tUjcil2OE6QFAo8A2ONm0He4zVK4bbkjWkBFxv_aaWqjMWUQWIN0x4Dh6c9TBfz3ItiY)](https://mermaid.live/edit#pako:eNplU8tO20AU_RVrFhVIRKjbtMoiGKRu2KQ7pgs_JsSSPbbGY6KKIKWQLtqmIhJJW1EHUqlFUEVqoCxCxdd064nUT-idceIY45Efc-ecc8_cO95Hlm8TVEZ1129aDYNxTOUII3OXGUFDE4djcXolznqY2g4jFnd8qr2sYtok5gpG_84__Xhusor4epdMu8nwXpxOxKiN0SqmRhAoxMm1RCQ_L5NJXwBicA3LGqaE2jKVm-r02wr1LU5O4mQyTc4nohMrncyCVipVWhj9PWtre0_XPbJeJ8TGqOWaOcPgq0bYHmE74AkkkpvOK0w1uB76l5FQAVX6z53FPd9OSlUGJFQMp-JiOP---ZJcjEV8KUbxbBDPd5I58CNOGKYb-rZS7l5JxSfUDINn-SesPw6qfPp2bQWo8AJ2D0KrWbHytShVFqnS4ZqyQJqq0BsoS1YJTa4uZxKUa2txSfEPgU9JM9yCCqtdHB-p9ry7Fe-_z_r30CRNVuiuA3NlGtMFfqlylFPZMKwGUVIffxWlxJ-e-BCnp-KxCjShFUGrXtC6X1TJ9iFGg-T3bSZU0FkKBX7IiyKz47G00n2bo2P6IKVSkRG9ugPMQlopoleBByctS6AocpZSsiR5MKZoDXmEeYZjw0-4L88XRrxBPIJRGT5tUjcil2OE6QFAo8A2ONm0He4zVK4bbkjWkBFxv_aaWqjMWUQWIN0x4Dh6c9TBfz3ItiY)

완전히 흐름이 보기 싫게 꼬여 버렸다.  이는 스크립트내 오브젝트 순서를 조정을 하면 되는데 다음의 원칙이 있는 것 같다(이는 내가 발견한 것이다. 추측이다.)



* <u>일반 오브젝트는 위에서 아래의 순서로 정의를 해야 한다.</u> 
* <u>Subgraph(노란 박스로 객체를 묶은것)은 반대의 순서이다. 아래에서 위로 가야 한다.</u> 



아래 스크립트를 보자

subgraph는 사용자 --> 웹서버 --> outer 순으로 스크립팅 되어 있다. 

여기서 웹서버 --> 사용자 흐름을 추가하니 꼬인 것이다.  

```
flowchart

subgraph 사용자
    direction TB
    web("🖥<br>웹브라우저")
    app("📱<br>모바일앱") 
end

lb("🔀<br>로드밸런서")
사용자 -->|"➀ v1/me/feed"|lb

subgraph webServer[웹서버]
    direction TB
    server("🗄🗄🗄<br>웹서버")
    인증
    처리율제한
end

subgraph outer
    CDN("🌩<br>&nbsp;&nbsp;&nbsp;CDN&nbsp;&nbsp;&nbsp;")
    DNS(("DNS🌐"))
end

사용자 ---> outer


lb --> |"➁"|webServer 

webServer --> 사용자

webServer --> |"➂"|newsFeed("🏃<br>뉴스피드 서비스")

newsFeed --> |"➃"|newsFeedCache("🍯<br>뉴스피드캐시") 
newsFeed --> |"➄"|userInfoCache("🍯<br>사용자정보캐시")
newsFeed -->  |"➄"|postCache("🍯<br>포스팅캐시")

userInfoCache --> userDB[("사용자정보<br>DB")]
postCache --> postDB[("포스팅<br>DB")]
```



이를 수정하려면 webServer의 순서를 사용자보다 위로 스크립팅 해야 한다. 

스크립트는 아래와 같다. 

```
flowchart

subgraph webServer[웹서버]
    direction TB
    server("🗄🗄🗄<br>웹서버")
    인증
    처리율제한
end
subgraph 사용자
    direction TB
    web("🖥<br>웹브라우저")
    app("📱<br>모바일앱") 
end

lb("🔀<br>로드밸런서")
사용자 -->|"➀ v1/me/feed"|lb

subgraph outer
    CDN("🌩<br>&nbsp;&nbsp;&nbsp;CDN&nbsp;&nbsp;&nbsp;")
    DNS(("DNS🌐"))
end

사용자 ---> outer

lb --> |"➁"|webServer 
webServer -->|"⑥"| 사용자


webServer --> |"➂"|newsFeed("🏃<br>뉴스피드 서비스")

newsFeed --> |"➃"|newsFeedCache("🍯<br>뉴스피드캐시") 
newsFeed --> |"➄"|userInfoCache("🍯<br>사용자정보캐시")
newsFeed -->  |"➄"|postCache("🍯<br>포스팅캐시")

userInfoCache --> userDB[("사용자정보<br>DB")]
postCache --> postDB[("포스팅<br>DB")]
```



결과 그림은 아래와 같이 정리되었다.



[![](https://mermaid.ink/img/pako:eNplk81q20AUhV9FzKIkEBO6dYsXjlroJht3l-liJI1jgTQS0iimxAE3cRdtXeISuy2pnLjQhKQY6qRZOCVP063G0Efo1egnsoLQ3-jc75y5M9pFumNQVEVNy2nrLeJxzDDzA23bI25LaVOtQb0d6m2Jb7eiF0bXvVeYGaZHdW46THlZB7EUrGD07_RLLzufal4tL8FoFTMxnovzMdyvv0bnUxFeiEm4GIWYUWYUHMX-VBxfipNB2QaiSI_PZyk7mvej8Z04nolJVzoQ15WKo6tYEf28iGZDAYrRFXxWUiPMrIQz7ErV9zA6CqPZPDqdQdgkaRZBqVRqHYz-nnSVncfrNl1vUmpg1LG0pSY5AaceZhvqpgT3L2PwI6b57pPiFb4_HJSG6mZjBUrhBtUDGFrNwxazVGqZVXJYWhxQkQnfQKx8sRTZrfQ5ncOnM1AUuxsfS6oEtA8yRtv-c5iqnM7hgezTuxvx_sdieAfdUuJVve3Bu0yPWaa_pxwUKBtEb1GJ-virjBJ_BuJDmCzPQwpsnE4A2-sFazplSj4TMRlFv29yUIlzD3Idn5chi8NpHKX_tlCO2ZKlpMQjan0LKku2MUStQx38FbmBLInfkpLcpCjGDK0hm3o2MQ34-3YxUxSMeIvaFKMqPBq0SQKLY4TZHkgD1yCcPjNM7nio2iSWT9cQCbjTeM10VOVeQDORahLYl3aq2vsP7gq4Mg)](https://mermaid.live/edit#pako:eNplk81q20AUhV9FzKIkEBO6dYsXjlroJht3l-liJI1jgTQS0iimxAE3cRdtXeISuy2pnLjQhKQY6qRZOCVP063G0Efo1egnsoLQ3-jc75y5M9pFumNQVEVNy2nrLeJxzDDzA23bI25LaVOtQb0d6m2Jb7eiF0bXvVeYGaZHdW46THlZB7EUrGD07_RLLzufal4tL8FoFTMxnovzMdyvv0bnUxFeiEm4GIWYUWYUHMX-VBxfipNB2QaiSI_PZyk7mvej8Z04nolJVzoQ15WKo6tYEf28iGZDAYrRFXxWUiPMrIQz7ErV9zA6CqPZPDqdQdgkaRZBqVRqHYz-nnSVncfrNl1vUmpg1LG0pSY5AaceZhvqpgT3L2PwI6b57pPiFb4_HJSG6mZjBUrhBtUDGFrNwxazVGqZVXJYWhxQkQnfQKx8sRTZrfQ5ncOnM1AUuxsfS6oEtA8yRtv-c5iqnM7hgezTuxvx_sdieAfdUuJVve3Bu0yPWaa_pxwUKBtEb1GJ-virjBJ_BuJDmCzPQwpsnE4A2-sFazplSj4TMRlFv29yUIlzD3Idn5chi8NpHKX_tlCO2ZKlpMQjan0LKku2MUStQx38FbmBLInfkpLcpCjGDK0hm3o2MQ34-3YxUxSMeIvaFKMqPBq0SQKLY4TZHkgD1yCcPjNM7nio2iSWT9cQCbjTeM10VOVeQDORahLYl3aq2vsP7gq4Mg)
