---
layout: post
title: 프로그래머스 LV1 키패드 누르기 (카카오 20 인턴십) # title에 [괄호] 사용 금지
date: 2021-04-08 19:31:00 +0900 # 한국 시간 포맷 +0900
description: 프로그래머스 코딩테스트 LV1 키패드 누르기 (카카오 20 인턴십) 파이썬 # Add post description (optional)
img: /python/python-wallpaper.png # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [프로그래머스 파이썬 코딩테스트 LV1]
---

# 프로그래머스 Lv1 키패드 누르기 (카카오 20 인턴십)

[클릭하면 프로그래머스 사이트의 문제로 바로 갑니다](https://programmers.co.kr/learn/courses/30/lessons/67256)

<img src="https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/4b69a271-5f4a-4bf4-9ebf-6ebed5a02d8d/kakao_phone1.png" height ="500" width="500">

---

## 접근


왼쪽 라인 [1,4,7]은 왼손이 누르고 오른쪽 라인 [3,6,9]는 오른손이 누른다.<br>

문제는 가운데 [2,5,8,0]인데 이 경우는 더 가까운 손가락이 누르고, 만약 거리가 같다면<br>

오른손잡이는 오른손, 왼손잡이는 왼손으로 눌러주면 된다. 이 부분은 당연히 `if else`<br>

한 칸당 거리 1이고 대각선으로 움직이는건 배제.<br>

숫자 키패드는 2차원 평면이므로 키패드를 구현해서 indicies하여 거리를 계산해주기로 했다.<br>

`list.index()`는 1차원에서만 쓸 수 있다. 2d matrix에선 쓸 수 없다.<br>

numpy를 사용하면 쉽게 구할 수 있다.<br>

<br>

`numpy.where()`를 사용하여 요소의 인덱스를 불러올 수 있다.

---

## 풀이

```python
#내 풀이

import numpy as np

def solution(numbers, hand):
    answer = ''
    
    # 키패드 2차원 배열로 설정. 인풋 number에 #와 *는 없으므로 계산의 편의를 위해 그냥 10 = #, 11 = *로 대체
    key_pad = np.array([[1,2,3],
                        [4,5,6],
                        [7,8,9],
                        [10,0,11]])

    #왼손 오른손 시작점 설정
    left_idx = np.where(key_pad == 10)
    right_idx = np.where(key_pad == 11)

    #for loop 으로 numbers 에서 하나씩 꺼내서 위치 인덱스 찾고 왼손 오른손 시작점 비교
    for number in numbers:
    
        #number 의 인덱스 구하기
        number_idx = np.where(key_pad == number)

        #1,4,7일떈 왼손으로 누르기
        if number == 1 or number == 4 or number == 7:
            left_idx = number_idx
            answer += "L"
    
        #3,6,7 일땐 오른손으로 누르기
        elif number == 3 or number == 6 or number == 9:
            right_idx = number_idx
            answer += "R"
        
        #왼손, 오른손과의 숫자와의 거리 구하기
        else: 
            left_dis = sum(np.abs(number_idx[0] - left_idx[0]), np.abs(number_idx[1] - left_idx[1]))
            right_dis = sum(np.abs(number_idx[0] - right_idx[0]), np.abs(number_idx[1] - right_idx[1]))

            #거리비교하고 작은 값을 answer=""에 넣은 후에 시작점 바꾸기
            if left_dis > right_dis:
                answer += "R"
                right_idx = number_idx
            
            elif left_dis < right_dis:
                answer += "L"
                left_idx = number_idx
            
            else: # 거리가 같을 때 왼손잡이인지 오른손잡이인지 판단해서 하기
                if hand == "right":
                    right_idx = number_idx
                    answer+= "R"
                else:
                    left_idx = number_idx
                    answer+= "L"
    return answer

print(solution(numbers, hand))
```
---

### numpy.where()함수 정리

`numpy.where(condition[, x, y])`<br>
조건에 따라 x또는 y에서 선택한 요소들을 리턴한다.

**Parameters: condition : *array_like, bool***<br>
condition이 Ture 면 X, False면 Y를 선언.<br>

**x, y : *array_like***<br>
x,와 y, condition은 브로드캐스팅이 가능한 shape 여야 한다.

**Returns: out: *ndarray***<br>
condition이 True일때 X, False일때 Y인 요소들로 하나의 array를 리턴한다.<br>

**note**

만약 array 가 1-D라면 `where`는 아래와 같다:
```python
[xv if c else yv
 for c, xv, yv in zip(condition, x, y)]
 ```

**예시**
```python
>>> a = np.arange(10)
>>> a
array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
>>> np.where(a < 5, a, 10*a)
array([ 0,  1,  2,  3,  4, 50, 60, 70, 80, 90])
```
a < 5가 True면 a를 선언하므로 4까지는 그대로이고, 5부터는 False이므로 10*a를 선언한다.<br>
<br>
다차원 어레이에서도 가능하다:

```python
>>>np.where([[True, False], [True, True]],
            [[1, 2], [3, 4]],
            [[9, 8], [7, 6]])
array([[1, 8],
       [3, 4]])
```
True이므로 x 즉 1, False이므로 8, True이므로 3, True이므로 4로 구성된 어레이를 리턴<br>
<br>

x,y 그리고 condition의 shape는 같이 브로드캐스트 된다.

```python
x, y = np.ogrid[:3, :4]
np.where(x < y, x, 10 + y)  # both x and 10+y are broadcast
array([[10,  0,  0,  0],
       [10, 11,  1,  1],
       [10, 11, 12,  2]])
```
```python
a = np.array([[0, 1, 2],
              [0, 2, 4],
              [0, 3, 6]])
np.where(a < 4, a, -1)  # -1 is broadcast
array([[ 0,  1,  2],
       [ 0,  2, -1],
       [ 0,  3, -1]])
```

---