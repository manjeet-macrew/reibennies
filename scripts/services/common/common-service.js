'use strict';

rEIBenniesApp.service('commonService', ['$http', 'config', '$location', '$cookieStore', function ($http, config, $location, $cookieStore) {

    this.GetHelpTopics = function () {
        return $http({
            method: 'GET', url: config.epGetHelpTopics,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.SaveConcern = function (payload) {
        return $http({
            method: 'POST', url: config.epSaveConcern,
            headers: {
                'Content-Type': 'application/json'
            },
            data: payload,
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

}]);