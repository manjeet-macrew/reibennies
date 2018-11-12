'use strict';

rEIBenniesApp.service('promoCodeService', ['$http', 'config', '$location', '$cookieStore', function ($http, config, $location, $cookieStore)
{
    this.GeneratePromoCode = function (id) {
        return $http({
            method: 'GET', url: config.epGeneratePromoCode + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.DeletePromoCode = function (id) {
        return $http({
            method: 'POST', url: config.epDeletePromoCode + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.CreatePromoCode = function (payload) {
        return $http({
            method: 'POST', url: config.epCreatePromoCode ,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            },
            data: payload
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.UpdatePromoCode = function (payload) {
        return $http({
            method: 'POST', url: config.epUpdatePromoCode,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            },
            data: payload
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetAllPromoCodes = function (param) {
        return $http({
            method: 'GET', url: config.epGetAllPromoCodes + param,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };
}])