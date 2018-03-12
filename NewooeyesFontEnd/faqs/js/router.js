/**
 * Created by leo.liu on 2016/4/8.
 */
'use strict';

angular.module('app')
    .run(['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
)
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .otherwise('/question');
            $stateProvider
              .state('faq_question', {
                    url: '/question',
                    templateUrl: 'html/faq_question.html'
                })
                .state('faq_video', {
                    url: '/video',
                    templateUrl: 'html/faq_video.html'
                })
                .state('consult', {
                    abstract: true,
                    url: '/consult',
                    template: '<div ui-view></div>',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('js/controllers/consultCtrl.js');
                            }]
                    }
                })
                .state('consult.list', {
                    url: '/list',
                    templateUrl: 'html/consult.html'

                })
                .state('consult.new', {
                    url: '/new',
                    templateUrl: 'html/consult_new.html'
                })
                .state('consult.view', {
                    url: '/{id}',
                    templateUrl: 'html/consult_detail.html'
                })
                .state('service', {
                    abstract: true,
                    url: '/service',
                    template: '<div ui-view></div>'
                })
                .state('service.self', {
                    url: '/self',
                    params: {data: null},
                    templateUrl: 'html/service_self.html',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('js/controllers/selfService.js');
                            }]
                    }
                })
                .state('aftersale', {
                    abstract: true,
                    url: '/aftersale',
                    template: '<div ui-view></div>',
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('js/controllers/afterSaleCtrl.js');
                            }]
                    }
                })
                .state('aftersale.list', {
                    url: '/list',
                    templateUrl: 'html/aftersale.html'
                })
                .state('aftersale.new', {
                    url: '/new',
                    templateUrl: 'html/aftersale_new.html'
                })
                .state('aftersale.detail', {
                    url: '/detail',
                    params: {data:null},
                    templateUrl: 'html/aftersale_detail.html'
                })
                .state('contactus', {
                    url: '/contactus',
                    templateUrl: 'html/contact_us.html'
                })
        }
    ]
);