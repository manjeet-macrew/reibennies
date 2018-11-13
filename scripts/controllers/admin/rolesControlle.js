'use strict';

rEIBenniesApp.controller("rolesController", function ($scope, $rootScope, DTColumnDefBuilder, rankService, userService, roleService, $filter) {
    $rootScope.IsRoles = true;
    $rootScope.SelectedPage = "Roles";
    $scope.IsList = true;
    $rootScope.CurrentYear = getCurrentYear();
    $scope.dtColumnDefs = [
     DTColumnDefBuilder.newColumnDef(0).notSortable()
    ];
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
    }

    $scope.GetAllRoles();

    $scope.OpenModal = function (roleInfo) {
        
        $scope.RoleInfo = roleInfo;
    };
    $scope.addRoleOpenModal = function () {
        $scope.RoleInfo = {
            "roleId": 0,
            "roleName": "",
            "isActive": "",
            "createDate": formatDate(new Date),
            "createdBy": sessionStorage.getItem('UID')
        };
    };
    $scope.Submit = function (roleInfo) {
        var data = "";
        if (roleInfo.roleId > 0) {
            data = {
                roleId: roleInfo.roleId,
                roleName: roleInfo.roleName,
                isActive: roleInfo.isActive,
                // createDate: roleInfo.createDate,
                //createdBy: roleInfo.createdBy,
                modifiedDate: formatDate(new Date),
                modifiedBy: sessionStorage.getItem('UID')
            };
            roleService.UpdateRole(data)
               .then(function (res) {
                   
                   if (res.data.ResponseCode == 200) {
                       JSAlert.alert(res.data.Message);
                   } else {
                       JSAlert.alert("Failed to process");
                   }
                   $('#addEditRole').modal('hide');
               }).catch(function (ex) {
                   $('#ajaxSpinnerContainer').hide();
                   JSAlert.alert("Failed to process");
               });
        }
        else {
            data = {
                roleId: roleInfo.roleId,
                roleName: roleInfo.roleName,
                isActive: roleInfo.isActive,
                createDate: roleInfo.createDate,
                createdBy: roleInfo.createdBy,
                // modifiedDate: formatDate(new Date),
                // modifiedBy: sessionStorage.getItem('UID')
            };
            roleService.CreateRole(data)
                .then(function (res) {
                    
                    if (res.data.ResponseCode == 200) {
                        JSAlert.alert(res.data.Message);
                        $scope.GetAllRoles();
                    } else {
                        JSAlert.alert("Failed to process");
                    }
                    $('#addEditRole').modal('hide');
                }).catch(function (ex) {
                    $('#ajaxSpinnerContainer').hide();
                    JSAlert.alert("Failed to process");
                });
        }
    };
    $scope.DeleteRole = function (roleInfo) {
        JSAlert.confirm("Are you sure you want to delete this role?").then(function (result) {
            // Check if pressed yes
            if (!result)
                return;

            // User pressed yes!
            var data = roleInfo.roleId;
            roleService.DeleteRole(data)
               .then(function (res) {
                   
                   if (res.data.ResponseCode == 200) {
                       JSAlert.alert(res.data.Message);
                       var index = $scope.RolesData.indexOf(data);
                       $scope.RolesData.splice(index, 1);
                   } else {
                       JSAlert.alert("Failed to process");
                   }
                   $('#addEditRole').modal('hide');
                   $('#ajaxSpinnerContainer').hide();
               }).catch(function (ex) {
                   $('#ajaxSpinnerContainer').hide();
                   JSAlert.alert("Failed to process");
               });
        });
    };

    $scope.GetUserListByRoleId=function(id)
    {
        $scope.UsersData = [];
        roleService.GetUserListByRoleId(id)
        .then(function (res) {
            if (res.data.ResponseCode == 200) {
                if (res.data.ResponseData[0] != null)
                    $scope.UsersData = res.data.ResponseData[0].UserListInRolesData;
            } else {
                JSAlert.alert("Failed to load users data");
            }
        })
        .catch(function (ex) {
            $('#ajaxSpinnerContainer').hide();
            JSAlert.alert("Failed to Load Users");
        })
    }

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

    $scope.OpenModalViewUsers=function(n)
    {
        $scope.GetUserListByRoleId(n.roleId);
        $scope.RoleId = n.roleId;
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


    $scope.OpenUserModal = function (userInfo) {
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

    $scope.SubmitUser = function (UserInfo) {

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
                                      $scope.GetUserListByRoleId($scope.RoleId);
                                      $scope.GetAllRoles();
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

    $scope.remove = function (item) {
        var index = $scope.bdays.indexOf(item);
        $scope.bdays.splice(index, 1);
    }
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hour = d.getHours(),
            minutes = d.getMinutes(),
            seconds = d.getSeconds();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        var tDay = [year, month, day].join('-');
        var tTime = hour + ':' + minutes + ':' + seconds;
        return tDay + ' ' + tTime;
    }
});