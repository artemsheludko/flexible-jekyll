---
layout: post
title: 프로그래머스 LV1 행렬의 덧셈(연습) # title에 [괄호] 사용 금지
date: 2021-04-09 17:09:00 +0900 # 한국 시간 포맷 +0900
description: 프로그래머스 코딩테스트 LV1 행렬의 덧셈(연습) 파이썬 # Add post description (optional)
img: /python/python-wallpaper.png # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [프로그래머스 파이썬 코딩테스트 LV1]
use_math: true
---

# 프로그래머스 lv1 행렬의 덧셈(연습)

문제 설명<br>

행렬의 덧셈은 행과 열의 크기가 같은 두 행렬의 같은 행, 같은 열의 값을 서로 더한 결과가 됩니다. <br>
2개의 행렬 arr1과 arr2를 입력받아, 행렬 덧셈의 결과를 반환하는 함수, solution을 완성해주세요.<br>



제한 조건<br>

- 행렬 arr1, arr2의 행과 열의 길이는 500을 넘지 않습니다.<br>

입출력 예

|arr1|arr2|return|
|:---:|:---:|:---:|
|[[1,2],[2,3]]|[[3,4],[5,6]]|[[4,6],[7,9]]|
|[[1],[2]]|[[3],[4]]|[[4],[6]]|
		
		
		
<br>

>출처: 프로그래머스 코딩 테스트 연습 <https://programmers.co.kr/learn/challenges>

---

## 풀이

```python
#내 풀이. 넘파이를 써서 계산했다. 
import numpy as np
def solution(arr1, arr2):
    return (np.array(arr1) + np.array(arr2)).tolist()

solution([[1,2],[2,3]], [[3,4],[5,6]])

>>>[[4, 6], [7, 9]]

```

>행렬의 덧셈이므로 넘파이를 사용하면 쉽게 해결할 수 있다.<br>
넘파이를 사용하면 type이 `<class 'numpy.ndarray'>` 이므로 `tolist()`를 사용하며
`<class 'list'>`리스트 형태로 바꿔줬다.<br>


```python
# 다른 사람 풀이

def sumMatrix(A,B):
    answer = [[c + d for c, d in zip(a, b)] for a, b in zip(A,B)]
    return answer

# 아래는 테스트로 출력해 보기 위한 코드입니다.
print(sumMatrix([[1,2], [2,3]], [[3,4],[5,6]]))
```

---