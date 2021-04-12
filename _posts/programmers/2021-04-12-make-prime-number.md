---
layout: post
title: 프로그래머스 LV1 소수 만들기(Summer/Winter Coding(~2018)) # title에 [괄호] 사용 금지
date: 2021-04-12 12:31:00 +0900 # 한국 시간 포맷 +0900
description: 프로그래머스 코딩테스트 LV1 소수 만들기(Summer/Winter Coding(~2018)) 파이썬 # Add post description (optional)
img: /python/python-wallpaper.png # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [프로그래머스 파이썬 코딩테스트 LV1]
use_math: true
---

# 프로그래머스 lv1 소수 만들기(Summer/Winter Coding(~2018))

문제 설명

주어진 숫자 중 3개의 수를 더했을 때 소수가 되는 경우의 개수를 구하려고 합니다.<br> 
숫자들이 들어있는 배열 nums가 매개변수로 주어질 때, nums에 있는 숫자들 중 <br>
서로 다른 3개를 골라 더했을 때 소수가 되는 경우의 개수를 return 하도록 solution 함수를 완성해주세요.<br>

제한사항

- nums에 들어있는 숫자의 개수는 3개 이상 50개 이하입니다.
- nums의 각 원소는 1 이상 1,000 이하의 자연수이며, 중복된 숫자가 들어있지 않습니다.


입출력 예

```python
nums	    result
[1,2,3,4]	  1
[1,2,7,6,4]	4
```

입출력 예 설명

입출력 예 #1
`[1,2,4]`를 이용해서 7을 만들 수 있습니다.<br>

입출력 예 #2
`[1,2,4]`를 이용해서 7을 만들 수 있습니다.<br>
`[1,4,6]`을 이용해서 11을 만들 수 있습니다.<br>
`[2,4,7]`을 이용해서 13을 만들 수 있습니다.<br>
`[4,6,7]`을 이용해서 17을 만들 수 있습니다.<br>
		
<br>

>출처: 프로그래머스 코딩 테스트 연습 <https://programmers.co.kr/learn/challenges>

---
### itertools.combinations (조합)

>문제는 주어진 수 중에서 3개를 뽑아 그것을 더해 소수를 만들어야 한다. 숫자들 중에 3개를 골라야 하므로 itertools의 `combinations`를 사용하기로 했다.<br>

### Doc
Init signature: `combinations(iterable, r)`
Docstring:     
Return successive r-length combinations of elements in the iterable.

`combinations(range(4), 3)` --> `(0,1,2), (0,1,3), (0,2,3), (1,2,3)`
Type:           type
Subclasses:    

>iterable 을 넣고 r을 넣으면 iterable에서 r-length 만큼의 요소들의 조합을 리턴한다.

---
## 풀이

```python
# 내 풀이. 
from itertools import combinations
def solution(nums):
    
    decs = set(range(2, sum(nums)+1))
    answer = 0

    for dec in range(2, int(sum(nums)**0.5)+1):
        if dec in decs:
            decs -= set(range(2*dec, sum(nums)+1, dec))
    for com in combinations(nums, 3):
        if sum(com) in decs:
            answer +=1
    return answer

solution([1,2,3,4])

>>>1
```

> 주어진 숫자들 중 3개를 골라 그 합에서 소수가 있는지 없는지를 알아봐야 하므로, 처음에 모든 수의 합에서 소수를 골라냈다. 그리고 주어진 숫자들에서 3개의 조합의 합 중에 소수가 있는지 없는지를 찾아서 있다면 그 경우의 수를 하나 씩 더했다. 

> 이 글을 쓰면서 생각해보니 미리 소수를 구할 필요 없이 일단 3개 조합의 합들을 구한 후 정렬한 다음에 소수를 찾는 식으로 해도 됐을 것 같다. 

---

### 소수 구하는 에라토스테네스의 체

```python
#소수 구하는 에라토스테네스의 체
def solution(n):
    num= set(range(2, n+1))
    
    for i in range(2,int(n**0.5)+1):
        if i in num:
            num -= set(range(2*i, n+1, i))
               
    return len(num)
```

>소수(素數, 발음: [소쑤], 문화어: 씨수, 영어: prime number)는 1보다 큰 자연수 중 1과 자기 자신만을 약수로 가지는 수다. <br>
2부터 소수를 구하고자하는 숫자들을 전부 나열하고, 2는 소수이므로 2의 배수들을 전부 지운다. 3은 소수이므로 3의 배수들을 전부 지운다. 5는 소수이므로 5의 배수들을 전부 지운다. 이 과정을 반복하면 모든 구간의 소수만 남게 된다. 위 코드는 n까지의 숫자들 중 소수가 몇개인지를 구하는 함수다.

### range() 함수

```python
Init signature: range(self, /, *args, **kwargs)
Docstring:     
range(stop) -> range object
range(start, stop[, step]) -> range object

Return an object that produces a sequence of integers from start (inclusive)
to stop (exclusive) by step.  range(i, j) produces i, i+1, i+2, ..., j-1.
start defaults to 0, and stop is omitted!  range(4) produces 0, 1, 2, 3.
These are exactly the valid indices for a list of 4 elements.
When step is given, it specifies the increment (or decrement).
Type:           type
Subclasses:     
```

>`range(start, stop [, step])`은 start에서 stop까지 step만큼 떨어진 숫자를 불러온다.

```python
#1부터 10까지 2 만큼의 간격으로 리스트를 만들어봄
list(range(1, 10, 2))

>>>[1, 3, 5, 7, 9]
```

---