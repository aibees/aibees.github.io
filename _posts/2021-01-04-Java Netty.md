---
layout: post
title: 【JAVA】JAVA NETTY
subject: blog
category: java
author: junseo.park
subtitle: 가장 유명한 Java 비동기식 네트워크 프레임워크
---

~~NETTY 공부하려고 NIO 포스팅했다~~

# NETTY

[Netty 공식홈페이지](https://netty.io) 에서 Netty를 소개하는 문구이다.

```
Netty is an asynchronous event-driven network application framework
for rapid development of maintainable high performance protocol servers & clients.
```


### [ 예전 Java의 Network 방식 ]

java.net 패키지에서는 Blocking 방식의 `accept()` 함수만 지원했다.
 즉, 새로운 Client Socket이 연결될 때마다 새 Thread를 사용한다는 얘기이다.

 새로운 연결이 늘어나거나 Client 접속/해제 빈도가 늘어날 때마다 Thread 자원 소모 및 Context Switch 관련 Overhead가 발생하여 시스템에 큰 문제가 된다.

이를 해결하기 위한 것이 NIO 개념을 기반으로 비동기식 Network 패키지 **`Netty`**
 
### [ NETTY의 핵심 Component ]

1. Channel
    - NIO에서의 양방향 통신이 가능한 Channel을 사용한다.
    - Selector를 통해 Thread 사용률을 줄여 성능을 높일 수 있다. 

2. CallBack
    - 비동기 통신의 기본이 되는 Callback을 이벤트 실행 시 내부적으로 사용한다.
    - Callback이 실행되면 `ChannelHandler` Interface를 통해 Event를 처리한다.

3. Future
    - 작업을 실행해둔 뒤 미래(Future)에 찾아가려고 맡겨놓는 객체
    - 비동기 작업의 결과를 담는 역할을 하고, 완료되면 그 결과에 접근할 수 있게 한다.
    - ~~Netty 다음 포스팅 대상~~

4. Event Handler
    - 작업의 상태 변화를 Netty Event로 정의하고 해당 Event를 기준으로 적절한 동작을 Handling한다.
    - 종류
        - Logging
        - Flow Control
        - Data Transformation
        - Inbound Event
            - Data Read, getConnection, User Event, Error
        - Outbound Trigger Event
            - Socket Communication
            - Remote Peer Communication
        