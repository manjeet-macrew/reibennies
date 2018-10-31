'use strict'

rEIBenniesApp.service('reportsService', ['$http', 'config', '$location', '$cookieStore', function ($http, config, $location, $cookieStore) {

    this.GetTotalNoOfBenniesSignedUpPerMonthByYear = function (param) {
        return $http({
            method: 'GET', url: config.epGetTotalNoOfBenniesSignedUpPerMonthByYear + param,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetTotalNoOfSubscriptionsByYear = function (param) {
        return $http({
            method: 'GET', url: config.epGetTotalNoOfSubscriptionsByYear + param,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetTotalNoofBenniesSignedUpPerStateByYear = function (param) {
        return $http({
            method: 'GET', url: config.epGetTotalNoofBenniesSignedUpPerStateByYear + param,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetTotalRevenuePerMonthByYear = function (param) {
        return $http({
            method: 'GET', url: config.epGetTotalRevenuePerMonthByYear + param,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetTotalNoOfHelpRequestPerMonthByYear = function (param) {
        return $http({
            method: 'GET', url: config.epGetTotalNoOfHelpRequestPerMonthByYear + param,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetTotalNoOfBenniesSignedUpPerMonthByYearMonth = function (param) {
        return $http({
            method: 'GET', url: config.epGetTotalNoOfBenniesSignedUpPerMonthByYearMonth + param,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetTotalNoOfSubscriptionsByYearMonth = function (param) {
        return $http({
            method: 'GET', url: config.epGetTotalNoOfSubscriptionsByYearMonth + param,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetTotalNoOfBenniesSignedupPerStateByYearMonth = function (param) {
        return $http({
            method: 'GET', url: config.epGetTotalNoOfBenniesSignedupPerStateByYearMonth + param,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetTotalNoOfHelpRequestPerMonthByYearMonth = function (param) {
        return $http({
            method: 'GET', url: config.epGetTotalNoOfHelpRequestPerMonthByYearMonth + param,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetTotalRevenuePerMonthByYearMonth = function (param) {
        return $http({
            method: 'GET', url: config.epGetTotalRevenuePerMonthByYearMonth + param,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    
    
}]);