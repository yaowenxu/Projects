# glances
- 服务器运行信息监控.

## 配置文件配置
- https://glances.readthedocs.io/en/latest/config.html

## systemd 配置路径
- /etc/systemd/system/

## glances 命令帮助

```BASH
usage: glances [-h] [-V] [-d] [-C CONF_FILE] [--modules-list] [--disable-plugin DISABLE_PLUGIN] [--enable-plugin ENABLE_PLUGIN]
               [--disable-process] [--disable-webui] [--light] [-0] [-1] [-2] [-3] [-4] [-5] [-6] [--disable-history]
               [--disable-bold] [--disable-bg] [--enable-irq] [--enable-process-extended] [--export EXPORT]
               [--export-csv-file EXPORT_CSV_FILE] [--export-csv-overwrite] [--export-json-file EXPORT_JSON_FILE]
               [--export-graph-path EXPORT_GRAPH_PATH] [-c CLIENT] [-s] [--browser] [--disable-autodiscover] [-p PORT]
               [-B BIND_ADDRESS] [--username] [--password] [-u USERNAME_USED] [--snmp-community SNMP_COMMUNITY]
               [--snmp-port SNMP_PORT] [--snmp-version SNMP_VERSION] [--snmp-user SNMP_USER] [--snmp-auth SNMP_AUTH]
               [--snmp-force] [-t TIME] [-w] [--cached-time CACHED_TIME] [--open-web-browser] [-q] [-f PROCESS_FILTER]
               [--process-short-name] [--stdout STDOUT] [--stdout-csv STDOUT_CSV] [--hide-kernel-threads] [-b]
               [--diskio-show-ramfs] [--diskio-iops] [--fahrenheit] [--fs-free-space] [--sparkline] [--theme-white]
               [--disable-check-update]

optional arguments:
  -h, --help            show this help message and exit
  -V, --version         show program's version number and exit
  -d, --debug           enable debug mode
  -C CONF_FILE, --config CONF_FILE
                        path to the configuration file
  --modules-list, --module-list
                        display modules (plugins & exports) list and exit
  --disable-plugin DISABLE_PLUGIN, --disable-plugins DISABLE_PLUGIN
                        disable plugin (comma separed list)
  --enable-plugin ENABLE_PLUGIN, --enable-plugins ENABLE_PLUGIN
                        enable plugin (comma separed list)
  --disable-process     disable process module
  --disable-webui       disable the Web Interface
  --light, --enable-light
                        light mode for Curses UI (disable all but top menu)
  -0, --disable-irix    task's cpu usage will be divided by the total number of CPUs
  -1, --percpu          start Glances in per CPU mode
  -2, --disable-left-sidebar
                        disable network, disk I/O, FS and sensors modules
  -3, --disable-quicklook
                        disable quick look module
  -4, --full-quicklook  disable all but quick look and load
  -5, --disable-top     disable top menu (QL, CPU, MEM, SWAP and LOAD)
  -6, --meangpu         start Glances in mean GPU mode
  --disable-history     disable stats history
  --disable-bold        disable bold mode in the terminal
  --disable-bg          disable background colors in the terminal
  --enable-irq          enable IRQ module
  --enable-process-extended
                        enable extended stats on top process
  --export EXPORT       enable export module (comma separed list)
  --export-csv-file EXPORT_CSV_FILE
                        file path for CSV exporter
  --export-csv-overwrite
                        overwrite existing CSV file
  --export-json-file EXPORT_JSON_FILE
                        file path for JSON exporter
  --export-graph-path EXPORT_GRAPH_PATH
                        Folder for Graph exporter
  -c CLIENT, --client CLIENT
                        connect to a Glances server by IPv4/IPv6 address or hostname
  -s, --server          run Glances in server mode
  --browser             start the client browser (list of servers)
  --disable-autodiscover
                        disable autodiscover feature
  -p PORT, --port PORT  define the client/server TCP port [default: 61209]
  -B BIND_ADDRESS, --bind BIND_ADDRESS
                        bind server to the given IPv4/IPv6 address or hostname
  --username            define a client/server username
  --password            define a client/server password
  -u USERNAME_USED      use the given client/server username
  --snmp-community SNMP_COMMUNITY
                        SNMP community
  --snmp-port SNMP_PORT
                        SNMP port
  --snmp-version SNMP_VERSION
                        SNMP version (1, 2c or 3)
  --snmp-user SNMP_USER
                        SNMP username (only for SNMPv3)
  --snmp-auth SNMP_AUTH
                        SNMP authentication key (only for SNMPv3)
  --snmp-force          force SNMP mode
  -t TIME, --time TIME  set refresh time in seconds [default: 3 sec]
  -w, --webserver       run Glances in web server mode (bottle needed)
  --cached-time CACHED_TIME
                        set the server cache time [default: 1 sec]
  --open-web-browser    try to open the Web UI in the default Web browser
  -q, --quiet           do not display the curses interface
  -f PROCESS_FILTER, --process-filter PROCESS_FILTER
                        set the process filter pattern (regular expression)
  --process-short-name  force short name for processes name
  --stdout STDOUT       display stats to stdout, one stat per line (comma separated list of plugins/plugins.attribute)
  --stdout-csv STDOUT_CSV
                        display stats to stdout, csv format (comma separated list of plugins/plugins.attribute)
  --hide-kernel-threads
                        hide kernel threads in process list (not available on Windows)
  -b, --byte            display network rate in byte per second
  --diskio-show-ramfs   show RAM Fs in the DiskIO plugin
  --diskio-iops         show IO per second in the DiskIO plugin
  --fahrenheit          display temperature in Fahrenheit (default is Celsius)
  --fs-free-space       display FS free space instead of used
  --sparkline           display sparklines instead of bar in the curses interface
  --theme-white         optimize display colors for white background
  --disable-check-update
                        disable online Glances version ckeck

Examples of use:
  Monitor local machine (standalone mode):
    $ glances

  Display all Glances modules (plugins and exporters) and exit:
    $ glances --module-list

  Monitor local machine with the Web interface and start RESTful server:
    $ glances -w
    Glances web server started on http://0.0.0.0:61208/

  Only start RESTful API (without the WebUI):
    $ glances -w --disable-webui
    Glances API available on http://0.0.0.0:61208/api/

  Monitor local machine and export stats to a CSV file (standalone mode):
    $ glances --export csv --export-csv-file /tmp/glances.csv

  Monitor local machine and export stats to a InfluxDB server with 5s refresh time (standalone mode):
    $ glances -t 5 --export influxdb

  Start a Glances XML/RCP server (server mode):
    $ glances -s

  Connect Glances to a Glances XML/RCP server (client mode):
    $ glances -c <ip_server>

  Connect Glances to a Glances server and export stats to a StatsD server (client mode):
    $ glances -c <ip_server> --export statsd

  Start the client browser (browser mode):
    $ glances --browser

  Display stats to stdout (one stat per line):
    $ glances --stdout now,cpu.user,mem.used,load

  Display CSV stats to stdout (all stats in one line):
    $ glances --stdout-csv now,cpu.user,mem.used,load

  Disable some plugins (comma separated list):
    $ glances --disable-plugin network,ports

  Enable some plugins (comma separated list):
    $ glances --enable-plugin sensors
```