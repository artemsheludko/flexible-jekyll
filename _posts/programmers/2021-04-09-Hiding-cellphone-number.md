---
layout: post
title: 프로그래머스 LV1 핸드폰 번호 가리기(연습) # title에 [괄호] 사용 금지
date: 2021-04-09 16:44:00 +0900 # 한국 시간 포맷 +0900
description: 프로그래머스 코딩테스트 LV1 핸드폰 번호 가리기(연습) 파이썬 # Add post description (optional)
img: /python/python-wallpaper.png # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [프로그래머스 파이썬 코딩테스트 LV1]
use_math: true
---

# 프로그래머스 lv1 핸드폰 번호 가리기(연습)

문제 설명

프로그래머스 모바일은 개인정보 보호를 위해 고지서를 보낼 때 <br>
고객들의 전화번호의 일부를 가립니다.<br>
전화번호가 문자열 phone_number로 주어졌을 때, <br>
전화번호의 뒷 4자리를 제외한 나머지 숫자를 전부 *으로 가린 문자열을 리턴하는 함수, <br>
solution을 완성해주세요.

제한 조건

- s는 길이 4 이상, 20이하인 문자열입니다.<br>

입출력 예

|phone_number|return|
|:---:|:---:|
|"01033334444"|"\*\*\*\*\*\*\*4444"|
|"027778888"|"\*\*\*\*\*8888"|
	
<br>

>출처: 프로그래머스 코딩 테스트 연습 <https://programmers.co.kr/learn/challenges>

---

## 풀이

```python
#내 풀이
def solution(phone_number):
            
    return '*' * (len(phone_number) - 4) + phone_number[-4:]

solution("027778888")

>>>'*****8888'

```
> 뒷 자리 4자리만 남기고 다 \* 로 바꿔야 한다.<br>
>  `[-4:]`로 인덱싱 하면 어떤 길이의 숫자가 와도 뒤에서 4번째 자리까지 불러온다.<br>
> 거기다가 phone_number의 길이에서 4를 뺀만큼 *을 앞에 붙여주면 된다<br>

---