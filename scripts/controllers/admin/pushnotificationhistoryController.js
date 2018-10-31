'use strict';

rEIBenniesApp.controller("pushnotificationhistoryController", function ($scope, $rootScope, DTColumnDefBuilder, helpSupportService, userService, $filter) {
    $rootScope.IsPushNotificationHistory = true;
    $rootScope.SelectedPage = "PushNotificationHistory";
    $rootScope.CurrentYear = getCurrentYear();

    $scope.dtColumnDefs = [
     DTColumnDefBuilder.newColumnDef(0).notSortable()
    ];

    $scope.NotificationHistory = [];
    $scope.GetAllFcmPushNotifications = function () {
        var userId = sessionStorage.getItem('UID');
        $scope.NotificationHistory = [];
        userService.GetAllFcmPushNotifications(userId)
             .then(function (res) {
                 debugger;
                 if (res.data.ResponseCode == 200) {
                     debugger;
                     if (res.data.ResponseData[0] != null)
                         $scope.NotificationHistory = res.data.ResponseData[0].FcmNotificationsInfoData;
                 } else {
                     JSAlert.alert("Failed to load notification history");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load notification history");
             });
    }

    $scope.GetAllFcmPushNotifications();
});

