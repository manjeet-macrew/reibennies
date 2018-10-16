'use strict';

rEIBenniesApp.controller("subscriptionMgmtController", function ($scope, $rootScope, DTColumnDefBuilder,rankService, helpSupportService, userService, $filter) {
    $rootScope.IsSubscriptionMgmt = true;
    $rootScope.SelectedPage = "SubscriptionMgmt";
    $scope.IsList = true;
    $rootScope.CurrentYear = getCurrentYear();

    $scope.disBtnStart = true;
    $scope.disBtnStop = true;
    $scope.disBtnChange = true;
    $scope.disBtnSave = true;
    $scope.userId = 0;
    $scope.selectedSubId = 0;

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
        $scope.disBtnSave = true;
        $scope.showSubscriptionddl = false;

        $scope.ActiveSubscription = {};

        var userId = req.userId;
        $scope.userId = userId;
        $scope.GetSubscriptions();
        userService.GetUserProfileInfo(userId)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.ActiveSubscription = res.data.ResponseData[0].UserProfileInfoData[0];

                     if (res.data.ResponseData[0].UserProfileInfoData[0].subscriptionId != null) {
                         $scope.prevSubId = res.data.ResponseData[0].UserProfileInfoData[0].subscriptionId;
                         $scope.disBtnStart = true;
                         $scope.disBtnStop = false;
                         if ($scope.Subscription.length == 0)
                             $scope.disBtnChange = true;
                     }
                 } else {
                     JSAlert.alert("Failed to load profile data");
                     $scope.disBtnStart = true;
                     $scope.disBtnStop = true;
                     $scope.disBtnChange = true;
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load profile data");
             });
    }

    $scope.Subscription = {};
    $scope.GetSubscriptions = function () {
        //if ($rootScope.UserRole == 'App Admin' || $rootScope.UserRole == 'Rank Approver' || $rootScope.UserRole == 'Staff') {
        //    $scope.Subscription = [];
        //    $scope.disBtnChange = true;
        //}
        //else {
        $scope.Subscription = {};
        var userId = $scope.userId;
        userService.GetSubscriptions(userId)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.disBtnChange = false;
                     $scope.Subscription = res.data.ResponseData[0].ActiveSubscriptionInfoData;
                 } else {
                     // JSAlert.alert("Failed to load Subscriptions");
                     $scope.disBtnChange = true;
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load Subscriptions");
             });
        //}
    }

    $scope.CancelSubscription = function () {
        var userId = $scope.userId;
        userService.CancelSubscription(userId)
            .then(function (res) {
                if (res.data.ResponseCode == 200) {
                    $scope.disBtnStart = false;
                    $scope.disBtnStop = true;
                    JSAlert.alert("Subscription Canceled Successfully");
                    $('#myModal').modal('hide');
                    $scope.GetAllActiveUsers();
                } else {
                    JSAlert.alert("Failed to Cancel Subscription");
                }
            }).catch(function (ex) {
                $('#ajaxSpinnerContainer').hide();
                JSAlert.alert("Failed to Cancel Subscription");

            });
    }

    $scope.StartSubscription = function (subscription) {
        var userId = $scope.userId;
        var payload = {
            subscriptionId: subscription.subscriptionId,
            Type: subscription.Type,
            UserId: userId
        }
        userService.ChangeSubscription(payload)
            .then(function (res) {
                if (res.data.ResponseCode == 200) {
                    JSAlert.alert("Subscription Started Successfully");
                    $('#myModal').modal('hide');
                    $scope.GetAllActiveUsers();
                } else {
                    JSAlert.alert("Failed to Start Subscription");
                }
            }).catch(function (ex) {
                $('#ajaxSpinnerContainer').hide();
                JSAlert.alert("Failed to Start Subscription");

            });
    }

    $scope.ChangeSubscription = function (subId) {
        if (subId != 0)
        {
            var type = $.grep($scope.Subscription, function (sub) {
                return sub.subscriptionId == subId;
            })[0].Type;
            var userId = $scope.userId;
            var payload = {
                subscriptionId: subId,
                Type: type,
                UserId: userId
            }
            userService.ChangeSubscription(payload)
               .then(function (res) {
                   if (res.data.ResponseCode == 200) {
                       //  JSAlert.alert(res.data.Message);
                       JSAlert.alert("Subscription Changed Successfully");
                       $('#myModal').modal('hide');
                       $scope.GetAllActiveUsers();
                   } else {
                       JSAlert.alert("Failed to Change Subscription");
                   }
               }).catch(function (ex) {
                   $('#ajaxSpinnerContainer').hide();
                   JSAlert.alert("Failed to Change Subscription");

               });
        }
        else {
            JSAlert.alert("Please Select Subscription to Change");
        }
    }

    $scope.ShowSubsddl = function () {
        $scope.showSubscriptionddl = true;
        $scope.disBtnChange = true;
        $scope.disBtnSave = true;
    }

    $scope.SelectedSubscription = function (subId) {
        if (subId != null) {
            $scope.selectedSubId = subId;
            $scope.disBtnSave = false;
        }
        else {
            $scope.disBtnSave = true;
        }
    }

});

