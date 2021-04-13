---
layout: post
title: 코딩테스트 치기 전 필요한 준비물, 스니펫 snippets! # title에 [괄호] 사용 금지
date: 2021-04-14 01:30:20 +0900 # 한국 시간 포맷 +0900
description: 코딩테스트 치기 전 필요한 준비물, 스니펫 snippets! # Add post description (optional)
img: /python/pythonSnippets.png # Add image post (optional)
fig-caption: # Add figcaption (optional)
tags: [20개 파이썬 snippets]
---

# 코딩테스트 치기 전 필요한 준비물, 스니펫 snippets!

코로나로 인해 화상면접이나 온라인 테스트가 더욱 본격화되고 있다. 특히나 IT 관련 직군들은 코딩테스트의 장벽이 도사리고 있는데 이 코딩테스트는 코로나 이전부터 온라인에서 치뤄지는 경우가 많았다. 이런 경우 대부분 구글 검색이나 IDE 활용을 부정행위로 보지 않는데.. 이때 자신이 약한 알고리즘이나, 헷갈릴 수 있는 코드들을 정리해놓으면 아주 유용하게 쓸 수 있을 것이다. 이것을 snippets(조각) 이라고 하는데 자신이 자주 쓰는 snippets을 모아놓는게 필수라고 한다. (~~난 몰라서 그러지 못했다ㅠㅠ~~) 예를 들자면, 리스트를 뒤집거나 문자열을 뒤집거나 맨 뒤에서부터 하나만 가져오거나..

인터넷에 많은 스니펫들이 돌아다니고 있는데, 그 중 꽤 괜찮은 스니펫 글이 있어서 한번 소개해보려고 한다. 

<br>

# 20 Python snippets You should Learn Today

오늘 공부해야 하는 20가지 파이썬 스니펫!


Python은 비 BS 프로그래밍 언어입니다. 가독성과 디자인의 단순성은 엄청난 인기를 얻은 가장 큰 두 가지 이유입니다.

Zen of Python은 다음과 같이 말합니다.

>Beautiful is better than ugly.<br>
Explicit is better than implicit.<br>

이것은 코드 디자인을 개선하는 데 도움이 되는 몇 가지 일반적인 Python 트릭들을 기억하는 것이 가치있는 이유입니다.

이것은 당신이 뭔가를 하려고 할 때마다 문제 해결을 위해 Stack Overflow를 서핑하는 수고를 덜어 줄 것입니다.

다음 트릭은 일상적인 코딩 연습에 유용합니다.

<br>

1. **Reversing a String (문자열 뒤집기)**<br>
   
   아래는 파이썬 슬라이싱을 이용해서 문자열을 뒤집는 스니펫이다.

   `reverse_slice.py`

   ```python
   # Reversing a string using slicing

   my_string = "ABCDE"
   reversed_string = my_string[::-1]

   print(reversed_string)

   # Output
   # EDCBA
   ``` 

2. **Using rhe Title Case (First Letter Caps) 첫번째 글자만 대문자로**<br>
   
   `title()` 메서드를 string class에 사용하면 첫번째 글자만 대문자로 바꿔준다.

   `title.py`

   ```python
   my_string = "my name is chaitanya baweja"

   # using the title() function of string class
   new_string = my_string.title()
   
   print(new_string)
   
   # Output
   # My Name Is Chaitanya Baweja
   ```

3. **Finding Unique Elements in a String (문자열에서 고유 요소 찾기 즉 중복제거)**<br>
   

   `unique_string.py`

   ```python
   my_string = "aavvccccddddeee"
   # converting the string to a set
   temp_set = set(my_string)

   # stitching set into a string using join
   new_string = ''.join(temp_set)

   print(new_string)

   >>>vcdae
   ```

4. **Printing a String or a List n Times (문자나 리스트를 n번 반복)**<br>
   
   multiplication(\*)을 string이나 lists에 사용할 수 있다. 얼마든지 곱하여 반복할 수 있다.

   `unique_string.py`

   ```python
   n = 3 # number of repetitions

   my_string = "abcd"
   my_list = [1,2,3]

   print(my_string*n)
   # abcdabcdabcd
  
   print(my_list*n)
   # [1,2,3,1,2,3,1,2,3]
   ```
   
   재미있는 사용 케이스는 리스트를 상수와 함께 정의할 수 있는 점이다. 
   ```python
   n = 4
   my_list = [0]*n # n denotes the length of the required list
   # [0, 0, 0, 0]
   ```

5. **List Comprehension (리스트 컴프리헨션)**<br>
   
   리스트 컴프리헨션은 다른 리스트를 기반으로 우아하게 리스트를 만들어낼 수 있게 해준다.<br>
   이 스니펫은 이전 리스트에 각각 2를 곱하여 새로운 리스트를 만든다.<br>

   `list_comprehension.py`

   ```python
   # Multiplying each element in a list by 2

   original_list = [1,2,3,4]

   new_list = [2*x for x in original_list]

   print(new_list)
   # [2,4,6,8]
   ```

