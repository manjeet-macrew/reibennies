'use strict';

rEIBenniesApp.service('roleService', ['$http', 'config', '$location', '$cookieStore', function ($http, config, $location, $cookieStore) {

    this.GetAllRoles = function () {
        return $http({
            method: 'GET', url: config.epGetAllRoles,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.CreateRole = function (payload) {
        return $http({
            method: 'POST', url: config.epCreateRole,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            },
            data: payload,
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };
    this.UpdateRole = function (payload) {
        return $http({
            method: 'POST', url: config.epUpdateRole,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            },
            data: payload,
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };
    this.DeleteRole = function (payload) {
        return $http({
            method: 'POST', url: config.epDeleteRole + "?roleId=" + payload,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            },
            data: payload,
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };


}]);