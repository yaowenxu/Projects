#!/bin/sh
set -x
echo "mount 192.168.10.4 nfs"
umount /home/nfs/
mount -t nfs4 -o nfsvers=4.2,hard,retrans=5,rsize=1048576,wsize=1048576,ac,sharecache,proto=tcp,port=2049,lock,cto,local_lock=none 192.168.10.4:/home/nfs /home/nfs/
#csh
