'use strict';

rEIBenniesApp.controller("profileController", function ($scope, $rootScope, userService) {
    debugger;
    $scope.IsView = true;
    $scope.UserData = {};
    $scope.GetProfileInfo = function () {
        debugger;
        var userId = sessionStorage.getItem('UID')
        userService.GetUserProfileInfo(userId)
             .then(function (res) {
                 debugger;
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.UserData = res.data.ResponseData[0].UserProfileInfoData[0];
                 } else {
                     JSAlert.alert("Failed to load profile data");
                 }
             }).catch(function (ex) {
                 debugger;
                 toastr.error('Something went wrong.', 'Error');
             });
    }

    $scope.GetProfileInfo();

    $scope.UpdateProfile = function () {
        $scope.IsView = false;
    }
    $scope.Cancel = function () {
        $scope.IsView = true;
    }
    $scope.Submit = function () {
        debugger;
    }

});