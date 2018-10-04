'use strict';

rEIBenniesApp.service('rankService', ['$http', 'config', '$location', '$cookieStore', function ($http, config, $location, $cookieStore) {

    this.GetAllActiveUsers = function (id) {
        return $http({
            method: 'GET', url: config.epGetAllActiveUsers + id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetAllRankedUnrankedUserRequests = function (isRanked) {
        return $http({
            method: 'GET', url: config.epGetAllRankedUnrankedUserRequests + "?isRanked=" + isRanked,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.SearchForUser = function (payload) {
        return $http({
            method: 'GET', url: config.epSearchForUser + payload,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            },
            data: payload,
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.ViewAUser = function (param) {
        return $http({
            method: 'GET', url: config.epViewAUser + param,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };


    this.SaveUserRank = function (payload) {
        return $http({
            method: 'POST', url: config.epSaveUserRank,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            },
            data: payload,
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetAllUserRankRequests = function () {
        return $http({
            method: 'GET', url: config.epGetAllUserRankRequests,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.ApproveDenyUserRank = function (payload) {
        return $http({
            method: 'POST', url: config.epApproveDenyUserRank,
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