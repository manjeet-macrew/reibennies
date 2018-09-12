'use strict';

rEIBenniesApp.service('loginApi', ['$http', 'config', '$location', '$cookieStore', function ($http, config, $location, $cookieStore) {
    this.CheckIsLogin = function () {
        if (sessionStorage.getItem('AT') === "" || sessionStorage.getItem('AT') === null)
            return false;
        else
            return true;
    };

    this.Login = function (data) {
        return $http({
            method: 'POST', url: config.epLoginToken,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', },
            data: data,
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

}]);