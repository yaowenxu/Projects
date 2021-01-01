#!/bin/sh

# init.sh
# 命令参考自：The magic behind configure, make, make install；
# https://thoughtbot.com/blog/the-magic-behind-configure-make-make-install

# autoconf 环境配置
aclocal # Set up an m4 environment
autoconf # Generate configure from configure.ac
automake --add-missing # Generate Makefile.in from Makefile.am

# 配置环境，并编译分发；
# ./configure # Generate Makefile from Makefile.in
./configure --prefix=/tmp/helloworld
make -j 2 # 多线程编译
make dist
make distcheck # Use Makefile to build and test a tarball to distribute

# 运行程序
/tmp/helloworld-0.1/bin/helloworld