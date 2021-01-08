---
layout: post
title: 【JAVA】JAVA NETTY PRACTICE
subject: blog
category: java
author: junseo.park
subtitle: Java와 C++로 간단한 Socket C/S 만들어보았다.
---

### Netty Socket Server

이전 포스팅에서 NIO, NETTY 개념을 잡아보았으니 이를 간단한 코드 3개로 테스트 겸? 실습 해보았다.

#### Channel Pipeline Handler

```java
public class EchoServerHandler extends ChannelInboundHandlerAdapter {
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        // Client로부터 데이터를 수신받으면 Echo 출력하는 Method
        ByteBuf in = (ByteBuf)msg;

        // print received message
        System.out.println("Server Received : " + in.toString(CharsetUtil.UTF_8));
        ctx.write(in);
    }

    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
        // Channel에서 Read한 후 Buffer 비우는 Method
        ctx.writeAndFlush(Unpooled.EMPTY_BUFFER)
                .addListener(ChannelFutureListener.CLOSE);
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        // Exception 관련 Method
        cause.printStackTrace();
        ctx.close();
    }
}

```

#### Server Main

```java

public class ServerMain {
    private final int port;

    public ServerMain(int port) {
        this.port = port;
    }

    public static void main(String[] args) {
        if(args[0] == null) {
            args[0] = "4000";
        }

        ServerMain server = new ServerMain(Integer.parseInt(args[0]));

        try {
            // socket server start
            Thread.sleep(5000);
            server.start();
        }
        catch(Exception e) {
            e.printStackTrace();
            System.exit(1);
        }
    }

    private void start() throws Exception {
        System.out.println("Start Netty Socket Server");
        final EchoServerHandler handler = new EchoServerHandler();
        EventLoopGroup group = new NioEventLoopGroup();

        try {

            ServerBootstrap sb = new ServerBootstrap();
            sb.group(group)
                    .channel(NioServerSocketChannel.class)
                    .localAddress(new InetSocketAddress(port))
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel ch) throws Exception {
                            System.out.println("CHANNEL OPEN");
                            ch.pipeline().addLast(handler);
                        }
                    });

            ChannelFuture cf = sb.bind().sync();
            cf.channel().closeFuture().sync();
        }
        catch(Exception e) {
            e.printStackTrace();
        }
        finally {
            group.shutdownGracefully().sync();
        }
    }
}
```

#### Socket Client

Client도 똑같이 Java로 하려다가, 조금 특이하게 `C++`로도 Socket 통신을 해보고싶어 Client는 C++로 제작해보았다.

C++은 Win32 계열 Socket을 사용했는데 이 Header가 상당히 로우레벨인 듯 하여 나의 ~~마니악한~~ 호기심을 자극한다.

그러나 이번엔 Netty SocketServer가 데이터를 잘 받는지만 확인하면 되니 가장 기본적인 설정만 잡았다.

```c++
#pragma once

#include "pch.h"
#include <WinSock2.h>
#include <iostream>
#include <string>

#pragma comment(lib, "ws2_32.lib")

#pragma warning(disable:4996) 

using namespace std;

void ErrorHandling(std::string msg) {
	cout << msg << endl;

	exit(1);
}

int main(int argc, char** argv) {

	cout << "==== C++ Socket Client Start ====\n\n";

	int   PORT = 4000;

	WSADATA ws;
	SOCKET sc;
	SOCKADDR_IN servaddr;
	char msg[1024];
	int len;

	if (WSAStartup(MAKEWORD(2, 2), &ws) != 0)
		ErrorHandling("WSAStartup Error\n");

	// Create New Socket 
	sc = socket(PF_INET, SOCK_STREAM, 0);

	if (sc == INVALID_SOCKET)
		ErrorHandling("Socket Error\n");

	// New Socket Configuration
	memset(&servaddr, 0, sizeof(servaddr));
	servaddr.sin_family = AF_INET;
	servaddr.sin_addr.s_addr = inet_addr("127.0.0.1");
	servaddr.sin_port = htons(PORT);

	cout << "socket connection config : OK\n";

	if (connect(sc, (LPSOCKADDR)&servaddr, sizeof(servaddr)) == SOCKET_ERROR) {
		ErrorHandling("Connection Error\n");
	}

	while (1) {
		char msg[1024];

		fputs("Enter message : ", stdout);
		fgets(msg, 1024, stdin);

		if (!strcmp(msg, "q\n")) {
			break;
		}

		send(sc, msg, strlen(msg), 0);

		cout << "i sent message : " << msg << '\n';

	}

	return 0;
}
```