6. **Swap Values Between Two Variables (두 변수간의 값 바꾸기)**<br>
   
   파이썬은 두 변수간의 값을 다른 변수를 쓰지 않고 간단하게 바꿔줄 수 있다.

   `swap.py`
   ```python
   a = 1
   b = 2

   a, b = b, a

   print(a) # 2
   print(b) # 1
   ```

7. **Split a String Into a List of Substrings (문자열을 하위 문자열의 리스트로 나누기)**<br>
   
   `.split()` 메서드를 이용해서 문자열을 하위 문자열의 리스트로 나눠줄 수 있다.<br>
   

   ```python
   string_1 = "My name is Chaitanya Baweja"
   string_2 = "sample/ string 2"

   # default separator ' '
   print(string_1.split())
   # ['My', 'name', 'is', 'Chaitanya', 'Baweja']

   # defining separator as '/'
   print(string_2.split('/'))
   # ['sample', ' string 2']
   ```

8. **Combining a List of Strings Into a Single String (리스트 스트링을 하나의 스트링으로 결합)**<br>
   
   `join()` 메서드는 문자열의 리스트를 단일 문자열로 결합한다. 우리의 경우는 콤마를 사용하여 나눌 것이다.<br>

   `combine_string.py`
   
   ```python
   list_of_strings = ['My', 'name', 'is', 'Chaitanya', 'Baweja']

   # Using join with the comma separator
   print(','.join(list_of_strings))

   # Output
   # My,name,is,Chaitanya,Baweja
   ```
   
9. **Check If a Given String Is a Palindrome or Not (주어진 문자열이 회문:'거꾸로 읽어도 같은 문자'인지 확인)**<br>
    
    `palindrome.py`
    ```python
    my_string = "abcba"

    if my_string == my_string[::-1]:
    print("palindrome")
    else:
    print("not palindrome")

    # Output
    # palindrome
    ```

10. **Frequency of Elements in a List (리스트에 요소가 얼마나 몇번 나오는지)**<br>
    
    여러가지 방법이 있지만 가장 좋아하는 방법은 Python `counter` 클래스를 사용하는 것이다.

    `Python counter` 는 컨테이너에 있는 각 요소의 빈도를 추적한다. `Counter()`요소를 키로, 빈도를 값으로 포함하는 딕셔너리를 리턴한다.

    또한 `most_common()` 함수는 리스트에서 `most_freqeunt element`, 가장 많이 나온 요소를 찾는다.

    `freqeuncy.py`
    ```python
    # finding frequency of each element in a list
    from collections import Counter

    my_list = ['a','a','b','b','b','c','d','d','d','d','d']
    count = Counter(my_list) # defining a counter object

    print(count) # Of all elements
    # Counter({'d': 5, 'b': 3, 'a': 2, 'c': 1})

    print(count['b']) # of individual element
    # 3

    print(count.most_common(1)) # most frequent element
    # [('d', 5)]
    ```

11. **Find Whether Two Strings are Anagrams (두 문자열이 아나그램인지 아닌지 찾기)**<br>
  \*아나그램: 문자의 순서를 바꿔 다른 단어나 문장을 만든 것.<br>
  `Counter` 클래스의 흥미로운 응용은, 아나그램을 찾는 것이다.<br>
  만약 `Counter` 두 문자열의 객체가 같으면 아나그램이다.<br>

  `anagram.py`
  ```python
  from collections import Counter

  str_1, str_2, str_3 = "acbde", "abced", "abcda"
  cnt_1, cnt_2, cnt_3  = Counter(str_1), Counter(str_2), Counter(str_3)

  if cnt_1 == cnt_2:
      print('1 and 2 anagram')
  if cnt_1 == cnt_3:
      print('1 and 3 anagram')
  ```

12. **Using the try-except-else Block (try-except-else 블록 사용)**<br>
    python에서 오류 처리는 try/except 블록을 사용하여 쉽게 수행할 수 있다. 이 블록에 else 문을 추가하면 유용하다. try 블록에서 예외가 발생하지 않을 때 실행된다.

    예외에 관계없이 무언가를 실행해야하는 경우 `finally`를 사용한다.<br>

    `try_except.py`
    ```python
    a, b = 1,0

    try:
        print(a/b)
        # exception raised when b is 0
    except ZeroDivisionError:
        print("division by zero")
    else:
        print("no exceptions raised")
    finally:
        print("Run this always")
    ```

13. **Using Enumerate to Get Index/Value Pairs (enumerate를 사용하여 인덱스/ Value를 쌍으로 가져오기)**<br>
    다음 스크립트는 enumerate를 사용하여 리스트의 인덱스와 value를 iterate한다.<br>

    `enum.py`

    ```python
    my_list = ['a', 'b', 'c', 'd', 'e']

    for index, value in enumerate(my_list):
        print('{0}: {1}'.format(index, value))

    # 0: a
    # 1: b
    # 2: c
    # 3: d
    # 4: e
    ``` 

