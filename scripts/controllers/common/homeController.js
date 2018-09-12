'use strict';

rEIBenniesApp.controller("homeController", function ($scope, $rootScope) {
    $rootScope.IsLoginPage = false;
    $("#greeting").html(sessionStorage.getItem('FN') + " " + sessionStorage.getItem('LN'));

    //set current year
    $("#currentYear").html(getCurrentYear());

});