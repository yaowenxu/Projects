#!/bin/sh

# 初始化系统，安装 nodejs 和 npm;
sudo apt install -y nodejs
sudo apt install -y npm
sudo apt install -y cron
systemctl status cron.service
systemctl restart cron.service
npm install

# 18.04 解决错误：npm : Depends: node-gyp (>= 0.10.9)
# sudo apt-get install nodejs-dev node-gyp libssl1.0-dev
# sudo apt-get install npm 