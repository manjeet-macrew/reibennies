﻿'use strict';

rEIBenniesApp.controller("useractivityController", function ($scope, $rootScope, DTColumnDefBuilder, helpSupportService, userService, $filter) {
    $rootScope.IsUserActivity = true;
    $rootScope.SelectedPage = "UserActivity";
    $rootScope.CurrentYear = getCurrentYear();

    $scope.dtColumnDefs = [
     DTColumnDefBuilder.newColumnDef(0).notSortable()
    ];

    $scope.UserActivities = [];
    $scope.GetAllUserActivities = function () {
        $scope.UserActivities = [];
        userService.GetAllUserActivities()
             .then(function (res) {
                 debugger;
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.UserActivities = res.data.ResponseData[0].UserActivitiesInfoData;
                 } else {
                     JSAlert.alert("Failed to load users data");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load users data");
             });
    }

    $scope.GetAllUserActivities();

    $scope.Request = [
     { Value: 'Y', Name: "Yes" },
     { Value: 'N', Name: "No" }
    ]

    $scope.RequestApprove = { Value: "0" };

    $scope.HelpRequest = {};
    $scope.OpenModel = function (req) {
        $scope.HelpRequest = req;
        $scope.RequestApprove = { Value: req.isResolved };
    }

    $scope.Submit = function (req) {
        var data = {
            helpCenterId: req.helpCenterId,
            Name: req.Name,
            Phone: req.Phone,
            Email: req.Email,
            helpCenterCatId: req.helpCenterCatId,
            Body: req.Body,
            UserName: req.UserName,
            helpCategoryName: req.helpCategoryName,
            helpCategoryDescription: req.helpCategoryDescription,
            isResolved: $scope.RequestApprove.Value,
            modifiedBy: sessionStorage.getItem('UID'),
            solutionNotes: req.solutionNotes,
        }

        helpSupportService.UpdateHelpCenterRequest(data)
            .then(function (res) {
                if (res.data.ResponseCode == 200) {
                    JSAlert.alert(res.data.Message);
                    var myRedObject = $filter('filter')($scope.SupportData, { helpCenterId: data.helpCenterId })[0];
                    var index = $scope.SupportData.indexOf(myRedObject);
                    $scope.SupportData.splice(index, 1);
                    $('#myModal').modal('hide');
                } else {
                    JSAlert.alert("Failed to process");
                }
            }).catch(function (ex) {
                $('#ajaxSpinnerContainer').hide();
                JSAlert.alert("Failed to process");
            });
    }
});

