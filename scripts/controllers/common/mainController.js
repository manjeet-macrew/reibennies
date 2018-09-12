'use strict';

rEIBenniesApp.controller("mainController", function ($scope, $rootScope) {
    $scope.Logout = function () {
        debugger;
        sessionStorage.clear();
        window.location.href = "#/";
    }
});