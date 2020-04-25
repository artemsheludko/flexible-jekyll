---
layout: post
title: Behave+Selenium 워크숍 정리
img : 2020/20200425/selenium.png
tags: [BDD,behave,python,Selenium]
---

(이 글은 Vue cli 및 python behave를 어느정도 안다는 가정하에 쓴 것입니다.)



BDD(Behavior Driven Development)를 설명하는 방송을 해야 하여 그 내용을 여기에 미리 기록을 하려 한다. 

앞의 몇몇 글에서 BDD에 대한 이야기를 몇 번 한 적이 있지만, BDD의 목적에 대해서는 하지 않은 것 같다. 

내가 생각하는 BDD의 목적은 

### 비개발 인력과의 소통

이라고 생각한다. 

다음과 같은 시나리오를 생각해 보자. 

* 기획자 : 이번에 로그인 랜딩 페이지는 로그인 사용자의 성별에 따라 다르게 보여주는게 특징 입니다. 
* 개발자 : 음.. 그럼 구체적인 시나리오를 주시겠어요?
* 기획자 : 우선 성별에 따라 웰컴 메시지를 조금 다르게 가져갈까 합니다. 여성이면 "아름다운 당신, 환영합니다", 남성이면 "멋있는 당신, 환영합니다" 로요
* 개발자 : 그럼 제가 시나리오를 구체화 시켜 볼테니 이를 가지고 나중에 얘기해 보도록 합시다. 



개발자가 이 때 기획자와의 소통을 위해 시나리오를 파워포인트, 또는 기타 워드 문서로 만들 수도 있을 것이다. 하지만, 가급적 시나리오를 인수 테스트 케이스화를 시키고 자동으로 이에 대한 테스트를 수행할 수 있다면 얼마나 좋을까... 라는 생각으로 탄생한게 Gherkin 이라는 언어이고, 이를 활용하여 자동화를 도와주는 모듈이 behave 및 cucumber이다 .



그래서 개발자는 python의 behave를 사용하여 인수 테스트의 자동화를 염두, Gherkin으로 시나리오를 정리한다. 

```
# filename : landingpage.feature
Feature: Front Contents

  Scenario: When a man is sign in
        Given user is test1
        When user is signing in
        Then The contents for Man is displayed


  Scenario: When a woman is sign in
        Given user is testa
        When user is signing in
        Then The contents for Woman is displayed
```



시나리오는 2개이며 하나는 남성이 로그인할 때, 또하나는 여성이 로그인 할 때 컨텐츠를 각각 다르게 보여준다는 내용이다. 



참고로 test1 및 testa는 테스트 유저이며 이에 대한 정보 json형식은 아래와 같다. 

```
{
    "test1":{
        "name" : "Sam",
        "sex" : "M",
        "pw" : "test1234"
    },
    "testa":{
        "name" : "Kim",
        "sex" : "W",
        "pw" : "test5678"
    }
} 
```



일단 개발자는 기획자와 커뮤니케이션을 feature파일인 `landingpage.feature` 로 할 것이다. 그리고 여기에 테스트 케이스 수행 파일을 연결할 것이다 .

먼저 개발팀에서는 vue cli로 프로토타입을 만들었다. 로그인 form만 있는 상태이며, 보여줄 상세 컨텐츠는 아직 만들지 않았다. 



![image-20200425134447297](/assets/img/2020/20200425/image-20200425134447297.png)

기능은 없고 아무 ID로 로그인을 하면 아래와 같이 된다.

![image-20200425173711847](/assets/img/2020/20200425/image-20200425173711847.png)



참고로 App.vue 파일은 아래와 같다.

```
<template>
  <div id="app">
    <img alt="Vue logo" src="@/assets/logo.png">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
      <input v-model="ID" placeholder="ID를 입력하세요">
      <br>
      <input v-model="PW" placeholder="PW를 입력하세요" type="password">

      <br><br>

      <button @click="login"> 로그인 </button>

    </div>
    <router-view/>
  </div>
</template>
<script>
import router from './router'
export default {
  name: 'Home',
  methods: {
    login: function(){
      router.push('/none')
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

```

**여기에서 주목할 것은 `login: function()` 부분이며 여기를 이제 채워나갈 것이다 **. 지금은 그냥 `/none` 으로 라우팅만 한다. 

feature파일에 매칭되는 테스트 실행파일은 아래와 같이 작성했다. 

참고로 selenium, hamcrest, behave 등이 pip install 되어 있어야 하며 chrome브라우저를 사용할 것이기 때문에 적절한 위치에 chromedriver 파일이 존재해야 한다. (`webdriver.Chrome('/driverpath/chromedriver')` 부분 참조)

