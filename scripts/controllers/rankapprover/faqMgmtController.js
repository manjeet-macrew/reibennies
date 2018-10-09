'use strict';

rEIBenniesApp.controller("faqMgmtController", function ($scope, $rootScope, rankService, userService, DTColumnDefBuilder, faqService) {
    $rootScope.IsFAQMgmt = true;
    $rootScope.SelectedPage = "FAQMgmt";
    $scope.IsList = true;
    $rootScope.CurrentYear = getCurrentYear();
    $scope.dtColumnDefs = [
     DTColumnDefBuilder.newColumnDef(0).notSortable()
    ];
    $scope.FaqData = [];
    $scope.GetAllFaq = function () {
        $scope.FaqData = [];
        var userId = sessionStorage.getItem('UID')
        faqService.GetAllFaq()
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.FaqData = res.data.ResponseData[0].FaqsInfoData;
                 } else {
                     JSAlert.alert("Failed to load users data");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load users data");
             });
    }

    $scope.GetAllFaq();

    $scope.OpenModal = function (faqInfo) {

        $scope.FaqInfo = faqInfo;
    };
    $scope.addfaqOpenModal = function () {
        $scope.FaqInfo = {
            "faqId": 0,
            "title": "",
            "description": "",
            "createDate": formatDate(new Date),
            "createdBy": sessionStorage.getItem('UID')
        };
    };
    $scope.Submit = function (faqInfo) {
        var data = "";
        if (faqInfo.faqId > 0) {
            data = {
                faqId: faqInfo.faqId,
                title: faqInfo.title,
                description: faqInfo.description,
                //modifiedDate: formatDate(new Date),
                modifiedBy: sessionStorage.getItem('UID')
            };
            faqService.UpdateFaq(data)
               .then(function (res) {

                   if (res.data.ResponseCode == 200) {
                       JSAlert.alert(res.data.Message);
                   } else {
                       JSAlert.alert("Failed to process");
                   }
                   $('#addEditFaq').modal('hide');
               }).catch(function (ex) {
                   $('#ajaxSpinnerContainer').hide();
                   JSAlert.alert("Failed to process");
               });
        }
        else {
            data = {
                faqId: faqInfo.faqId,
                title: faqInfo.title,
                description: faqInfo.description,
                //createDate: faqInfo.createDate,
                createdBy: faqInfo.createdBy,
            };
            faqService.CreateFaq(data)
               .then(function (res) {
                   if (res.data.ResponseCode == 200) {
                       JSAlert.alert(res.data.Message);
                       $scope.GetAllFaq();
                   } else {
                       JSAlert.alert("Failed to process");
                   }
                   $('#addEditFaq').modal('hide');
               }).catch(function (ex) {
                   $('#ajaxSpinnerContainer').hide();
                   JSAlert.alert("Failed to process");
               });
        }

    }
    $scope.DeletFaq = function (faqInfo) {
        JSAlert.confirm("Are you sure you want to delete this?").then(function (result) {
            // Check if pressed yes
            if (!result)
                return;

            // User pressed yes!
            var data = faqInfo.faqId;
            faqService.DeleteFaq(data)
               .then(function (res) {

                   if (res.data.ResponseCode == 200) {
                       JSAlert.alert(res.data.Message);
                       var index = $scope.FaqData.indexOf(data);
                       $scope.FaqData.splice(index, 1);
                   } else {
                       JSAlert.alert("Failed to process");
                   }
                   $('#addEditFaq').modal('hide');
                   $('#ajaxSpinnerContainer').hide();
               }).catch(function (ex) {
                   $('#ajaxSpinnerContainer').hide();
                   JSAlert.alert("Failed to process");
               });


        });
    };

  
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