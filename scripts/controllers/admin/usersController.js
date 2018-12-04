'use strict';

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
   // $scope.zipValidation = false;
    $scope.userNameValidation = false;
    $scope.passwordValidation = false;
    $scope.dtColumnDefs = [
     DTColumnDefBuilder.newColumnDef(0).notSortable()
    ];

    $scope.NotificationData = {};
    $scope.titleValidation = false;
    $scope.bodyValidation = false;


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

    $scope.GetProfileInfo = function (userId,userName) {
        $scope.UserInfo = {};
        $scope.UserInfo.userId = 0;
        userService.GetUserProfileInfo(userId)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null) {
                         $scope.UserInfo = res.data.ResponseData[0].UserProfileInfoData[0];
                         $scope.UserInfo.userId = userId;
                         $scope.UserInfo.userName = userName;
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
        $scope.GetProfileInfo(userInfo.userId, userInfo.userName);
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
       // $scope.primaryValidation = false;
      //  $scope.addressValidation = false;
       // $scope.cityValidation = false;
        $scope.stateValidation = false;
       // $scope.zipValidation = false;
        $scope.userNameValidation = false;
        $scope.passwordValidation = false;
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
                                      $scope.GetAllUsers();
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
                debugger;
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
            if ($scope.UserInfo.userName == null || $scope.UserInfo.userName == '')
                $scope.userNameValidation = true;
            if ($scope.UserInfo.Password == null || $scope.UserInfo.Password == '')
                $scope.passwordValidation = true;
            //if ($scope.UserInfo.phoneOne == null || $scope.UserInfo.phoneOne == '')
            //    $scope.primaryValidation = true;
            //if ($scope.UserInfo.AddressOne == null || $scope.UserInfo.AddressOne == '')
            //    $scope.addressValidation = true;
            //if ($scope.UserInfo.City == null || $scope.UserInfo.City == '')
            //    $scope.cityValidation = true;
            if ($scope.UserInfo.State == null || $scope.UserInfo.State == '')
                $scope.stateValidation = true;
            //if ($scope.UserInfo.zipCode == null || $scope.UserInfo.zipCode == '')
            //    $scope.zipValidation = true;
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

    $scope.OpenSendNotificationModal = function (userInfo) {
        $scope.bodyValidation = false;
        $scope.titleValidation = false;
        $scope.NotificationType = "SingleUser";
        $scope.NotificationData = {
            userId: userInfo.userId,
            body: "",
            title: "",
            senderuserId: sessionStorage.getItem('UID')
        };
    }

    $scope.SelectedUserIds = "";
    $scope.OpenMultiSendNotificationModal = function () {
        var arr = $scope.UserData.filter(
          function (value) {
              if (value.checked == 1) {
                  return true;
              }
              else {
                  return false;
              }
          });

        if (arr.length > 0) {

            $scope.SelectedUserIds = arr.map(function (obj) { return obj.userId }).join(",");
            $('#sendNotificationModal').modal('show');
        }
        else {
            JSAlert.alert("Select User to Send Notification");
            $('#sendNotificationModal').modal('hide');
        }
        $scope.NotificationType = "MultiUser";
        $scope.bodyValidation = false;
        $scope.titleValidation = false;
        $scope.NotificationData = {
            userId: $scope.SelectedUserIds,
            body: "",
            title: "",
            senderuserId: sessionStorage.getItem('UID')
        };
    }

    $scope.SendNotificationSubmit = function (notificationData) {
        debugger;
        $scope.bodyValidation = false;
        $scope.titleValidation = false;
        if ($scope.notificationform.$valid) {
           
            if ($scope.NotificationType == "SingleUser")
            {
                var data = notificationData;
                var queryString = $.param(data);

                userService.SendFcmNotification(queryString)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     $('#sendNotificationModal').modal('hide');
                     JSAlert.alert("Notification Sent Successfully");
                 } else {
                     $('#sendNotificationModal').modal('hide');
                     JSAlert.alert("Failed to Sent Notification");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to Sent Notification");
             });
            }
            else if ($scope.NotificationType == "MultiUser")
            {
                notificationData.userId = $scope.SelectedUserIds;
                var data = notificationData;
                var queryString = $.param(data);

                userService.SendFcmNotificationToMultiUsers(queryString)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     $('#sendNotificationModal').modal('hide');
                     JSAlert.alert("Notification Sent Successfully");
                 } else {
                     $('#sendNotificationModal').modal('hide');
                     JSAlert.alert("Failed to Sent Notification");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to Sent Notification");
             });
            }
            else
            {
                $scope.Data = {
                    body: notificationData.body,
                    title: notificationData.title,
                    senderuserId: sessionStorage.getItem('UID')
                };
                var data = $scope.Data;
                var queryString = $.param(data);
                userService.SendFcmNotificationToAllUsers(queryString)
                .then(function (res) {
                    if (res.data.ResponseCode == 200) {
                        $('#sendNotificationModal').modal('hide');
                        JSAlert.alert("Notification Sent SuccessFully");
                    
                    } else {
                        $('#sendNotificationModal').modal('hide');
                        JSAlert.alert("Failed to Sent Notification");
                    }
                }).catch(function (ex) {
                    $('#ajaxSpinnerContainer').hide();
                    $scope.RequestProcessed++;
                    if ($scope.RequestProcessed == $scope.UserIds.length) {
                        $('#sendNotificationModal').modal('hide');
                        JSAlert.alert("Failed to Sent Notification");
                    }
                });
            }
        }
        else {
            if ($scope.NotificationData.body == null || $scope.NotificationData.body == '')
                $scope.bodyValidation = true;
            if ($scope.NotificationData.title == null || $scope.NotificationData.title == '')
                $scope.titleValidation = true;
        }
    }

    $scope.OpenAllSendNotificationModal=function()
    {
        $scope.bodyValidation = false;
        $scope.titleValidation = false;
        $scope.NotificationType = "AllUser";
        $scope.NotificationData = {
            userId: 0,
            body: "",
            title: "",
            senderuserId: sessionStorage.getItem('UID')
        };

        $('#sendNotificationModal').modal('show');
    }
});