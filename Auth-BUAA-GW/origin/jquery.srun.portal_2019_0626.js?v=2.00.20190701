/*!
 * jQuery Srun Portal Plugin v1.0.0
 *
 * Copyright 2006, 2014
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD (Register as an anonymous module)
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var enc = "s" + "run" + "_bx1", n = 200, type = 1;

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
        return l(v, false);
    }

    function s(a, b) {
        var c = a.length, v = [];
        for (var i = 0; i < c; i += 4) {
            v[i >> 2] = a.charCodeAt(i) | a.charCodeAt(i + 1) << 8 | a.charCodeAt(i + 2) << 16 | a.charCodeAt(i + 3) << 24;
        }
        if (b) {
            v[v.length] = c;
        }
        return v;
    }

    function l(a, b) {
        var d = a.length, c = (d - 1) << 2;
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

    function getChallenge(url, data, callback) {
        return $.get(url + "/cgi-bin/get_challenge", data, callback, "jsonp");
    }

    function json(d) {
        return JSON.stringify(d);
    }

    function info(d, k) {
        return "{SRBX1}" + $.base64.encode(xEncode(json(d), k));
    }

    function pwd(d, k) {
        return md5(d, k);
    }

    function chksum(d) {
        return sha1(d);
    }

    /*
     * SRUN Portal Auth CGI
     */
    function srunPortal(url, data, callback) {
        return $.get(url + "/cgi-bin/srun_portal", data, callback, "jsonp");
    }

    /*
     * OS
     */
    function getOS() {
        var ua = window.navigator.userAgent;
        var md = new MobileDetect(ua);
        if (md.mobile()) { //phone
            var device = md.os() == "iOS" ? md.phone() : md.os();
            return {
                device: device,
                platform: "Smartphones/PDAs/Tablets"
            }
        } else {    //desktop
            lowerua = ua.toLowerCase()
            var device = "", platform = "";
            if (lowerua.indexOf("win") > -1 && lowerua.indexOf("95") > -1) {
                device = "Windows 95";
                platform = "Windows";
            } else if (lowerua.indexOf("win 9x") > -1 && lowerua.indexOf("4.90") > -1) {
                device = "Windows ME";
                platform = "Windows";
            } else if (lowerua.indexOf("win") > -1 && lowerua.indexOf("98") > -1) {
                device = "Windows 98";
                platform = "Windows";
            } else if (lowerua.indexOf("win") > -1 && lowerua.indexOf("nt 5.0") > -1) {
                device = "Windows 2000";
                platform = "Windows";
            } else if (lowerua.indexOf("win") > -1 && lowerua.indexOf("nt 5.1") > -1) {
                device = "Windows XP";
                platform = "Windows";
            } else if (lowerua.indexOf("win") > -1 && lowerua.indexOf("nt 6.0") > -1) {
                device = "Windows Vista";
                platform = "Windows";
            } else if (lowerua.indexOf("win") > -1 && lowerua.indexOf("nt 6.1") > -1) {
                device = "Windows 7";
                platform = "Windows";
            } else if (lowerua.indexOf("win") > -1 && lowerua.indexOf("nt 6.2") > -1) {
                device = "Windows 8";
                platform = "Windows";
            } else if (lowerua.indexOf("win") > -1 && lowerua.indexOf("nt 6.3") > -1) {
                device = "Windows 8";
                platform = "Windows";
            } else if (lowerua.indexOf("win") > -1 && lowerua.indexOf("nt 10.0") > -1) {
                device = "Windows 10";
                platform = "Windows";
            } else if (lowerua.indexOf("win") > -1 && lowerua.indexOf("32") > -1) {
                device = "Windows 32";
                platform = "Windows";
            } else if (lowerua.indexOf("win") > -1 && lowerua.indexOf("nt") > -1) {
                device = "Windows NT";
                platform = "Windows";
            } else if (lowerua.indexOf("mac os") > -1) {
                device = "Mac OS";
                platform = "Macintosh";
            } else if (lowerua.indexOf("linux") > -1) {
                device = "Linux";
                platform = "Linux";
            } else if (lowerua.indexOf("unix") > -1) {
                device = "Unix";
                platform = "Linux";
            } else if (lowerua.indexOf("sun") > -1 && lowerua.indexOf("os") > -1) {
                device = "SunOS";
                platform = "Linux";
            } else if (lowerua.indexOf("ibm") > -1 && lowerua.indexOf("os") > -1) {
                device = "IBM OS/2";
                platform = "Linux";
            } else if (lowerua.indexOf("mac") > -1 && lowerua.indexOf("pc") > -1) {
                device = "Macintosh";
                platform = "Macintosh";
            } else if (lowerua.indexOf("powerpc") > -1) {
                device = "PowerPC";
                platform = "Linux";
            } else if (lowerua.indexOf("aix") > -1) {
                device = "AIX";
                platform = "Linux";
            } else if (lowerua.indexOf("hpux") > -1) {
                device = "HPUX";
                platform = "Linux";
            } else if (lowerua.indexOf("netbsd") > -1) {
                device = "NetBSD";
                platform = "Linux";
            } else if (lowerua.indexOf("bsd") > -1) {
                device = "BSD";
                platform = "Linux";
            } else if (lowerua.indexOf("osf1") > -1) {
                device = "OSF1";
                platform = "Linux";
            } else if (lowerua.indexOf("irix") > -1) {
                device = "IRIX";
                platform = "Linux";
            } else if (lowerua.indexOf("freebsd") > -1) {
                device = "FreeBSD";
                platform = "Linux";
            } else {
                device = "Windows NT";
                platform = "Windows";
            }
            return {
                device: device,
                platform: platform
            }
        }
    }

    /*
     * is Mobile
     */
    $.isMobile = function () {
        var md = new MobileDetect(window.navigator.userAgent);
        return md.mobile()
    }

    /*
     * User Info
     */
    function userInfo(url, data, callback) {
        return $.get(url + "/cgi-bin/rad_user_info", data, callback, "jsonp");
    }

    /*
     * Format No.
     */
    function formatNumber(num, count) {
        var n = Math.pow(10, count),
            t = Math.floor(num * n);
        return t / n;
    }

    /*
     * Format Flux
     */
    function formatFlux(byte) {
        if (byte > (1000 * 1000))
            return (formatNumber((byte / (1000 * 1000)), 2) + " M");
        if (byte > 1000)
            return (formatNumber((byte / 1000), 2) + " K");
        return byte + " b";
    }

    /*
     * Format Time
     */
    function formatTime(sec) {
        var h = Math.floor(sec / 3600),
            m = Math.floor((sec % 3600) / 60),
            s = sec % 3600 % 60,
            out = "";
        if (h < 10) {
            out += "0" + h + ":";
        } else {
            out += h + ":";
        }
        if (m < 10) {
            out += "0" + m + ":";
        } else {
            out += m + ":";
        }
        if (s < 10) {
            out += "0" + s + "";
        } else {
            out += s + "";
        }
        return out;
    }

    /*
     * Format Error
     */
    function formatError(error) {
        var str = "";
        str = error.replace(/(_|, | |^)\S/g, function (s) {
            s = s.replace(/(_|, | )/, "");
            return s.toUpperCase();
        });
        return str.replace(/\./g, "");
    }

    /*
     * GET Error
     */
    function error(code, error, msg) {
        if (typeof(code) == "number" || code == "") {
            if (typeof msg != "undefined" && msg != "") {
                return formatError(msg); //Format Error
            }
            return formatError(error); //Format Error
        }
        if (code == "E2901") {
            return msg;
        }
        return code;
    }

    /*
     * dm
     * url: /cgi-bin/rad_user_dm
     * params [@ip,@username,@time,@sign]
     * sign sha1(time+username+ip+unbind+time)
     */
    function dm(url, data, callback) {
        var t = Date.parse(new Date()) / 1000;
        var params = {
            ip: data.ip,
            username: data.username,
            time: t,
            unbind: 0,
            sign: ""
        };
        var unbind = 0;
        if (portal.MacAuth) {
            unbind = 1;
            params.unbind = 1;
        }
        var sign = sha1(t + data.username + data.ip + unbind + t);
        params.sign = sign;
        return $.get(url + "/cgi-bin/rad_user_dm", params, callback, "jsonp");
    }

    /*
     * Remember Me
     * Url:/v1/srun_portal_remember
     */
    function remember(data, callback) {
        $.get(autoBuildUrl(url) + "/v1/srun_portal_remember", data, callback);
    }

    /*
     * @Login
     * @params [@username, @domain, @password, @ac_id, @ip, @type, @os, @name]
     * @callback
     */
    $.Login = function (url, data, callback) {
        var username = data.username + (data.domain || "");
        var challengeCallback = function (response) {
            if (response.error != "ok") {
                //Process Error Message
                var message = error(response.ecode, response.error);
                return callback({
                    error: "fail",
                    message: message
                });
            }
            var token = response.challenge,
                i = info({
                    username: username,
                    password: data.password,
                    ip: (data.ip || response.client_ip),
                    acid: data.ac_id,
                    enc_ver: enc
                }, token),
                hmd5 = pwd(data.password, token);
            var chkstr = token + username;
            chkstr += token + hmd5;
            chkstr += token + data.ac_id;
            chkstr += token + (data.ip || response.client_ip);
            chkstr += token + n;
            chkstr += token + type;
            chkstr += token + i;
            var os = getOS();

            if (data.otp) {
                data.password = "{OTP}" + data.password;
            } else {
                data.password = "{MD5}" + hmd5;
            }
            var params = {
                action: "login",
                username: username,
                password: data.password,
                ac_id: data.ac_id,
                ip: data.ip || response.client_ip,
                chksum: chksum(chkstr),
                info: i,
                n: n,
                type: type,
                os: os.device,
                name: os.platform,
                double_stack: data.double_stack
            };
            var authCallback = function (resp) {
                if (resp.error == "ok") {
                    var ploy_msg = "";
                    if (resp.ploy_msg !== undefined) {
                        ploy_msg = resp.ploy_msg;
                        if (ploy_msg.indexOf("E0000") == 0) {
                            ploy_msg = "";
                        }
                    }

                    return callback({
                        error: "ok",
                        message: ploy_msg
                    });
                }
                //Process Error Message
                var message = error(resp.ecode, resp.error, resp.error_msg);
                if (typeof resp.ploy_msg != "undefined") {
                    message = resp.ploy_msg;
                }
                return callback({
                    error: "fail",
                    message: message
                });
            };
            srunPortal(url, params, authCallback);
        };
        var params = {
            username: username,
            ip: (data.ip || "")
        };
        getChallenge(url, params, challengeCallback);
    };

    /*
     * @Logout
     * @params [@username, @domain, @ac_id, @ip, @chksum, @info, @n, @type]
     * @callback
     */
    $.Logout = function (url, data, callback) {
        var username = (data.username || "") + (data.domain || "");
        var params = {
            action: "logout",
            ac_id: data.ac_id,
            ip: data.ip || ""
        };
        if (username != '') {
            params.username = username;
        }
        var logoutCallback = function (response) {
            if (response.error == "ok") {
                return callback({
                    error: "ok",
                    message: ""
                });
            }
            //Process Error Message
            var message = error(response.ecode, response.error, response.error_msg);
            return callback({
                error: "fail",
                message: message
            });
        };
        srunPortal(url, params, logoutCallback);
    };

    /*
     * Online Info
     * params []
     * @callback
     */
    $.Info = function (url, data, callback) {
        var userInfoCallback = function (response) {
            if (response.error == "ok") {
                return callback({
                    error: "ok",
                    user_name: response.user_name,
                    used_flow: formatFlux(response.sum_bytes),
                    used_time: formatTime(response.sum_seconds),
                    balance: response.user_balance.toFixed(2),
                    ip: response.online_ip,
                    domain: response.domain,
                    checkout_date: response.checkout_date
                });
            }
            //Process Error Message
            var message = error(response.ecode, response.error, response.error_msg);
            return callback({
                error: "fail",
                message: message
            });
        }
        userInfo(url, data, userInfoCallback);
    };

    /*
     * DM
     * Url:
     * params [@ip,@username]
     * @callback
     */
    $.DM = function (url, data, callback) {
        var dmCallback = function (response) {
            if (response.error == "logout_ok") {
                return callback({
                    error: "ok",
                    message: ""
                });
            }
            //Process Error Message
            var message = error(response.ecode, response.error, response.error_msg);
            return callback({
                error: "fail",
                message: message
            });
        };
        dm(url, data, dmCallback);
    };

    /*
     * Notice
     * Url:/v1/srun_portal_message
     * @callback
     */
    $.Message = function (url, action, data, callback) {
        $.get(autoBuildUrl(url) + action, data, callback);
    };

    /**
     * Get Token
     * Url: /v1/srun_portal_sign
     * @param url
     * @param data [@phone, @t, @ip, @vcode, @ac_id, @type:auth]
     * @param callback
     */
    function getSign(url, data, callback) {
        $.get(autoBuildUrl(url) + "/v1/srun_portal_sign", data, callback);
    }

    /**
     * 构造请求地址
     * @param url
     * @returns {*}
     */
    function autoBuildUrl(url) {
        /*if (location.protocol == "https:") {
            url += ":4968";
        }*/
        return url;
    }

    /*
     * Mobile Vcode
     * Url:/cgi-bin/srunmobile_vcode
     * @data [@phone, @t, @token, @sign, @ip, @mac]
     * @callback
     */
    function mobileVcode(url, data, callback) {
        $.get(url + "/cgi-bin/srunmobile_vcode", data, callback, "jsonp");
    }

    /*
     * Mobile Auth
     * Url:/cgi-bin/srunmobile_portal
     * @data [$token, @t, @phone, @vcode, @ac_id, @sign, @ip, @mac, @type, @os, @name]
     * @callback
     */
    function mobileAuth(url, data, callback) {
        $.get(url + "/cgi-bin/srunmobile_portal", data, callback, "jsonp");
    }

    /*
     * Mobile Events code
     * Url:/cgi-bin/srun_mobile_events_code
     * @data [@phone, @t, @token, @sign, @ip, @mac]
     * @callback
     */
    function mobileEventsCode(url, data, callback) {
        $.get(url + "/cgi-bin/srun_mobile_events_code", data, callback, "jsonp");
    }

    /*
     * Mobile Events Auth
     * Url:/cgi-bin/srun_mobile_event_portal
     * @data [$token, @t, @phone, @vcode, @ac_id, @sign, @ip, @mac, @type, @os, @name]
     * @callback
     */
    function mobileEventsAuth(url, data, callback) {
        $.get(url + "/cgi-bin/srun_events_auth", data, callback, "jsonp");
    }

    /*
     * Phone Events VerifyCode
     * Url:
     * @data [@phone, @t, @token, @sign, @ip, @mac]
     * @callback
     * @response [@code, @message, @token, @sign, @ip]
     * @callback
     */
    $.GetVerifyEventsCode = function (url, data, callback) {
        var t = Date.parse(new Date()) / 1000;
        var signCallback = function (response) {
            if (response.Code != 0) {
                return callback({
                    error: "fail",
                    message: response.Message.replace(/ /g, "")
                });
            }
            var params = {
                phone: data.phone,
                t: t,
                token: response.Token,
                sign: response.Sign,
                ip: data.ip || response.Ip,
                mac: data.mac,
                event_id: data.event_id
            };
            var mobileCallback = function (resp) {
                if (resp.error == "ok") {
                    return callback({
                        error: "ok",
                        message: ""
                    });
                }
                //Process Error Message
                var message = error(resp.ecode, resp.error, resp.error_msg);
                return callback({
                    error: "fail",
                    message: message
                });
            };
            mobileEventsCode(url, params, mobileCallback);
        };
        var params = {
            phone: data.phone,
            t: t,
            ip: (data.ip || ""),
            type: "send"
        };
        getSign(url, params, signCallback);
    };

    /*
     * SMS Events Auth
     * Url:
     * @data [$token, @t, @phone, @vcode, @ac_id, @sign, @ip, @mac, @type, @os, @name]
     * @callback
     * @response [@code, @message, @token, @sign, @ip]
     * @callback
     */
    $.SmsEventsAuth = function (url, data, callback) {
        var t = Date.parse(new Date()) / 1000;
        var signCallback = function (response) {
            if (response.Code != 0) {
                return callback({
                    error: "fail",
                    message: response.Message.replace(/ /g, "")
                });
            }
            var os = getOS();
            var params = {
                token: response.Token,
                t: t,
                phone: data.phone,
                vcode: data.vcode,
                ac_id: data.ac_id,
                sign: response.Sign,
                ip: data.ip || response.Ip,
                mac: data.mac,
                type: 1,
                os: os.device,
                name: os.platform,
                event_id: data.event_id
            };
            var authCallback = function (resp) {
                if (resp.error == "ok") {
                    return callback({
                        error: "ok",
                        message: ""
                    });
                }
                //Process Error Message
                var message = error(resp.ecode, resp.error, resp.error_msg);
                if (typeof resp.ploy_msg != "undefined") {
                    message = data.ploy_msg;
                }
                return callback({
                    error: "fail",
                    message: message
                });
            };
            mobileEventsAuth(url, params, authCallback);
        };
        var params = {
            phone: data.phone,
            t: t,
            ip: (data.ip || ""),
            vcode: data.vcode,
            ac_id: data.ac_id,
            type: "auth"
        };
        getSign(url, params, signCallback);
    };

    $.PortalProxy = function (url, data, callback) {
        var proxyCallback = function (res) {
            return callback({
                error: "ok",
                data: res.data
            })
        };
        portalProxy(url, data, proxyCallback)
    };

    /**
     * 发起代理http请求
     * @param url
     * @param data
     * @param callback
     */
    function portalProxy(url, data, callback) {
        $.get(autoBuildUrl(url) + "/v1/srun_portal_proxy", data, callback)
    }

    /*
     * Phone VerifyCode
     * Url:
     * @data [@phone, @t, @token, @sign, @ip, @mac]
     * @callback
     * @response [@code, @message, @token, @sign, @ip]
     * @callback
     */
    $.GetVerifyCode = function (url, data, callback) {
        var t = Date.parse(new Date()) / 1000;
        var signCallback = function (response) {
            if (response.Code != 0) {
                return callback({
                    error: "fail",
                    message: response.Message.replace(/ /g, "")
                });
            }
            var params = {
                phone: data.phone,
                t: t,
                token: response.Token,
                sign: response.Sign,
                ip: data.ip || response.Ip,
                mac: data.mac
            };
            var mobileCallback = function (resp) {
                if (resp.error == "ok") {
                    return callback({
                        error: "ok",
                        message: ""
                    });
                }
                //Process Error Message
                var message = error(resp.ecode, resp.error, resp.error_msg);
                return callback({
                    error: "fail",
                    message: message
                });
            };
            mobileVcode(url, params, mobileCallback);
        };
        var params = {
            phone: data.phone,
            t: t,
            ip: (data.ip || ""),
            type: "send"
        };
        getSign(url, params, signCallback);
    };

    /*
     * SMS Auth
     * Url:
     * @data [$token, @t, @phone, @vcode, @ac_id, @sign, @ip, @mac, @type, @os, @name]
     * @callback
     * @response [@code, @message, @token, @sign, @ip]
     * @callback
     */
    $.SmsAuth = function (url, data, callback) {
        var t = Date.parse(new Date()) / 1000;
        var signCallback = function (response) {
            if (response.Code != 0) {
                return callback({
                    error: "fail",
                    message: response.Message.replace(/ /g, "")
                });
            }
            var os = getOS();
            var params = {
                token: response.Token,
                t: t,
                phone: data.phone,
                vcode: data.vcode,
                ac_id: data.ac_id,
                sign: response.Sign,
                ip: data.ip || response.Ip,
                mac: data.mac,
                type: 1,
                os: os.device,
                name: os.platform
            };
            var authCallback = function (resp) {
                if (resp.error == "ok") {
                    return callback({
                        error: "ok",
                        message: ""
                    });
                }
                //Process Error Message
                var message = error(resp.ecode, resp.error, resp.error_msg);
                if (typeof resp.ploy_msg != "undefined") {
                    message = data.ploy_msg;
                }
                return callback({
                    error: "fail",
                    message: message
                });
            };
            mobileAuth(url, params, authCallback);
        };
        var params = {
            phone: data.phone,
            t: t,
            ip: (data.ip || ""),
            vcode: data.vcode,
            ac_id: data.ac_id,
            type: "auth"
        };
        getSign(url, params, signCallback);
    };

    /*
     * WeChat Release Sign
     * Url:
     * @params [@ac_id, @t, @type]
     *  type:sign
     *      [@ac_id, @t]
     *  type:options
     *      [@bssid, @mac, @ac_id, @token, @ssid, @username, @password]
     * @callback
     */
    function releaseSign(url, data, callback) {
        $.get(autoBuildUrl(url) + "/v1/srun_portal_weixin", data, callback);
    }

    /*
     * Provisional Release
     * Url:/cgi-bin/weixin_provisional_release
     * @params [@token, @t, @sign, @type, @ac_id]
     * @callback
     */
    function provisionalRelease(url, data, callback) {
        $.get(url + "/cgi-bin/weixin_provisional_release", data, callback, "jsonp");
    }

    /*
     * Release
     */
    $.Release = function (url, data, callback) {
        var t = Date.parse(new Date()) / 1000;
        var releaseCallback = function (resp) {
            if (resp.Code != 0) {
                return callback({
                    error: "fail",
                    message: resp.Message.replace(/ /g, "")
                });
            }
            var provisionalReleaseCallback = function (response) {
                if (response.error == "ok") {
                    return callback({
                        error: "ok",
                        message: "",
                        wifiConfig: {
                            mac: response.mac || "",
                            bssid: response.bssid || "",
                            token: resp.Token
                        }
                    });
                }
                //Process Error Message
                var message = error(response.ecode, response.error, response.error_msg);
                return callback({
                    error: "fail",
                    message: message
                });
            };
            var params = {
                t: t,
                ac_id: data.ac_id,
                token: resp.Token,
                sign: resp.Sign,
                type: "weixin"
            };
            provisionalRelease(url, params, provisionalReleaseCallback);
        }
        var params = {
            ac_id: data.ac_id,
            t: t,
            ip: data.ip || "",
            type: "sign"
        };
        releaseSign(url, params, releaseCallback);
    }


    /*
     * WeChat
     * Url:
     * params []
     * @callback
     */
    $.WeixinRelease = function (url, data, callback) {
        var t = Date.parse(new Date()) / 1000;
        var releaseCallback = function (resp) {
            if (resp.Code != 0) {
                return callback({
                    error: "fail",
                    message: resp.Message.replace(/ /g, "")
                });
            }
            var provisionalReleaseCallback = function (response) {
                if (response.error != "ok") {
                    //Process Error Message
                    var message = error(response.ecode, response.error, response.error_msg);
                    return callback({
                        error: "fail",
                        message: message
                    });
                }
                t = Date.parse(new Date());
                var optionsCallback = function (res) {
                    if (res.Code == 0) {
                        return callback({
                            error: "ok",
                            message: "",
                            wifiConfig: {
                                appid: res.AppID || "",
                                extend: res.Extend || "",
                                timestamp: t,
                                sign: res.Sign || "",
                                shop_id: res.ShopID || "",
                                authUrl: res.AuthUrl || "",
                                mac: response.mac || "",
                                ssid: res.SSID || "",
                                bssid: response.bssid || ""
                            }
                        });
                    }
                    //Process Error Message
                    var message = error(res.Code, res.Message, res.error_msg);
                    return callback({
                        error: "fail",
                        message: message
                    });
                };
                var os = getOS();
                var params = {
                    t: t,
                    ip: data.ip,
                    ac_id: data.ac_id,
                    bssid: response.bssid,
                    mac: response.mac,
                    token: resp.Token,
                    os: os.device,
                    osName: os.platform,
                    ssid: data.ssid,
                    type: "options"
                };
                releaseSign(url, params, optionsCallback);
            };
            var params = {
                t: t,
                ac_id: data.ac_id,
                token: resp.Token,
                sign: resp.Sign,
                type: "weixin"
            };
            provisionalRelease(url, params, provisionalReleaseCallback);
        }
        var params = {
            ac_id: data.ac_id,
            t: t,
            ip: data.ip || "",
            type: "sign"
        };
        releaseSign(url, params, releaseCallback);
    }

    /*
     * WeChat
     * Url:
     * params []
     * @callback
     */
    $.WeiXinCall = function (url, data, callback) {
        var t = Date.parse(new Date());
        //options
        var optionsCallback = function (response) {
            if (response.Code == 0) {
                return callback({
                    error: "ok",
                    message: "",
                    wifiConfig: {
                        appid: response.AppID || "",
                        extend: response.Extend || "",
                        timestamp: t,
                        sign: response.Sign || "",
                        shop_id: response.ShopID || "",
                        authUrl: response.AuthUrl || "",
                        mac: data.mac || "",
                        ssid: response.SSID || "",
                        bssid: data.bssid || ""
                    }
                });
            }
            //Process Error Message
            var message = error(response.Code, response.Message, response.error_msg);
            return callback({
                error: "fail",
                message: message
            });
        };
        var os = getOS();
        var params = {
            t: t,
            ac_id: data.ac_id,
            ip: ip,
            bssid: data.bssid,
            mac: data.mac,
            token: data.token,
            os: os.device,
            osName: os.platform,
            ssid: data.ssid,
            type: "options"
        };
        releaseSign(url, params, optionsCallback);
    };

    /*
     * Log
     * Url:/v1/srun_portal_log
     * params [@username]
     * @callback
     */
    function log(data, callback) {
        $.get(autoBuildUrl(url) + "/v1/srun_portal_log", data, callback);
    }

    /*
     * Error Log
     * params [@username]
     */
    $.Log = function (data, callback) {
        log(data, callback);
    }

    /*
     * Detect
     * Url:/v1/srun_portal_detect
     */
    function detect(url, callback) {
        $.get(autoBuildUrl(url) + "/v1/srun_portal_detect" + location.search, callback);
    }

    /*
     * Detect
   	 * @callback
     */
    $.Detect = function (url, callback) {
        detect(url, callback);
    };

    /*
     * GET HMD5 PWD
     */
    function hmd5(url, data, callback) {
        $.get(autoBuildUrl(url) + "/v1/srun_portal_hmd5", data, callback);
    }

    /*
     * Qrcode Auth
     */
    $.Qrcode = function (url, data, callback) {
        var username = data.username;
        var challengeCallback = function (response) {
            if (response.error != "ok") {
                //Process Error Message
                var message = error(response.ecode, response.error);
                return callback({
                    error: "fail",
                    message: message
                });
            }
            var token = response.challenge;
            var hmd5Callback = function (res) {
                if (res.Code != 0) {
                    return callback({
                        error: "fail",
                        message: res.Message.replace(/ /g, "")
                    });
                }
                var hmd5 = res.Password,
                    i = res.Info;
                var chkstr = token + username;
                chkstr += token + hmd5;
                chkstr += token + data.ac_id;
                chkstr += token + (data.ip || response.client_ip);
                chkstr += token + n;
                chkstr += token + type;
                chkstr += token + i;
                var os = getOS();
                var params = {
                    action: "login",
                    username: username,
                    password: "{MD5}" + hmd5,
                    ac_id: data.ac_id,
                    ip: data.ip || response.client_ip,
                    chksum: chksum(chkstr),
                    info: i,
                    n: n,
                    type: type,
                    os: os.device,
                    name: os.platform
                };
                var authCallback = function (resp) {
                    if (resp.error == "ok") {
                        return callback({
                            error: "ok",
                            message: ""
                        });
                    }
                    //Process Error Message
                    var message = error(resp.ecode, resp.error, resp.error_msg);
                    return callback({
                        error: "fail",
                        message: message
                    });
                };
                srunPortal(url, params, authCallback);
            };
            var params = {
                key: data.key,
                token: token,
                ip: data.ip || response.client_ip
            };
            hmd5(url, params, hmd5Callback);
        };
        var params = {
            username: username,
            ip: (data.ip || "")
        };
        getChallenge(url, params, challengeCallback);
    };

    /*
     * CAS
     * Url:/v1/srun_portal_cas
     */
    function cas(url, callback) {
        $.get(autoBuildUrl(url) + "/v1/srun_portal_cas" + url, callback);
    }

    /*
     * CAS Auth
     */
    $.CAS = function (callback) {
        var url = location.search;
        var casCallback = function (response) {
            if (response.Code == 200) {
                return callback({
                    error: "ok",
                    ac_id: response.ID,
                    message: ""
                });
            }
            var message = error(0, response.Message);
            return callback({
                error: "fail",
                code: response.Code,
                redirect: response.Redirect,
                message: message
            });
        };
        cas(url, casCallback)
    };

    /*
     * Language
     */
    $.Language = function (lang) {
        if (typeof(lang) == "undefined") {
            lang = "zh-CN";
        }
        document.cookie = "lang=" + lang;
        location.reload();
    }
}));
