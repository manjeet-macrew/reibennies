'use strict';

rEIBenniesApp.controller("homeController", function ($scope, $rootScope) {
    $rootScope.IsHome = true;
    $rootScope.SelectedPage = "Home";
    $rootScope.CurrentYear = getCurrentYear();
    $rootScope.IsLoginPage = false;
    $rootScope.IsHelp = false;
    
    $rootScope.Greeting = sessionStorage.getItem('FN') + " " + sessionStorage.getItem('LN')

});