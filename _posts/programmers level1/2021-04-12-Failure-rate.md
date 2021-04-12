---
layout: post
title: 프로그래머스 LV1 실패율(2019 KAKAO BLIND RECRUITMENT) # title에 [괄호] 사용 금지
date: 2021-04-12 13:53:00 +0900 # 한국 시간 포맷 +0900
description: 프로그래머스 코딩테스트 LV1 실패율(2019 KAKAO BLIND RECRUITMENT) 파이썬 # Add post description (optional)
img: /python/python-wallpaper.png # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [프로그래머스 파이썬 코딩테스트 LV1]
use_math: true
---

# 프로그래머스 lv1 실패율(2019 KAKAO BLIND RECRUITMENT)

>문제 링크: <https://programmers.co.kr/learn/courses/30/lessons/42889>

>출처: 프로그래머스 코딩 테스트 연습 <https://programmers.co.kr/learn/challenges>

<br>

<img src="https://grepp-programmers.s3.amazonaws.com/files/production/bde471d8ac/48ddf1cc-c4ea-499d-b431-9727ee799191.png" height = 500 width =500 align="center">

<br>

입출력 예

|N|stages|result|
|:---:|:---:|:---:|
|5|[2, 1, 2, 6, 2, 4, 3, 3]|[3,4,2,1,5]|
|4|[4,4,4,4,4]|[4,1,2,3]|

---

## 풀이

```python
def solution(N, stages):
    players = len(stages)
    fail_rate = {}
    for stage in range(1,N+1):
        if stage in stages:
            ct = stages.count(stage)
            fail_rate[stage] = ct/players
            players -= ct
        else:
            fail_rate[stage] = 0
    return [x[0] for x in sorted(fail_rate.items(), key = lambda item: item[1], reverse=True)]
```

> 실패율을 length를 이용해서 구했다. 그리고 계산할 때마다 length를 줄여서 시간을 줄임.

---
