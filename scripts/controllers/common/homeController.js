'use strict';

rEIBenniesApp.controller("homeController", function ($scope, $rootScope) {
    $rootScope.CurrentYear = getCurrentYear();
    $rootScope.IsLoginPage = false;
    $rootScope.Greeting = sessionStorage.getItem('FN') + " " + sessionStorage.getItem('LN')
});