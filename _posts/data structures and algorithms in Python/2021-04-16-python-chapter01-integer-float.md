---
layout: post
title: 파이썬 자료구조 Chapter 01 정수와 부동소수점 # title에 [괄호] 사용 금지
date: 2021-04-16 17:55:00 +0900 # 한국 시간 포맷 +0900
description: 파이썬 자료구조 Chapter 01 정수와 부동소수점 # Add post description (optional)
img: /data-structures-and-algorithms-in-python/data-structures-and-algorithms-in-python.png # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [파이썬 자료구조와 알고리즘, 파이썬 숫자]
use_math: true
---

# PART 자료구조 Contents

- [PART 자료구조 Contents](#part-자료구조-contents)
- [Chapter 01 숫자](#chapter-01-숫자)
  - [1.1 정수](#11-정수)
  - [1.2 부동소수점](#12-부동소수점)
  - [1.2.1 부동소수점끼리 비교하기](#121-부동소수점끼리-비교하기)
  - [1.2.2 정수와 부동소수점 메서드](#122-정수와-부동소수점-메서드)

# Chapter 01 숫자

- 숫자 
- - 정수(*integer*)
- - 부동소수점(*float*)
- - 복소수(*complex*)

인간 : 10개의 손가락으로 나타내는 10진법이 자연스러움

컴퓨터 : 전자 상태 신호인 참, 거짓을 주고 받는 이진법(*binary*)표현이 더 적합. 

컴퓨터는 정보를 비트(*bit*)로 표현. 또한 8진법과 16진법 등 2의 배수 표현도 사용

---

## 1.1 정수

파이썬에서 정수: **int**, 불변*immutable*형.

파이썬 정수 크기 

- 컴퓨터 메모리에 의해 제한

- 적어도 32비트(4바이트)다. 

`(정수).bit_length()` : 정수를 나타내는데 필요한 바이트 수를 확인(파이썬 3.1 이상)

```python
>>> (999).bit_length()
10
```

`int(문자열, 밑)` : 어떤 문자열을 정수로 변환*casting*하거나 다른 진법의 문자열을 정수(10진법)으로 변환

```python
>>> s = '11'
>>> d = int(s)
>>> print(d)
11
>>> b = int(s, 2)
>>> print(b)
3
```

`int`메서드의 밑은 2에서 36사이의 선택적 인수(*optional argument*) 

문자열 s에서 밑 범위의 숫자를 벗어나는 값을 입력한다면 `int` 메서드에서 `ValueError`예외가 발생한다.

예를 들어 `s = '12'` 에 대해 실행하면 예외가 발생한다.

---

## 1.2 부동소수점

IEEE 754: 전기 전자 기술자 협회(IEEE)에서 개발한, 컴퓨터에서 부동소수점을 표현하는 가장 널리 쓰이는 표준

파이썬에서 부동소수점은 float으로 나타내며 *불변형*

단정도(*single precision*)방식에서 32비트 부동소수점을 나타낼 때 1비트는 부호*sign*(0: 양수, 1: 음수), 23비트는 유효 숫자 자릿수*significant digits*(혹은 가수*mantissa*), 8비트는 지수*exponent*다.

![float](/assets/img/data-structures-and-algorithms-in-python/Single-Precision-vs-Double-Precision.png)

example: -118.625<sub>10</sub>를 32비트 단정도로 표현해보면?

1. 숫자의 절댓값을 이진수로 변환
2. 부호*sign*는 음수이므로 1

   ->: $1110110.101$<sub>(2)</sub>

3. 변환 된 이진수 정규화(소수점 왼쪽 이동시켜 1만 남게 함)
   
   ->: $1.110110101$<sub>(2)</sub> \* $2^6$
4. 위 숫자를 가수부(23비트)에 넣고 부족한 자릿수는 0으로 채움

   ->: $11011010100000000000000$

5. 지수 6에 바이어스<sup>bias</sup> 127(0111 1111<sub>(2)</sub>) 더함

   6<sub>(10)</sub> + 127<sub>(10)</sub> = 133<sub>(10)</sub> = 10000101<sub>(2)</sub>

   *(bias는 2<sup>k-1</sup> 로 주어지는데 k는 지수부의 비트수 8이다. 즉 2<sup>7</sup>)*

->>: 1(부호)10000101(지수, 8자리)11011010100000000000000(가수, 23자리)

배정도<sup>double precision</sup>방식

- 1비트는 부호
- 52비트는 가수
- 11비트는 지수
- 바이어스는 1023을 더한다.($2$<sup>$10$</sup>$-1$)

## 1.2.1 부동소수점끼리 비교하기

이진수 분수<sup>binary fraction</sup>로 표현되기 때문에 함부로 비교하거나 빼면 안됨.

2진수는 대개 10진법으로 정확하게 표현 가능하지만 2진법으로 표현하기 어려운 숫자도 있다.

예: 0.1<sub>(10)</sub> = 0.00110011001100...<sub>(2)</sub>

```python
>>> 0.2 * == 0.6
False
>>> 1.2 - 0.2 == 1.0
True
>>> 0.1 * 0.1 == 0.01
False
```

고정소수점 방식은 정확도는 높지만 큰 수를 표현하려면 많은 메모리가 사용된다.

부동소수점 방식은 이 문제를 해결하기 위해 도입되었음.

가장 좋은 건 float을 사용하여 비교하지 않는게 좋다. 

**정수를 처리하는데 드는 비용보다 실수를 처리하는데 드는 비용이 압도적**으로 많기 때문.

속도가 중요하다면 **정수**를 사용하는 것이 좋다.

대신 동등성 테스트<sup>equality test</sup>는 사전에 정의된 정밀도 범위 내에서 수행되어야 한다.

예를 들어 unittest 모듈의 `assertAlmostEqual()` 메서드 같은 접근법을 사용하는 방법이 있다.

```python
>>> def a(x, y places=7):
...    return round(abs(x-y), places) == 0
```

또한 부동소수점의 숫자는 메모리에서 비트 패턴으로 비교할 수 있다.

1. 부호 비교를 별도 처리
2. 두 숫자가 음수이면, 부호를 뒤집고, 숫자를 반전하여 비교
3. 지수 패턴이 같으면 가수를 비교

## 1.2.2 정수와 부동소수점 메서드

- `/` 항상 부동소수점 반환
- `//` 연산자<sup>floor 또는 truncation</sup> : 정수 반환
- `%` 연산자<sup>module 또는 remainder</sup> : 나머지
- `divmod(x, y)` : x를 y로 나눌때 몫과 나머지
- `round(x, n)` 
-  1. n이 음수 -> x를 정수 n번째 자리에서 반올림
-  2. n이 양수 -> x를 소수점 이하 n번째 자리에서 반올림한 값을 반환
-  ```python
   >>> round(112.459, -1)
   110.0
   >>> round(112.459, 2)
   112.46
   ```
- `as_integer_ratio()` : 부동소수점을 분수로 표현
- ```python
  >>> 2.75.as_integer_ratio()
  (11,4)
  ```

---