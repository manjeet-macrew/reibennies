'use strict';

rEIBenniesApp.controller("marketplacesController", function ($scope, $rootScope, DTColumnDefBuilder, helpSupportService, userService, $filter) {
    $rootScope.IsMarketPlaces = true;
    $rootScope.SelectedPage = "MarketPlaces";
    $rootScope.CurrentYear = getCurrentYear();

    $scope.dtColumnDefs = [
     DTColumnDefBuilder.newColumnDef(0).notSortable()
    ];

    $scope.MarketPlaces = [];
    $scope.GetAllMarketPlaces = function () {
        $scope.NotificationHistory = [];
        userService.GetAllMarketPlaces()
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.MarketPlaces = res.data.ResponseData[0].MarketPlaceInfoData;
                     console.log($scope.MarketPlaces);
                 } else {
                     JSAlert.alert("Failed to load market places");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load market places");
             });
    }
    $scope.MarketPlaceDetail = {};
    $scope.OpenModel = function (req) {
        $scope.MarketPlaceDetail = req;
      
    };

    $scope.GetAllMarketPlaces();
});

