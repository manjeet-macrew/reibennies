'use strict';

rEIBenniesApp.controller("profileController", function ($scope, $rootScope, userService) {
    $rootScope.IsProfile = true;
    $rootScope.SelectedPage = "Profile";

    $scope.IsView = true;
    $scope.UserData = {};
    $scope.GetProfileInfo = function () {
        $scope.UserData = {};
        var userId = sessionStorage.getItem('UID')
        userService.GetUserProfileInfo(userId)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.UserData = res.data.ResponseData[0].UserProfileInfoData[0];
                 } else {
                     JSAlert.alert("Failed to load profile data");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load profile data");
             });
    }

    $scope.GetProfileInfo();


    $scope.GetOldPassword = function () {
        var userId = sessionStorage.getItem('UID')
        userService.GetUserPassword(userId)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.UserOldPassword = res.data.ResponseData[0].UserPasswordInfoData[0].Password;
                 } else {
                     JSAlert.alert("Failed to load Old Password");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load Old Password");
             });
    }

    $scope.UpdateProfile = function () {
        $scope.IsView = false;
    }
    $scope.Cancel = function () {
        $scope.IsView = true;
    }

    $scope.Submit = function (userData) {
        var userId = sessionStorage.getItem('UID')
        userService.ModifyUserSettingsDemographics(userData, userId)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     JSAlert.alert(res.data.Message);
                     $scope.IsView = true;
                 } else {
                     JSAlert.alert("Failed to update profile");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to update profile");

             });
    }

    $scope.ShowTab = function (id, element) {
        if (element != undefined) {
            $('.panel-heading.panel-heading-tab1.active_tab').removeClass('active_tab');
            element.currentTarget.parentNode.parentNode.classList.add('active_tab')
        }

        $('.tab-pane.fade.in.active').removeClass('in active');
        $(id).addClass('in active');

        if (id == '#changePassword')
            $scope.GetOldPassword();

        if (id == '#fullDemographics')
            $scope.GetStates();
        if (id == '#subscription')
            $scope.GetSubscriptions();
        if (id == '#fAQS')
            $scope.GetFaqs();
        if (id == '#professionalExperties')
            $scope.GetInvestorTypes();

    }

    $scope.ComfirmPassword = "";
    $scope.Password = "";


    $scope.SubmitPassword = function () {
        var userId = sessionStorage.getItem('UID')
        if ($scope.UserOldPassword != $scope.ComfirmPassword)
            JSAlert.alert("Old Password does not match");
        else {
            userService.ModifyUserPassword({ userId: userId, Password: $scope.Password })
                 .then(function (res) {
                     if (res.data.ResponseCode == 200) {
                         JSAlert.alert(res.data.Message);
                         $scope.UserOldPassword = $scope.Password;
                     } else {
                         JSAlert.alert("Failed to load update Password");
                     }
                 }).catch(function (ex) {
                     $('#ajaxSpinnerContainer').hide();
                     JSAlert.alert("Failed to load update Password");

                 });
        }
    }
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

    $scope.ActiveSubscription = {};
    $scope.GetSubscriptions = function () {
        $scope.ActiveSubscription = {};
        var userId = sessionStorage.getItem('UID')
        userService.GetSubscriptions(userId)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.ActiveSubscription = res.data.ResponseData[0].ActiveSubscriptionInfoData;
                 } else {
                     JSAlert.alert("Failed to load Subscriptions");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load Subscriptions");
             });
    }

    $scope.FAQs = [];
    $scope.GetFaqs = function () {
        $scope.FAQs = [];
        userService.GetFaqs()
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.FAQs = res.data.ResponseData[0].FaqsInfoData;
                     if ($scope.FAQs != null && $scope.FAQs != undefined) {
                         setTimeout(function () {
                             $scope.OpenAccordian($scope.FAQs[0].faqId);
                         }, 25);
                        
                     }
                 } else {
                     JSAlert.alert("Failed to load Old Faq");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load Old Faq");
             });
    }


    $scope.UserInvestorTypes = [];
    $scope.InvestorTypes = [];
    $scope.GetInvestorTypes = function () {
        angular.copy($scope.UserData.userInvestorTypes, $scope.UserInvestorTypes);
        $scope.InvestorTypes = [];
        userService.GetInvestorTypes()
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.InvestorTypes = res.data.ResponseData[0].InvestorTypesLookupInfoData;
                 } else {
                     JSAlert.alert("Failed to load Old Investor Types");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load Old Investor Types");
             });
    }

    $scope.IsChecked = function (id) {
        if ($scope.UserData.userInvestorTypes != undefined) {
            var exist = $scope.UserData.userInvestorTypes.indexOf(id);
            if (exist == -1)
                return false;
            else
                return true;
        } else
            return false;
    }


    $scope.AddRemove = function (element) {
        if ($scope.UserInvestorTypes == undefined)
            $scope.UserInvestorTypes = [];

        if (element.InvestorType == true) {
            $scope.UserInvestorTypes.push(element.inv.lookupId);
        }
        else {
            var i = $scope.UserInvestorTypes.indexOf(element.inv.lookupId);
            if (i > -1)
                $scope.UserInvestorTypes.splice(i, 1);
        }
    }

    $scope.UpdateUserInvestorTypes = function () {
        var userId = sessionStorage.getItem('UID')
        var userInvester = [];
        $scope.UserInvestorTypes.forEach(function (val) {
            userInvester.push({ userId: userId, lookupId: val });
        })
        userService.UpdateUserInvestorTypes(userInvester)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     angular.copy($scope.UserInvestorTypes, $scope.UserData.userInvestorTypes);
                     JSAlert.alert(res.data.Message);
                 } else {
                     JSAlert.alert("Failed to load update Investor Types");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load update Investor Types");

             });

    }

    $scope.CancelSubscription = function (user) {
        var userId = sessionStorage.getItem('UID')
        userService.CancelSubscription(userId)
            .then(function (res) {
                if (res.data.ResponseCode == 200) {
                    JSAlert.alert(res.data.Message);
                } else {
                    JSAlert.alert("Failed to Cancel Subscription");
                }
            }).catch(function (ex) {
                $('#ajaxSpinnerContainer').hide();
                JSAlert.alert("Failed to Cancel Subscription");

            });
    }

    $scope.ChangeSubscription = function (subscription) {
        var userId = sessionStorage.getItem('UID')
        var payload = {
            subscriptionId: subscription.subscriptionId,
            Type: subscription.Type,
            UserId: userId
        }
        userService.ChangeSubscription(payload)
            .then(function (res) {
                if (res.data.ResponseCode == 200) {
                    JSAlert.alert(res.data.Message);
                } else {
                    JSAlert.alert("Failed to Change Subscription");
                }
            }).catch(function (ex) {
                $('#ajaxSpinnerContainer').hide();
                JSAlert.alert("Failed to Change Subscription");

            });
    }

    $scope.OpenAccordian = function (id) {
        id = "#faq_" + id;
        $('.panel-collapse.collapse.in').removeClass('in');
        $(id).addClass('in');
    }

});