14. **Check the Memory Usage of an Object (개체의 메모리 사용량 확인)**<br>
    다음 스크립트는 오브젝트의 메모리 사용량을 확인하는데 사용할 수 있다. [여기](https://code.tutsplus.com/tutorials/understand-how-much-memory-your-python-objects-use--cms-25609)에서 자세한 내용 확인 가능하다.<br>

    `memory_usage.py`
    ```python
    import sys

    num = 21

    print(sys.getsizeof(num))

    # In Python 2, 24
    # In Python 3, 28
    ```

15. **Merging Two Dictionaries (두 딕셔너리 병합)**<br>
    python 2에서는 `update()`를 사영하여 두개의 딕셔너리를 병합했다.<br> 
    python 3.5에서는 프로세스를 더욱 간단하게 만들었다.<br>

    아래 주어진 스크립트에서 두 개의 딕셔너리가 병합된다.<br>  
    두 번째 values는 intersection(\*교집합)의 경우이다.<br>

    `merge_dict.py` 
    ```python
    dict_1 = {'apple': 9, 'banana': 6}
    dict_2 = {'banana': 4, 'orange': 8}

    combined_dict = {**dict_1, **dict_2}

    print(combined_dict)
    # Output
    # {'apple': 9, 'banana': 4, 'orange': 8}
    ```

16. **Time Taken to Execute a Piece of Code (코드를 실행하는데 걸리는 시간)**<br>
    다음 스니펫은 `time`라이브러리를 사용하여 코드를 실행하는데 걸리는 시간을 계산한다.

    `time.py`
    ```python
    import time

    start_time = time.time()
    # Code to check follows
    a, b = 1,2
    c = a+ b
    # Code to check ends
    end_time = time.time()
    time_taken_in_micro = (end_time- start_time)*(10**6)

    print(" Time taken in micro_seconds: {0} ms").format(time_taken_in_micro)
    ``` 

17. **Flattening a List of Lists (리스트들의 리스트를 Flat하게)**<br>
    가끔 리스트의 깊이에 대해 확신이 들지 않을 때가 있다.<br>
    그리고 심플하게 single flat 리스트의 요소드를 원할 때가 있다.<br>

    이를 얻는 방법은 다음과 같다:<br>
    `flatten.py`
    ```python
    from iteration_utilities import deepflatten

    # if you only have one depth nested_list, use this
    def flatten(l):
        return [item for sublist in l for item in sublist]

    l = [[1,2,3],[3]]
    print(flatten(l))
    # [1, 2, 3, 3]

    # if you don't know how deep the list is nested
    l = [[1,2,3],[4,[5],[6,7]],[8,[9,[10]]]]

    print(list(deepflatten(l, depth=3)))
    # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    ```

18. **Sampling From a List (리스트에서 샘플링)**<br>
    다음 스니펫은 `random` 라이브러리를 써서 `n`개의 랜덤 샘플을 생성한다.<br>

    `samples.py`
    ```python
    import random

    my_list = ['a', 'b', 'c', 'd', 'e']
    num_samples = 2

    samples = random.sample(my_list,num_samples)
    print(samples)
    # [ 'a', 'e'] this will have any 2 random values
    ```

    암호화 목적으로 랜덤 샘플들을 생성하기 위해 `secret` 라이브러리를 추천받았다.<br>
    다음 스니펫은 python 3에서만 작동한다.

    `secret.py`
    ```python
    import secrets                          # imports secure module.
    secure_random = secrets.SystemRandom()  # creates a secure random object.

    my_list = ['a','b','c','d','e']
    num_samples = 2

    samples = secure_random.sample(my_list, num_samples)

    print(samples)
    # [ 'e', 'd'] this will have any 2 random values
    ```

19. **Digitize (숫자를 자릿수 별로 나누기)**<br>
    다음 스니펫은 integer를 digits 의 리스트로 전환시킨다.<br>
    하나의 integer를 각 자릿수의 숫자들의 리스트로 바꿔준다.<br>

    `digitize.py`
    ```python
    num = 123456

    # using map
    list_of_digits = list(map(int, str(num)))

    print(list_of_digits)
    # [1, 2, 3, 4, 5, 6]

    # using list comprehension
    list_of_digits = [int(x) for x in str(num)]

    print(list_of_digits)
    # [1, 2, 3, 4, 5, 6]
    ```
    
20. **Check for Uniqueness (고유성 확인)**<br>
    다음 함수는 리스트의 모든 요소들이 중복이 있는지 없는지 확인한다<br>

    `uniqueness.py`
    ```python
    def unique(l):
        if len(l)==len(set(l)):
            print("All elements are unique")
        else:
            print("List has duplicates")

    unique([1,2,3,4])
    # All elements are unique

    unique([1,1,2,3])
    # List has duplicates
    ```

**결론**

이것들은 일상 작업에서 매우 유용하다고 생각되는 short snippets이다.

Thank you for reading this story. Hope you enjoyed it.
