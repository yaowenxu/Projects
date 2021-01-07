// 欢迎关注：https://github.com/yaowenxu 
console.log("auth-buaa-gw");
const cheerio = require('cheerio');
const $ = cheerio.load('');
const Hashes = require('./hashes.min');
const https = require('https');
const querystring = require('querystring');

var loginname = process.argv[2];
var loginpasswd = process.argv[3];
var loginip  = process.argv[4];

console.log(loginname);
console.log(loginpasswd);
// console.log(loginip);
// var host = "https://gw.buaa.edu.cn";

function xEncode(str, key) {
    if (str == "") {
        return "";
    }
    var v = s(str, true),
        k = s(key, false);
    if (k.length < 4) {
        k.length = 4;
    }
    var n = v.length - 1,
        z = v[n],
        y = v[0],
        c = 0x86014019 | 0x183639A0,
        m,
        e,
        p,
        q = Math.floor(6 + 52 / (n + 1)),
        d = 0;
    while (0 < q--) {
        d = d + c & (0x8CE0D9BF | 0x731F2640);
        e = d >>> 2 & 3;
        for (p = 0; p < n; p++) {
            y = v[p + 1];
            m = z >>> 5 ^ y << 2;
            m += (y >>> 3 ^ z << 4) ^ (d ^ y);
            m += k[(p & 3) ^ e] ^ z;
            z = v[p] = v[p] + m & (0xEFB8D130 | 0x10472ECF);
        }
        y = v[0];
        m = z >>> 5 ^ y << 2;
        m += (y >>> 3 ^ z << 4) ^ (d ^ y);
        m += k[(p & 3) ^ e] ^ z;
        z = v[n] = v[n] + m & (0xBB390742 | 0x44C6F8BD);
    }

    function s(a, b) {
        var c = a.length,
            v = [];
        for (var i = 0; i < c; i += 4) {
            v[i >> 2] = a.charCodeAt(i) | a.charCodeAt(i + 1) << 8 | a.charCodeAt(i + 2) << 16 | a.charCodeAt(i + 3) << 24;
        }
        if (b) {
            v[v.length] = c;
        }
        return v;
    }

    function l(a, b) {
        var d = a.length,
            c = (d - 1) << 2;
        if (b) {
            var m = a[d - 1];
            if ((m < c - 3) || (m > c))
                return null;
            c = m;
        }
        for (var i = 0; i < d; i++) {
            a[i] = String.fromCharCode(a[i] & 0xff, a[i] >>> 8 & 0xff, a[i] >>> 16 & 0xff, a[i] >>> 24 & 0xff);
        }
        if (b) {
            return a.join('').substring(0, c);
        } else {
            return a.join('');
        }
    }

    return l(v, false);
}

function get(url, data, callback) {
    const callback_name = 'jQuery' + Math.random().toString(36);
    const request_url = "https://gw.buaa.edu.cn" + url + '?' + querystring.stringify(data) + '&callback=' + callback_name;
    console.log(request_url);
    https.get(request_url, function (res) {
        res.setEncoding('utf8');
        var rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            try {
                rawData = rawData.slice(callback_name.length + 1, rawData.length - 1);
                const parsedData = JSON.parse(rawData);
                console.log(parsedData);
                callback(parsedData);
            } catch (err) {
                console.error(err);
            }
        });
    });
}

