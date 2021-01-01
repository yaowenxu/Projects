#!/bin/bash

# 进行从 apt 安装，并且重启服务；
apt install cockpit
apt install udisks2-lvm2
systemctl restart udisks2.service
systemctl daemon-reload
systemctl restart cockpit.socket
systemctl restart cockpit.service