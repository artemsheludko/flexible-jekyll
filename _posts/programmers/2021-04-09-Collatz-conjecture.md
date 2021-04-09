---
layout: post
title: 프로그래머스 LV1 콜라츠 추측(연습문제) # title에 [괄호] 사용 금지
date: 2021-04-09 15:33:00 +0900 # 한국 시간 포맷 +0900
description: 프로그래머스 코딩테스트 LV1 콜라츠 추측(연습문제) 파이썬 # Add post description (optional)
img: /python/python-wallpaper.png # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [프로그래머스 파이썬 코딩테스트 LV1]
---

# 프로그래머스 lv1 콜라츠 추측(연습문제)

문제 설명

1937년 Collatz란 사람에 의해 제기된 이 추측은, 주어진 수가 1이 될때까지 다음 작업을 반복하면, 
모든 수를 1로 만들 수 있다는 추측입니다. 작업은 다음과 같습니다.

>1-1. 입력된 수가 짝수라면 2로 나눕니다. <br>
1-2. 입력된 수가 홀수라면 3을 곱하고 1을 더합니다.<br>
2. 결과로 나온 수에 같은 작업을 1이 될 때까지 반복합니다.<br><br>
예를 들어, 입력된 수가 6이라면 6→3→10→5→16→8→4→2→1 이 되어 총 8번 만에 1이 됩니다.<br>
위 작업을 몇 번이나 반복해야하는지 반환하는 함수, solution을 완성해 주세요. 단, 작업을 500번을 반복해도 1이 되지 않는다면 –1을 반환해 주세요.


제한 사항

- 입력된 수, num은 1 이상 8000000 미만인 정수입니다.

입출력 예

|n|result|
|:---:|:---:|
|6|8|
|16|4|
|626331|-1|

입출력 예 설명


입출력 예 #1

문제의 설명과 같습니다.


입출력 예 #2

16 -> 8 -> 4 -> 2 -> 1 이되어 총 4번만에 1이 됩니다.


입출력 예 #3

626331은 500번을 시도해도 1이 되지 못하므로 -1을 리턴해야합니다.

>출처: 프로그래머스 코딩 테스트 연습 <https://programmers.co.kr/learn/challenges>

---

## 풀이

```python
# 내 풀이
def solution(num):
    answer = 0
    while num !=1:
        if num % 2 == 0:
            num = num //2
        else:
            num = (num * 3) + 1
        answer +=1
        
    if answer >= 500:
        return -1
    else:
        return answer
    return answer

solution(626331)
```
> 0은 거짓이고 1은 참. 예를 들어 `while(y):` 이뜻은? y가 0이 되면 1이면 계속.<br>
`while m !=0`은? m이 0이 아니면 계속. 0이 되면 종료.<br>
`LCM = x,y를 곱한 후 최대공약수(GCD)로 나누면 됨`<br>

<br>

```python
# 다른 사람 풀이. 마지막 부분만 다르고 거의 같다
def collatz(num):
    answer = 0
    while num != 1:
        if num%2 == 0:
            num = num//2
            answer = answer+ 1
        else:
            num = num*3+1
            answer = answer+ 1
    if answer < 500:
        return answer
    else:
        return (-1)
```

---

## 콜라츠 추측(Collatz conjecture)

**콜라츠 추측(Collatz conjecture)**은 1937년에 처음으로 이 추측을 제기한 로타르 콜라츠의 이름을 딴 것으로 **3n+1 추측**, **울람 추측**, 혹은 **헤일스톤(우박) 수열** 등 여러 이름으로 불린다. 콜라츠 추측은 임의의 자연수가 다음 조작을 거쳐 항상 1이 된다는 추측이다.

짝수라면 2로 나눈다.<br>
홀수라면 3을 곱하고 1을 더한다.<br>
1이면 조작을 멈추고, 1이 아니면 첫 번째 단계로 돌아간다.<br>
예를 들어, 6 에서 시작한다면, 차례로 6, 3, 10, 5, 16, 8, 4, 2, 1 이 된다.<br>

또, 27에서 시작하면 무려 111번을 거쳐야 1이 된다. 77번째에 이르면 9232를 정점으로 도달하다가 급격히 감소하여 34단계를 더 지나면 1이 된다.<br>

이 추측은 컴퓨터로 268[1] 까지 모두 성립함이 확인되었다. 그러나, 아직 모든 자연수에 대한 증명은 발견되지 않고 있다. 이 문제의 해결에 500달러의 현상금을 걸었던 에르되시 팔은 "수학은 아직 이런 문제를 다룰 준비가 되어 있지 않다."는 말을 남겼다.

* 콜라츠 그래프(1부터 200까지 핸들링)

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Collatz_graph001.svg/800px-Collatz_graph001.svg.png" alt = "collatz" height = "500" width = "500">

---