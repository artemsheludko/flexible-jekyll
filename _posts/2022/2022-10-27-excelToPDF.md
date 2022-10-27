```
---
layout: post
title: Ubuntu서버에서 excel파일을 pdf로 바꾸기
tags: [pdf,adobe]
---
```



ubuntu서버에서 excel파일을 pdf로 변환할 일이 있었다. 

오피스 파일을 pdf로 변환시 가장 많이 사용하는 방법은 파이썬을 사용하여 pywin32로 파일을 로딩, pdf로 저장하는 것인데, 두 가지 문제가 있다.

1. 실행 서버에 오피스가 깔려 있어야 한다
2. win32api을 사용하며, 윈도우즈에서만 작동한다. 

1,2 모두 나는 만족시키지 못하는 것들이다. 그래서 찾아 봤는데.. 다행히도 Adobe에서 오픈 API로 제공을 하고 있었다. 

[Adobe Developer Site](https://developer.adobe.com/document-services/docs/overview/pdf-services-api/)

카카오나 네이버 API사용시 등록해서 key를 얻듯이 Adobe도 등록해서 키를 얻어야 한다. 신기한 점은 신규 등록을 하고 다운받으면 zip파일 내에 이 키가 그대로 박혀서 다운된다는 점이다(별도로 설정 파일을 건드릴 일이 없다).

java, nodejs, .NET 은 full로 지원을 하고 python은 pdf에서 text뽑아내는 것만 지원하니 주의하기 바란다. 참고로 나는 nodejs로 작업을 했었다. 





