﻿'use strict';

rEIBenniesApp.controller("usersController", function ($scope, $rootScope, DTColumnDefBuilder, rankService, userService, roleService, $filter) {
    $rootScope.IsUsers = true;
    $rootScope.SelectedPage = "Users";
    $scope.IsList = true;
    $rootScope.CurrentYear = getCurrentYear();
    $scope.roleAssignedValidation = false;
    $scope.frstNameValidation = false;
    $scope.lastNameValidation = false;
    $scope.emailValidation = false;
    $scope.primaryValidation = false;
    $scope.addressValidation = false;
    $scope.cityValidation = false;
    $scope.stateValidation = false;
    $scope.zipValidation = false;
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
        
        $scope.roleAssignedValidation = false;
        $scope.frstNameValidation = false;
        $scope.lastNameValidation = false;
        $scope.emailValidation = false;
        $scope.primaryValidation = false;
        $scope.addressValidation = false;
        $scope.cityValidation = false;
        $scope.stateValidation = false;
        $scope.zipValidation = false;
        if ($scope.userForm.$valid) {
            var payload = [];
            var userId = UserInfo.userId;
            if (userId > 0) {
                angular.forEach($scope.UserRoles.roles, function (value, key) {
                    payload.push({ "userId": userId, "roleId": value });
                });
                //update User Settings
                userService.ModifyUserSettingsDemographics(UserInfo, userId)
                    .then(function (res) {
                        if (res.data.ResponseCode == 200) {
                            //Create Update Roles
                            userService.CreateUpdateUserRoles(payload)
                              .then(function (res) {

                                  if (res.data.ResponseCode == 200) {
                                      JSAlert.alert("Updated Successfully");
                                     // JSAlert.alert(res.data.Message);
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
            }
            else {
              
                //update User Settings
                userService.SignUp(UserInfo)
                    .then(function (res) {
                        
                        if (res.data.ResponseCode == 200) {
                           
                            if (res.data.ResponseData["length"] > 1)
                            {
                                userId = res.data.ResponseData[1];
                                angular.forEach($scope.UserRoles.roles, function (value, key) {
                                    payload.push({ "userId": userId, "roleId": value });
                                });
                                //Create Update Roles
                                userService.CreateUpdateUserRoles(payload)
                                  .then(function (res) {

                                      if (res.data.ResponseCode == 200) {
                                          JSAlert.alert("User Added Successfully");
                                          $scope.GetAllUsers();
                                      } else {
                                          JSAlert.alert("Failed to update");
                                      }
                                      $('#ajaxSpinnerContainer').hide();
                                      $('#manageUser').modal('hide');
                                  }).catch(function (ex) {
                                      $('#ajaxSpinnerContainer').hide();
                                      JSAlert.alert("Failed to update");
                                  });
                            }
                           
                        } else {
                            JSAlert.alert(res.data.Message);
                        }
                    }).catch(function (ex) {
                        $('#ajaxSpinnerContainer').hide();
                        JSAlert.alert("Failed to update profile");

                    });
            }
        }
        else {
            if ($scope.UserRoles.roles == 0)
                $scope.roleAssignedValidation = true;
            if ($scope.UserInfo.firstName == null || $scope.UserInfo.firstName == '')
                $scope.frstNameValidation = true;
            if ($scope.UserInfo.lastName == null || $scope.UserInfo.lastName == '')
                $scope.lastNameValidation = true;
            if ($scope.UserInfo.Email == null || $scope.UserInfo.Email == '')
                $scope.emailValidation = true;
            if ($scope.UserInfo.phoneOne == null || $scope.UserInfo.phoneOne == '')
                $scope.primaryValidation = true;
            if ($scope.UserInfo.AddressOne == null || $scope.UserInfo.AddressOne == '')
                $scope.addressValidation = true;
            if ($scope.UserInfo.City == null || $scope.UserInfo.City == '')
                $scope.cityValidation = true;
            if ($scope.UserInfo.State == null || $scope.UserInfo.State == '')
                $scope.stateValidation = true;
            if ($scope.UserInfo.zipCode == null || $scope.UserInfo.zipCode == '')
                $scope.zipValidation = true;
        }

    };
    $scope.addUserOpenModal = function () {
        $scope.UserInfo = {
            AddressOne: "",
            Bio: "",
            City: "",
            Description: null,
            Duration: null,
            Email: "",
            Price: null,
            ProfilePicPath: "",
            Rank: "",
            State: "",
            Title: "",
            addressTwo: "",
            firstName: "",
            investorTypeName: [],
            lastName: "",
            middleName: "",
            paypalId: "",
            phoneOne: "",
            phoneTwo: "",
            roleId: "",
            subscriptionId: null,
            userId: "0",
            userInvestorTypes: [],
            zipCode: "",
            userName: "",
            Password: "",
            roleId:0
        };
        $scope.UserRoles = [];
        $scope.UserRoles.roles = [];
    };


});