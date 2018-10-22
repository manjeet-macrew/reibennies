'use strict'

rEIBenniesApp.service('homeService', ['$http', 'config', '$location', '$cookieStore', function ($http, config, $location, $cookieStore) {

    this.GetTotalNoOfBennies = function (id) {
        return $http({
            method: 'GET', url: config.epGetTotalNoOfBennies + id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetTotalNoOfBenniesSignedUpPerMonth = function (id) {
        return $http({
            method: 'GET', url: config.epGetTotalNoOfBenniesSignedUpPerMonth + id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetTotalNoOfSubscriptions = function (id) {
        return $http({
            method: 'GET', url: config.epGetTotalNoOfSubscriptions + id,
            headers: {
                'Content-Type': 'application/x-wwww-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetTotalNoOfHelpRequestPerMonth = function (payload) {
        return $http({
            method: 'GET', url: config.epGetTotalNoOfHelpRequestPerMonth +payload,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetTotalRevenuePerMonth = function (id) {
        return $http({
            method: 'GET', url: config.epGetTotalRevenuePerMonth + id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    }

    this.GetTotalNoOfBenniesRankings = function (id) {
        return $http({
            method: 'GET', url: config.epGetTotalNoOfBenniesRankings + id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    }

    this.GetTotalNoOfBenniesSignedUpPerState = function (id) {
        return $http({
            method: 'GET', url: config.epGetTotalNoOfBenniesSignedUpPerState + id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    }

    this.GetTotalRevenuePerYear = function (id) {
        return $http({
            method: 'GET', url: config.epGetTotalRevenuePerYear + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    }

    this.GetAllCalendarItems = function () {
        return $http({
            method: 'GET', url: config.epGetAllCalendarItems,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    }

}]);