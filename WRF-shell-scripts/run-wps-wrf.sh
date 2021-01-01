#!/bin/sh
# set -x
echo "Run WPS and WRF"

# run wps
cd /home/nfs/WRF/Build_WRF/WPS-4.2
./geogrid.exe
./link_grib.csh ../DATA/JAN00/
ln -sf ungrib/Variable_Tables/Vtable.GFS Vtable
./ungrib.exe
./metgrid.exe

# run wrf
cd ../WRF-4.2/run
ln -sf ../../WPS-4.2/met_em* .
# mpirun -np 30 ./real.exe
mpirun -np 40 -f host-file ./real.exe 
# show output files
ls -l wrfbdy*
ls -l wrfinput*

# mpirun -np 8 ./wrf.exe
# show output files
mpirun -np 40 -f host-file ./wrf.exe
ls -l wrfout*

echo "success!!"
