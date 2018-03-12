$(document).ready(function () {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == 'ipad';
    var bIsIphone = sUserAgent.match(/iphone os/i) == 'iphone os';
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var currentLang = navigator.language || navigator.browserLanguage;

    var video = $('#video');
    video.height(Math.floor(video.width()/856*480));

    $('#cloudService').click(function () {
        location.href = 'http://payment.newooeyes.com/h5/devices.html?lang=' + currentLang;
    });

    if (bIsIpad || bIsIphone) {
        $('#newooeyesApp').click(function () {
            location.href = 'https://itunes.apple.com/app/id1100090322?mt=8';
        });
    } else if (bIsAndroid) {
        $('#newooeyesApp').click(function () {
            location.href = 'http://www.newooeyes.com/newooeyes.apk';
        });
    }
});