```
#file : steps/acceptTest.py

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException

from behave   import given, when, then
from hamcrest import assert_that, equal_to, is_not

driver = webdriver.Chrome('/driverpath/chromedriver') #chromedriver의 위치
driver.implicitly_wait(30)
driver.get("http://localhost:8080/") #테스트 대상 url

@given('user is {userID}')
def step_inout(context, userID):
    driver.find_element_by_xpath("//div[@id='nav']/input").click()
    driver.find_element_by_xpath("//div[@id='nav']/input").clear()
    driver.find_element_by_xpath("//div[@id='nav']/input").send_keys(userID)
    driver.find_element_by_xpath("//input[@type='password']").clear()
    driver.find_element_by_xpath("//input[@type='password']").send_keys("passwd")

@when('user is signing in')
def step_signIn(context):
    driver.find_element_by_xpath("//div[@id='nav']/button").click()

@then('The contents for {sex} is displayed')
def step_checkResult(context, sex):

    if (sex == 'Woman'):
        contents = '아름다운 당신, 환영합니다'
    elif (sex == 'Man'):
        contents = '멋있는 당신, 환영합니다'
    else:
        contents = 'None'

    assert_that(driver.find_element_by_xpath("//div[@id='app']/div[2]/h1").text, equal_to(contents))

```

참고로 xpath는 [Katalon Recoder](https://chrome.google.com/webstore/detail/katalon-recorder-selenium/ljdobmomdgdljniojadhoplhkpialdid)를 통해 한번에 얻을 수 있다 .



이 상태에서 behave 테스트를 돌려 보면 아래과 같이 모두 Fail이 떨어진다. 

![image-20200425172422676](/assets/img/2020/20200425/image-20200425172422676.png)





이제 Fail 된 케이스를 바꾸어 보도록 하겠다. 

원래 DB등의 별도의 서버에서 사용자 정보를 읽어와 성별에 따라 라우팅을 분기해야 하는데 DB대신에 json파일을 읽어서 분기하는 것으로 구성하겠다. 

먼저 남성, 여성별로 보여줄 페이지(컴포넌트)를 만든다 여기에서는 간단히 아래와 같이 만들겠다 .

```
<!-- filename : src/views/Men.vue -->
<template>
  <div class="men">
    <h1>멋있는 당신, 환영합니다</h1>
  </div>
</template>
```



```
<!-- filename : src/views/Women.vue -->
<template>
  <div class="Women">
    <h1>아름다운 당신, 환영합니다</h1>
  </div>
</template>
```



테스트 케이스 파일인 acceptTest.py를 보면 알겠지만, 여기에서는 페이지의 텍스트를 읽어들여 비교하여 Pass, Fail을 구분하고 있고 각 페이지는 이에 맞는 환영 문구를 포함하고 있다. 



라우트도 연결한다. 

```
/* src/router/index.js */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    //새로 추가한 부분
    path: '/men',
    name: 'Men',
    component: () => import('../views/Men.vue')
  },
  {
    //새로 추가한 부분
    path: '/women',
    name: 'Women',
    component: () => import('../views/Women.vue')
  },
  {
    path: '/none',
    name: 'None',
    component: () => import('../views/None.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
```



이제 App.vue 를 수정한다. 

```
...중략
<script>
import router from './router'
import users from './assets/User.json' //사용자정보를 User.json에서 읽어들인다. 

export default {
  name: 'Home',

  methods: {
    login: function(){
      try {
        if (users[this.ID]['sex'] == 'M'){ //ID필드의 값으로 sex 확인 
          router.push('/Men')
        }
        else if (users[this.ID]['sex'] == 'W'){
          router.push('/Women')
        }
      }
      catch(e){ //User.json에 없는 사용자들은 None.vue 로 라우트
        router.push('/none')

      }
    }
  }

}

</script>
...중략
```



이제 사용자 ID필드의 값을 읽어 성별을 인식하고 결과부분에 구분하여 라우팅을 하게 되었다. 

완성된 페이지는 다음과 같이 보여진다.

* test1 로 로그인 : 남성인 경우

![image-20200425181830443](/assets/img/2020/20200425/image-20200425181830443.png)

* testa로 로그인 : 여성인 경우

![image-20200425182003125](/assets/img/2020/20200425/image-20200425182003125.png)

이제 다시 feature 파일을 실행해 보면 결과는 아래와 같다. 

![image-20200425180633500](/assets/img/2020/20200425/image-20200425180633500.png)



지금까지 진행한 단계를 정리하면 

* feature파일을 정리한다. 
* 프로토타입을 제작한다. 내부 로직이 없는 빈 폼 정도면 된다.
* 프로토타입 + feature를 기반으로 테스트 스크립트를 만든다. 여기에서는 selenium을 사용하였다. 
* 테스트 결과를 Pass로 만들어가면서 프로토타입에 로직을 추가하며 애플리케이션을 완성한다.  



이 결과의 의미를 정리해 보면 다음과 같다. 

1. BDD의 케이스는 개발 단계의 테스트가 아닌,  시스템 및 인수 테스트의 성격이 강하다. 
2. 직접적으로 BDD를 개발에 활용하기는 조금 무리가 있고 목표확인정도는 활용 가능하다.
3. BDD의 큰 효과는 앞에서도 말했지만 **비개발자** 와의 커뮤니케이션이다. 프로토타입과 feature파일이면 기획자, 디자이너, 고객과 커뮤니케이션을 원활하게 할 수 있다. 



