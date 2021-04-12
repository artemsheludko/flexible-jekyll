---
layout: post
title: 프로그래머스 LV1 x만큼 간격이 있는 n개의 숫자(연습) # title에 [괄호] 사용 금지
date: 2021-04-12 11:06:00 +0900 # 한국 시간 포맷 +0900
description: 프로그래머스 코딩테스트 LV1 x만큼 간격이 있는 n개의 숫자(연습) 파이썬 # Add post description (optional)
img: /python/python-wallpaper.png # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [프로그래머스 파이썬 코딩테스트 LV1]
use_math: true
---

# 프로그래머스 lv1 x만큼 간격이 있는 n개의 숫자(연습)

문제 설명<br>

함수 solution은 정수 x와 자연수 n을 입력 받아, x부터 시작해 x씩 증가하는 숫자를 n개 지니는 리스트를 리턴해야 합니다. <br>
다음 제한 조건을 보고, 조건을 만족하는 함수, solution을 완성해주세요.<br>


제한 조건<br>

- x는 -10000000 이상, 10000000 이하인 정수입니다.<br>
- n은 1000 이하인 자연수입니다.<br>


입출력 예

|x|n|answer|
|:---:|:---:|:---:|
|2|5|[2,4,6,8,10]|
|4|3|[4,8,12]|
|-4|2|[-4, -8]|
		
<br>

>출처: 프로그래머스 코딩 테스트 연습 <https://programmers.co.kr/learn/challenges>

---

## 풀이

```python
#풀이
def solution(x, n):
    return [x * i for i in range(1, n+1)]
solution(-4,2)

>>>[-4, -8]
```

>`range(1, n+1)`로 1부터 n까지의 숫자 리스트를 만든다. for loop를 이용해서 x를 n 씩 곱한 리스트들을 리턴하면 됨.<br>

---