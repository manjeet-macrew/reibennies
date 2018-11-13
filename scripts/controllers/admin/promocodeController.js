'use strict';

rEIBenniesApp.controller("promocodeController", function ($scope, $rootScope, DTColumnDefBuilder, promoCodeService,  $filter) {
    $rootScope.IsPromoCodes = true;
    $rootScope.SelectedPage = "PromoCodes";
    $scope.promoCodeValidation = false;
    $scope.durationValidation = false;
    $scope.SelectedTab = 'A';
    $scope.dtColumnDefs = [
   DTColumnDefBuilder.newColumnDef(0).notSortable()
    ];
    $scope.AllPromoCodeData = [];
    $scope.GetAllPromoCodes = function (type) {
        $scope.AllPromoCodeData = [];
        $scope.UsedPromoCodeData = [];
        $scope.UnUsedPromoCodeData = [];
        var userId = sessionStorage.getItem('UID');
        if (type == "A")
        {
            $scope.Data = {
                isApplied: type,
                userId: userId
            };
            var queryString = $.param($scope.Data);
            promoCodeService.GetAllPromoCodes(queryString)
                 .then(function (res) {
                     if (res.data.ResponseCode == 200) {
                         if (res.data.ResponseData[0] != null)
                             $scope.AllPromoCodeData = res.data.ResponseData[0].PromoCodeData;
                     } else {
                         JSAlert.alert("Failed to load Promocodes data");
                     }
                 }).catch(function (ex) {
                     $('#ajaxSpinnerContainer').hide();
                     JSAlert.alert("Failed to load Promocodes data");
                 });
        }
        else if (type == "Y")
        {
            $scope.Data = {
                isApplied: type,
                userId: userId
            };
            var queryString = $.param($scope.Data);
            promoCodeService.GetAllPromoCodes(queryString)
                 .then(function (res) {
                     if (res.data.ResponseCode == 200) {
                         if (res.data.ResponseData[0] != null)
                             $scope.UsedPromoCodeData = res.data.ResponseData[0].PromoCodeData;
                     } else {
                         JSAlert.alert("Failed to load Promocodes data");
                     }
                 }).catch(function (ex) {
                     $('#ajaxSpinnerContainer').hide();
                     JSAlert.alert("Failed to load Promocodes data");
                 });
        }
        else
        {
            $scope.Data = {
                isApplied: type,
                userId: userId
            };
            var queryString = $.param($scope.Data);
            promoCodeService.GetAllPromoCodes(queryString)
                 .then(function (res) {

                     if (res.data.ResponseCode == 200) {
                         if (res.data.ResponseData[0] != null)
                             $scope.UnUsedPromoCodeData = res.data.ResponseData[0].PromoCodeData;
                     } else {
                         JSAlert.alert("Failed to load Promocodes data");
                     }
                 }).catch(function (ex) {
                     $('#ajaxSpinnerContainer').hide();
                     JSAlert.alert("Failed to load Promocodes data");
                 });
        }
        
    };
    $scope.GetAllPromoCodes("A");
    $scope.GeneratePromoCode = function () {
        var userId = sessionStorage.getItem('UID');
        promoCodeService.GeneratePromoCode(userId)
        .then(function (res) {
            if(res.data.ResponseCode==200)
            {
                if (res.data.ResponseData[0] != null)
                    $scope.PromoCodeInfo.promoCode = res.data.ResponseData[0];
            }
            else
            {
                JSAlert.alert("Failed to Generate PromoCode");
            }
        }).catch(function (ex) {
            $('#ajaxSpinnerContainer').hide();
            JSAlert.alert("Failed to Generate PromoCode");
        });
    };
    $scope.Submit = function (PromoCodeInfo) {
        $scope.promoCodeValidation = false;
        $scope.durationValidation = false;
        if ($scope.promoCodeform.$valid)
        {
            var userId= sessionStorage.getItem('UID');
            var promoCodeId=PromoCodeInfo.promoCodeId;
            if (promoCodeId>0)
            {
                var payLoad = {
                    promoCode: PromoCodeInfo.promoCode,
                    promoCodeDuration: PromoCodeInfo.promoCodeDuration,
                    modifiedBy: userId,
                    promoCodeId: promoCodeId,
                    isMultiUser: PromoCodeInfo.isMultiUser
                };
                promoCodeService.UpdatePromoCode(payLoad)
                .then(function (res) {
                    if (res.data.ResponseCode == 200) {
                        JSAlert.alert("Updated Successfully");
                        if ($scope.SelectedTab == 'A')
                            $scope.GetAllPromoCodes('A');
                        else if ($scope.SelectedTab == 'N')
                            $scope.GetAllPromoCodes('N');
                        else
                            $scope.GetAllPromoCodes('Y');
                    } else {
                        JSAlert.alert("Failed to update");
                    }
                    $('#ajaxSpinnerContainer').hide();
                    $('#managePromoCode').modal('hide');

                }).catch(function (ex) {
                    $('#ajaxSpinnerContainer').hide();
                    JSAlert.alert("Failed to Update PromoCode");
                })
            }
            else
            {
                var payLoad = {
                    promocode: PromoCodeInfo.promoCode,
                    promoCodeDuration: PromoCodeInfo.promoCodeDuration,
                    createdBy: userId,
                    isMultiUser: PromoCodeInfo.isMultiUser
                };
                promoCodeService.CreatePromoCode(payLoad)
                .then(function (res) {
                    if (res.data.ResponseCode == 200) {

                        JSAlert.alert("PromoCode Saved Successfully");
                        if ($scope.SelectedTab == 'A')
                            $scope.GetAllPromoCodes('A');
                        else if ($scope.SelectedTab == 'N')
                            $scope.GetAllPromoCodes('N');
                        else
                            $scope.GetAllPromoCodes('Y');

                        // JSAlert.alert(res.data.Message);
                    } else {
                        JSAlert.alert("Failed to save");
                    }
                    $('#ajaxSpinnerContainer').hide();
                    $('#managePromoCode').modal('hide');

                }).catch(function (ex) {
                    $('#ajaxSpinnerContainer').hide();
                    JSAlert.alert("Failed to Save PromoCode");
                })

            }
        }
        else
        {
           
            if ($scope.PromoCodeInfo.promoCode == null || $scope.PromoCodeInfo.promoCode == '')
                $scope.promoCodeValidation = true;
            if ($scope.PromoCodeInfo.promoCodeDuration == null || $scope.PromoCodeInfo.promoCodeDuration == '')
                $scope.durationValidation = true;
        }
    };

    $scope.addPromoCodeOpenModal = function () {
        $scope.PromoCodeInfo = {
            promoCode: "",
            promoCodeDuration: "",
            promoCodeId: 0
        };
    };

    $scope.OpenModal=function(n)
    {
        $scope.PromoCodeInfo = {
            promoCode: n.promoCode,
            promoCodeDuration: n.promoCodeDuration,
            promoCodeId: n.promoCodeId,
            isMultiUser:n.isMultiUser
        };
    }

    $scope.DeletePromoCode = function (n) {
        var promoCodeId = n.promoCodeId;
        promoCodeService.DeletePromoCode(promoCodeId)
        .then(function (res) {
            if (res.data.ResponseCode == 200) {

                JSAlert.alert("PromoCode Deleted Successfully");
                if ($scope.SelectedTab == 'A')
                    $scope.GetAllPromoCodes('A');
                else if ($scope.SelectedTab == 'N')
                    $scope.GetAllPromoCodes('N');
                else
                    $scope.GetAllPromoCodes('Y');
             
                // JSAlert.alert(res.data.Message);
            } else {
                JSAlert.alert("Failed to delete");
            }
        }).catch(function (ex) {
            $('#ajaxSpinnerContainer').hide();
            JSAlert.alert("Failed to Delete PromoCode");
        })
    };

    $scope.ShowTab = function (id, element) {
        if (element != undefined) {
            $('.panel-heading.panel-heading-tab1.active_tab').removeClass('active_tab');
            element.currentTarget.parentNode.parentNode.classList.add('active_tab')
        }

        $('.tab-pane.fade.in.active').removeClass('in active');
        $(id).addClass('in active');
        if (id == '#allpromocode') {
            $scope.SelectedTab = 'A';
            $scope.GetAllPromoCodes('A');
        }
        else if (id == '#usedpromocode') {
            $scope.SelectedTab = 'Y';
            $scope.GetAllPromoCodes('Y');
        }
        else if (id == '#unusedpromocode') {
            $scope.SelectedTab = 'N';
            $scope.GetAllPromoCodes('N');
        }
    }

    $scope.addDays=function(stringDate,days)
    {
        var date = new Date(stringDate);
        date.setDate(date.getDate() + parseInt(days));
        return date;
    }
    $scope.ConvertStringToDate = function (stringDate) {
        var date = new Date(stringDate);
        return date;
    }
});