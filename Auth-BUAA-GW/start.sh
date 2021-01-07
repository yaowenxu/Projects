#!/bin/bash
# 编辑自己的
NODE=node
USER=XXXX  # 输入用户名
PASS=YYYY # 输入用户密码
IP=WWWW # 输入希望申请的地址

echo '进行登录！'
$NODE index.js $USER $PASS $IP
echo '登录结束，请Ping公网地址，检查是否连通；如果登录失败，请提issue!'
ping -c 4 www.baidu.com