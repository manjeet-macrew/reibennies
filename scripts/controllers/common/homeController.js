'use strict';

rEIBenniesApp.controller("homeController", function ($scope) {
    //if (sessionStorage.getItem('AT') === "" || sessionStorage.getItem('AT') === null) {
    //    window.location.href = "index.html";
    //}

    $("#greeting").html(sessionStorage.getItem('FN') + " " + sessionStorage.getItem('LN'));

    //set current year
    $("#currentYear").html(getCurrentYear());
});