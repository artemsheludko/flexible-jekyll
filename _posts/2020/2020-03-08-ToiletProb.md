---
layout: post
title: 【컨텍스트분석】 변기 센서 문제 분석.. 
img : 
tags: [Analyzingcontext.com, context]
---



이번에는 소프트웨어 공학 책에 나와 있는 예제 하나를 분석해 보려 한다.  예전에 사 놓았던 "ソフトウェアテストの教科書<sub>소프트웨어 테스트 교과서</sub>" 란 책에 있는 것이다.

![IMG_20200308_001446](/assets/img/2020/20200308/IMG_20200308_001446.jpg)



이 문제를 간단히 설명하면 다음과 같다. 



![Example](/assets/img/2020/20200308/Example.png)

* waiting : 변기는 동작을 안함
* ready : 변기 뚜껑이 자동으로 열리고 닫힘. 탈취 기능 ON/
* nearby : 동작 안함. 
* Sit : '사전 세정' 기능 동작
* waiting 밖으로 멀어지면 : 기능 종료



여기에서  Given, When을 어떻게 잡을 지 생각해 보자. 

When은 사용자가 이동하는 동작이다. Given은 위에서 정의한 '센서 범위' 로 보도록 하자. 

**Given** : 사용자가

* Out of waiting
* waiting
* ready
* nearby
* sit 

상태에 있을 때 이며 

사용자는 아래와 같은 액션이 가능할 것이다.(**When**)

- To Out
- To Waiting
- To ready
- To nearby
- To Sit

Mindmap에 1차로 그려보면(analyzingcontext.com사용)

![Tree1](/assets/img/2020/20200308/Tree1.png)

지금 When의 Depth는 1개의 depth만 나타낸다. 상황에 따라 연속 Action을 할 수도 있으니 조금더 복잡하게 나타내 보면 아래와 같다(When을 2depth로 표현)

![Tree2](/assets/img/2020/20200308/Tree2.png)

Out of Waiting 상태로 갔다가 다시 waiting 으로 돌아오는 것을 나타낸 게 When의 첫번째 브랜치이며 두번째 브랜치는 waiting상태에서 ready상태로 갔다가 다시 온 것을 의미한다. 나머지도 마찬가지 의미이다. 



결과를 도출하면



<img src="/assets/img/2020/20200308/Result1.png" alt="Result1" style="zoom:67%;" />

50개나 나온다 이를 이제 Excel을 이용해 추려본다. **save** 를 클릭해 결과를 csv파일로 저장한다. 

이제 Given의 각 Status별로 정리를 한다. 

* User가 Out of waiting 범위에 있을 때

<img src="/assets/img/2020/20200308/OutOfWaiting.png" alt="스크린샷 2020-03-08 오후 12.31.50" style="zoom:50%;" />

Out of waiting에서 가능한 동작은 To ready 밖에 없으며 여기에서 가능한 것은 2가지 동작이다. 



* User가 waiting 범위에 있을 때

<img src="/assets/img/2020/20200308/Result_2.png" alt="Result_2" style="zoom:50%;" />

* User가 ready범위에 있을 때

<img src="/assets/img/2020/20200308/Ready.png" alt="스크린샷 2020-03-08 오전 9.38.13" style="zoom:50%;" />

* User가 nearby범위에 있을 때

<img src="/assets/img/2020/20200308/nearby.png" alt="스크린샷 2020-03-08 오전 9.39.57" style="zoom:50%;" />

* User가 Sit상태 일 때

<img src="/assets/img/2020/20200308/Sit.png" alt="스크린샷 2020-03-08 오전 9.42.36" style="zoom:50%;" />



이제 다 왔다. 케이스화 시켜 보자.

|  No  | 사용자의 시작 상태(Given) |              사용자의 행동 (When)               |  마지막 상태   |                          예상 결과                           |
| :--: | :-----------------------: | :---------------------------------------------: | :------------: | :----------------------------------------------------------: |
|  1   |      Out of waiting       |                 wating까지 이동                 |    waiting     |                          반응 없음                           |
|  2   |      Out of waiting       |          wating를 지나 ready까지 이동           |     ready      |            변기 뚜껑이 자동으로 열림 탈취 기능 ON            |
|  3   |          Waiting          |              Out of waiting로 이동              | Out of waiting |                         종료 상태임.                         |
|  4   |          Waiting          |          ready를 지나 nearby까지 이동           |     nearby     |           변기 뚜껑이 자동으로 열림. 탈취 기능 ON            |
|  5   |          Waiting          |                 ready까지 이동                  |     ready      |           변기 뚜껑이 자동으로 열림. 탈취 기능 ON            |
|  6   |          Waiting          | Out of waiting으로 갔다가 다시 waiting으로 이동 |    waiting     |                          반응 없음.                          |
|  7   |           Ready           |                 nearby까지 이동                 |     nearby     |                          반응 없음                           |
|  8   |           Ready           |           nearby를 지나 sit까지 이동            |      sit       |                    '사전 세정' 기능 동작                     |
|  9   |           Ready           |                waiting까지 이동                 |    waiting     |           변기 뚜껑이 자동으로 닫힘. 탈취기능 OFF            |
|  10  |           Ready           |          waiting을 지나 ready까지 이동          |     ready      | 변기 뚜껑이 자동으로 닫힘. 탈취기능 OFF -> 변기 뚜껑이 자동으로 열림. 탈취 기능 ON |
|  11  |          Nearby           |          ready를 지나 nearby까지 이동           |     nearby     |           변기 뚜껑이 자동으로 열림. 탈취 기능 ON            |
|  12  |          Nearby           |                 ready까지 이동                  |     ready      |         변기 뚜껑이 자동으로 열림. 탈취 기능 ON 상태         |
|  13  |          Nearby           |                  Sit까지 이동                   |      Sit       |                    '사전 세정' 기능 동작                     |
|  14  |          Nearby           |             Sit 에서 nearby로 이동              |     nearby     | 변기 뚜껑이 자동으로 열림. 탈취 기능 ON 상태 이며 사전세정 기능 동작후 정지 |
|  15  |            Sit            |                 nearby까지 이동                 |     nearby     | 변기 뚜껑이 자동으로 열림. 탈취 기능 ON 상태 사전세정기능 동작 정지 |
|  16  |            Sit            |           nearby를 지나 Sit으로 이동            |      Sit       |                    '사전 세정' 기능 동작                     |

<sub>※ 여기서 케이스 프로시져를 만들어 여러개의 케이스를 일련의 흐름으로 이어서 수행할 수도 있다. 하지만 이 경우에는 그렇게 하면 예상 결과가 복잡해 지기 때문에 그렇게 하지는 않았다. 어차피 붙여서 하나 따로 하나 케이스 커버리지는 동일하다.</sub>



소프트웨어 테스팅을 좀 공부한 사람들은 알겠지만, 해놓고 보니 '상태전이' 기법과 많이 비슷해 졌다. 개인적인 사견이기는 한데 소프트웨어 테스팅 기법들은 다 하나로 이어져 있다는 생각이 든다. 

