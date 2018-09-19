﻿'use strict';

var rEIBenniesApp = angular.module("REIBenniesApp", ["ngRoute", "app.config", 'ngCookies', 'ngAnimate', 'toastr', 'angular.filter']);

rEIBenniesApp.config(function ($routeProvider, $httpProvider) {

    $routeProvider.
		when('/', {
		    controller: 'loginController',
		    templateUrl: 'views/common/login.html',
		    resolve: {
		        forceSSL: onlySSL
		    }
		}).
        when('/home', {
            controller: 'homeController',
            templateUrl: 'views/common/home.html',
            resolve: {
                loggedIn: onlyLoggedIn,
                forceSSL: onlySSL
            }
        }).
        when('/profile', {
            controller: 'profileController',
            templateUrl: 'views/user/profile.html',
            resolve: {
                loggedIn: onlyLoggedIn,
                forceSSL: onlySSL
            }
        }).
        when('/help', {
            controller: 'helpController',
            templateUrl: 'views/common/help.html',
            resolve: {
                forceSSL: onlySSL
            }
        }).
         when('/rank', {
             controller: 'rankController',
             templateUrl: 'views/user/rank.html',
             resolve: {
                 loggedIn: onlyLoggedIn,
                 forceSSL: onlySSL
             }
         }).
		otherwise({
		    redirectTo: '/'
		});

    $httpProvider.interceptors.push('httpRequestInterceptor');
});

var onlySSL = function ($location, $q, $window) {
    if ($location.protocol() !== 'https') {
        //alert("Need SSL");
        //$window.location.href = $location.absUrl().replace('http', 'https');
    }
    var deferred = $q.defer();
    deferred.resolve();
    return deferred.promise;
};

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
            $('#ajaxSpinnerContainer').show();
            return $config;
        },
        response: function ($config) {
            $('#ajaxSpinnerContainer').hide();
            return $config;
        },
        responseError: function (response) {
            return response;
        }
    };
}]);
