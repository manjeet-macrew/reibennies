'use strict';

rEIBenniesApp.service('accountactivationService', ['$http', 'config', '$location', '$cookieStore', function ($http, config, $location, $cookieStore) {

    this.GetUserActivationInfo = function (userId) {
        return $http({
            method: 'GET', url: config.epGetUserActivationInfo + userId,
            headers: {
                'Content-Type': 'application/json'
               
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    }

    this.CreateUserActivationSubscription = function (userId) {
        return $http({
            method: 'POST', url: config.epCreateUserActivationSubscription + userId,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    }

    this.ActivateUserAccount = function (payLoad) {
        return $http({
            method: 'POST', url: config.epActivateUserAccount,
            data: payLoad,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    }
    
    
}]);