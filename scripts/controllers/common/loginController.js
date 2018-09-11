'use strict';

rEIBenniesApp.controller("loginController", function ($scope, toastr, config, loginApi) {
    $("#txtbxUsername").focus();

    //set current year
    $("#currentYear").html(getCurrentYear());

    //disable form event
    document.getElementById("frmLogin").addEventListener("click", function (event) {
        event.preventDefault()
    });

    $scope.User = { UserName: '', Password: '' }

    $scope.Login = function () {
        debugger;
        var grantType = config.txtGrantType;
        //toastr.error($scope.User.UserName, 'Error');

        if (($scope.User.UserName === "") && ($scope.User.Password === "")) {
            JSAlert.alert(config.txtLoginAlert);

            $("#txtbxUsername").focus();
            return false;
        }
        else {
            var payload = {
                username: $scope.User.UserName,
                password: $scope.User.Password,
                grant_type: grantType
            };
            $scope.SendLogin(payload);
        }
    };

    $scope.SendLogin = function (userData) {
        debugger;
        jQuery.ajax({
            type: "POST",
            url: config.epLoginToken,
            data: userData,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType: "json",
            beforeSend: function () {
                showSpinner();
            },
            success: function (data, status, xhr) {
                hideSpinner();
                status = xhr.responseText;
                var statusCode = xhr.status;

                if (statusCode === 200) {
                    if (isJSONEmpty(status)) {
                        //set session storage
                        sessionStorage.setItem('UN', userData.username);

                        $scope.doSuccess(status);
                    }
                    else {
                        JSAlert.alert(config.txtLoginFailure);

                        $("#txtbxUsername").focus();
                    }
                }
                else {
                    JSAlert.alert(config.txtLoginFailure);

                    $("#txtbxUsername").focus();
                }
            },
            error: function (xhr, status, errorThrown) {
                hideSpinner();
                if (xhr.status === 400) {
                    JSAlert.alert(config.txtLoginFailure400);

                    $("#txtbxUsername").focus();
                }
                else {
                    JSAlert.alert(config.txtLoginFailure);

                    $("#txtbxUsername").focus();
                }
            }
        });

    }

    $scope.ForceLower = function () {
        if ($scope.User.UserName != undefined)
            $scope.User.UserName = $scope.User.UserName.toLowerCase();
    }

    $scope.FormClear = function () {
        $scope.User = {
            UserName: '',
            Password: ''
        };
    }

    $scope.doSuccess = function (status) {

        var obj = exposeJSON(status);

        var t = {};
        t.accessToken = obj.access_token;
        t.tokenType = obj.token_type;
        t.expiresIn = obj.expires_in;

        //set global variables
        sessionStorage.setItem('AT', t.accessToken);
        sessionStorage.setItem('TT', t.tokenType);
        sessionStorage.setItem('EI', t.expiresIn);

        //get user info
        var u = {};
        u.userName = sessionStorage.getItem('UN');

        //get base user info
        $scope.getUserInfo(u);  //********** Need to work on this section

        //window.location.href = "home.html";

    }

    $scope.getUserInfo = function (u) {
        var jsonObject = makeJSON(u);

        //call service to get userinfo
        jQuery.ajax({
            type: 'POST',
            url: config.epGetUserInfo,
            data: jsonObject,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT'));
            },
            success: function (data, status, xhr) {
                status = xhr.responseText;
                var statusCode = xhr.status;

                if (statusCode === 200) {
                    if ($scope.isUserInfoEmpty(status)) {
                       $scope.buildUserInfoData(status)
                    }
                    else {
                        JSAlert.alert(config.txtLoginFailure);

                        $("#txtbxUsername").focus();
                    }
                }
                else {
                    JSAlert.alert(config.txtLoginFailure);

                    $("#txtbxUsername").focus();
                }
            },
            error: function (xhr, status, errorThrown) {
                JSAlert.alert(config.txtLoginFailure);

                $("#txtbxUsername").focus();
            }
        });
    }


    $scope.isUserInfoEmpty = function (data) {
        var isE = true;
        var result = removeFirstLast(data);

        if (result === null || result === '') {
            isE = false;

            return isE;
        }

        var jsonData = exposeJSON(result);

        if (jsonData.UserInfoData.length > 0) {
            isE = true;
        }
        else {
            isE = false;
        }

        return isE;
    }

    $scope.buildUserInfoData = function () {
        var result = removeFirstLast(data);
        var jsonData = exposeJSON(result);
        var jData = exposeJSON($scope.getUIData(jsonData));

        var uid = {};
        uid.userId = jData[0].userId;
        uid.firstName = jData[0].firstName;
        uid.lastName = jData[0].lastName;

        //set additional global variables
        sessionStorage.setItem('UID', uid.userId);
        sessionStorage.setItem('FN', uid.firstName);
        sessionStorage.setItem('LN', uid.lastName);

        //redirect to home view
        window.location.href = "home.html";
    }

    $scope.getUIData = function (jObj) {
        var jD = jObj;
        var xData = null;

        for (var i = 0; i < jD.UserInfoData.length; i++) {
            xData = makeJSON(jD.UserInfoData);
        }

        return xData;
    }
});