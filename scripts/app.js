﻿'use strict';

var rEIBenniesApp = angular.module("REIBenniesApp", ["ngRoute", "app.config", 'ngCookies', 'ngAnimate', 'toastr', 'angular.filter', 'datatables', 'checklist-model', "chart.js", "angular-clipboard"]);

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
        when('/support', {
            controller: 'supportController',
            templateUrl: 'views/support/support.html',
             resolve: {
                 loggedIn: onlyLoggedIn,
                 forceSSL: onlySSL
             }
         }).
         when('/rankapprover', {
             controller: 'rankapproverController',
             templateUrl: 'views/rankapprover/rankapprover.html',
             resolve: {
                 loggedIn: onlyLoggedIn,
                 forceSSL: onlySSL
             }
         }).
        when('/users', {
            controller: 'usersController',
            templateUrl: 'views/admin/users.html',
            resolve: {
                loggedIn: onlyLoggedIn,
                forceSSL: onlySSL
            }
        }).
        when('/roles', {
            controller: 'rolesController',
            templateUrl: 'views/admin/roles.html',
            resolve: {
                loggedIn: onlyLoggedIn,
                forceSSL: onlySSL
            }
        }).
        when('/subscriptionmgmt', {
            controller: 'subscriptionMgmtController',
            templateUrl: 'views/staff/subscriptionMgmt.html',
            resolve: {
                loggedIn: onlyLoggedIn,
                forceSSL: onlySSL
            }
        }).
        when('/useractivity', {
            controller: 'useractivityController',
            templateUrl: 'views/admin/useractivity.html',
            resolve: {
                loggedIn: onlyLoggedIn,
                forceSSL: onlySSL
            }
        }).
        when('/faqmgmt', {
            controller: 'faqMgmtController',
            templateUrl: 'views/rankapprover/faqMgmt.html',
            resolve: {
                loggedIn: onlyLoggedIn,
                forceSSL: onlySSL
            }
        }).
         when('/calendarevents', {
             controller: 'calendareventsController',
             templateUrl: 'views/admin/calendarevents.html',
             resolve: {
                 loggedIn: onlyLoggedIn,
                 forceSSL: onlySSL
             }
         }).
         when('/yearlyreports', {
             controller: 'yearlyReportsController',
             templateUrl: 'views/reports/yearlyReports.html',
             resolve: {
                 loggedIn: onlyLoggedIn,
                 forceSSL: onlySSL
             }
         }).
        when('/monthlyreports', {
            controller: 'monthlyReportsController',
            templateUrl: 'views/reports/monthlyReports.html',
            resolve: {
                loggedIn: onlyLoggedIn,
                forceSSL: onlySSL
            }
        }).
         when('/pushnotificationhistory', {
             controller: 'pushnotificationhistoryController',
             templateUrl: 'views/admin/pushnotificationhistory.html',
             resolve: {
                 loggedIn: onlyLoggedIn,
                 forceSSL: onlySSL
             }
         }).
         when('/marketplaces', {
             controller: 'marketplacesController',
             templateUrl: 'views/admin/marketplaces.html',
             resolve: {
                 loggedIn: onlyLoggedIn,
                 forceSSL: onlySSL
             }
         }).
         when('/promocodes', {
             controller: 'promocodeController',
             templateUrl: 'views/admin/promocodes.html',
             resolve: {
                 loggedIn: onlyLoggedIn,
                 forceSSL: onlySSL
             }
         }).
    when('/accountactivation', {
        controller: 'accountactivationController',
        templateUrl: 'views/admin/accountactivation.html',
        resolve: {
            loggedIn: AccountActivation,
            forceSSL: onlySSL
        }
    }).
    when('/proExpertise', {
        controller: 'proExpertiseController',
        templateUrl: 'views/admin/proexpertise.html',
        resolve: {
            loggedIn: AccountActivation,
            forceSSL: onlySSL
        }
    }).
     when('/userDevices', {
         controller: 'userDevicesController',
         templateUrl: 'views/admin/userdevice.html',
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
      // $window.location.href = $location.absUrl().replace('http', 'https');
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

var AccountActivation= function ($location, $q, loginApi) {
    var deferred = $q.defer();
        deferred.resolve();
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
