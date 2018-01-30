---
layout: post
title: Selenium + Sikuli 
img : automation.jpg
keywords: SW Engineering, Selenium, Sikuli
---

(이 글은 제가 [qiita.com](http://qiita.com) 에 올렸던 글을 그대로 가져온 것입니다)

SW테스트 수행 자동화 도구의 종류로는 크게 2가지가 있습니다.

1. 오브젝트 인식 방식의 수행
2. 이미지 인식 방식의 수행


테스트 수행 자동화 도구로서 가장 많이 쓰이는 것은 셀레늄(Selenium)입니다. 
이는 오브젝트 기반으로 수행을 진행하는 도구로 빠른 수행속도 및 유지보수가 상대적으로 이미지방식에 비해 편하다는(상대적입니다) 장점이 있습니다. 예전에는 오브젝트 ID를 찾기가 매우 어려웠지만 크롬-개발자 도구 를 통해 찾기가 아주 쉬워졌습니다. 
상대적으로 이미지 인식 도구는 테스트 수행 PC화면에 뜨기만 하면 이미지 인식 방식으로 핸들링해야 할 오브젝트를 인식합니다. 이미지 인식에 걸리는 시간 때문에 속도가 매우 느리고, 이미지가 조금만 변경된다던지, PC의 해상도가 조금만 바뀌어도 인식을 못하는 경우가 있습니다. 

하지만 수행 결과가 이미지로 나타나는 경우(예 : 이미지 검색) 등에서는 셀레늄 등으로는 한계가 있습니다. 
그래서 이미지 인식 방식은 시쿠리(Sikuli)와 Selenium의 혼용을 생각하게 되었는데요. 

혼용하는 방식은 간단합니다. Sikuli자체가 Jython2.7x를 포함하고 있으므로 시쿠리에서 셀레늄 라이브러리를 호출해 돌리다가 이미지 인식을 해야 할 부분이 생기면 시쿠리 코드를 넣는 것입니다. 

<img src='https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/J8k/image/m9GUPNHhyvMrjuxF8FLlZ0JfTKE.png'>

이 코드는 yahoo.co.jp에서 미 대통령 Trump의 이미지 검색을 하는 코드를 셀레늄 IDE로 레코딩을 한 것입니다. 
셀레늄 상에서는 이미지 검색으로 가져오는 결과의 첫 페이지가 맞는지 확인할 방법이 없습니다. 이에 시쿠리에서 셀레늄 코드를 돌리도록 조금 수정을 하도록 하겠습니다. 

<img src='https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/J8k/image/KSggrYsvuGl5XVYVbUoJj6NjiUk.png'>

시쿠리(엄밀히 말하면 시쿠리 내 Jython2.7에서) 에서 셀레늄 코드를 읽어들이려면 셀레늄 라이브러리 로딩이 필요합니다. 

```
import sys
installedSitePakagePath = "/Library/Python/2.7/site-packages/"
sys.path.append(installedSitePakagePath)
```

이 코드가 로컬에 설치된 셀레늄 site-package위치(/Library/Python/2.7/site-packages/)를 읽어들이는 부분입니다. 

중간에 이제 테스트될 이미지 인식 코드를 넣습니다.


<img src='https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/J8k/image/ZUfJ438AjK1DgAoZvDLyoF8grDA.png'>


새로 넣은 부분은

```
find("1488176279975.png")
```


입니다. 위 이미지를 찾아 없으면 테스트 실패로 빠져나올 것입니다. 

이 코드를 시쿠리 Jython으로 수행합니다. (로컬의 python이 아님) 수행방법은 시쿠리IDE내 코드를 카피하여 수행해도 되고 커멘드 라인으로 수행을 해도 됩니다. 


<img src='https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/J8k/image/MytywZKl33x1U6YAmWF3Wzi6u2I.png'>

시쿠리 IDE에 복&붙을 하면 아래와 같이 보일 것입니다. 

<img src='https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/J8k/image/uCQJVxxGqrID_4lL7quAcafpLS0.png'>

시쿠리 IDE에서 수행하면... 모두 패스로 나오네요. 수행결과 화면은 생략합니다. 

위 IDE에서 스크립트를 저장하면 ＊.sikuli라는 이름으로 폴더 베이스로 저장됩니다. (＊.py 스크립트와 이미지) 저장을 yahoo.sikuli로 저장하고 이를 커멘드 라인으로 돌리려면 

```
java -jar sikulix.jar -r yahoo.sikuli
```

로 수행하면 sikuli.jar내 jython이 수행되어 스크립트를 동일하게 수행합니다. 


