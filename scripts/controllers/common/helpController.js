'use strict';

rEIBenniesApp.controller("helpController", function ($scope, $rootScope, commonService, $location, $timeout) {
    $rootScope.IsHelp = true;
    $rootScope.IsLoginPage = true;
    $rootScope.CurrentYear = getCurrentYear();

    $scope.UserData = {};
    $scope.UserData.helpCenterCatId = "0";
    $scope.HelpTopics = [];
    $scope.GetHelpTopics = function () {
        $scope.States = [];
        commonService.GetHelpTopics()
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.HelpTopics = res.data.ResponseData[0].HelpCenterCategoryNameData;
                 } else {
                     JSAlert.alert("Failed to load States");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load States");
             });
    }

    $scope.GetHelpTopics();

    $scope.Submit = function (user) {
        var lastName = $scope.LastName;
        user.Name = user.Name + " " + lastName;
        commonService.SaveConcern(user)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     JSAlert.alert(res.data.Message);
                     $scope.UserData = {};
                     $scope.UserData.helpCenterCatId = "0";
                     $timeout(function () {
                         $location.path("/login");
                     }, 500);
                    
                 } else {
                     JSAlert.alert("Failed to update profile");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to update profile");

             });
    }
});