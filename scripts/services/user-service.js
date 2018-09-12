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

}]);