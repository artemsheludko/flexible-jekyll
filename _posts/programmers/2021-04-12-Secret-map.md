---
layout: post
title: 프로그래머스 LV1 1차 비밀지도(2018 KAKAO BLIND RECRUITMENT) # title에 [괄호] 사용 금지
date: 2021-04-12 13:43:00 +0900 # 한국 시간 포맷 +0900
description: 프로그래머스 코딩테스트 LV1 1차 비밀지도(2018 KAKAO BLIND RECRUITMENT) 파이썬 # Add post description (optional)
img: /python/python-wallpaper.png # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [프로그래머스 파이썬 코딩테스트 LV1]
use_math: true
---

# 프로그래머스 lv1 1차 비밀지도(2018 KAKAO BLIND RECRUITMENT)

>문제 링크: <https://programmers.co.kr/learn/courses/30/lessons/17681>

>출처: 프로그래머스 코딩 테스트 연습 <https://programmers.co.kr/learn/challenges><br>

>[해설링크 바로가기](https://tech.kakao.com/2017/09/27/kakao-blind-recruitment-round-1/)

<img src= "https://t1.kakaocdn.net/welcome2018/secret8.png" height = 300; width = 300;>

---

## 풀이

```python
def solution(n, arr1, arr2):
    answer = []
    for ar1, ar2 in zip(arr1, arr2):
        c = bin(ar1|ar2)
        base_2 = format(int(c,2), 'b')
        if len(base_2) == n:
            answer.append(base_2)
        else:
            base_2 = '0'* (n - len(base_2))+ base_2
            answer.append(base_2)
    for i, j in enumerate(answer):
        j = j.replace('1', '#')
        j = j.replace('0', ' ')
        answer[i] = j 
    return answer

```

---

## 접근

내 생각<br>

1. arr1과 arr2에 들어온 숫자를 이진법으로 변경-> 근데 다섯자리여야한다. 
2. 자릿수로 계산해서 1인 부분은 그대로1, 0인 부분은 0으로 두고 합침
3. 1은 #로, 0은 '공백'으로 두고 리스트로 출력

입력으로 지도의 한 변 크기 n 과 2개의 정수 배열 arr1, arr2가 들어온다.<br>

- `1 ≦ n ≦ 16`<br>
- arr1, arr2는 길이 `n인 정수 배열`로 주어진다.<br>
- 정수 배열의 `각 원소 x`를 `이진수`로 변환했을 때의 길이는 `n 이하`이다. 즉, `0 ≦ x ≦ 2n - 1`을 만족한다.<br>


[참고: 진수 다루기](https://www.daleseo.com/python-int-bases/)

---

```python
#다른 사람 풀이

def solution(n, arr1, arr2):
    answer = []
    for i,j in zip(arr1,arr2):
        a12 = str(bin(i|j)[2:])
        a12=a12.rjust(n,'0')
        a12=a12.replace('1','#')
        a12=a12.replace('0',' ')
        answer.append(a12)
    return answer
```

>[코딩도장 비트연산자 바로가기](https://dojang.io/mod/page/view.php?id=2460)

---