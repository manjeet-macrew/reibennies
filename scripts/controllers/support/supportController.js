'use strict';

rEIBenniesApp.controller("supportController", function ($scope, $rootScope, DTColumnDefBuilder, helpSupportService, userService, $filter) {
    $rootScope.IsSupport = true;
    $rootScope.SelectedPage = "Support";
    $scope.IsList = true;
    $rootScope.CurrentYear = getCurrentYear();

    $scope.dtColumnDefs = [
     DTColumnDefBuilder.newColumnDef(0).notSortable()
    ];

    $scope.SupportData = [];
    $scope.GetActiveHelpCenterRequests = function () {
        $scope.SupportData = [];
        helpSupportService.GetActiveHelpCenterRequests()
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.SupportData = res.data.ResponseData[0].HelpCenterData;
                 } else {
                     JSAlert.alert("Failed to load users data");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load users data");
             });
    }

    $scope.GetActiveHelpCenterRequests();

    $scope.Request = [
     { Value: 'Y', Name: "Yes" },
     { Value: 'N', Name: "No" }
    ]

    $scope.RequestApprove = { Value: "0" };

    $scope.HelpRequest = {};
    $scope.OpenModel = function (req) {
        debugger;
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
                    debugger;
                    if ($scope.RequestApprove.Value == 'Y') {
                        var myRedObject = $filter('filter')($scope.SupportData, { helpCenterId: data.helpCenterId })[0];
                        var index = $scope.SupportData.indexOf(myRedObject);
                        $scope.SupportData.splice(index, 1);
                    }
                    $('#myModal').modal('hide');
                } else {
                    JSAlert.alert("Failed to process");
                }
            }).catch(function (ex) {
                $('#ajaxSpinnerContainer').hide();
                JSAlert.alert("Failed to process");
            });
    }

    $scope.SupportDataResloved = [];
    $scope.GetResolvedHelpCenteRrequests = function () {
        $scope.SupportData = [];
        helpSupportService.GetResolvedHelpCenteRrequests()
             .then(function (res) {
                 debugger;
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.SupportDataResloved = res.data.ResponseData[0].HelpCenterData;
                 } else {
                     JSAlert.alert("Failed to load users data");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load users data");
             });
    }

    $scope.ShowTab = function (id, element) {
        if (element != undefined) {
            $('.panel-heading.panel-heading-tab1.active_tab').removeClass('active_tab');
            element.currentTarget.parentNode.parentNode.classList.add('active_tab')
        }

        $('.tab-pane.fade.in.active').removeClass('in active');
        $(id).addClass('in active');

        if (id == '#resolved')
            $scope.GetResolvedHelpCenteRrequests();
        else if (id == '#unresolved')
            $scope.GetActiveHelpCenterRequests();

    }

});

