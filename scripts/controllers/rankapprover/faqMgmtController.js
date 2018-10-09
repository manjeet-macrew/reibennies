'use strict';

rEIBenniesApp.controller("faqMgmtController", function ($scope, $rootScope, rankService, userService) {
    $rootScope.IsFAQMgmt = true;
    $rootScope.SelectedPage = "FAQMgmt";
    $scope.IsList = true;
    $rootScope.CurrentYear = getCurrentYear();
   
   
});