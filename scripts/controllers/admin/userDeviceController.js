'use strict';

rEIBenniesApp.controller("userDevicesController", function ($scope, $rootScope, DTColumnDefBuilder, rankService, userService, roleService, $filter){
    $rootScope.IsUserDevices = true;
    $rootScope.SelectedPage = "UsersDevice";
    $scope.IsList = true;
    $rootScope.CurrentYear = getCurrentYear();
   
    $scope.dtColumnDefs = [
     DTColumnDefBuilder.newColumnDef(0).notSortable()
    ];

   
    $scope.UserDeviceData = [];
    $scope.GetAllUsersDevice = function () {

        $scope.UserDeviceData = [];
        var userId = sessionStorage.getItem('UID')
        userService.GetAllUsersDevice()
             .then(function (res) {

                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.UserDeviceData = res.data.ResponseData[0].UserDevicesInfoData;
                 } else {
                     JSAlert.alert("Failed to load users data");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load users data");
             });

    }

    $scope.GetAllUsersDevice();
   
});