---
layout: post
title: TDD연습
img :
tags: [TDD] 
---



# TDD 연습

이 글은 말 그대로 TDD의 수행 과정 연습을 위해 정리한 글이다. 언어는 python을 썼으며 프레임워크는 pytest를 사용했다. 



## 1. 테스트 환경

TDD로 로그인 모듈을 완성하는게 목표이다. 모듈의 기능은 ID및 PW를 받아서 DB에 조회 후 일치하면 TRUE를 반환하는 것이다. 

1. 조회용 DB를 구축하지 않았으므로 JSON형식으로 저장된 파일에서 조회하는 것으로 한다. 
2. 코드의 간소화를 위해 PW의 암호화, 또는 해싱은 하지 않았다. 

JSON으로 저장된 파일의 내용은 아래와 같다. (User.txt)

```
{
    "test1":{
        "name" : "Sam",
        "pw" : "test1234"
    },
    "testa":{
        "name" : "Kim",
        "pw" : "test5678"
    }
}
```

2개의 id(test1, testa)가 저장되어 있으며  패스워드는 "pw" 에 기록되어 있다. 



## 2. 시작

### 2.1 테스트 케이스 작성

로그인 기능을 Given, When, Then 방식으로 정리를 해 보자. 

주어진 환경은 먼저 입력한 ID가 존재하는 경우/존재하지 않는 경우를 생각할 수 있다. 

그리고 ID에 어떤 값을, PW에 어떤 값을 입력하는 사용자 액션을 생각할 수 있을 것이다. 

이를 맵으로 나타내면 아래와 같다. 

![](/assets/img/2019/GivenWhenTree.png)



Given을 통하는 경로는 

1. ID존재
2. ID미존재

When을 통하는 경로는 

1. ID입력
   1. Blank
   2. 값존재
2. PW입력
   1. Blank
   2. ID매칭
   3. ID비매칭



