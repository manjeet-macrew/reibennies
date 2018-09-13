'use strict';

rEIBenniesApp.controller("profileController", function ($scope, $rootScope, userService) {
    $scope.IsView = true;
    $scope.UserData = {};
    $scope.GetProfileInfo = function () {
        var userId = sessionStorage.getItem('UID')
        userService.GetUserProfileInfo(userId)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.UserData = res.data.ResponseData[0].UserProfileInfoData[0];
                 } else {
                     JSAlert.alert("Failed to load profile data");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load profile data");
             });
    }

    $scope.GetProfileInfo();


    $scope.GetOldPassword = function () {
        var userId = sessionStorage.getItem('UID')
        userService.GetUserPassword(userId)
             .then(function (res) {
                 debugger;
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.UserOldPassword = res.data.ResponseData[0].UserPasswordInfoData[0].Password;
                 } else {
                     JSAlert.alert("Failed to load Old Password");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load Old Password");
             });
    }

    $scope.UpdateProfile = function () {
        $scope.IsView = false;
    }
    $scope.Cancel = function () {
        $scope.IsView = true;
    }
 
    $scope.Submit = function (userData) {
        debugger;
        var userId = sessionStorage.getItem('UID')
        userService.ModifyUserSettingsDemographics(userData, userId)
             .then(function (res) {
                 debugger;
                 if (res.data.ResponseCode == 200) {
                     JSAlert.alert(res.data.Message);
                     $scope.IsView = true;
                 } else {
                     JSAlert.alert("Failed to load profile data");
                 }
             }).catch(function (ex) {
                 debugger;
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load profile data");

             });
    }

    $scope.ShowTab = function (id) {
        $('.tab-pane.fade.in.active').removeClass('in active');
        $(id).addClass('in active');

        if (id == '#changePassword')
            $scope.GetOldPassword();

        if (id == '#fullDemographics')
            $scope.GetStates();
        if (id == '#subscription')
            $scope.GetSubscriptions();
    }

    $scope.ComfirmPassword = "";
    $scope.Password = "";

  
    $scope.SubmitPassword = function () {
        debugger;
        var userId = sessionStorage.getItem('UID')
        if ($scope.UserOldPassword != $scope.ComfirmPassword)
            JSAlert.alert("Old Password does not match");
        else {
            userService.ModifyUserPassword({ userId: userId, Password: $scope.Password })
                 .then(function (res) {
                     debugger;
                     if (res.data.ResponseCode == 200) {
                         JSAlert.alert(res.data.Message);
                         $scope.UserOldPassword = $scope.Password;
                     } else {
                         JSAlert.alert("Failed to load profile data");
                     }
                 }).catch(function (ex) {
                     debugger;
                     $('#ajaxSpinnerContainer').hide();
                     JSAlert.alert("Failed to load profile data");

                 });
        }
    }
    $scope.States=[];
    $scope.GetStates = function () {
        userService.GetStates()
             .then(function (res) {
                 debugger;
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.States = res.data.ResponseData[0].ActiveStateInfoData;
                 } else {
                     JSAlert.alert("Failed to load Old Password");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load Old Password");
             });
    }

    $scope.ActiveSubscription = {};
    $scope.GetSubscriptions = function () {
        var userId = sessionStorage.getItem('UID')
        userService.GetSubscriptions(userId)
             .then(function (res) {
                 debugger;
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.ActiveSubscription = res.data.ResponseData[0].ActiveSubscriptionInfoData[0];
                 } else {
                     JSAlert.alert("Failed to load Old Password");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load Old Password");
             });
    }

});