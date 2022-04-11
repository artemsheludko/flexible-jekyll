---
layout: post
title: hypothesis와 속성 기반 테스팅
tags: [python, hypothesis, 속성기반테스트]
---

## hypothesis와 속성 기반 테스팅



### hypothesis

파이썬에서 hypothesis라는 재미 있는 라이브러리가 있다. 

보통 랜덤 데이터를 생성할 때에는 random을 사용하지만, 타입이 숫자에 국한되는 등 원하는 타입으로 사용하기에는 힘이 드는 게 사실이다. 

이런 경우 hypothesis를 한 번 생각해 보는 건 어떨까? 

설치는 pip 설치가 가능하다.

```bash
pip install hypothesis
```

아래는 랜덤하게 정수형 데이터를 생성하는 코드이다. 

```python
from hypothesis import given
from hypothesis.strategies import integers

@given(integers())
def test_step_1(values):
    print(values)

test_step_1()
```

결과는 다음과 같다. 

```bash
...
-2010
1649899402
-7320684862777758599
66763718
105
-37
-811402964
24504
38
18965
7311
-28
50
-15515
-60
-26381
103
-1099832873843514797
2455452417689273997
22820
117
-18874
159189936367140925634551803114719423897
2839436220301502177
...
```

무작위 정수형 100개를  만들어 준다. 

여기까지는 random과 큰 차이는 없는데,  정수형 이외에 다양한 랜덤 데이터를 만들어 준다는게 차이점이다. 다음은 이메일 데이터와 정수형으로 이뤄진 딕셔너리 데이터를 랜덤으로 만들어 주는 예제이다. [^각주1]

```python
from hypothesis import given
from hypothesis.strategies import dictionaries, integers, emails

@given(dictionaries(emails(), integers(min_value=100, max_value=2000)))
def test_step(ingredient_to_calorie_mapping: dict[str,int] ):
    print(ingredient_to_calorie_mapping)

test_step()
```

실행 결과는 아래와 같다.

![](https://raw.githubusercontent.com/cheuora/cheuora.github.io/master/_posts/2022/image-2022-04-12.png)

딕셔너리의 키 값은 무작위이지만 이메일 형식을 따른 데이터를, 키에 매칭되는 정수값은 100이상 2000 미만 중에서 무작위로 선택되었다.

 

### 속성기반 테스팅

속성 기반 테스트(Property-based test)라는 것이 있다. 말 그대로 속성을 체크한다는 의미인데, 위 코드를 테스트 코드로 바꿔보도록 하자. 

불변 속성이 다음과 같다고 하자.

* 이메일의 길이는 50자를 넘지 않는다(넘으면 오류).

이를 체크하는 함수를 아래와 같다. 

```python
def isValidEmail(email):
    if len(email) <=30:
        return True
    else:
        return False
```

이 함수를 반영한 테스트 코드를 작성하면 아래와 같이 될 것이다. 

```python
from dataclasses import dataclass

@dataclass
class Mail:
    email: str
    zipcode: int

from hypothesis import given
from hypothesis.strategies import composite, integers, emails

Mail_zip = tuple[Mail]

def isValidEmail(email):
    if len(email) <=30:
        return True
    else:
        return False


@composite
def email_zipcode(draw) -> Mail_zip:
    zipcode = integers(min_value=10000, max_value=99999)
    email = emails()

    return Mail(draw(email), draw(zipcode))

@given(email_zipcode())
def test_email_zipcode(maildata: Mail_zip):
    assert isValidEmail(maildata.email) == True
```



pytest를 사용하여 테스트를 하자. 

```
pytest hypotest.py --hypothesis-show-statistics
```

결과는 아래와 같다.

``` 
======================================= test session starts ========================================
platform linux -- Python 3.9.5, pytest-7.1.1, pluggy-1.0.0
rootdir: /home/ubuntu
plugins: hypothesis-6.42.3
collected 1 item

hypotest.py F                                                                                   [100%]

============================================= FAILURES =============================================
__________________________________ test_course_meal_substitutions __________________________________

    @given(email_zipcode())
>   def test_course_meal_substitutions(maildata: Mail_zip):

hypotest.py:28:
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

maildata = Mail(email='0@A.A.A.xn--vermgensberater-ctb', zipcode=10000)

    @given(email_zipcode())
    def test_course_meal_substitutions(maildata: Mail_zip):
>       assert isValidEmail(maildata.email) == True
E       AssertionError: assert False == True
E        +  where False = isValidEmail('0@A.A.A.xn--vermgensberater-ctb')
E        +    where '0@A.A.A.xn--vermgensberater-ctb' = Mail(email='0@A.A.A.xn--vermgensberater-ctb', zipcode=10000).email

hypotest.py:29: AssertionError
-------------------------------------------- Hypothesis --------------------------------------------
Falsifying example: test_course_meal_substitutions(
    maildata=Mail(email='0@A.A.A.xn--vermgensberater-ctb', zipcode=10000),
)
====================================== Hypothesis Statistics =======================================
hypotest.py::test_course_meal_substitutions:

  - during generate phase (0.13 seconds):
    - Typical runtimes: 2-27 ms, ~ 82% in data generation
    - 7 passing examples, 3 failing examples, 0 invalid examples
    - Found 1 distinct error in this phase

  - during shrink phase (2.94 seconds):
    - Typical runtimes: 3-7 ms, ~ 90% in data generation
    - 174 passing examples, 34 failing examples, 76 invalid examples
    - Tried 284 shrinks of which 32 were successful

  - Stopped because nothing left to do


===================================== short test summary info ======================================
FAILED hypotest.py::test_course_meal_substitutions - AssertionError: assert False == True
======================================== 1 failed in 3.11s ========================================
```

한번 더 수행해 보겠다.

```
...
===================================== short test summary info ======================================
FAILED 6test.py::test_course_meal_substitutions - AssertionError: assert False == True
======================================== 1 failed in 1.35s =========================================
```

처음에는 3.11s 가 걸렸지만, 동일한 케이스를 두 번째 수행시에는 1.35s가 걸렸다. 시간이 점점 줄어드는데, hypothesis는 처음 시도시 실패한 케이스의 값을 로컬에 저장하고 있다가 재시도할때 이 입력값을 다시 한번 불러 들인다. 그러면서 생성되는 무작위 케이스 수를 줄여가는데 이를 "shrink" 라고 부른다. 이 정보는 로컬에 저장할 수도 있고 redis와 같은 인메모리 데이터베이스에 저장하여 공유할 수도 있다.

이 외에도 Hypothesis에는 다양하게 데이터의 형태를 가공하여 랜덤하게 만드는 기능들이 많이 있다. 자세한 사항은 [Hypothesis의 공식 문서](https://hypothesis.readthedocs.io)를 참조하도록 하자. 





#### Hypothesis의 의미

속성 기반 테스트라고 하지만 어떻게 보면 속성에 맞게 랜덤하게 데이터를 생성해 적용하는 랜덤 테스트 도구이다. 다시 말하면 이 도구에서 생성하는 케이스를 메인 테스트 케이스로 삼으면 상당히 위험하며, 정상적인 경우를 체크못할 경우도 발생할 수 있다. 

Hypothesis 테스트는 테스트라는 안전망에 혹시 미치지 못할 부분이 있으면 이를 찾아주는 것이 주요 역할일 것이다. 먼저 정상적인 케이스를 작성하여 테스트 한후, 이 테스트를 실행한다면 생각치도 못한 오류를 찾는데 많은 도움을 받을 것이다. 





[^각주1]: python3.9이상에서 실행하기 바란다.

