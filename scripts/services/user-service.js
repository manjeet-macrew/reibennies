'use strict';

rEIBenniesApp.service('userService', ['$http', 'config', '$location', '$cookieStore', function ($http, config, $location, $cookieStore) {

    this.GetUserProfileInfo = function (id) {
        return $http({
            method: 'GET', url: config.epGetUserProfileInfo + id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.ModifyUserSettingsDemographics = function (payload, id) {
        return $http({
            method: 'POST', url: config.epModifyUserSettingsDemographics + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            },
            data: payload,
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.ModifyUserPassword = function (payload) {
        return $http({
            method: 'POST', url: config.epModifyUserPassword,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            },
            data: payload,
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetUserPassword = function (id) {
        return $http({
            method: 'GET', url: config.epGetUserPassword + id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetStates = function () {
        return $http({
            method: 'GET', url: config.epGetStates,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetSubscriptions = function (id) {
        return $http({
            method: 'GET', url: config.epGetSubscriptions + id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

}]);