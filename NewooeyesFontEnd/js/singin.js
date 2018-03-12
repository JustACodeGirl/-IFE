(function ($) {
    var serverUrl = "/ovaftersaleend";
    if (document.cookie.indexOf('access_token') >= 0) {
        $.ajax({
            type: 'GET',
            url: serverUrl + "/user/current?_" + new Date().getTime(),
            success: function (response) {
                if (response.stateCode && /success/.test(response.stateCode)) {
                    $('#signBtn').text('退出');
                    $('#signName').text(response.data ? response.data.userName : "");
                }
            }
        });
    }

    $('#signBtn').click(function () {
        if ($('#signBtn').text() == '登录') {
            window.location.href = "/login.html";
        } else if ($('#signBtn').text() == '退出') {
            $.ajax({
                type: 'POST',
                url: serverUrl + "/user/logout?_" + new Date().getTime(),
                success: function (response) {
                    if (response.stateCode && /success/.test(response.stateCode)) {
                        window.location.reload();
                    }
                }
            });
        }

    });

    var jumpTo = GetQueryString('jumpTo');
    $('form[name="signin"]').submit(function () {
        $.ajax({
            type: 'POST',
            url: serverUrl + "/user/login?_" + new Date().getTime(),
            data: {
                userName: "+86" + $('#userName').val(),
                password: $('#password').val()
            },
            success: function (response) {
                if (response.stateCode && /success/.test(response.stateCode)) {
                    if(jumpTo && jumpTo == 'cs'){
                        return window.location.href="http://payment.newooeyes.com/web" +
                            "?token="+Cookie.get('access_token');
                    }
                    location.replace(document.referrer);
                } else if (/InvalidUserOrPassword/.test(response.stateCode)) {
                    toast('error', '', '用户名或密码错误', null);
                }
            }
        });
        return false;
    });

    $('#cloudService').on('click', function () {
        $.ajax({
            type: 'GET',
            url: serverUrl + "/user/current?_" + new Date().getTime(),
            success: function (response) {
                if (response.stateCode && /success/.test(response.stateCode)) {
                    window.location.href="http://payment.newooeyes.com/web" +
                        "?token="+Cookie.get('access_token');
                } else {
                    window.location.href = '/login.html?jumpTo=' + 'cs';
                }
            }
        });
    });

    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return r[2];
        } else {
            return 0;
        }
    }


    var Cookie = {
        get: function (name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        },
        set: function (name, value) {
            document.cookie = name + "=" + escape(value);
        }
    };

})(jQuery);
