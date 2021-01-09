---
layout: post
title: 【DOCKER】Docker 개념공부 1
subject: blog
category: docker
author: junseo.park
subtitle: 면접 빈출문항으로 Docker에 대한 개념 공부하기 1/2
---

## Docker 면접 빈출문항 43개

해외 IT기업에서 DevOps 엔지니어 Interview할 때 Docker에 대해서 자주 질문한다는 기본적인 질문 43개를 가져와봤다.

이 43개 질문을 익힌다면 Docker는 나름 기초를 다졌다고 할 수 있겠지...?

질문은 영어 그대로 작성하겠지만 대답은 한국어로 번역한 내용을 적었다. ~~영어 공부도 할 겸~~

#### **01. What is Docker**
- Docker는 경량화된 Containerization 기술에 대한 오픈소스이다.
- 이 기술은 클라우드와 App을 패키징시키는 분야에서 인기를 얻는, 사실상 이젠 공식이 되어버렸다.
- Application 배포 자동화가 가능하며 각각 정의된 Container를 손쉽게 배포할 수 있다.

<br>

#### **02. What are the advantages of using Docker Container**
- 많은 장점이 있지만 그 중 크게 4가지로 볼 수 있다.
    1. `Initial Setup이 간편`하고 쉽다.
    2. Application `LifeCycle을 자세하게 구성`할 수 있다.
    3. Configuration이 `Simple`하다.
    4. Well Documentation.

<br>

#### **03. What are the important features of Docker?**
- 가장 중요한 특징으로 6개가 있다.
    1. Easy Modeling
    2. Version Control
    3. Placement / Affinity(유연성 - 가상화 플랫폼을 쓰며 ScaleOut이 간편하다.)
    4. Application Agility (민첩성 - 개발 및 배포 시 얼마나 빠르게 반영할 수 있는지를 보는 듯)
    5. Developer Productivity
    6. Operational Efficiencies

<br>

#### **04. What are the main drawbacks of Docker?**
- 주요하게 고민해야 할 단점 4가지
    1. `저장공간 Option`을 제공하지 않는다.
    2. 모니터링 Option이 다른 Open-Source에 비해 부족하다. (Kubernates와 Swarm도?)
    3. `비활성화된 Node에 대해서` 리스케쥴링이 불가능하다.
    4. 자동 Horizontal Scaling(Scale out) 설정이 `복잡하다`.

<br>

#### **05.  What is Docker image?**
- Docker Image는 컨테이너를 생성할 수 있도록 해주는 개체. Java에서 Instance를 생성하기 위해서 클래스 정의가 필요하듯 Docker 컨테이너도 Iamge라는 하나의 추상적 개체가 필요하다.
- Build Command를 통해 Image를 생성할 수 있고 각각의 Image는 Docker Registry에 저장된다.

<br>

#### **06. What is Docker Engine?**
- Docker Daemon이라고도 불리며, Docker Server를 일컫는 말이다. Daemon과 Client는 반드시 같은 서버 혹은 Remote Host(CLI 혹은 RESTfull API로 통신이 가능한)에 위치해야 한다.

<br>

#### **07. Explain Registries**
- Docker Image를 저장할 수 있는 공간. Image Version Control도 가능.
- Public Registry
    - Github과 같이 외부에서 저장 및 관리가 가능한 Registry
    - Docker Hub
- Private Registry
    - Maven Nexus와 같이 내부 서버 내에서 Image를 저장할 수 있는 Registry.

<br>

#### **08. What command should you run to see all running container in Docker?**

> $ docker ps
 - -a : 정지된 컨테이너까지 출력

<br>

#### **09. Write the command to stop the docker container**

> $ sudo docker stop container [ name or sid ]

<br>

#### **10. What is the command to run the image as a container?**

> $ sudo docker run -it [Image] [command]

<br>

#### **11. What are the common instruction in Dockerfile?**
1. **FROM**
    - Base Image를 지정하는 명령어. 보통 OS Kernel를 지정한다.

2. **LABEL**
    - Label 생성하는 Instruction
    - ex) version, location, type etc.

3. **RUN**
    - Package를 Install하는 식의 Shell Command를 Image에서 실행시킬 때 사용한다.
    - RUN 명령을 실행할 때 레이어가 생성된다.
    - Ubuntu apt-get이 Update안된 Image에 RUN 명령어로 `apt-get -y update` 명령어를 입력한다면 Container의 최종 Image는 Update가 된 Layer가 추가된 Image인 것.

4. **CMD**
    - 컨테이너가 시작할 때 실행할 Command를 지정할 수 있다.
    - Docker Container가 시작할 때 실행하는데 주로 Image로 빌드된 Application을 실행할 때 쓰인다.
    - CMD Instruction은 Default로 지정되며 ENTRYPOINT가 추가되면 CMD는 묵살되고 ENTRYPOINT가 실행된다.

