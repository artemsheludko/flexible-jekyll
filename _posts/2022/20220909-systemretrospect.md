---
layout: post
title: 간단한 정산내역 확인 발송 시스템 제작기.
tags: [nodejs, kafka, exceljs, pdf]
---

거래처로부터 한 달에 한번 정산내역을 받는데 이를 확인 사인을 하여 pdf로 변환, 발송을 해야 했다. 이번에 이를 간단하게 자동화를 해 보려고 시스템을 만들었고 4일동안 한 작업을 한 번 퇴고를 해 보았다. 



간단한 정산 내역 확인 발송 시스템 제작기. 

## 큰 그림 : 

매달 거래처에서 정산내역서를 보내면 이를 확인후 확인 도장, 또는 날인하고 pdf로 변환하여 담당자에게 메일을 발송해야 한다. 이를 자동화하는 시스템을 구축한다. 

pdf로의 변환 및 발송 파트와 파일 수신파트 간의 통신은 kafka를 통한 메시지 통신을 한다. 파일 쓰기 및 삭제 등의 동작이 예상되어 백엔드에서의 시간이 좀 많이 걸릴 것으로 예상되기 때문이다. 

참고로 kafka는 이미 docker로 설치, 운용중이다. ([docker Kafka컨테이터 설치](https://cheuora.github.io/2022/04/21/kafka_docker/))



## 1일차 : 

* 필요한 기술을 찾아보았다. 
  * Kafka 연결
    * python에서 원활하게 producer, consumer 동작 확인 
  * 정산내역서(엑셀파일)에 도장 이미지를 입히는 기술
    * 엑셀에 이미지를 입히는 작업은 파이썬의 openpyxl을 검토. 셀에 이미지 넣는 것은 쉽게 구현됨
  * 엑셀파일을 pdf로 변환하는 기술
    * 파이썬의 openpyxl에서는 pdf변환을 미지원
    * 파이썬용 xlsx to pdf변환 라이브러리는 거의 없고, 상용 라이브러리도 퀄리티가 떨어짐을 확인. 
    * 윈도우즈 환경에서 pywin32를 사용하는 방식이 대부분이어서 ubuntu환경에서는 이를 포기 
  * ubuntu환경에서 동작하는 것을 더 찾아보기로 함. 

## 2일차 : 

* pdf 변환 문제 조사

  * pdf로 유명한 어도비 측의 API가 있는지 찾아 보았는데... [있었음](https://developer.adobe.com/document-services/docs/overview/). 개발자로 등록하고 키를 얻으면 사용 가능함. 
  * python용 API는 MS Office to pdf의 기능이 없어  python은 탈락
  * MS Office 문서의 pdf변환은 java, .net, Node JS 의 언어를 지원하고 있어 Node JS를 선택하기로 함
  * ubuntu + node 환경에서 pdf변환 테스트 성공
    * 사용 언어를 전부 python에서 Node JS로 바꾸기로 함. 

* Node 에서 kafka연결

  * Node 에서 kafka연결하는 [샘플 코드를 찾음](https://kafka.js.org/docs/getting-started). 이를 써서 producer 및 consumer 의 베이직 코드 구현 + 동작 확인 

  

## 3일차  :

* kafka와 연결하여 pdf 변환 기능 붙여보기
  * 간단하게 웹 프론트 페이지를 html로 제작. (Only POST submit)
  * producer쪽에서 node express로 파일명 받고(not upload yet) 미리 저장되어 있는 해당 파일을 pdf로 변환후 파일위치를 kafka로 전송하면
    * express에서 post 데이터 수신에서 좀 애를 먹음 (body-parser 라이브러리로 해결)
  * consumer쪽에서 메시지를 받아 이를 pdf변환 + 저장하는 기능 
  * 단순 텍스트 메시지에서 json으로 메시지 형식 변환 및 수신 테스트 완료
* Node에서 SMTP메일 발송 조사
  * 구글 메일 서버를 통한 메일 발송 (nodemailer라이브러리)
  * 예전과는 달리 2중인증 설정이 필요하여 설정마침 

* Node 에서 MS Office 문서 처리 기능 조사
  * Node 에서 excel문서 다루는 API : [exceljs](https://github.com/exceljs/exceljs), node4xlsx 등이 있음. 이미지 핸들링 기능이 있는 exceljs를 쓰기로 함. 
    * 이미지 핸들링에서 python의 openpyxl을 능가하는 정교함이 있어 놀랐음. 

## 4일차 : 

* producer로 엑셀 파일을 업로드 하는 기능을 프론트 페이지로 붙임 (express-fileupload라이브러리 사용). 
  * utf8라이브러리 설치로 한글 파일명도 처리 가능토록 함
  * 변환 결과를 받은 메일 주소 입력란도 추가  
* producer에 엑셀 파일에 서명 이미지 붙이는 기능 추가 및 테스트 완료
  * 서명 이미지는 미리 서버에 저장해 놓고 이를 사용하는 것으로 
* consumer에 메일 발송 기능 추가 및 테스트 완료
* 프론트엔드 - producer - Kafka - consumer - 메일 발송 까지 관통 테스트 완료 
* 프론트엔드 페이지(index.html)를 nginx에 연결하고 node 프로세스 띄워 완성



## 느낀점

* 자바스크립트의 생태계는 Python보다 더 넓은 것 같다. Node를 통하면 거의 모든 것이 가능했다. 
* kafka를 실제로 써보니 생각보다 활용할 곳이 많겠다. 



### 끝!!






