/**
 * Created by leo.liu on 2016/4/8.
 */
'use strict';

var app =
    angular.module("app", [
        'ui.router',
        'oc.lazyLoad',
        'angularFileUpload',
        'ngAnimate',
        'ui.validate'
    ])
        .config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
            function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
                app.controller = $controllerProvider.register;
                app.directive = $compileProvider.directive;
                app.filter = $filterProvider.register;
                app.factory = $provide.factory;
                app.service = $provide.service;
                app.constant = $provide.constant;
                app.value = $provide.value;
            }
        ])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('responseRejector');
            //$httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
        }]);