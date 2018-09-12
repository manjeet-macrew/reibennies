'use strict';

var rEIBenniesApp = angular.module("REIBenniesApp", ["ngRoute", "app.config", 'ngCookies','ngAnimate', 'toastr','angular.filter']);

rEIBenniesApp.config(function ($routeProvider, $httpProvider) {

    $routeProvider.
		when('/', {
		    controller: 'loginController',
		    templateUrl: 'views/common/login.html'
		}).
        when('/home', {
            controller: 'homeController',
            templateUrl: 'views/common/home.html',
             resolve: {
                 loggedIn: onlyLoggedIn
             }
        }).
        when('/profile', {
            controller: 'profileController',
            templateUrl: 'views/user/profile.html',
            resolve: {
                loggedIn: onlyLoggedIn
            }
        }).
		otherwise({
		    redirectTo: '/'
		});

    $httpProvider.interceptors.push('httpRequestInterceptor');
});

var onlyLoggedIn = function ($location, $q, loginApi) {
    var isLogin = loginApi.CheckIsLogin();
    var deferred = $q.defer();
    if (isLogin) {
        deferred.resolve();
    } else {
        deferred.reject();
        $location.url('/');
    }
    return deferred.promise;
};

rEIBenniesApp.factory('httpRequestInterceptor', ['$rootScope', '$location', function ($rootScope, $location) {
    return {
        request: function ($config) {
            debugger;
            $('#ajaxSpinnerContainer').show();
            return $config;
        },
        response: function ($config) {
            debugger;
            $('#ajaxSpinnerContainer').hide();
            return $config;
        },
        responseError: function (response) {
            debugger;
            return response;
        }
    };
}]);
