'use strict';

rEIBenniesApp.service('subscriptionMgmtService', ['$http', 'config', '$location', '$cookieStore', function ($http, config, $location, $cookieStore) {
    this.GetAllActiveUsersByRoleId = function (payload) {
        return $http({
            method: 'GET', url: config.epGetAllActiveUsersByRoleId +  payload,
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