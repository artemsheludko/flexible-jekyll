# Jenkins, Gitlab, SonarQube 연동 실습

이 글은 Jenkins - Gitlab - SonarQube연동 실습을 위한 자료 정리차원에서 적은 것임을 밝힙니다. 



## 서버의 구성

서버1 : 192.168.50.11

* Jenkins : 8080 사용
* Gitlab : 80 사용

서버2 : 192.168.50.10

* Sonarqube server : 9000 사용



## 환경 구성

### Jenkins의 설치



docker이미지를 이용하여 설치하였다.

공식 이미지는 deprecate되어 아래 이미지를 pull

```
docker pull jenkins/Jenkins
```

이미지의 설치는 아래 md파일 참조

https://github.com/jenkinsci/docker/blob/master/README.md



### gitlab의 설치

gitlab은 CE(Community Edition)을 사용하였다.  docker 이미지를 통해 설치한다. 

```
docker pull gitlab/gitlab-ce
```



### SonarQube Server 설치

마찬가지로 docker 이미지를 통해 sonarqube server를 설치한다. 

```
docker pull sonarqube
```



### Jenkins 의 설정

#### 플러그인 설치

Sonarqube Scanner 플러그인 설치

* Sonarqube Scanner는 실제 코드를 Scan 및 분석을 하여 그 결과를 Sonarqube Server에 보내는 역할을 함.
* Jenkins에서 플러그인으로 이를 제공함.

Gitlab 플러그인 설치

* Gitlab 과의 통신을 위한 플러그인

![그림1](/assets/img/2020/그림1.png)

![그림2](/assets/img/2020/그림2.png)



#### 프로젝트 생성

프로젝트를 pipeline 타입으로 생성한다(공식 가이드에서는 pipeline을 권장함)

![그림3](/assets/img/2020/그림3.png)



일단 저장을 하고 빠져 나온다. 



#### GitLab의 설정

Gitlab으로 로그인하여 먼저 User의 Access token을 확인한다. 이후에 Jenkins에서 이 값으로 접근을 할 것이다. 

* User 아이콘 ⇨ Settings ⇨ Access token에서 만들어줌
* 만들어진 token은 메모장 등에 기록한다.

![그림4](/assets/img/2020/그림4.png)



테스트 대상이 되는 리포지토리 셋팅은 생략함.



## SonarQube 의 설정

Sonarqube 로그인 ⇨ 사용자 아이콘 클릭 ⇨ security 에서 로그인 토큰 생성(여기에서는 admin이라는 이름을 통해 token을 생성하였음)

![그림5](/assets/img/2020/그림5.png)



이제 Sonarqube에서 분석 프로젝트를 하나 생성한다.

 

프로젝트 생성을 하면 아래와 같이 화면이 바뀐다. 화면이 바뀌면 일단 끝.

![그림6](/assets/img/2020/그림6.png)



## Jenkins와 gitlab의 연결 설정

Jenkins관리 ⇨ 시스템설정 ⇨ gitlab connections 

![그림7](/assets/img/2020/그림7.png)

Credential ⇨ Add 에서 아까 복사해 둔 User Token값을 추가한다.

![그림8](/assets/img/2020/그림8.png)



## Jenkins와 Sonarqube 서버와의 연동 설정

Jenkins관리 ⇨ 시스템설정 ⇨ SonarQube Servers

![그림9](/assets/img/2020/그림9.png)

마찬가지로 Add 클릭하고 아까 복사한 admin에 대한 token값 입력

이 때 Kind 부분은 Secret text로 설정한다.

![그림10](/assets/img/2020/그림10.png)

**※ Tip : Add 를 했는데 추가를 위한 드롭다운이 뜨지 않는 다면 저장 후에 다시 들어가 본다.**



## Jenkins 프로젝트 설정

Jenkins시스템 설정이 끝났다면, 프로젝트 설정을 한다. 프로젝트 설정은 Build Trigger관련 설정을 한다. 

프로젝트 ⇨ 구성 ⇨ Build Triggers

에서 

Build when a change is pushed to GitLab: GitLab webhook URL: http://192.168.50.11:8080/project/CICDPjt1

클릭 후 고급 버튼 클릭

Secret Token 섹션에서 Generate 버튼을 클릭하면 접근하기 위한 Token이 생성됨. 이 값을 메모장에 기록.

![그림11](/assets/img/2020/그림11.png)



### Gitlab 프로젝트와 Build Trigger의 연결

먼저 프로젝트Setting ⇨ integration 선택

![그림12](/assets/img/2020/그림12.png)



