---
layout: post
title: [컨텍스트 분석]커피 머신 버튼 사용자 시나리오 생성... 
img : 
tags: [Analyzingcontext.com, 시나리오]
---

analyzingcontext.com 을 만들어 놓고 별로 써먹지를 않아서인지 사용자 유입이 거의 없는 상태여서.. 

제가 주장하는 방법의 홍보 겸 우리 주위에 있는 시스템들(사용대상)에 대하여 분석을 하는 사례들을 만들어 갈까 합니다. 

첫 대상으로 편의점에 있는 커피 머신을 선택해 보았습니다. 

![00500376_20170218](C:\Users\SSAFY\Desktop\00500376_20170218.png)



이 커피 머신의 사용자 케이스를 한 번 analyzingcontext.com을 통해 뽑아 보도록 하겠습니다. 



유저가 커피머신에서 할 수 있는 동작들은 그냥 **커피 뽑아먹기** 겠죠... 뽑아먹을 수 있는 커피의 종류는 아래와 같습니다. 

* 아메리카노
  * 아이스? 뜨거운거?
  * 더블샷 아메리카노? 
* 라떼
  * 아이스? 뜨거운거?
* 카푸치노 



유저가 커피머신을 사용중에 발생할 수 있는 상황을 생각해 보면... 재료 떨어질 때 일 것 같습니다. 

* 물 없음
* 원두 없음
* 우유 없음(라떼, 카푸치노 용)



유저가 커피머신에서 할 수 있는 동작은 Given-When-Then 에서 When이 될 것이며 사용중에 발생할 수 있는 상황은 Given이 됩니다. 

Analyzingcontext.com을 오픈하고 **Mindmap & GWT** 를 클릭하여 마인드맵 페이지에 들어갑니다. 

When노드 밑에 사용자가 할 수 있는 동작을 빠르게 정리해 보죠 (먼저 When 및 Given의 하위 노드들을 del 키를 사용하여 모두 지웁니다.)



![image-20200207171144182](C:\Users\SSAFY\AppData\Roaming\Typora\typora-user-images\image-20200207171144182.png)

주의할 것은 When의 노드 말단에는 항상 Yes/No 노드가 와야 한다는 것입니다. (동작의 결과가 Yes,No로 끝나야 분명한 동작이 되기 떄문입니다)

아메리카노는 뜨거운거, 차가운거, 그리고 더블샷(투샷) 옵션이 있습니다.  그거 추가하겠습니다. 

![image-20200207171640688](C:\Users\SSAFY\AppData\Roaming\Typora\typora-user-images\image-20200207171640688.png)

아메리카노가 **No** 이면 라떼나 카푸치노를 선택한 것이 됩니다. 아메리카노--No 노드 아래에 라떼 노드를, 그리고 라떼--No 노드 아래 카푸치노를 위치시킵시다. (드래그 엔 드롭으로 가능)



![image-20200207172330080](C:\Users\SSAFY\AppData\Roaming\Typora\typora-user-images\image-20200207172330080.png)

라떼도 보니까 아이스와 뜨거운게 있습니다. 이거 반영합니다. 

![image-20200207172454893](C:\Users\SSAFY\AppData\Roaming\Typora\typora-user-images\image-20200207172454893.png)

When부분은 정리가 된 것 같습니다. 당연하겠지만 아이스--No 인 경우는 뜨거운 커피를 의미합니다. 



이제 Given 을 정리합니다. 크게 Given은 사용자가 정상적으로 사용할 수 있는 상황과 그렇치 못한 상황으로 나뉘며, 그 원인은 원두, 물, 우유 부족으로 볼 수 있습니다. 그거 반영합니다. 



![image-20200207173116126](C:\Users\SSAFY\AppData\Roaming\Typora\typora-user-images\image-20200207173116126.png)

다 정리 되었습니다. 이제 **Get Result** 를 클릭해 결과를 좀 봅시다.



![image-20200207173411566](C:\Users\SSAFY\AppData\Roaming\Typora\typora-user-images\image-20200207173411566.png)



28개의 케이스가 나왔습니다. 이거 다 케이스로 하는거 아니구요. 정리를 하기 위해 일단 **Save** 를 클릭해 csv로 다운받고 엑셀로 Open합니다. 

![image-20200207173644032](C:\Users\SSAFY\AppData\Roaming\Typora\typora-user-images\image-20200207173644032.png)