Given 및 When-ID, When-PW 의 조합을 구한다. 조합은 [PICTMaster](https://ko.osdn.net/projects/pictmaster/)를 이용했다.

![](/assets/img/2019/pictmaster1.png)

모든 조합을 구하면 다음과 같다. 

<img src="/assets/img/2019/pictmaster2.png" style="zoom:60%;" />

여기서 의미있는 케이스만 골라야 한다. 1, 4, 10,11,12 까지 모두 5개를 골랐다. [^1]

<img src="/assets/img/2019/pict3.png" alt="pict3" style="zoom:60%;" />

### 2.2 코드 준비

통과해야할 논리 테스트 케이스가 준비되었으면 이제 코드를 준비한다. 코드는 크게 Login함수가 들어있는 main.py와 테스트 코드가 들어있는 test_sample_1.py로 나뉜다. pytest와 json이 pip install 되어 있어야 한다. 



main.py

```
def Login(ID, PW):
   return False
```



 test_sample_1.py

```
import main

def test_Case0():
   pass
```





이제 먼저 테스트 코드를 작성할 차례이다. 

위 5개의 케이스를 코드로 작성하면 아래와 같다.



```
import main

def test_Case0():
        #ID blank + PW는 blank
        assert main.Login('  ', '  ') == True
def test_Case1():
        #존재하지 않는 ID + PW는 blank
        assert main.Login('test2', ' ') == True
def test_Case2():
        #존재하는 ID + PW는 Blank
        assert main.Login('test1', ' ') == True
def test_Case3():
        #존재하는 ID + PW불일치
        assert main.Login('test1', 'a1234') == True
def test_Case4():
        #존재하는 ID + PW일치
        assert main.Login('test1', 'test1234') == True

```



pytest로 테스트를 실행하면 전부 Fail이 떨어진다. 

![](/assets/img/2019/Fail1.png)



이제 Case0 부터 Pass로 바꾸어 간다. 



## 3. 테스트 케이스로부터 메인 코드 완성하기



### 3.1 첫 번째 케이스를 Pass로...



첫번째 케이스는 ID및 PW모두 빈 값으로 입력한 케이스이다. 

main.py는 아래와 같이 적을 수 있다. 

```
import json

FIRST_CASE_RESULT = 2 #ID와 패스워드가 입력되지 않음 
SECOND_CASE_RESULT = 3 #ID는 없는 ID이며 PW가 입력되지 않음
THIRD_CASE_RESULT = 4 #ID는 있는 ID이며 PW가 입력되지 않음
FOURTH_CASE_RESULT = 5 #ID는 있으며 PW는 일치하지 않음


with open("User.txt", "r") as f:
    json_data = json.load(f) 


def Login(ID, PW):
    if (len(ID.strip())==0 and len(PW.strip())==0) :
        return FIRST_CASE_RESULT
     
    return False
```



여기에서 FIRST_CASE_RESULT는 오류결과를 구분하기 위한 상수로 보면 될 것이다. 

test_sample_1.py는 아래와 같이 수정했다.

```
import main

def test_Case0():
        #ID blank + PW는 blank
        assert main.Login('  ', '  ') == FIRST_CASE_RESULT
def test_Case1():
        #존재하지 않는 ID + PW는 blank
        assert main.Login('test2', ' ') == True
def test_Case2():
        #존재하는 ID + PW는 Blank
        assert main.Login('test1', ' ') == True
def test_Case3():
        #존재하는 ID + PW불일치
        assert main.Login('test1', 'a1234') == True
def test_Case4():
        #존재하는 ID + PW일치
        assert main.Login('test1', 'test1234') == True


```



테스트를 돌려보자.

![](/assets/img/2019/Fail2.png)



1개가 Passed로 바뀌었다. 



### 3.2 두 번째 케이스를 Pass로...

두번째 케이스는 존재하지 않은 ID입력후 PW는 빈 값으로 입력한 케이스이다. 

main.py는

```
import json

FIRST_CASE_RESULT = 2 #ID와 패스워드가 입력되지 않음 
SECOND_CASE_RESULT = 3 #ID는 없는 ID이며 PW가 입력되지 않음
THIRD_CASE_RESULT = 4 #ID는 있는 ID이며 PW가 입력되지 않음
FOURTH_CASE_RESULT = 5 #ID는 있으며 PW는 일치하지 않음


with open("User.txt", "r") as f:
    json_data = json.load(f) 


def Login(ID, PW):
    if (len(ID.strip())==0 and len(PW.strip())==0) :
        return FIRST_CASE_RESULT
    
    if (len(ID.strip())>0 and len(PW.strip())==0) :
        if (ID in json_data):
            pass
        else:
            return SECOND_CASE_RESULT

        
    return False

```

첫번쨰 케이스와 마찬가지로 SECOND_CASE_RESULT는 오류결과를  구분하기 위한 상수이다. 

test_sample_1.py는

```
import main

def test_Case0():
        #ID blank + PW는 blank
        assert main.Login('  ', '  ') == FIRST_CASE_RESULT
def test_Case1():
        #존재하지 않는 ID + PW는 blank
        assert main.Login('test2', ' ') == SECOND_CASE_RESULT
def test_Case2():
        #존재하는 ID + PW는 Blank
        assert main.Login('test1', ' ') == True
def test_Case3():
        #존재하는 ID + PW불일치
        assert main.Login('test1', 'a1234') == True
def test_Case4():
        #존재하는 ID + PW일치
        assert main.Login('test1', 'test1234') == True
```



테스트를 돌려보면

![](/assets/img/2019/Fail3.png)

Passed가 2개로 올라갔다. 



### 3.3 세 번째 케이스를 Pass로...

세번째 케이스는 존재하는 ID입력 후 PW는 빈 값으로 입력한 케이스이다 .



main.py는

```
import json

FIRST_CASE_RESULT = 2 #ID와 패스워드가 입력되지 않음 
SECOND_CASE_RESULT = 3 #ID는 없는 ID이며 PW가 입력되지 않음
THIRD_CASE_RESULT = 4 #ID는 있는 ID이며 PW가 입력되지 않음
FOURTH_CASE_RESULT = 5 #ID는 있으며 PW는 일치하지 않음


with open("User.txt", "r") as f:
    json_data = json.load(f) 


def Login(ID, PW):

    if (len(ID.strip())==0 and len(PW.strip())==0) :
        return FIRST_CASE_RESULT
    
    if (len(ID.strip())>0 and len(PW.strip())==0) :
        if (ID in json_data):
            pass
        else:
            return SECOND_CASE_RESULT

    if (len(ID.strip())>0 and len(PW.strip())==0) :
        if (ID in json_data):
            return THIRD_CASE_RESULT
        

        
    return False



```



참고로 세번째 if 문은 두번째 if문과 같이 통합이 가능하지만 여기에서는 가독성을 위해 그냥 이렇게 남겨 놓는다. 



test_sample_1.py

```
import main

def test_Case0():
        #ID blank + PW는 blank
        assert main.Login('  ', '  ') == FIRST_CASE_RESULT
def test_Case1():
        #존재하지 않는 ID + PW는 blank
        assert main.Login('test2', ' ') == SECOND_CASE_RESULT
def test_Case2():
        #존재하는 ID + PW는 Blank
        assert main.Login('test1', ' ') == THIRD_CASE_RESULT
def test_Case3():
        #존재하는 ID + PW불일치
        assert main.Login('test1', 'a1234') == True
def test_Case4():
        #존재하는 ID + PW일치
        assert main.Login('test1', 'test1234') == True
```

THIRD_CASE_RESULT역시 오류결과를  구분하기 위한 상수이다. 



테스트를 돌려보면

![](/assets/img/2019/Fail4.png)

Passed가 3개로 올라갔다. 

그리고 메인 모듈인 Login()도 점점 채워져 가는 게 보이지 않는가? 



### 3.4 네 번째 케이스를 Pass로...

네번째 케이스는 입력한 ID는 존재하는데 PW가 불일치한 경우이다. 



main.py

```
import json

FIRST_CASE_RESULT = 2 #ID와 패스워드가 입력되지 않음 
SECOND_CASE_RESULT = 3 #ID는 없는 ID이며 PW가 입력되지 않음
THIRD_CASE_RESULT = 4 #ID는 있는 ID이며 PW가 입력되지 않음
FOURTH_CASE_RESULT = 5 #ID는 있으며 PW는 일치하지 않음


with open("User.txt", "r") as f:
    json_data = json.load(f) 


def Login(ID, PW):

    if (len(ID.strip())==0 and len(PW.strip())==0) :
        return FIRST_CASE_RESULT
    
    if (len(ID.strip())>0 and len(PW.strip())==0) :
        if (ID in json_data):
            pass
        else:
            return SECOND_CASE_RESULT

    if (len(ID.strip())>0 and len(PW.strip())==0) :
        if (ID in json_data):
            return THIRD_CASE_RESULT
        
    if (len(ID.strip())>0 and len(PW.strip())>0) :
        if (ID in json_data):
            if (json_data[ID]['pw'] != PW):
                return FOURTH_CASE_RESULT

        
        
    return False



```

FOURTH_CASE_RESULT역시 오류결과를  구분하기 위한 상수이다. 



test_sample_1.py

```
import main

def test_Case0():
        #ID blank + PW는 blank
        assert main.Login('  ', '  ') == FIRST_CASE_RESULT
def test_Case1():
        #존재하지 않는 ID + PW는 blank
        assert main.Login('test2', ' ') == SECOND_CASE_RESULT
def test_Case2():
        #존재하는 ID + PW는 Blank
        assert main.Login('test1', ' ') == THIRD_CASE_RESULT
def test_Case3():
        #존재하는 ID + PW불일치
        assert main.Login('test1', 'a1234') == FOURTH_CASE_RESULT

```



테스트를 돌려보면

![](/assets/img/2019/Fail5.png)

Passed가 4개로 올라갔다. 



### 3.5 마지막 케이스를 Pass로...

이제 마지막 케이스이다. 마지막 케이스는 ID도 정상적으로 입력되고 PW도 일치하여 True를 돌려주는 케이스이다 .



main.py

```
import json

FIRST_CASE_RESULT = 2 #ID와 패스워드가 입력되지 않음 
SECOND_CASE_RESULT = 3 #ID는 없는 ID이며 PW가 입력되지 않음
THIRD_CASE_RESULT = 4 #ID는 있는 ID이며 PW가 입력되지 않음
FOURTH_CASE_RESULT = 5 #ID는 있으며 PW는 일치하지 않음


with open("User.txt", "r") as f:
    json_data = json.load(f) 


def Login(ID, PW):

    if (len(ID.strip())==0 and len(PW.strip())==0) :
        return FIRST_CASE_RESULT
    
    if (len(ID.strip())>0 and len(PW.strip())==0) :
        if (ID in json_data):
            pass
        else:
            return SECOND_CASE_RESULT

    if (len(ID.strip())>0 and len(PW.strip())==0) :
        if (ID in json_data):
            return THIRD_CASE_RESULT
        
    if (len(ID.strip())>0 and len(PW.strip())>0) :
        if (ID in json_data):
            if (json_data[ID]['pw'] != PW):
                return FOURTH_CASE_RESULT
        
        
    if (len(ID.strip())>0 and len(PW.strip())>0) :
        if (ID in json_data):
            if (json_data[ID]['pw'] == PW):
                return True
        
        
    return False


```

네번째 if문과 마지막 if문을 같이 통합하여 쓸 수 있으나 여기에서는 가독성을 위해 그냥 이렇게 남겨 놓는다. 



test_sample_1.py

```
import main

def test_Case0():
        #ID blank + PW는 blank
        assert main.Login('  ', '  ') == main.FIRST_CASE_RESULT


def test_Case1():
        #존재하지 않는 ID + PW는 blank
        assert main.Login('test2', '') == main.SECOND_CASE_RESULT


def test_Case2():
        #존재하는 ID + PW는 Blank
        assert main.Login('test1', '') == main.THIRD_CASE_RESULT

def test_Case3():
        #존재하는 ID + PW불일치
        assert main.Login('test1', 'a1234') == main.FOURTH_CASE_RESULT

def test_Case4():
        #존재하는 ID + PW일치
        assert main.Login('test1', 'test1234') == True

```



테스트를 돌려보면 모두 Pass가 되었다. 코드가 완성되었다.



![](/assets/img/2019/Pass.png)





## 4. 리팩토링

결과 코드를 보면 알겠지만 두번째와 세번째, 네번째와 다섯번째 if문은 같이 합쳐야 한다. 이렇게 코드를 정리하는 작업이 리팩토링이며 리팩토링을 하더라도 모든 테스트 케이스는 수행해도 Passed 상태여야 한다. 



main.py

```
import json

FIRST_CASE_RESULT = 2 #ID와 패스워드가 입력되지 않음 
SECOND_CASE_RESULT = 3 #ID는 없는 ID이며 PW가 입력되지 않음
THIRD_CASE_RESULT = 4 #ID는 있는 ID이며 PW가 입력되지 않음
FOURTH_CASE_RESULT = 5 #ID는 있으며 PW는 일치하지 않음


with open("User.txt", "r") as f:
    json_data = json.load(f) 


def Login(ID, PW):

    if (len(ID.strip())==0 and len(PW.strip())==0) :
        return FIRST_CASE_RESULT
    
    if (len(ID.strip())>0 and len(PW.strip())==0) :
        if (ID in json_data):
            return THIRD_CASE_RESULT
        else:
            return SECOND_CASE_RESULT

        
    if (len(ID.strip())>0 and len(PW.strip())>0) :
        if (ID in json_data):
            if (json_data[ID]['pw'] != PW):
                return FOURTH_CASE_RESULT
            else:
                return True
        
        
    return False
```



테스트를 돌려 100% 패스를 확인한다. 



![](/assets/img/2019/Pass.png)





## 마치며

아주 간단한 로그인 기능을 TDD로 작성을 해 보았다. 개인적으로 TDD의 큰 장점은 

<center>
  <h3>
    테스트를 빼먹지 않고 할 수 있다.
  </h3>
</center>

이다.

TDD가 제대로 효과를 보려면 테스트 케이스의 품질이 관건이며, 이를 간단한 조합 도구를 활용하여 작성을 해 보았다. 참고로 PICTMaster는 조합의 개수가 많아지면 줄여주는 로직도 있으니 이를 활용하면 테스트 케이스를 어느정도 리즈너블하게 가져갈 수 있지 않을 까 생각한다. 



<br><br>

<hr>


[^1]: 2,3번 케이스는 ID가 Blank이면 PW비교가 불가능하며, 5,6번 역시 존재하지 않는 ID의 PW비교도 불가능할 것이다. 7,8,9번 케이스는 ID가 존재하는게 ID입력이 Blank라는 말이 안되는 상황이다. 

