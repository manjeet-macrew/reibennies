'use strict';

rEIBenniesApp.controller("accountactivationController", function ($scope, $rootScope, accountactivationService, $location, $timeout,$window) {
    $scope.IsView = true;
    $scope.UserData = {};
    var obj = $location.search();
    $scope.UserId = obj.userId;
    $scope.RoleCount = 0;
    $scope.NoRecord = true;
    $scope.IsActivation = false;
    $scope.IsPreviouslyActivated=true;
    $scope.GetUserActivationInfo = function () {

        $scope.UserData = {};
        var userId = $scope.UserId;
        accountactivationService.GetUserActivationInfo(userId)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     $scope.IsActivation=false;
                     if (res.data.ResponseData[0] != null)
                     {
                         $scope.NoRecord = false;
                         $scope.UserData = res.data.ResponseData[0].UserSignUpInfoData[0];
                         $scope.RoleCount = $scope.UserData.userRole.length;
                         $scope.UserRole = $scope.UserData.userRole[0];
                     }
                     else
                     {
                         $scope.NoRecord = true;
                         //JSAlert.alert("No record");
                         $('#ajaxSpinnerContainer').hide();
                     }
                        
                 } else {
                     JSAlert.alert("Failed to Load Activation data");
                     $('#ajaxSpinnerContainer').hide();
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load Activation data");
             });
    }

    $scope.CreateUserActivationSubscription = function () {
        var userId = $scope.UserId;
        accountactivationService.CreateUserActivationSubscription(userId)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     $scope.payPalurl = res.data.ResponseData[0];
                   //  window.location.href=$scope.payPalurl;
                     var payPalRedirect = window.open($scope.payPalurl, '_blank');
                     if(payPalRedirect==null)
                     {
                         JSAlert.confirm("Browser has blocked the redirection to PayPal Url.If you want to complete your activation request Please click Ok?").then(function (result) {
                             // Check if pressed yes
                             if (result)
                                 window.open($scope.payPalurl, '_blank');
                         });
                     }
                 } else {
                     $('#ajaxSpinnerContainer').hide();
                     JSAlert.alert("Failed to load Activation data");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to Activate User");
             });
    }

    $scope.ActivateUserAccount = function () {
        var userId = $scope.UserId;
       
        var password = $('#password').val();
        $scope.UserInfo = {
            userId: userId,
            password: password
        };
        var userId = $scope.UserId;
        accountactivationService.ActivateUserAccount($scope.UserInfo)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if ($scope.RoleCount == 1 && $scope.UserRole == "2") {
                         $scope.CreateUserActivationSubscription();
                         $scope.GetUserActivationInfo();
                         $scope.IsActivation = false;
                     }
                     else
                     {
                         $scope.GetUserActivationInfo();
                         $scope.IsActivation = false;
                     }
                     $scope.IsPreviouslyActivated = false;
                 } else {
                     $('#ajaxSpinnerContainer').hide();
                     JSAlert.alert("Failed to load Activation data");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to Activate User");
             });
    }

    $scope.ActivationReq=function(){
        $scope.IsActivation = true;
    }
    $scope.SubmitActivationReq=function()
    {
       
        $scope.ActivateUserAccount();
    }
    $scope.Cancel = function () {
        $scope.IsActivation = false;
    }
    $scope.GetUserActivationInfo();
});