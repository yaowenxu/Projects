#!/bin/bash

# Ubuntu 20.04.1 平台，cockpit 安装；by yaowenxu 2020年12月31日20点16分

echo "cockpit 即将安装在 /root/cockpit-standalone ; 编译环境位于 /tmp/cockpit-workplace ;"
sleep 3

# cockpit-standalone 安装, 创建工作目录
mkdir -p  /tmp/cockpit-workplace
cd /tmp/cockpit-workplace

# 下载安装包
curl -OL https://github.com/cockpit-project/cockpit/releases/download/234/cockpit-234.tar.xz
curl -OL https://github.com/cockpit-project/cockpit/releases/download/234/cockpit-cache-234.tar.xz

# 解压
tar xf cockpit-234.tar.xz
tar xf cockpit-cache-234.tar.xz

# 进入目录
cd cockpit-234

# 创建安装目录，默认安装位置 /root/cockpit-standalone
mkdir -p /root/cockpit-standalone

# 安装依赖
apt install -y libglib2.0-dev libsystemd-dev libjson-glib-dev libgnutls28-dev libkrb5-dev libssh-dev libpam0g-dev libpcp3-dev gettext

# 配置 systemd unit dir 
mkdir -p /root/cockpit-standalone/systemdunit

# 进行配置
./configure --prefix=/root/cockpit-standalone --disable-pcp --disable-doc --with-systemdunitdir=/root/cockpit-standalone/systemdunit

# 进行编译 默认使用8个线程
make -j 8

# 进行安装
make install 

echo "cockpit 安装成功，位置位于：/root/cockpit-standalone"