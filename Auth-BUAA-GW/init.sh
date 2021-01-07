#!/bin/sh

# 初始化系统，安装 nodejs 和 npm;
sudo apt install -y nodejs
sudo apt install -y npm
sudo apt install -y cron
systemctl status cron.service
systemctl restart cron.service
npm install