5. **EXPOSE**
    - Container 외부에 노출할 Ports(1개 이상)를 지정할 때 사용한다.
    - Expose로 Port를 지정했다고 바로 외부에서 접속할 수는 없다. EXPOSE는 해당 Port로 열 예정이라고 지정할 뿐. 실제로 docker Image를 run할 때 -P 옵션으로 열어주어야 한다.
    - EXPOSE 5000으로 지정하고 `$ docker run -d P`를 통해 컨테이너를 실행시키면 `0.0.0.0:49372→5000/tcp` 이런 식으로 미리 지정했던 Port와 호스트가 연결된다.  

6. **VOLUME**
    - 호스트의 Directory를 Docker 컨테이너에 연결시킬 수 있다.
    - Datasource, 외부 Configuration 등을 Image 안에 넣지 않아도 사용할 수 있다.
    - 보통 Log 수집과 Data저장, Conf 설정에 사용한다.

<br>

#### **12. What is memory-swap flag?**
- Docker는 Container의 메모리 관리를 Option으로 지정할 수 있다. Hard Limit과 Soft Limit 방법으로 나뉜다.
    - Hard Limit
        - 컨테이너는 지정된 메모리량 이상을 사용할 수 없다.
    - Soft Limit
        - 컨테이너가 필요한 메모리만큼 원하는대로 사용하다가 Host에서 메모리가 부족하거나 Contension에 몰릴 경우 지정된 메모리량으로 제한을 둔다.
        - 메모리를 많이 사용하는 작업 중 제한이 걸리면 Overhead가 발생할 수 있다.
    
이 때, memory-swap 옵션을 지정할 수 있다.
- 컨테이너가 할당된 메모리를 모두 사용한 경우 디스크 공간을 끌어와서 쓸 수 있도록 허용하는 Flag. Y/N으로 설정

<br>

#### **13. Explain Docker Swarm?**
- Docker Swarm은 Container Orchestration Tool로서 사용자가 여러 Host 서버에 걸쳐 배포되어있는 Container를 한 눈으로 관리 및 설정할 수 있다.
- Docker를 개발한 팀에서 제작한 Tool로 Multiple Host를 운영할 때 필수적으로 사용된다.

<br>

#### **14. How can you monitor the docker in production environments?**
Docker states and Docker Events are used to monitoring docker in the production environment.

→ 나중에 Monitoring 관련해서 자세히 알아볼 예정

<br>

#### **15. What the states of Docker container?**
- Docker Container의 State는 5가지로 나누어진다.
    - **Created**
        - 새로운 컨테이너가 생성되었지만 아직 실행(Started)되지는 않은 상태
    - **Running**
        - 현재 컨테이너가 실행되고 있는 상태
    - **Paused**
        - 해당 컨테이너의 모든 Process가 중지된 상태
    - **Restarting**
        - 중지되었던 컨테이너가 다시 실행되고 있는 상태
    - **Exited**
        - 컨테이너를 멈춘 상태(Stopped). 결과적으론 Created 상태와 동일.

<br>

#### **16. What is Docker hub?**
위에서 언급한 Public Registries로서 Cloud 기반의 Public Image Repositories라 할 수 있다.

<br>

#### **17. What is Virtualization?**
`가상화(Virtualization)`란 하나의 물리적 컴퓨터(Mainframe)를 논리적으로 나누어 여러 Application을 동시에 실행시킬 수 있도록 하는 기술이다.

<br>

#### **18. What is Hypervisor?**
가상화시스템에서 하나의 Host OS에서 다른 Guest OS를 Operate 할 수 있도록 해주는 가상 플랫폼.

Guest OS(혹은 System)을 제어하고 Guest에서 필요로 하는 Resource가 제대로 할당되고 있는지 관리해주는 역할을 한다.

<br>

#### **19. Explain Docker object labels**
LABEL 설정은 Docker Object(Images, Containers, Volume, Network)들에 대한 Metadata를 지정하는 역할을 한다..

<br>

#### **20. Write a Docker file to create and copy a directory and built it using python modules?**
```dockerfile
FROM pyhton:2.7-slim
WORKDIR /app
COPY . /app
docker build –tag
```

<br>

#### **21. Where the docker volumes are stored?**
Docker를 처음 설치했을 때 기본적으로 지정되는 Volume의 위치는
> /var/lib/docker/volumes

여기이지만 사용자가 임의대로 지정 가능하다.

<br>

<br>
<br>

출처: <https://www.guru99.com/docker-interview-questions.html>