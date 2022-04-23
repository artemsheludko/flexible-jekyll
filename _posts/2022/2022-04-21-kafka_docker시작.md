---
layout: post
title: docker kafka 컨테이너 설치
tags: [kafka, docker]
---



docker kafka 컨테이너로 메시징을 적용하려는 분들을 위해 기록을 남긴다. (Docker 컨테이너로 적용하는 사례가 별로 없어서...)

kafka는 메시지 브로커이다. 메시지 시스템의 개요는 [pypubsub과 메시지구조](https://cheuora.github.io/2022/03/03/pypubsub/) 를 참조하기 바란다. 



이 글에서 kafka 설치 환경은 아래와 같다. 

* Ubuntu 20.04 LTS
* Docker version 20.10.12, build e91ed57

 Docker 버전을 기록한 이유는 kafka docker 컨테이너를 쓸 것이기 때문이다. 



docker 컨테이너는 zookeeper까지 같이 들어 있는 https://hub.docker.com/r/bitnami/kafka 를 사용했다. 

위 docker의 overview대로 아래와 같이 직접 github에 있는 파일을 다운하여 해 보았다.

```yaml
$ curl -sSL https://raw.githubusercontent.com/bitnami/bitnami-docker-kafka/master/docker-compose.yml > docker-compose.yml
$ docker-compose up -d
```



참고로 이 때 적용된 docker-compose.yml파일은 다음과 같다. 

```yaml
version: "2"

services:
  zookeeper:
    image: docker.io/bitnami/zookeeper:3.8
    ports:
      - "2181:2181"
    volumes:
      - "zookeeper_data:/bitnami"
    environment:
      - ALLOW_ANONYMOUS_LOGIN=yes
  kafka:
    image: docker.io/bitnami/kafka:3.1
    ports:
      - "9092:9092"
    volumes:
      - "kafka_data:/bitnami"
    environment:
      - KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181
      - ALLOW_PLAINTEXT_LISTENER=yes
    depends_on:
      - zookeeper

volumes:
  zookeeper_data:
    driver: local
  kafka_data:
    driver: local
```



이 파일로 `docker-compose up -d`를 실행하면 docker컨테이너가 `zookeeper`및`kafka` 2개가 실행된다. 

Python 으로 생성자, 소비자를 만들어 테스트를 해봤다. 

```python
# Consumer.py
from kafka import KafkaConsumer
from json import loads
import time

topic_name = 'topic_test'
consumer = KafkaConsumer(
        topic_name,
        bootstrap_servers=['localhost:9092'],
        value_deserializer = lambda x: loads(x.decode('utf-8')),
        )

start = time.time()
print("[begin] Topic: %s으로 consumer가 메시지 받아옴" % (topic_name))

for message in consumer:
    print("Partition: %d, Offset: %d, Value: %s" % (message.partition, message.offset, message.value))

print("[end]걸린시간 : ", time.time() - start)
```

```python
# Producer.py
from kafka import KafkaProducer
from json import dumps
import time

topic_name = 'topic_test'

producer = KafkaProducer(
        acks=0,
        compression_type = 'gzip',
        bootstrap_servers=['localhost:9092'],
        value_serializer = lambda x: dumps(x).encode('utf-8')
        )

start = time.time()

print("[begin] producer가 메시지 전송 시작")

for i in range(100):
    data = {'str': 'result'+str(i)}
    print("메시지전송중..." + data['str'])
    producer.send(topic_name, value=data)


producer.flush()

print("[end] 걸린시간:", time.time() - start)
```



그런데 ... 실행하면 Producer.py는 `flush()`에서 hang이 걸리는지 동작이 멈추고 Consumer.py는 kafka 브로커에 접속도 못하고 hang상태로 묶여있다.  

`localhost`가 컨테이너와 서버가 다르게 해석하는 현상때문으로 파악되었다. https://hub.docker.com/r/bitnami/kafka 의 오버뷰 페이지를 보니까 **Apache Kafka development setup example** 이라고 따로 있었다. 

```yaml
version: "3"
services:
  zookeeper:
    image: 'bitnami/zookeeper:latest'
    ports:
      - '2181:2181'
    environment:
      - ALLOW_ANONYMOUS_LOGIN=yes
  kafka:
    image: 'bitnami/kafka:latest'
    ports:
      - '9092:9092'
    environment:
      - KAFKA_BROKER_ID=1
      - KAFKA_CFG_LISTENERS=PLAINTEXT://:9092
      - KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://127.0.0.1:9092
      - KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181
      - ALLOW_PLAINTEXT_LISTENER=yes
    depends_on:
      - zookeeper
```

그래서 이를 적용하여 다시 컨테이너를 지우고 올렸다...

그랬더니.. kafka의 컨테이너가 올라오지 않는다 :sweat:

`docker logs`를 이용하여 오류를 확인.

```
[2022-04-22 16:00:52,785] ERROR Fatal error during KafkaServer startup. Prepare to shutdown (kafka.server.KafkaServer)
kafka.common.InconsistentBrokerIdException: Configured broker.id 1 doesn't match stored broker.id ...
```



어차피 브로커는 1개밖에 없어서 ID가 필요 없나? <u>어쨌든 위 `environment`섹션에서 `      - KAFKA_BROKER_ID=1`를 삭제하여 다시 컨테이너를 올려 보았더니 이제 오류 없이 kafka컨테이너가 올라왔다.</u> 



이제 테스트를 위해 python코드를 돌려 보겠다. 



생산자쪽 수행 로그

```
$ python3 Producer.py
[begin] producer가 메시지 전송 시작
메시지전송중...result0
메시지전송중...result1
메시지전송중...result2
...
메시지전송중...result97
메시지전송중...result98
메시지전송중...result99
[end] 걸린시간: 0.03677988052368164
```



소비자쪽 수행 로그

```
$ python3 Comsumer.py
[begin] Topic: topic_test으로 consumer가 메시지 받아옴
Partition: 0, Offset: 200, Value: {'str': 'result0'}
Partition: 0, Offset: 201, Value: {'str': 'result1'}
Partition: 0, Offset: 202, Value: {'str': 'result2'}
Partition: 0, Offset: 203, Value: {'str': 'result3'}
Partition: 0, Offset: 204, Value: {'str': 'result4'}
...
Partition: 0, Offset: 296, Value: {'str': 'result96'}
Partition: 0, Offset: 297, Value: {'str': 'result97'}
Partition: 0, Offset: 298, Value: {'str': 'result98'}
Partition: 0, Offset: 299, Value: {'str': 'result99'}
```



Docker kafka 컨테이너를 통해 생성자, 소비자 간에 메시지 전달이 정상적으로 됨을 확인 할 수 있었다. 





참고로 이 때 사용한 docker-compose.yml은 다음과 같다. 

```yaml
version: "2"

services:
  zookeeper:
    image: docker.io/bitnami/zookeeper:3.8
    ports:
      - "2181:2181"
    volumes:
      - "zookeeper_data:/bitnami"
    environment:
      - ALLOW_ANONYMOUS_LOGIN=yes
  kafka:
    image: docker.io/bitnami/kafka:3.1
    hostname: kafka
    ports:
      - "9092:9092"
    volumes:
      - "kafka_data:/bitnami"
    environment:
      - KAFKA_CFG_LISTENERS=PLAINTEXT://:9092
      - KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://127.0.0.1:9092
      - KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181
      - ALLOW_PLAINTEXT_LISTENER=yes
    depends_on:
      - zookeeper

volumes:
  zookeeper_data:
    driver: local
  kafka_data:
    driver: local
```



