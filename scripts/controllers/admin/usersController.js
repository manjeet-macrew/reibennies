'use strict';

rEIBenniesApp.controller("usersController", function ($scope, $rootScope, DTColumnDefBuilder, rankService, userService, $filter) {
    $rootScope.IsUsers = true;
    $rootScope.SelectedPage = "Users";
    $scope.IsList = true;
    $rootScope.CurrentYear = getCurrentYear();

    $scope.dtColumnDefs = [
     DTColumnDefBuilder.newColumnDef(0).notSortable()
    ];

    $scope.UserData = [];
    $scope.GetAllUsers = function () {
        debugger;
        $scope.UserData = [];
        var userId = sessionStorage.getItem('UID')
        userService.GetAllUsers()
             .then(function (res) {
                 debugger;
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.UserData = res.data.ResponseData[0].AllUsersInfoData;
                 } else {
                     JSAlert.alert("Failed to load users data");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load users data");
             });
    }

    $scope.GetAllUsers();
    $scope.ActivateDeactivate = function (userinfo,val) {
        userService.Enabledisableuser(userinfo.userId, val)
            .then(function (res) {
                debugger;
                if (res.data.ResponseCode == 200) {
                    userinfo.isActive = val;
                    JSAlert.alert(res.data.Message);
                } else {
                    JSAlert.alert("Failed to update");
                }
            }).catch(function (ex) {
                $('#ajaxSpinnerContainer').hide();
                JSAlert.alert("Failed to update");
            });
    }
});