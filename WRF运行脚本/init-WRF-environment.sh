#!/bin/sh
# set -x
echo "Init WRF and WPS Environment"

# change work dir
cd /home/nfs

# set environment variable
export DIR=/home/nfs/WRF/Build_WRF/LIBRARIES
export CC=gcc
export CXX=g++
export FC=gfortran
export FCFLAGS=-m64
export F77=gfortran
export FFLAGS=-m64
export JASPERLIB=$DIR/grib2/lib
export JASPERINC=$DIR/grib2/include
export LDFLAGS=-L$DIR/grib2/lib
export CPPFLAGS=-I$DIR/grib2/include
export PATH=$DIR/netcdf/bin:$PATH
export NETCDF=$DIR/netcdf
export PATH=$DIR/mpich/bin:$PATH
export JASPERLIB=$DIR/grib2/lib
export JASPERINC=$DIR/grib2/include

# load csh
csh

echo "exit wrf environment success!!"
