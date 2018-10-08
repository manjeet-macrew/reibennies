'use strict';

rEIBenniesApp.controller("usersController", function ($scope, $rootScope, DTColumnDefBuilder, rankService, userService, roleService, $filter) {
    $rootScope.IsUsers = true;
    $rootScope.SelectedPage = "Users";
    $scope.IsList = true;
    $rootScope.CurrentYear = getCurrentYear();

    $scope.dtColumnDefs = [
     DTColumnDefBuilder.newColumnDef(0).notSortable()
    ];

    $scope.UserData = [];
    $scope.GetAllUsers = function () {
        
        $scope.UserData = [];
        var userId = sessionStorage.getItem('UID')
        userService.GetAllUsers()
             .then(function (res) {
                 
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
    $scope.RolesData = [];
    $scope.GetAllRoles = function () {
        $scope.RolesData = [];
        var userId = sessionStorage.getItem('UID')
        roleService.GetAllRoles()
             .then(function (res) {

                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.RolesData = res.data.ResponseData[0].RolesData;
                 } else {
                     JSAlert.alert("Failed to load users data");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load users data");
             });
    };
    $scope.GetAllRoles();
    $scope.States = [];
    $scope.GetStates = function () {
        $scope.States = [];
        userService.GetStates()
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.States = res.data.ResponseData[0].ActiveStateInfoData;
                 } else {
                     JSAlert.alert("Failed to load States");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load States");
             });
    }
    $scope.GetStates();
    $scope.ActivateDeactivate = function (userinfo, val) {
        userService.Enabledisableuser(userinfo.userId, val)
            .then(function (res) {
                
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

    $scope.GetProfileInfo = function (userId) {
        $scope.UserInfo = {};
        $scope.UserInfo.userId = 0;
        userService.GetUserProfileInfo(userId)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null) {
                         $scope.UserInfo = res.data.ResponseData[0].UserProfileInfoData[0];
                         $scope.UserInfo.userId = userId;
                     }
                 } else {
                     JSAlert.alert("Failed to load profile data");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load profile data");
             });
    }


    $scope.OpenModal = function (userInfo) {
        
        $scope.GetProfileInfo(userInfo.userId);
        //$scope.UserInfo = userInfo;
        $scope.GetUserRoles(userInfo.userId);
    };
    $scope.GetUserRoles = function (id) {
        $scope.UserRoles = [];
        $scope.UserRoles.roles = [];
        var usrRol = [];
        userService.GetUserRoles(id)
            .then(function (res) {
                
                if (res.data.ResponseCode == 200) {
                    if (res.data.ResponseData[0] != null)
                        usrRol = res.data.ResponseData[0].UserInRolesData;
                    angular.forEach(usrRol, function (value, key) {
                        $scope.UserRoles.roles.push(value.roleId);
                    })
                } else {
                    JSAlert.alert("Failed to load users data");
                }
            }).catch(function (ex) {
                $('#ajaxSpinnerContainer').hide();
                JSAlert.alert("Failed to load users data");
            });
    };

    $scope.Submit = function (UserInfo) {
        
        var payload = [];
        var userId=UserInfo.userId;
        angular.forEach($scope.UserRoles.roles, function (value, key) {
            payload.push({ "userId": userId, "roleId": value });
        });
        //update User Settings
        userService.ModifyUserSettingsDemographics(UserInfo, userId)
            .then(function (res) {
                if (res.data.ResponseCode == 200) {
                    //Create Update Roles
                    userService.epCreateUpdateUserRoles(payload)
                      .then(function (res) {
                          
                          if (res.data.ResponseCode == 200) {
                              JSAlert.alert(res.data.Message);
                          } else {
                              JSAlert.alert("Failed to update");
                          }
                          $('#ajaxSpinnerContainer').hide();
                          $('#manageUser').modal('hide');
                      }).catch(function (ex) {
                          $('#ajaxSpinnerContainer').hide();
                          JSAlert.alert("Failed to update");
                      });
                } else {
                    JSAlert.alert("Failed to update profile");
                }
            }).catch(function (ex) {
                $('#ajaxSpinnerContainer').hide();
                JSAlert.alert("Failed to update profile");

            });


    };



});