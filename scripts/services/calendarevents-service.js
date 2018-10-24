'use strict';

rEIBenniesApp.service('calendareventsService', ['$http', 'config', '$location', '$cookieStore', function ($http,config,$location,$cookieStore) {

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