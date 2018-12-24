'use strict';

rEIBenniesApp.service('proExpertiseService', ['$http', 'config', '$location', '$cookieStore', function ($http, config, $location, $cookieStore) {

    this.GetAllProfessionalExpertise = function () {
        return $http({
            method: 'GET', url: config.epGetAllProfessionalExpertise,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.CreateProfessionalExpertise = function (payload) {
        return $http({
            method: 'POST', url: config.epCreateProfessionalExpertise,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            },
            data: payload,
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };
    this.UpdateProfessionalExpertise = function (payload) {
        return $http({
            method: 'POST', url: config.epUpdateProfessionalExpertise,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            },
            data: payload,
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };
    this.DeleteProfessionalExpertise = function (payload) {
        return $http({
            method: 'POST', url: config.epDeleteProfessionalExpertise + payload,
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