'use strict';

rEIBenniesApp.service('userService', ['$http', 'config', '$location', '$cookieStore', function ($http, config, $location, $cookieStore) {

    this.GetUserProfileInfo = function (id) {
        return $http({
            method: 'GET', url: config.epGetUserProfileInfo + id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.ModifyUserSettingsDemographics = function (payload, id) {
        return $http({
            method: 'POST', url: config.epModifyUserSettingsDemographics + id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            },
            data: payload,
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.ModifyUserPassword = function (payload) {
        return $http({
            method: 'POST', url: config.epModifyUserPassword,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            },
            data: payload,
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetUserPassword = function (id) {
        return $http({
            method: 'GET', url: config.epGetUserPassword + id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetStates = function () {
        return $http({
            method: 'GET', url: config.epGetStates,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetSubscriptions = function (id) {
        return $http({
            method: 'GET', url: config.epGetSubscriptions + id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetFaqs = function () {
        return $http({
            method: 'GET', url: config.epGetFaqs,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetInvestorTypes = function () {
        return $http({
            method: 'GET', url: config.epGetInvestorTypes,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.UpdateUserInvestorTypes = function (payload) {
        return $http({
            method: 'POST', url: config.epUpdateUserInvestorTypes,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            },
            data: payload,
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.ChangeSubscription = function (payload) {
        return $http({
            method: 'POST', url: config.epChangeSubscription,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            },
            data: payload,
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.CancelSubscription = function (payload) {
        return $http({
            method: 'POST', url: config.epCancelSubscription + payload,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            },
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetAllUserActivities = function () {
        return $http({
            method: 'GET', url: config.epGetAllUserActivities,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetAllUsers = function () {
        return $http({
            method: 'GET', url: config.epGetAllUsers,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };
    this.Enabledisableuser = function (userId, enableDisable) {
        return $http({
            method: 'POST', url: config.epEnabledisableuser + "?userId=" + userId + "&enableDisable=" + enableDisable,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetUserRoles = function (id) {
        return $http({
            method: 'GET', url: config.epGetUserRoles + "?userId="+ id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };
    this.CreateUpdateUserRoles = function (payload) {
        return $http({
            method: 'POST', url: config.epCreateUpdateUserRoles,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            },
            data: payload
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };
    this.SignUp = function (payload) {
        return $http({
            method: 'POST', url: config.epSignUp,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            },
            data: payload
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.SendFcmNotification = function (param) {
        return $http({
            method: 'POST', url: config.epSendFcmNotification,
            data: param,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        })
    };

    this.SendFcmNotificationToAllUsers = function (param) {
        return $http({
            method: 'POST', url: config.epSendFcmNotificationToAllUsers,
            data: param,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        })
    };

    this.SendFcmNotificationToMultiUsers = function (param) {
        return $http({
            method: 'POST', url: config.epSendFcmNotificationToMultiUsers,
            data: param,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        })
    };

    this.GetAllFcmPushNotifications = function (id) {
        return $http({
            method: 'GET', url: config.epGetAllFcmPushNotifications +   id,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };


    this.GetAllMarketPlaces = function () {
        return $http({
            method: 'GET', url: config.epGetAllMarketPlaces ,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.GetAllUsersDevice = function () {
        return $http({
            method: 'GET', url: config.epGetAllUsersDeviceDetail,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };

    this.ShowHideuser = function (userId, isVisible) {
        return $http({
            method: 'POST', url: config.epShowHideUser + "?userId=" + userId + "&isVisible=" + isVisible,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT')
            }
        }).success(function (data, status, headers, config) {
        }).error(function (response, status, headers, config) {
        });
    };
}]);