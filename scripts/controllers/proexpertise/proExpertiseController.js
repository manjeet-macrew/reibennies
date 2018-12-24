'use strict';

rEIBenniesApp.controller("proExpertiseController", function ($scope, $rootScope, proExpertiseService,  DTColumnDefBuilder, faqService) {
    $rootScope.IsProExpertise = true;
    $rootScope.SelectedPage = "ProExpertise";
    $scope.IsList = true;
    $scope.NameValidation = false;
    $scope.ValueValidation = false;
    $rootScope.CurrentYear = getCurrentYear();
    $scope.dtColumnDefs = [
     DTColumnDefBuilder.newColumnDef(0).notSortable()
    ];
    $scope.ProExpertiseData = [];
    $scope.GetAllProfessionalExpertise = function () {
        debugger;
        $scope.ProExpertiseData = [];
        var userId = sessionStorage.getItem('UID')
        proExpertiseService.GetAllProfessionalExpertise()
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.ProExpertiseData = res.data.ResponseData[0].LookupInfoData;
                 } else {
                     JSAlert.alert("Failed to load pro expertise data");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load pro expertise data");
             });
    }

    $scope.GetAllProfessionalExpertise();

    $scope.OpenModal = function (proExpertiseInfo) {
        $scope.ProExpertiseInfo = proExpertiseInfo;
    };
    $scope.addProExpertiseOpenModal = function () {
        $scope.ProExpertiseInfo = {
            "lookupId": 0,
            "Name": "",
            "Value": "",
            //"Category": "",
            //"displayOrder": "",
            "isActive": "Y",
            //"createDate": "",
            "createdBy": sessionStorage.getItem('UID'),
            //"modifiedDate": "",
            "modifiedBy":  sessionStorage.getItem('UID')
        };
    };
    $scope.Submit = function (proExpertiseInfo) {
        var data = "";
        if ($scope.proExpertiseForm.$valid) {
            if (proExpertiseInfo.lookupId > 0) {
                data = {
                    lookupId: proExpertiseInfo.lookupId,
                    Value: proExpertiseInfo.Value,
                    Name: proExpertiseInfo.Name,
                    isActive: proExpertiseInfo.isActive,
                    //modifiedDate: formatDate(new Date),
                    modifiedBy: sessionStorage.getItem('UID')
                };
                proExpertiseService.UpdateProfessionalExpertise(data)
                   .then(function (res) {

                       if (res.data.ResponseCode == 200) {
                           JSAlert.alert(res.data.Message);
                       } else {
                           JSAlert.alert("Failed to process");
                       }
                       $('#addEditProExpertise').modal('hide');
                   }).catch(function (ex) {
                       $('#ajaxSpinnerContainer').hide();
                       JSAlert.alert("Failed to process");
                   });
            }
            else {
                data = {
                    lookupId: 0,
                    Value: proExpertiseInfo.Value,
                    Name: proExpertiseInfo.Name,
                    //createDate: faqInfo.createDate,
                    createdBy: proExpertiseInfo.createdBy,
                    isActive: proExpertiseInfo.isActive,
                };
                proExpertiseService.CreateProfessionalExpertise(data)
                   .then(function (res) {
                       if (res.data.ResponseCode == 200) {
                           JSAlert.alert(res.data.Message);
                           $scope.GetAllProfessionalExpertise();
                       } else {
                           JSAlert.alert("Failed to process");
                       }
                       $('#addEditProExpertise').modal('hide');
                   }).catch(function (ex) {
                       $('#ajaxSpinnerContainer').hide();
                       JSAlert.alert("Failed to process");
                   });
            }
        }
        else
        {
            if ($scope.proExpertiseInfo.Name == null || $scope.proExpertiseInfo.Name == '')
                $scope.NameValidation = true;
            if ($scope.proExpertiseInfo.Value == null || $scope.proExpertiseInfo.Value == '')
                $scope.ValueValidation = true;
        }

    }
    $scope.DeleteProfessionalExpertise = function (proExpertiseInfo) {
        JSAlert.confirm("Are you sure you want to delete this?").then(function (result) {
            // Check if pressed yes
            if (!result)
                return;

            // User pressed yes!
            var data = proExpertiseInfo.lookupId;
            proExpertiseService.DeleteProfessionalExpertise(data)
               .then(function (res) {

                   if (res.data.ResponseCode == 200) {
                       JSAlert.alert(res.data.Message);
                       $scope.GetAllProfessionalExpertise();
                      // var index = $scope.FaqData.indexOf(data);
                      // $scope.FaqData.splice(index, 1);
                   } else {
                       JSAlert.alert("Failed to process");
                   }
                   $('#addEditProExpertise').modal('hide');
                   $('#ajaxSpinnerContainer').hide();
               }).catch(function (ex) {
                   $('#ajaxSpinnerContainer').hide();
                   JSAlert.alert("Failed to process");
               });


        });
    };
});