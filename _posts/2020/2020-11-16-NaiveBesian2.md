---
layout: post
title: 데이터 예측 기법 (2) - Naïve Bayes for document classification  
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

단어집에 yellow, blue 두 개 단어만 있고 도큐먼트 클래스 H는 ![](https://latex.codecogs.com/gif.latex?P%28yellow%7CH%29%3D75%25), ![](https://latex.codecogs.com/gif.latex?P%28blue%7CH%29%3D25%25) 라고 하면, 다시 말해 클래스H에서 단어를 임의로 하나를 선택할 때 yellow가나올 확률이 75%, blue가 나올 확률이 25%이면, 이 단어집을 사용하여 각 도큐먼트가 만들어질 확률을 알아보자. 백(bag)에서 만들어질 도큐먼트는 페어와이징 조합으로 4개가 만들어질 것이다. (https://sqamate.com/tools/pairwise 활용)

* yellow, yellow, yellow
* blue, blue, yellow
* blue, yellow, blue
* yellow, blue, blue

첫 번째 경우를 계산해 보면

![](https://latex.codecogs.com/gif.latex?P%28%5Cleft%20%5C%7Byellow%5C%3A%20yellow%5C%3A%20yellow%20%5Cright%20%5C%7D%7CH%29%3D3%21%20%5Ctimes%20%5Cfrac%7B0.75%5E3%7D%7B3%21%7D%20%5Ctimes%20%5Cfrac%7B0.25%5E0%7D%7B0%21%7D%3D%5Cfrac%7B27%7D%7B64%7D)

나머지도 각각 계산하면 아래와 같다. 

![](https://latex.codecogs.com/gif.latex?P%28%5Cleft%20%5C%7Bblue%5C%3A%20blue%5C%3A%20blue%20%5Cright%20%5C%7D%7CH%29%3D%5Cfrac%7B1%7D%7B64%7D)

![](https://latex.codecogs.com/gif.latex?P%28%5Cleft%20%5C%7Byellow%5C%3A%20yellow%5C%3A%20blue%20%5Cright%20%5C%7D%7CH%29%3D%5Cfrac%7B27%7D%7B64%7D)

![](https://latex.codecogs.com/gif.latex?P%28%5Cleft%20%5C%7Byellow%5C%3A%20blue%5C%3A%20blue%20%5Cright%20%5C%7D%7CH%29%3D%5Cfrac%7B9%7D%7B64%7D)

각각은 하기 데이터가 나올 확률을 의미하며 네 개의 경우 중 그나마 확률이 높은 것은 {yellow, yellow, yellow}와 {yellow, yellow, blue}가 42%로 높다. 



개인적인 의견이지만, 이는 페어와이징의 가중치의 의미를 가지고 있다. 단 이 경우는 동일한 군집에 들어있는 각 아이템의 나올 확률을 구한다음 이 아이템들의 조합을 가지고 하나의 결과(여기서는 백<sub>bag</sub> 이 된다)를 만드는 경우이다. 

 