function getJSON(url, data, callback) {
    if (url.match("srun_portal") != null || url.match("get_challenge") != null) {
        var enc = "s" + "run" + "_bx1",
            n = 200,
            type = 1,
            base64 = new Hashes.Base64();
        if (data.action == "login") { //login
            $data = data;
            return getJSON(url.replace("srun_portal", "get_challenge"), {
                "username": $data.username,
                "ip": $data.ip,
                "double_stack": "1"
            }, function (data) {
                var token = "";
                if (data.res != "ok") {
                    alert(data.error);
                    return;
                }
                token = data.challenge;
                //$data.password = $data.org_password;
                $data.info = "{SRBX1}" + base64.encode(xEncode(JSON.stringify({
                    "username": $data.username,
                    "password": $data.password,
                    "ip": $data.ip,
                    "acid": $data.ac_id,
                    "enc_ver": enc
                }), token));
                var hmd5 = new Hashes.MD5().hex_hmac(token, data.password);
                $data.password = "{MD5}" + hmd5;
                $data.chksum = new Hashes.SHA1().hex(token + $data.username + token + hmd5 + token + $data.ac_id + token + $data.ip + token + n + token + type + token + $data.info);
                $data.n = n;
                $data.type = type;
                return get(url, $data, callback, "jsonp");
            });
        } else if (data.action == "logout") { //logout
            $data = data;
            return getJSON(url.replace("srun_portal", "get_challenge"), {
                "username": $data.username,
                "ip": $data.ip,
                "double_stack": "1"
            }, function (data) {
                var token = "";
                if (data.res != "ok") {
                    alert(data.error);
                    return;
                }
                token = data.challenge;
                $data.info = "{SRBX1}" + base64.encode(xEncode(JSON.stringify({
                    "username": $data.username,
                    "ip": $data.ip,
                    "acid": $data.ac_id,
                    "enc_ver": enc
                }), token));
                var str = token + $data.username + token + $data.ac_id + token + $data.ip + token + n + token + type + token + $data.info;
                $data.chksum = new Hashes.SHA1().hex(str);
                $data.n = n;
                $data.type = type;
                return get(url, $data, callback, "jsonp");
            });
        } else {
            return get(url, data, callback, "jsonp");
        }
    }
    return get(url, data, callback, "json");
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function login(acid, uname, pwd, uip) {
    if (acid == "" || acid == "0") {
        return false;
    }
    if (uname == "") {
        return false;
    }

    if (pwd == "") {
        return false;
    }

    var qData = {
        "action": "login",
        "username": uname,
        //"org_password": pwd,
        "password": pwd,
        "ac_id": acid,
        "ip": "",
        "double_stack": "1"
    };
    getJSON("/cgi-bin/srun_portal", qData, function (data) {
        if (data.error == "ok") {
            console.log("auth done");
            return false;
        }
        if (data.error_msg.indexOf("E2616") >= 0) {
            console.log("您的账户已余额不足(Your account has insufficient balance)");
        } else {
            for (var i in PortalError) {
                if (data.error_msg.indexOf(i) >= 0) {
                    console.log(PortalError[i]);
                    return false;
                }
            }
            console.log(data.error_msg);
            return false;
        }
    });
};


// var Resolver = require('dns').Resolver;
// var resolver = new Resolver();
// var timer;
// resolver.setServers(['223.5.5.5']);

// function login_when_needed(err) {
//   clearTimeout(timer);
//   if (err) {
//     console.log('Currently not online');

// login("1", process.argv[2], process.argv[3], "");
login("1", loginname, loginpasswd, "");

//   } else {
//     console.log('Currently online now');
//   }
// }
// timer = setTimeout(login_when_needed, 5000, true);
// resolver.resolve4('google.com', login_when_needed);

function logout(e) {
    e.preventDefault();
    var uname = $("#username"),
        uip = $("#user_ip");
    //logout  注销
    var pData = {
        "action": "logout",
        "username": uname.val(),
        "ac_id": GetQueryString('ac_id'),
        "ip": "",
        "double_stack": "1"
    };
    //$.getJSON(location.protocol + "//" + "auth6.tsinghua.edu.cn" + "/cgi-bin/srun_portal", pData, function(data) {});
    $.getJSON("/cgi-bin/srun_portal", pData, function (data) {
        if (data.error == "ok") {
            //                if (data.client_ip.indexOf(":") >= 0) {
            //                    $.getJSON(location.protocol + "//" + "auth4.tsinghua.edu.cn" + "/cgi-bin/srun_portal", pData, function (data) {});
            //                }else {
            //                    $.getJSON(location.protocol + "//" + "auth6.tsinghua.edu.cn" + "/cgi-bin/srun_portal", pData, function(data) {});
            //                }
            //$.getJSON(location.protocol + "//" + location.hostname + "/cgi-bin/srun_portal", pData, function(data) {});
            // if (confirm("下线成功(Logoff Success)")){
            //     window.opener=null;
            //     window.open('','_self');
            //     window.close();
            // }
            alert("下线成功(Logoff Success)");
            location.href = location.protocol + "//" + location.hostname + "?noforward=1";
            return false;
        }
        for (var i in PortalError) {
            if (data.error_msg.indexOf(i) >= 0) {
                alert(PortalError[i]);
                return false;
            }
        }
        alert(data.error_msg);
        return false;
    });

    return false;
};

//phone
function phone_login(e) {
    e.preventDefault();
    $this = $(this);
    var acid = $this.find("input[name=\"ac_id\"]"),
        uname = $this.find("input[name=\"username\"]"),
        pwd = $this.find("input[name=\"password\"]"),
        uip = $this.find("input[name=\"user_ip\"]");
    if (acid.val() == "" || acid.val() == "0") {
        alert("您打开的认证页面未经重定向，点击确定后将自动重定向到正确的页面。");
        location = "http://www.baidu.com";
        return false;
    }
    if (uname.val() == "") {
        alert("请填写用户名");
        uname.focus();
        return false;
    }

    if (pwd.val() == "") {
        alert("请填写密码");
        pwd.focus();
        return false;
    }

    // var save_me = 0;
    // if ($this.find("input[name=\"save_me\"]").is(':checked')) {
    //     save_me = 1;
    // }
    if ($('#cookie')[0].checked == false) {
        $.cookie("off_campus", "off", {
            expires: 30
        });
        uname.val(uname.val() + "@tsinghua");
    } else {
        $.cookie("off_campus", null);
    }

    //login  认证
    var qData = {
        "action": "login",
        "username": uname.val(),
        "password": pwd.val(),
        //"org_password": pwd.val(),
        "ac_id": acid.val(),
        "ip": "",
        "double_stack": "1"
    };
    //$.getJSON(location.protocol + "//" + "auth6.tsinghua.edu.cn" + "/cgi-bin/srun_portal", qData, function(data) {});
    $.getJSON("/cgi-bin/srun_portal", qData, function (data) {
        if ($('#cookie')[0].checked == false) {
            uname.val(uname.val().replace("@tsinghua", ''));
        }
        if (data.error == "ok") {
            $.cookie('access_token', data.access_token);
            //                if (data.client_ip.indexOf(":") >= 0){
            //                    $.getJSON(location.protocol + "//" + "auth4.tsinghua.edu.cn" + "/cgi-bin/srun_portal", qData, function(data) {});
            //                }else {
            //                    $.getJSON(location.protocol + "//" + "auth6.tsinghua.edu.cn" + "/cgi-bin/srun_portal", qData, function(data) {});
            //                }
            //$.getJSON(location.protocol + "//" + location.hostname + "/cgi-bin/srun_portal", qData, function(data) {});
            var redirect = getUrlParam('userurl');
            if (redirect != "") {
                location.href = redirect;
            } else {
                if ($('#cookie')[0].checked == false) {
                    location.href = location.protocol + "//" + location.hostname + "/srun_portal_phone_succeed.php?ac_id=" + acid.val() + "&username=" + data.username + "&ip=" + data.client_ip + "&access_token=" + data.access_token + "&access=no";
                } else {
                    location.href = location.protocol + "//" + location.hostname + "/srun_portal_phone_succeed.php?ac_id=" + acid.val() + "&username=" + data.username + "&ip=" + data.client_ip + "&access_token=" + data.access_token;
                }
            }
            return false;
        }
        for (var i in PortalError) {
            if (data.error_msg.indexOf(i) >= 0) {
                alert(PortalError[i]);
                return false;
            }
        }
        alert(data.error_msg);
        return false;
    });
    return false;
};

function phone_logout(e) {
    e.preventDefault();
    $this = $(this);
    var uip = $this.find("input[name=\"user_ip\"]");
    //logout  注销
    var pData = {
        "action": "logout",
        "username": $.cookie("uname"),
        "ac_id": GetQueryString('ac_id'),
        "ip": ""
    };
    $.getJSON(location.protocol + "//" + location.hostname + ":69/cgi-bin/srun_portal", pData, function (data) {
        if (data.error == "ok") {
            $.cookie('uname', null);
            $.cookie('access_token', null);
            location.href = location.protocol + "//" + location.hostname;
            return false;
        }
        return false;
    });
    return false;
};

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
var PortalError = {
    E3001: "流量或时长已用尽",
    E3002: "计费策略条件不匹配",
    E3003: "控制策略条件不匹配",
    E3004: "余额不足",
    E3005: "在线变更计费策略",
    E3006: "在线变更控制策略",
    E3007: "超时",
    E3008: "连线数超额，挤出在线表。",
    E3009: "有代理行为",
    E3010: "无流量超时",
    E3101: "心跳包超时",
    E4001: "Radius表DM下线",
    E4002: "DHCP表DM下线",
    E4003: "Juniper IPOE COA上线",
    E4004: "Juniper IPOE COA下线",
    E4005: "proxy表DM下线",
    E4006: "COA在线更改带宽",
    E4007: "本地下线",
    E4008: "虚拟下线",
    E4009: "策略切换时下发COA",
    E4011: "结算时虚拟下线",
    E4012: "下发COA",
    E4101: "来自radius模块的DM下线(挤出在线表)",
    E4102: "来自系统设置(8081)的DM下线",
    E4103: "来自后台管理(8080)的DM下线",
    E4104: "来自自服务(8800)的DM下线",
    E4112: "来自系统设置(8081)的本地下线",
    E4113: "来自后台管理(8080)的本地下线",
    E4114: "来自自服务(8800)的本地下线",
    E4122: "来自系统设置(8081)的虚拟下线",
    E4123: "来自后台管理(8080)的虚拟下线",
    E4124: "来自自服务(8800)的虚拟下线",
    E2531: "用户不存在",
    E2532: "两次认证的间隔太短",
    E2533: "尝试次数过于频繁",
    E2534: "有代理行为被暂时禁用",
    E2535: "认证系统已关闭",
    E2536: "系统授权已过期",
    E2553: "密码错误",
    E2601: "不是专用客户端",
    E2606: "用户被禁用",
    E2611: "MAC绑定错误",
    E2612: "MAC在黑名单中",
    E2613: "NAS PORT绑定错误",
    E2614: "VLAN ID绑定错误",
    E2615: "IP绑定错误",
    E2616: "已欠费",
    E2620: "已经在线了",
    E2806: "找不到符合条件的产品",
    E2807: "找不到符合条件的计费策略",
    E2808: "找不到符合条件的控制策略",
    E2833: "IP地址异常，请重新拿地址",
    E5990: "数据不完整",
    E5991: "无效的参数",
    E5992: "找不到这个用户",
    E5993: "用户已存在",
    E5001: "用户创建成功",
    E5002: "用户创建失败",
    E5010: "修改用户成功",
    E5011: "修改用户失败",
    E5020: "修改用户成功",
    E5021: "修改用户失败",
    E5030: "转组成功",
    E5031: "转组失败",
    E5040: "购买套餐成功",
    E5041: "购买套餐失败",
    E5042: "找不到套餐",
    E5050: "绑定MAC认证成功",
    E5051: "解绑MAC认证成功",
    E5052: "绑定MAC成功",
    E5053: "解绑MAC成功",
    E5054: "绑定nas port成功",
    E5055: "解绑nas port成功",
    E5056: "绑定vlan id成功",
    E5057: "解绑vlan id成功",
    E5058: "绑定ip成功",
    E5059: "解绑ip成功",
    E6001: "用户缴费成功",
    E6002: "用户缴费失败",
    //结算日志
    E7001: "用户不存在",
    E7002: "添加待结算队列失败",
    E7003: "结算成功",
    E7004: "添加已结算队列失败",
    E7005: "扣除产品实例结算金额失败",
    E7006: "没有找到产品实例",
    E7007: "没有对该用户进行手动结算的权限",
    E7008: "没有对该产品进行手动结算的权限",
    E7009: "由于使用流量小于该产品结算设置而不扣费",
    E7010: "由于使用时长小于该产品结算设置而不扣费",
    E7011: "由于产品余额不足，根据结算设置而不扣费",
    E7012: "由于产品余额不足，根据结算设置余额扣为0",
    E7013: "由于产品余额不足，根据结算设置余额扣为负值",
    E7014: "删除过期套餐操作成功",
    E7015: "删除过期套餐操作失败",
    E7016: "自动购买套餐成功",
    E7017: "自动购买套餐失败",
    E7018: "产品结算模式错误",
    //
    vcode_error: "验证码错误",
};
