---
layout: post
title: 프로그래머스 LV1 직사각형 별찍기(연습) # title에 [괄호] 사용 금지
date: 2021-04-12 12:42:00 +0900 # 한국 시간 포맷 +0900
description: 프로그래머스 코딩테스트 LV1 직사각형 별찍기(연습) 파이썬 # Add post description (optional)
img: /python/python-wallpaper.png # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [프로그래머스 파이썬 코딩테스트 LV1]
use_math: true
---

# 프로그래머스 lv1 직사각형 별찍기(연습)

문제 설명

이 문제에는 표준 입력으로 두 개의 정수 n과 m이 주어집니다.<br>
별(*) 문자를 이용해 가로의 길이가 n, 세로의 길이가 m인 직사각형 형태를 출력해보세요.<br>

---

제한 조건

- n과 m은 각각 1000 이하인 자연수입니다.

---

*예시*

입력<br>

5 3

출력
```
*****
*****
*****
```

<br>

>출처: 프로그래머스 코딩 테스트 연습 <https://programmers.co.kr/learn/challenges>

---

## 풀이

```python
### 내 풀이
a, b = map(int, input().strip().split(' '))
for i in range(b):
    print('*'* a)
```

```python
# 다른 사람 풀이. for loop 없이 깔끔하게 풀었다. 이게 더 나은듯

a, b = map(int, input().strip().split(' '))
print(("*" * a + "\n") * b)
```

---