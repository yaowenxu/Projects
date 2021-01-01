#!/bin/bash
# 关于 ubuntu 上 LVM 管理未出现的情况可能是 和 udisks 版本有关
# 参考 https://cockpit-project.org/guide/latest/feature-storaged.html 

# 修复 ubuntu 不支持lvm的问题：添加 udisks-lvm2 模块
apt install udisks2-lvm2
systemctl restart udisks2.service
# systemctl daemon-reload
# systemctl restart cockpit.socket
# systemctl restart cockpit.service

# 关于问题：cockpit-tls: Could not locate server certificate: No certificate found in dir: /etc/xdg/xdg-ubuntu/cockpit/ws-certs.d
# 参考文档：https://cockpit-project.org/guide/172/https.html
/root/cockpit-standalone/sbin/remotectl certificate --ensure --user=root --group= --selinux-type=

# 参考文档 https://cockpit-project.org/guide/latest/startup.html
/root/cockpit-standalone/libexec/cockpit-ws --port 9090
