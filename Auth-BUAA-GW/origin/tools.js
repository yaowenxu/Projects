
var config = {
    use: {
        remember: true,
        autoFocus: true,
        keyEnter: true,
        language: false,
        showPass: true,
        forgetUrl: 'http://www.baidu.com',
        copyright: '© Copyright 北京航空航天大学 2019',
        operator: '@cmcc',
        logoLink: 'http://www.buaa.edu.cn',
    },
    loginType: 'click',
};

/**
 *  Portal 功能类
 */
var PortalFunc = function (config) {

    var that = this;
    this.config = config;
    this.IEVersion = getIEVersion();

    /**
     *  设置 cookie
     *  @name       名称
     *  @value      值
     *  @day        存储时间，默认 7 天
     */
    this.setCookie = function (name, value, day) {
        if (day === undefined) day = 7;
        var date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = name + '=' + value + ';expires=' + date;
    };

    /**
     *  获取 cookie
     *  @name       cookie名称
     */
    this.getCookie = function (name) {
        var reg = RegExp(name + '=([^;]+)'),
            arr = document.cookie.match(reg);

        if (arr) {
            return arr[1];
        } else {
            return false;
        }
    };

    /**
     *  删除cookie
     *  @name        cookie的名称
     */
    this.delCookie = function (name) {
        this.setCookie(name, '', -1);
    };

    /**
     *  读取配置
     */
    (function () {

        if (that.config.use.remember) {
            var cookie = {
                user: that.getCookie('user')
            };
            if (cookie.user) {
                $('#username').val(cookie.user);
                $('#remember').get(0).checked = true;
            }
        } else {
            $('.login-form .func .remember').remove();
        }

        if (that.config.use.forgetUrl) {
            $('#forget').click(function () {
                open(that.config.use.forgetUrl)
            });
        } else {
            $('.login-form .func .forget').remove();
        }

        if (that.config.use.copyright) {
            $('#copyright').html(that.config.use.copyright);
        }

        if (that.config.use.operator) {
            var def = that.config.use.operator,
                index = def.indexOf('@');
            if (index === 0) def = def.substring(1, def.length);

            $('#domain option[value$=' + def + ']').attr('selected', 'true');
        }

        if (that.config.use.logoLink) {
            $('#logo').click(function () {
                location.href = that.config.use.logoLink;
            });
        }

        if (that.config.use.keyEnter) {
            $('#password').keydown(function (e) {
                if (e.keyCode === 13) {
                    $('#login').click().addClass('active');
                    setTimeout(function () {
                        $('#login').removeClass('active');
                    }, 100)
                }
            })
        }

        if (that.config.use.autoFocus) {
            $('#username').focus();
        }

        if (that.config.use.language) {

        } else {
            $('header .language').remove();
        }

        if (that.config.use.showPass) {
            $('.login-form .showPass').click(function () {
                var type = $('#password').attr('type');

                if (type === 'password') {
                    type = 'text';
                    $('.login-form .showPass').removeClass('ion-md-eye').addClass('ion-md-eye-off');
                } else {
                    type = 'password';
                    $('.login-form .showPass').removeClass('ion-md-eye-off').addClass('ion-md-eye');
                }

                $('#password').attr('type', type);
            });
        } else {
            $('.login-form .showPass').remove();
        }

        setNoticeHeight();
        changeLoginType(that.config.loginType);
    })();

    /**
     *  获取 IE 版本
     */
    function getIEVersion() {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            // 取得浏览器的userAgent字符串
            var userAgent = navigator.userAgent;
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            return parseFloat(RegExp["$1"]);
        }
    }

    /**
     *  通知模块与登录模块等高
     */
    function setNoticeHeight() {
        var loginHeight = $('.login-container').height();
        $('.notice-container').height(loginHeight - 20);
    }

    /**
     *  切换登录方式
     */
    function changeLoginType(type) {

        var account = '#login-account',
            weChat = '#login-weChat',
            background = '.login-form,.choseType .moveBg';

        bindEvent();

        function bindEvent() {

            $(account).bind({
                'click': function () {
                    accountActive(account);
                },
                'mouseover': function () {
                    accountActive(account);
                }
            });

            $(weChat).bind({
                'click': function () {
                    accountActive(weChat);
                },
                'mouseover': function () {
                    accountActive(weChat);
                }
            });

            type === 'click' ? type = 'mouseover' : type = 'click';

            $('#login-account,#login-weChat').unbind(type);
        }

        function accountActive(target) {
            var bg = $(background);
            removeClass();
            $(target).addClass('active');
            target === '#login-account' ? bg.removeClass('active') : bg.addClass('active');
        }

        function removeClass() {
            $('.login-form .login-way,.choseType .item').removeClass('active');
        }

    }
};

/**
 *  IE 补丁类
 */
var IEPatch = function (config) {

    var that = this;

    this.config = config;

    /**
     *  IE8 垂直居中
     *  @centerType     定位方式
     *  @el             要定位的元素
     */
    this.translatePatch = function () {

        for (var i = 0; i < that.config.translate.length; i++) {
            var list,
                centerType,
                val = that.config.translate[i];

            for (centerType in val) {
                list = val[centerType];
            }

            for (var index = 0; index < list.length; index++) {
                center(list[index], centerType)
            }
        }

        function center(el, centerType) {
            var width = $(el).width(),
                height = $(el).height();

            switch (centerType) {
                case 'x':
                    $(el).css({
                        'margin-left': -width / 2
                    });
                    break;
                case 'y':
                    $(el).css({
                        'margin-top': -height / 2
                    });
                    break;
                case 'xy':
                    $(el).css({
                        'margin-left': -width / 2,
                        'margin-top': -height / 2
                    });
                    break;
            }
        }
    };

    (function () {

        // 添加 iePatch 兼容类 在 iePatch.css 中生效
        $('body').addClass('iePatch');

        // 取消 显示密码功能
        $('.login-form .showPass').remove();

        // 兼容 CSS3 translate 居中
        that.translatePatch();

        // 兼容 IE9 及以下不支持 placeholder
        placeholder();

    })();

    /**
     *  IE8 placeholder
     */
    function placeholder() {

        var userPla = $('#username').attr('placeholder'),
            passPla = $('#password').attr('placeholder');

        $('#username').after('<span class="iePlaceholder">' + userPla + '</span>');
        $('#password').after('<span class="iePlaceholder">' + passPla + '</span>');

        changePla('#username');
        changePla('#password');

        function changePla(el) {
            $(el).focus(function () {
                $(el).next().css('display', 'none');
            });

            $(el).blur(function () {
                var val = $(el).val();
                val = val ? 'none' : 'block';
                $(el).next().css('display', val);
            });
        }
    }
};

(function () {

    var portal = new PortalFunc(config);

    var patch = portal.IEVersion < 9 ? new IEPatch({
        translate: [{
                x: ['header', 'footer']
            },
            {
                y: ['header .language', 'footer .copyright']
            },
            {
                xy: ['header .header-content', '.section-content', '.login-form .qr-code']
            }
        ]
    }) : false;

    $(document).ready(function () {});

    $(window).resize(function () {
        if (patch) patch.translatePatch();
    });

    $('#login').click(function () {

        var remember = document.getElementById('remember');

        if (remember) {
            var login = {
                remember: $('#remember').get(0).checked,
                user: $('#username').val()
            };

            if (portal.config.use.remember) {
                login.remember ? portal.setCookie('user', login.user) : portal.delCookie('user');
            }
        }
    });

})();
