---
layout: post
title: 【TIP】Chrome SameSite
subject: blog
category: tip
author: junseo.park
subtitle: Chrome에서 보안정책이 바뀌었다
---

현 시점으로 9월이 지난 지금 갖가지 IT이슈에 민감한 사람들에게는 뒷북치는 이야기겠지만 최근에서야 보게되어 얼른 기록하고자 블로깅을 한다.

`February, 2020: Chrome 80 Stable will begin rolling out over a period of time. SameSite-by-default and SameSite=None-requires-Secure will then start being enabled as the default behavior during the Chrome 80 Stable lifecycle.`


2020년 2월 Chrome에서 80 Stable 버전을 Release하며 SameSite에 대한 Default값을 변경하였다.

바로 None에서 Lax로 변경한 것인데, 나는 SameSite 설정조차 생소하였다.

### Same-Site
웹사이트에서는 일반적으로 광고, 콘텐츠 추천, 위젯, 소셜 및 다른 기능을 위한 외부 서비스를 통합한다. 즉, 사용자가 웹을 사용할 때 이러한 외부 서비스가 브라우저에 쿠키를 저장한 후 개인화된 환경을 제공 / 웹서비스에서 참여도 등을 조사하고자 할 때 사용한다.

이 때, 웹 페이지 상의 외부 리소스가 웹 브라우저 주소창에 입력된 도메인이 아닌 다른 도메인에 해당하는 쿠키에 접근하는 것을 `Cross-Site(Third Party) 컨텍스트가 발생한다`라고 하며

반대로, 외부 리소스 또한 주소창의 도메인과 같은 쿠키에 접근하는 것을 `Same-Site(First Party) 컨텍스트가 발생한다`라고 한다.

Same-Site에 해당하는 쿠키는 개별 웹사이트에 로그인한 사용자의 Session을 유지시키고, 사용자의 설정값을 유지시키는데 사용된다.

### Cookie Issues
여기서, Chrome이 보안상 Same-Site를 건드리는 이유는 쿠키의 특성 및 취약점에서 시작한다. 쿠키란 기본적으로 Client의 컴퓨터 안에 저장되는 파일이다. 사용자의 세션 정보, 조회기록, 개인 설정값 등 여러 정보가 담겨있고, 해당 쿠키와 연결되어있는 도메인이 브라우저에서 열릴 때 쿠키를 헤더에 넣어 서버로 전송된다.

이 때, 공격자가 A라는 사이트에서 B사이트를 공격하는 Request를 심어놓고, B 사이트의 외부서비스(팝업, 광고 등)가 되어 Cross-Site가 된다고 가정하자.<br>
사용자는 B 사이트를 사용하면서 A사이트의 외부서비스를 클릭하여 접속하는 순간, 공격 Request는 B사이트 쿠키에 공격코드를 저장. B사이트의 서버에 그대로 Header값이 되어 들어가는 것이다.

이를 방지하고자 이번 80 Stable버전을 Release하며 Same-Site에 대한 Default값을 상향한 것.

### Same-Site Policy
Chrome 상에서 Same-Site에 대한 정책은 크게 3가지로 나뉘어져있다.

**1. NONE**
쿠키 사용에 있어 소스가 되는 주소를 검증하지 않는 단계. 현재 IE에서는 해당 수준의 정책으로 서비스되고 있다.<br>
(MS에서도 1월에 해당 문제를 언급하긴 했지만 현재 서신평 인증방식 등에서 Chrome은 안되고 IE는 되는걸로 보아 IE는 다소 정책 변경이 늦는 듯 하다.)

**2. STRICT**
강하게 제한하는 정책. 모든 서비스의 도메인(주소창 및 외부서비스)과 대상 도메인(쿠키)이 일치해야만 쿠키가 포함되어 전송된다.<br>
여기서 **전송**이라 함은 `<img>, <form>, <iframe>, ajax` 등 모든 외부요청을 의미한다.

**3. LAX**
Strict 정책에서 몇 전송방식이 예외처리된 정책이다.
href 혹은 GET 방식의 form 정도만 예외처리된 방식.
`Chrome 에서 이번 Same-Site의 Default를 이 LAX 정책으로 지정하였다.`


### 해당 이슈로 인한 영향도
이 모든 이야기의 목적이 되는 주제.
(직장인이 되다보니, 이슈의 개념보단 나한테 무슨 영향이 있는지부터 찾게 된다...ㅠ)<br>
이러한 정책 상향으로 따라오는 문제는 기존에 외부업체 서비스를 통한 결제나 서신평에서 주관하는 인증 모듈 등의 Third-Party들이 정상적으로 작동되지 않을거라는 것.

한 편, Session이 아닌 Cookie로 사용자 정보를 관리하고 있던 웹 사이트들 또한 타격을 입을 것으로 예상된다.<br>
**Same-Site는 First Suffix 도메인정보를 기준으로 삼기 때문에** 이에 어긋나는 도메인들은 기존 Cookie로 정보를 관리하던 방식이 무용지물 된다는 것이다.

### 해결방법
1. 이러한 브라우저 정책에 순응하고 발맞춰 따라가면 된다.
모든 외부서비스를 자체 도메인 안에서 제작 또는 적용하여 같은 쿠키 안에서 사용할 수 있도록 하면 된다.
- 아무리 기술력 좋고 막강한 자금력이 있다 하더라도 한계가 있다. 모든 프로그램을 자체적으로 개발/사용할 수 있는 곳은 거의 없을 것이다.( 구글 정도면 가능할지도... )
<br>
2. 쿠키를 사용하지 않는다.
쿠키를 제거하고 코드 안에서 모든 정보를 관리한다.
- 불가능한 얘기는 아니지만, 그렇다고 현실적인 이야기도 아니다. 협력업체 및 외부서비스 제공처와의 수 많은 이야기가 오고가게 될 것이며 그 과정에서 힘들다는 것을 느끼게 될 것이라 예상한다.
<br>
3. 편법을 사용한다.
사실 브라우저나 거대 기업에서 시행하는 정책을 부담없이 바로 순응할 수 있는 곳은 거의 없을 것이다. 그렇기에 Chrome에서도 한 가지 방법을 제시하였다.

**→** set-Cookie 헤더 값에 SameSite 설정을 미리 입력하는 방법이다.<br>
서버 설정 혹은 javascript 적용을 통해 SameSite 설정을 변경하고 해당 정책을 우회할 수 있도록 해주었다.
- javascript<br>
document.cookie = "crossCookie=~; SameSite=None; **Secure**"<br>
- Java Application<br>
addHeader 를 통해 Set-Cookie 설정값 추가 "**Secure**; SameSite=None"<br>
- Tomcat<br>
Tomcat에서 지원하는 Cookie Processor Component를 사용하여 일괄적으로 쿠키속성 추가<br>
```
<Context>
    ...
    <Cookieprocessor sameSiteCookie="None">
</Context>
```
- WEB server(Apache Config)<br>
`Header always edit Set-Cookie (.*) "Secure; SameSite=None"`
<br>

바로 **SameSite 설정을 낮추고 해당 전송이 Secure하다는 설정값을 추가**하는 것!
<br>

임시방편이지만 당장 바꾸기 어려운 상황에서 해결이 필요하다면 도움이 되는 방법인 것 같다.