integration에서 WebHook을 추가설정을 한다. URL란에는 Jenkins의 프로젝트 URL을, Secret Token 부분에는 아까 생성한 토큰 값을 넣어준다. 그리고 Add WebHook버튼을 클릭한다.



![그림13](/assets/img/2020/그림13.png)



이 때 주의할 점은 Jenkins의 프로젝트 URL은 Jenkins 프로젝트 화면의 URL이 아니라 Jenkins 프로젝트 설정에서 Build Trigger에서 표시되는 URL을 복사하여 붙여넣어야 한다. 

![그림14](/assets/img/2020/그림14.png)



Add WebHook 결과



![그림15](/assets/img/2020/그림15.png)

Webhook 테스트 하기 전에 만일 Jenins와 gitlab이 같은 도메인에 설치되어 있으면 Jenkins에서 아래 옵션 체크를 풀자. 

Configure ⇨ Global Security 에서 아래 옵션을 언체크한다. 

![그림16](/assets/img/2020/그림16.png)

이제 WebHook테스트를 해 본다 gitlab 에서 아래와 같이 나오면 성공이다.

![그림17](/assets/img/2020/그림17.png)



참고로 인증 에러 You are authenticated as: anonymous Groups that you are in: Permission you need to have (but didn't): 가 발생하면 Jenkins에서 아래와 같이 옵션을 추가 체크 해 준다. 

Allow anonymous access 체크…

![그림18](/assets/img/2020/그림18.png)



## sonar-project.properties 파일 설정



sonar-project.properties 파일은 gitlab 프로젝트 리포지토리 루트 레벨에 존재해야 한다.

![그림19](/assets/img/2020/그림19.png)



파일에는 sonarqube server관련 설정값들이 들어있다.

```
# Required metadata
sonar.projectKey=SonarPrjt1 #분석 결과를 읽어들일 SonarServer의 프로젝트 
sonar.projectName=SonarPrjt1
```



이제 서버간의 세팅은 끝났다. Jenkins에 Sonarqube scanner를 설정하고 파이프라인 스크립트를 짜 보자.



# Jenkins Pipeline Scripting

## Jenkins SonarQube Scanner Setting. 

Jenkins 홈에서 Global Tool Configuration ⇨ SonarQube Scanner 화면에서 Add SonarQube Scanner 버튼을 클릭한다. 

화면에서와 같이 install automatically 옵션을 체크하고 Add installer 드롭다운을 클릭하여 install from Maver Central을 선택하면 아래와 같은 드롭다운이 뜬다. 최신 버전을 선택하고 나온다. 이름은 SonarQube Scanner로 주었다. 

![그림20](/assets/img/2020/그림20.png)

이제 Jenkins 프로젝트 설정으로 돌아가서 파이프라인 스크립트를 입력한다.



## Pipeline Scripting

스크립트는 Sonarqube 공식 사이트를 참조하였다. (https://docs.sonarqube.org/latest/analysis/scan/sonarscanner-for-jenkins/)

![그림21](/assets/img/2020/그림21.png)

스크립트는 아래와 같다.

```
node {
  stage('SCM') {
    git 'http://cheuora:1Ct_98vyzVCCQsZE2frX@192.168.50.11/cheuora/pjt1.git' 
  }  //#1
  stage('SonarQube analysis') {
    def scannerHome = tool 'SonaQube Scanner';
    withSonarQubeEnv('SonarServer') { // If you have configured more than one global server connection, you can specify its name
      sh "${scannerHome}/bin/sonar-scanner"
    }
  }
}
```

\#1 : gitlab으로 접근하는 URL은 아래와 같으며 이때 token은 gitlab의 User token이다. 

```
http://username:token@gitlab.server.com/userid/project.git
```



스크립트 테스트를 위해 Build Now를 해 본다..

<img src="/assets/img/2020/그림22.png" alt="그림22" style="zoom:67%;" />



# 실행 결과

### Gitlab에 push이벤트 발생 시킴

![그림23](/assets/img/2020/그림23.png)



### Gitlab에 반영 확인

<img src="/assets/img/2020/그림24.png" alt="그림24"  />



### Push Trigger 작동 확인 (#10 빌드 참조)

![그림25](/assets/img/2020/그림25.png)

### SonarQube 서버에서 분석 결과 확인

![그림26](/assets/img/2020/그림26.png)



오류나 이슈는 발견되지 않은 것 같습니다. ^^



인터넷에서 Jenkins와 Gitlab, 그리고 Jenkin와 SonarQube Server로 연결하는 방법 설명은 많은데 3가지를 같이 연결하는 게 많이 없었고, Jenkins에서 스크립트 작성 방식도 나름 제각각이라 기회가 되어 여기에 정리를 해 보았습니다. 

