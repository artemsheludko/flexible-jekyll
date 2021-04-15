---
layout: post
title: 프로그래머스 코딩테스트 코드조각 모음 Level 1 # title에 [괄호] 사용 금지
date: 2021-04-15 18:38:00 +0900 # 한국 시간 포맷 +0900
description: 프로그래머스 코딩테스트 코드조각 모음 Level 1 파이썬 # Add post description (optional)
img: /python/python-wallpaper.png # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [프로그래머스 파이썬 코딩테스트 LV1, 파이썬 스니펫]
use_math: true
---

# 프로그래머스 코딩테스트 코드조각 모음 17가지 Level 1 

프로그래머스 코딩테스트 레벨 1 문제들을 풀면서 유용하게 쓸 파이썬 코드 조각(snippets)을 모아봤다.<br>
레벨1 테스트 수준에선 이 정도면 알면 풀 수 있을 것 같다. 각 코드, 함수가 쓰이는 부분에 문제링크를 달아뒀다.<br>

1. `set()`  함수로 리스트 중복 제거<br>
   
   순서 상관없이 집합으로 만들어주며 중복값을 자동으로 제거한다.<br>
   문제링크: [두개 뽑아서 더하기](https://sharpswan.github.io/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4_%EB%91%90%EA%B0%9C_%EB%BD%91%EC%95%84%EC%84%9C_%EB%8D%94%ED%95%98%EA%B8%B0/)

   ```python
   # set 생성자에 iterable한 객체를 넣으면 변환하여 set을 만들어 줍니다.
   # 물론 set생성자 없이 바로 중괄호 안에 값을 넣어도 됩니다.
   >>> s = set([1,3,5,7])
   >>> s
   {1, 3, 5, 7}
   >>> p = {1, 3, 5, 7}
   >>> p
   {   1, 3, 5, 7}

   # 중복된 값은 자동으로 중복이 제거 됩니다.
   >>> s = {1, 5, 1, 1, 1, 3, 7}
   >>> s
   {1, 3, 5, 7}
   ```

   <br>

2. `itertools.combinations(iterable, r)`을 이용하여 iterable 한 리스트 중에 r개의 요소의 조합 고르기<br>
   
   문제링크: [두개 뽑아서 더하기](https://sharpswan.github.io/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4_%EB%91%90%EA%B0%9C_%EB%BD%91%EC%95%84%EC%84%9C_%EB%8D%94%ED%95%98%EA%B8%B0/)

   ```python
   from itertools import combinations   
   list_a = [1,2,3,4]

   for i in combinations(list_a, 3):
       print(i)
   ```

   <br>

3. `divmod(n, base`를 사용하여 몫과 나머지를 반환<br>
   
   `n, r = divmod(n, base)` 로 사용 가능<br>
   문제링크: [3진법 뒤집기](https://sharpswan.github.io/3%EC%A7%84%EB%B2%95_%EB%92%A4%EC%A7%91%EA%B8%B0/)

   ```python
   num = 10

   n , r = divmod(num, 2)

   print(n, r)

   >>>5  0
   ```

   <br>

4. `cycle()`을 이용해 무한 반복<br>
   
   `cycle('ABCD') --> A B C D A B C D ...` <br>
   문제링크: [모의고사(완전탐색)](https://sharpswan.github.io/%EB%AA%A8%EC%9D%98%EA%B3%A0%EC%82%AC(%EC%99%84%EC%A0%84-%ED%83%90%EC%83%89)/)
   
   <br>
   
5. `class collections.Counter([iterable-or-mapping])`<br>
   
   문제링크: [완주하지 못한 선수](https://sharpswan.github.io/%EC%99%84%EC%A3%BC%ED%95%98%EC%A7%80_%EB%AA%BB%ED%95%9C_%EC%84%A0%EC%88%98(%ED%95%B4%EC%8B%9C)/)<br>

   Counter는 해시 가능한 객체를 세기 위한 dict 서브 클래스이다. <br>
   요소가 딕셔너리 키로 저장되고 개수가 딕셔너리값으로 저장되는 컬렉션이다. <br>

   개수는 0이나 음수를 포함하는 임의의 정숫값이 될 수 있다. <br>
   Counter 클래스는 다른 언어의 백(bag)이나 멀티 셋(multiset)과 유사하다.<br>

   요소는 이터러블로부터 계산되거나 다른 매핑(또는 계수기)에서 초기화:

   ```python
   >>> c = Counter()                           # a new, empty counter
   >>> c = Counter('gallahad')                 # a new counter from an iterable
   >>> c = Counter({'red': 4, 'blue': 2})      # a new counter from a mapping
   >>> c = Counter(cats=4, dogs=8)             # a new counter from keyword args
   ```

   <br>

6. 요일 알아내기<br>
   
   문제링크: [2016년](https://sharpswan.github.io/2016%EB%85%84-(%EC%97%B0%EC%8A%B5%EB%AC%B8%EC%A0%9C)/)<br>
   `calendar.monthrange(year,month)`를 사용한다.<br>
   tuple로 `(1일이 무슨 요일인지, 총 몇일)`를 리턴한다.<br>

   ```python
   import calendar
   calendar.monthrange(2021,4)
   
   >>>(3, 30)
   ```
   >Signature: calendar.monthrange(year, month)<br>
   Docstring:<br>
   Return weekday (0-6 ~ Mon-Sun) and number of days (28-31) for
   year, month.<br>
   0~6까지 월요일부터 일요일이다.

   <br>

7. 순서지키며 중복 제거<br>
   
   문제링크: [같은 숫자는 싫어](https://sharpswan.github.io/%EA%B0%99%EC%9D%80_%EC%88%AB%EC%9E%90%EB%8A%94_%EC%8B%AB%EC%96%B4/)<br>
   중복 제거를 할때 `set()`을 떠올리기 쉬운데 이건 순서를 정렬해버림

   `collections.Counter`도 정렬을 해버림.

   순서를 지키면서 중복을 제거하고 싶으면 `for문`을 사용

   ```python
   # if 문의 continue는 특정 조건일때 그냥 넘기는 것. 그리고 리스트에서 a[-1:]의 리스트는 맨 뒤에 하나 빼고 전부다란 뜻.
   # 빈 리스트에 하나씩 넣어주면서 비교
   arr = [1,1,3,3,0,1,1]
   def solution(arr):
       a = []
       for i in arr:
          if a[-1:] == [i]: continue
          a.append(i)
       return a
   ```

   <br>

8. `''.join()` 함수로 리스트 문자열 합치기<br>
   
   문제링크: [문자열 내림차순으로 배치하기](https://sharpswan.github.io/%EB%AC%B8%EC%9E%90%EC%97%B4-%EB%82%B4%EB%A6%BC%EC%B0%A8%EC%88%9C%EC%9C%BC%EB%A1%9C-%EB%B0%B0%EC%B9%98%ED%95%98%EA%B8%B0(%EC%97%B0%EC%8A%B5%EB%AC%B8%EC%A0%9C)/)<br>
   
   ```python
   ''.join(['ab','pq','rs'])

   >>>'abpqrs'
   ``` 
   *Example*: `'.'.join(['ab', 'pq', 'rs']) -> 'ab.pq.rs'`

   <br>

9.  리스트에서 특정 요소 빼기<br>
    
    `list.remove(factor)`<br>
    문제링크: [체육복(탐욕법 greedy)](https://sharpswan.github.io/%EC%B2%B4%EC%9C%A1%EB%B3%B5(%ED%83%90%EC%9A%95%EB%B2%95-greedy)/)
   
    <br>

10. 소수 찾기(에라토스테네스의 체)<br>
    
    문제링크: [소수찾기(연습문제)](https://sharpswan.github.io/%EC%86%8C%EC%88%98-%EC%B0%BE%EA%B8%B0(%EC%97%B0%EC%8A%B5%EB%AC%B8%EC%A0%9C)/)<br>

    ```python
    def solution(n):
       num= set(range(2, n+1))
    
       for i in range(2,int(n**0.5)+1):
          if i in num:
             num -= set(range(2*i, n+1, i))
               
       return len(num)
    ```

    <br>

11. 아스키 코드 활용 법<br>
    
    문제링크: [시저암호](https://sharpswan.github.io/%EC%8B%9C%EC%A0%80-%EC%95%94%ED%98%B8(%EC%97%B0%EC%8A%B5%EB%AC%B8%EC%A0%9C)/)<br>
    문제링크: [이상한 문자 만들기(연습문제)](https://sharpswan.github.io/%EC%9D%B4%EC%83%81%ED%95%9C-%EB%AC%B8%EC%9E%90-%EB%A7%8C%EB%93%A4%EA%B8%B0(%EC%97%B0%EC%8A%B5%EB%AC%B8%EC%A0%9C)/)<br>
    `chr()`:아스키 코드 숫자를 입력하면 문자로 돌려줌<br>
    `ord()`: 아스키 코드 문자를 입력하면 숫자로 돌려줌<br>
    `문자.isupper()`: 전달한 아스키 값에 해당하는 문자가 대문자인지 확인<br>
    `문자.islower()`: 전달한 아스키 값에 해당하는 문자가 소문자인지 확인<br>
    32는 공백(space)<br>
    소문자 'a' 는 97 대문자 'A'는 65 즉 대문자 + 32는 소문자, 소문자 - 32는 대문자<br>

    <br>

12. 제곱과 루트 함수<br>
    
    문제링크: [정수 제곱근 판별(연습문제)](https://sharpswan.github.io/%EC%A0%95%EC%88%98-%EC%A0%9C%EA%B3%B1%EA%B7%BC-%ED%8C%90%EB%B3%84(%EC%97%B0%EC%8A%B5%EB%AC%B8%EC%A0%9C)/)<br>
    `pow(n, x)` 함수는 n을 x 만큼 제곱하는 함수

    `sqrt = n ** (1/2)` 이렇게 표현할 수 도 있다.

    <br>

13. 리스트의 원소 삭제 방법<br>
    
    문제링크: [제일 작은 수 제거하기(연습문제)](https://sharpswan.github.io/%EC%A0%9C%EC%9D%BC-%EC%9E%91%EC%9D%80-%EC%88%98-%EC%A0%9C%EA%B1%B0%ED%95%98%EA%B8%B0(%EC%97%B0%EC%8A%B5%EB%AC%B8%EC%A0%9C)/)<br>
    `del a[인덱스]` 리스트 a의 해당 인덱스 원소가 삭제된다.<br>
    `a.remove(원소)`  리스트 a의 해당 원소가 삭제된다.<br>

    <br>

14. 비트 논리 연산자 사용하기<br>
    
    문제링크: [짝수와 홀수(연습)](https://sharpswan.github.io/%EC%A7%9D%EC%88%98%EC%99%80-%ED%99%80%EC%88%98(%EC%97%B0%EC%8A%B5)/)<br>
    *비트논리 연산자 사용하기* <br>
    - AND, OR, XOR, NOT 연산을 하는 비트 논리 연산자
    1. & 비트 AND 
    2. \| 비트 OR
    3. ^ 비트 XOR
    4. ~ 비트 NOT

    비트 논리 연산자는 각 자릿수를 연산하여 결과를 만든다.<br>
    이때 각 자릿수의 연산결과는 영향을 받지 않는다.<br>

    <br>

    ```python
    ---------------------------------------------
    #AND 연산자

    1 1 0 1 (13) 
    1 0 0 1 (9)

    13 & 9
    >>> 1 0 0 1 (9)
    ---------------------------------------------
    ```
    둘다 1인 자릿릿수만 1, 나머지는 0이다.

    <br>

    ```python
    ---------------------------------------------
    # OR 연산자

    1 1 0 1 (13) 
    1 0 0 1 (9)

    13 | 9
    >>> 1 1 0 1 (13)
    ---------------------------------------------
    ```
    >둘 중 하나라도 1이면 1이다.

    <br>

    ```python
    ---------------------------------------------
    # XOR 연산자

    1 1 0 1 (13) 
    1 0 0 1 (9)

    13 ^ 9
    >>> '0100', 즉 bin(13^9) = '0b100'
    >>> 4

    ---------------------------------------------
    ```

    >둘 중 하나라도 1이면 1, 둘다 1이면 0

    <br>


    ```python
    ---------------------------------------------
    # NOT 연산자

    1 1 0 1 (13) 

    ~13  
    >>> bin(~13) = '-0b1110' # The bitwise inversion of x is defined as -(x+1)
    >>  -(0b1101)+1
    >> (-0b1110)
    ---------------------------------------------
    ```

    >The bitwise inversion of x is defined as -(x+1)

    <br>

15. 최대 공약수와 최소공배수<br>
    
    문제링크: [최대공약수와 최소공배수](https://sharpswan.github.io/GCD-LCD/)<br>

    ```python
    # This function computes GCD 
    def compute_gcd(x, y):
    
       while(y):
           x, y = y, x % y
       return x
    
    # This function computes LCM
    def compute_lcm(x, y):
       lcm = (x*y)//compute_gcd(x,y)
       return lcm
    
    num1 = 54
    num2 = 24 
    
    print("The L.C.M. is", compute_lcm(num1, num2))
    ```

    <br>

16. 숫자의 각 자릿수 분리 방법<br>
    
    문제링크: [하샤드 수](https://sharpswan.github.io/harshad-number/)<br>

    코딩테스트에 자주 나오는 것 중에 숫자를 자릿수에 따라 나누어야할 경우가 있다.<br>

    그럴때 자주쓰는 방법 세가지를 소개해보려한다.<br>

    `number = 12345` 를 `1,2,3,4,5` 로 자릿수별로 분리하는 예시이다.

    * str() 함수를 이용해서 나누기

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

    * 10으로 나누기

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

    * map 함수를 활용하여 원소값 더하기<br>

    ```python
    nums = 12345

    list(map(int, str(nums)))

    >>>[1, 2, 3, 4, 5]

    ```

17. 일정 간격을 둔 숫자 리스트 불러오기<br>
    
    문제링크: [소수만들기](https://sharpswan.github.io/make-prime-number/)<br>
    `range(start, stop [, step])`은 start에서 stop까지 step만큼 떨어진 숫자를 불러온다.

    ```python
    #1부터 10까지 2 만큼의 간격으로 리스트를 만들어봄
    list(range(1, 10, 2))

    >>>[1, 3, 5, 7, 9]
    ```

---