/**
 * Created by NEVHAV on 11/11/17.
 */
angular.module('JPweb-fe', [
    'oc.lazyLoad',
    'ui.router'
])
    .constant('API_URL_VOCALB', 'http://localhost:8080/JPweb-be/')
    .constant('API_URL_GRAMMAR', 'http://localhost:8080/JPweb-be/')
    .constant('API_URL', '')
    // .constant('API_URL', 'http://localhost:8080/contacts/public/contacts/')
    .factory('Cache', function ($cacheFactory) {
        return $cacheFactory('Cache', {
            capacity: 1
        });
    })
    .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: 'components/main/mainView.html',
                controller: 'mainController',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                files: ['components/main/mainController.js']
                            }
                        )
                    }
                }
            })

            .state('home', {
                url: '/home',
                templateUrl: 'components/home/homeView.html',
                controller: 'homeController',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                files: ['components/home/homeController.js']
                            }
                        )
                    }
                }
            })
    }]);