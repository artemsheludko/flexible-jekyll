---
layout: post
title: 프로그래머스 LV1 하샤드 수(연습문제) # title에 [괄호] 사용 금지
date: 2021-04-09 16:33:00 +0900 # 한국 시간 포맷 +0900
description: 프로그래머스 코딩테스트 LV1 하샤드 수(연습문제) 파이썬 # Add post description (optional)
img: /python/python-wallpaper.png # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [프로그래머스 파이썬 코딩테스트 LV1]
use_math: true
---

# 프로그래머스 lv1 하샤드 수(연습문제)

문제 설명

양의 정수 x가 하샤드 수이려면 x의 자릿수의 합으로 x가 나누어져야 합니다. <br>
예를 들어 18의 자릿수 합은 1+8=9이고, 18은 9로 나누어 떨어지므로 18은 하샤드 수입니다. <br>
자연수 x를 입력받아 x가 하샤드 수인지 아닌지 검사하는 함수, solution을 완성해주세요.<br>

제한 조건

- x는 1 이상, 10000 이하인 정수입니다.

입출력 예

|arr|return|
|:---:|:---:|
|10|true|
|12|true|
|11|false|
|13|false|

입출력 예 설명

입출력 예 #1
10의 모든 자릿수의 합은 1입니다. 10은 1로 나누어 떨어지므로 10은 하샤드 수입니다.

입출력 예 #2
12의 모든 자릿수의 합은 3입니다. 12는 3으로 나누어 떨어지므로 12는 하샤드 수입니다.

입출력 예 #3
11의 모든 자릿수의 합은 2입니다. 11은 2로 나누어 떨어지지 않으므로 11는 하샤드 수가 아닙니다.

입출력 예 #4
13의 모든 자릿수의 합은 4입니다. 13은 4로 나누어 떨어지지 않으므로 13은 하샤드 수가 아닙니다.

<br>
>출처: 프로그래머스 코딩 테스트 연습 <https://programmers.co.kr/learn/challenges>

---

## 풀이

```python
# 내 풀이
def solution(x):
    return True if x % sum(map(int, str(x))) == 0 else False
solution(10)
```
> 

<br>

```python
# 다른 사람 풀이

def Harshad(n):
    # n은 하샤드 수 인가요?
    return n % sum([int(c) for c in str(n)]) == 0
```


---

## 숫자의 각 자릿수 분리하는 법

코딩테스트에 자주 나오는 것 중에 숫자를 자릿수에 따라 나누어야할 경우가 있다.<br>

그럴때 자주쓰는 방법 세가지를 소개해보려한다.<br>

`number = 12345` 를 `1,2,3,4,5` 로 자릿수별로 분리하는 예시이다.

1. str() 함수를 이용해서 나누기

```python
nums = 12345
num_list = []
for num in str(nums):
    num_list.append(int(num))
print(num_list)

>>>[1, 2, 3, 4, 5]
```

>str으로 바꾼 후 for loop를 쓰면 한 자리수 씩 분리할 수 있다. int 타입이 필요하면 int() 함수로 다시 변환해주면 된다.

<br>

2. 10으로 나누기

```python
nums = 12345

num_list = []

while(nums!=0):
    nums, r = divmod(nums, 10) # nums 를 10으로 나눈 몫과 나머지를 nums와 r로.
    num_list.append(r) # 나머지만 append 해준다

print(sorted((num_list))) # 1의 자릿수부터 들어가므로 순서가 중요하면 정렬

>>>[1, 2, 3, 4, 5]
```

<br>

3. map 함수를 활용하여 원소값 더하기<br>

```python
nums = 12345

list(map(int, str(nums)))

>>>[1, 2, 3, 4, 5]
```

---