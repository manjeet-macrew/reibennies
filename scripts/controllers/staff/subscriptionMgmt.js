'use strict';

rEIBenniesApp.controller("subscriptionMgmtController", function ($scope, $rootScope, DTColumnDefBuilder,rankService, helpSupportService, userService,subscriptionMgmtService, $filter) {
    $rootScope.IsSubscriptionMgmt = true;
    $rootScope.SelectedPage = "SubscriptionMgmt";
    $scope.IsList = true;
    $rootScope.CurrentYear = getCurrentYear();

    $scope.disBtnStop = true;
    $scope.userId = 0;

    $scope.dtColumnDefs = [
     DTColumnDefBuilder.newColumnDef(0).notSortable()
    ];

    $scope.UserData = [];
    $scope.GetAllActiveUsersByRoleId = function () {
        $scope.UserData = [];
        var userId = sessionStorage.getItem('UID');
        var roleId = 2;
        $scope.Data = {
            userId: userId,
            roleId: roleId
        };
        var queryString = $.param($scope.Data);
        subscriptionMgmtService.GetAllActiveUsersByRoleId(queryString)
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

    $scope.GetAllActiveUsersByRoleId();

    $scope.OpenModel = function (req) {
        $scope.GetProfileInfo(req);
    };

    $scope.ActiveSubscription = {};
    $scope.GetProfileInfo = function (req) {
        $scope.ActiveSubscription = {};

        var userId = req.userId;
        $scope.userId = userId;
        userService.GetUserProfileInfo(userId)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.ActiveSubscription = res.data.ResponseData[0].UserProfileInfoData[0];

                     if (res.data.ResponseData[0].UserProfileInfoData[0].subscriptionId != null) {
                         $scope.disBtnStop = false;
                     }
                     else
                     {
                         $scope.disBtnStop = true;
                     }
                 } else {
                     JSAlert.alert("Failed to load profile data");
                     $scope.disBtnStop = true;
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load profile data");
             });
    }

    $scope.CancelSubscription = function () {
        var userId = $scope.userId;
        userService.CancelSubscription(userId)
            .then(function (res) {
                if (res.data.ResponseCode == 200) {
                    $scope.disBtnStop = true;
                    JSAlert.alert("Subscription Canceled Successfully");
                    $('#myModal').modal('hide');
                    $scope.GetAllActiveUsersByRoleId();
                } else {
                    JSAlert.alert("Failed to Cancel Subscription");
                }
            }).catch(function (ex) {
                $('#ajaxSpinnerContainer').hide();
                JSAlert.alert("Failed to Cancel Subscription");

            });
    }
});

