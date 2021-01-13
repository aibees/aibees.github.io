---
layout: post
title: 【DOCKER】Docker 개념공부 2
subject: blog
category: docker
author: junseo.park
subtitle: 면접 빈출문항으로 Docker에 대한 개념 공부하기 2/2
---

#### **22. List out some important advanced docker commands**
1. **docker build**
- Dockerfile로부터 Image를 빌드하는 명령어.
2. **docker commit**
- Container의 현재 내용으로 새로운 Image를 생성하는 명령어.
3. **docker inspect**
- Docker Object들의 정보(Low-Level)를 보여주는 명령어.
4. **docker pull/push**
- Pull/Push an Image or Repository from/to a registry
5. **docker ps**
- Container List 조회


* 참조 페이지 : <https://docs.docker.com/engine/reference/commandline/docker/>

<br>

#### **23. How does communication happen between Docker client and Docker Daemon?**
- Docker Daemon과 Client는 다양한 방법으로 통신할 수 있다.
    - RESTful API / SOCKET.IO/ TCP 통신

<br>

#### **24. Explain Implementation method of Continuous Integration(CI) and Continues Development (CD) in Docker?**
- Runs Jenkins on docker
- You can run integration tests in Jenkins using docker-compose

~~이해 잘 안가서 추후 다시 공부할 예정...~~

<br>

#### **25. What are the command to control Docker with Systemd?**

```bash
$ systemctl start/stop docker
$ service docker start/stop
```

<br>

#### **26. How to use JSON instead of YAML compose file?**

```shell
$ docker-compose -f docker-compose.json up
```

<br>

#### **27. What is the command you need to give to push the new image to Docker registry?**

```bash
$ docker push [user]/[Image]
```

<br>

#### **28. How to include code with copy/add or volumes?**
- Dockerfile에서 COPY와 ADD Instruction으로 Code를 넣을 수 있지만 Container 실행한 뒤 바꾸고자 할 때는 Volume을 통해 넣는 것이 좋다.
    - COPY
        - Context 하위에 있는 파일들 중 이미지에 추가할 파일을 복사
    - ADD
        - COPY 이전에 개발되었던 Instruction.
        - Host에서 컨테이너로 복사하는 기능 뿐 아니라 Url을 통해 인터넷에서 다운로드하여 컨테이너에 추가할 수도 있다.
        - 보안문제뿐 아니라 특정 포맷의 압축파일이 `source`일 경우 압축을 해제하여 문제가 발생.
        - 되도록이면 ADD보단 COPY를 사용하기를 권장

<br>

#### **29. Explain the process of scaling your Docker containers**
- Docker 컨테이너는 수 백개부터 백만단위까지 제한 없이 자유롭게 Scale Out이 가능하다.
- 단, 이를 위한 조건으로는 각 컨테이너에 할당될 메모리와 OS가 필요하며 이는 Scale Out으로 새로 컨테이너가 생성될 때마다 부족하지 않아야 한다는 것이다.

<br>

#### **30. What is the method for creating a Docker container?**

> docker run -it command [Image]

<br>

#### **31. What are the steps for the Docker container life cycle?**
- Docker Life Cycle
    - Build
    - Pull 
    - Run 

<br>

#### **32. How can you run multiple containers using a single service?**
- Docker Compose를 통해 여러 개의 Container를 한 번에 실행할 수 있다.
- YAML 을 이용하여 정의 가능(추후 자세히 다룰 예정)

<br>

#### **33. What is CNM?**

<br>

#### **34. Does Docker offer support for IPV6?**
- YES.
- Linux 위에서 Daemon을 돌린다는 전제하에 가능하다.
- 다만, `/etc/docker/daemon.json`에서 IPv6 옵션을 `True`로 바꾸어주어야 한다.

<br>

#### **35. Can you lose data when the container exits?**
- No.
- 각 컨테이너는 Disk에 데이터를 기록해두기 때문에 Halt 되더라도 데이터가 유지될 수 있다.

<br>

#### **36. What are a different kind of volume mount types available in Docker?**
- Bind mounts- It can be stored anywhere on the host system

<br>

#### **37. How to configure the default logging driver under Docker?**
- To configure the Docker daemon to default to a specific logging driver. You need to set the value of log-driver to the name of the logging drive the daemon.jason.file.

<br>

#### **38. Explain Docker Trusted Registry?**
- `Docker Trusted Registry`는 **Enterprise**단위의 Image Storage이다. 기업 단위로 관리하며 자체 방화벽을 설정하여 Secure하게 관리가 가능하다.

<br>

#### **39. What are Docker Namespaces?**
- 시스템 리소스를 Process의 전용 자원처럼 보이게 하고, 다른 프로세스와 격리시키는 기능.
- 총 6가지의 Namespace 존재
    - **Mount Namespace** : `파일시스템 Mount`를 분할하고 격리
    - **PID Namespace** : `Process`를 분할관리
    - **Network Namespace** : `Network` 관련된 정보를 분할 관리
    - **IPC Namespace** : `Inter-Process Commu.`를 격리
    - **UTS Namespace** : 독립적인 `Hostname` 할당
    - **USER Namespace** : 독립적인 `UID`를 할당 

<br>

#### **40. What are the three components of Docker Architecture**
- Client
- Docker-Host
- Registry

<br>

#### **41. What is client?**
- Docker Daemon과 연결되어 CLI Tool을 제공해주는 Node를 말한다.
- Docker Host로부터 Container같은 Object를 제공받는다. 

<br>

#### **42. What is the purpose of Docker_Host?**
- Docker Object(Container, Image etc) 및 Daemon을 포함, 관리하며 Application을 실행할 환경을 만들어주는 역할을 한다.

<br>

#### **43. How do I run multiple copies of Compose file on the same host?**
 - Compose에서 프로젝트 이름을 각각 Unique하게 지정해준다면 Multiple하게 배포 및 운영하고자 할 때 이름을 기준으로 반영할 수 있다. 
 - `COMPOSE_PROJECT_NAME` 환경변수로 Unique 이름을 지정할 수 있다.

<br>

<br>
<br>

출처: <https://www.guru99.com/docker-interview-questions.html>