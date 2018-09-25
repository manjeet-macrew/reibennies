'use strict';

rEIBenniesApp.controller("subscriptionMgmtController", function ($scope, $rootScope, DTColumnDefBuilder,rankService, helpSupportService, userService, $filter) {
    $rootScope.IsSubscriptionMgmt = true;
    $rootScope.SelectedPage = "SubscriptionMgmt";
    $scope.IsList = true;
    $rootScope.CurrentYear = getCurrentYear();

    $scope.dtColumnDefs = [
     DTColumnDefBuilder.newColumnDef(0).notSortable()
    ];

    $scope.UserData = [];
    $scope.GetAllActiveUsers = function () {
        $scope.UserData = [];
        var userId = sessionStorage.getItem('UID')
        rankService.GetAllActiveUsers(userId)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.UserData = res.data.ResponseData[0].ActiveUsersInfoData;
                 } else {
                     JSAlert.alert("Failed to load users data");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load users data");
             });
    }

    $scope.GetAllActiveUsers();

    $scope.OpenModel = function (req) {
        $scope.GetProfileInfo(req);
    };

    $scope.ActiveSubscription = {};
    $scope.GetProfileInfo = function (req) {
        $scope.ActiveSubscription = {};
        var userId = req.userId;
        userService.GetUserProfileInfo(userId)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.ActiveSubscription = res.data.ResponseData[0].UserProfileInfoData[0];
                 } else {
                     JSAlert.alert("Failed to load profile data");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load profile data");
             });
    }

});

