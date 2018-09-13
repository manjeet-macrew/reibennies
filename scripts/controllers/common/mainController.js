'use strict';

rEIBenniesApp.controller("mainController", function ($scope, $rootScope) {
    $rootScope.CurrentYear = getCurrentYear();
    $scope.Logout = function () {
        sessionStorage.clear();
        window.location.href = "#/";
    }
});