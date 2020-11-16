---
layout: post
title: 데이터 예측 기법 (2) - Naïve Bayes for document classification : 페어와이징의 가중치. 
tags: [DataMining, Pairwise] 
---



이번에는 Naïve Beysian을 활용한 도큐먼트 분류이다. 

* 도큐먼트의 개념 : ex) 뉴스를 생각하면 쉽다. 
* 도큐먼트의 클래스 : 국내뉴스, 해외뉴스, 금융, 스포츠... 등으로 분류 가능할 것이다. 
* bag의 개념 : 도큐먼트는 단어들이 들어있는 가방(bag)이다. 
  * 세트는 중복 멤버를 가지지 않지만, bag은 중복 멤버를 가질 수 있다. 



![](https://latex.codecogs.com/gif.latex?n_1,n_2....n_k)를 단어 i가 도큐먼트에 나타나는 횟수라 하고

![](https://latex.codecogs.com/gif.latex?P_1,&space;P_2...&space;P_k)를 카테고리 H에 있는 모든 도큐먼트의 샘플링시 i가 얻어지는 확률 이라고 하자

주어진 클래스 H의 도큐먼트 E의  확률은 

![](https://latex.codecogs.com/gif.latex?P(E|H)=N!&space;\times&space;\prod_{i=1}^{k}&space;\frac{P_{i}^{n_i}}{n_i&space;!})

여기서 ![](https://latex.codecogs.com/gif.latex?N=n_1&space;&plus;&space;n_2&space;...&space;&plus;&space;n_k)이다. 

단어집에 yellow, blue 두 개 단어만 있고 도큐먼트 클래스 H는 P(yellow|H) = 75%, P(blue|H) = 25% 라고 하면, 다시 말해 클래스H에서 단어를 임의로 하나를 선택할 때 yellow가나올 확률이 75%, blue가 나올 확률이 25%이면, 이 단어집을 사용하여 각 도큐먼트가 만들어질 확률을 알아보자. 백(bag)에서 만들어질 도큐먼트는 페어와이징 조합으로 4개가 만들어질 것이다. (https://sqamate.com/tools/pairwise 활용)

* yellow, yellow, yellow
* blue, blue, yellow
* blue, yellow, blue
* yellow, blue, blue

첫 번째 경우를 계산해 보면

![](https://latex.codecogs.com/gif.latex?P(\left&space;\{yellow\:&space;yellow\:&space;yellow&space;\right&space;\}|H)=3!&space;\times&space;\frac{0.75^3}{3!}&space;\times&space;\frac{0.25^0}{0!}=\frac{27}{64})

나머지도 각각 계산하면 아래와 같다. 

![](https://latex.codecogs.com/gif.latex?P(\left&space;\{blue\:&space;blue\:&space;blue&space;\right&space;\}|H)=\frac{1}{64})

![](https://latex.codecogs.com/gif.latex?P(\left&space;\{yellow\:&space;yellow\:&space;blue&space;\right&space;\}|H)=\frac{27}{64})

![](https://latex.codecogs.com/gif.latex?P(\left&space;\{yellow\:&space;blue\:&space;blue&space;\right&space;\}|H)=\frac{9}{64})

각각은 하기 데이터가 나올 확률을 의미하며 네 개의 경우 중 그나마 확률이 높은 것은 {yellow, yellow, yellow}와 {yellow, yellow, blue}가 42%로 높다. 



개인적인 의견이지만, 이는 페어와이징의 가중치와 관계가 있다. 페어와이징의 각 아이템이 동일한 확률로 나온다면, 이 아이템들은 다 동일한 확률을 가지겠지만, 아이템별로 나올 확률이 다르다면(즉 가중치가 다르다면) 조합의 결과가 갖는 확률도 각기 다른데 그것을 구하는 방법이 위 방법이라는 생각이 든다. 

