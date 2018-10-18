'use strict';

rEIBenniesApp.controller("homeController", function ($scope, $rootScope, homeService) {
    $rootScope.IsHome = true;
    $rootScope.SelectedPage = "Home";
    $rootScope.CurrentYear = getCurrentYear();
    $rootScope.IsLoginPage = false;
    $rootScope.IsHelp = false;
    
    $rootScope.Greeting = sessionStorage.getItem('FN') + " " + sessionStorage.getItem('LN')

    $rootScope.UserRole = sessionStorage.getItem('Role');
    $scope.UserId = sessionStorage.getItem('UID');

    $scope.options = { title: { display: true, text: "" } };
   
    

    $scope.GetTotalNumberOfbennies=function()
    {
        var userId = $scope.UserId;
        $scope.TotalNoOfBennies = [];
        homeService.GetTotalNoOfBennies(userId)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.TotalNoOfBennies = res.data.ResponseData[0];
                 } else {
                     JSAlert.alert("Bennies Not Found");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load Bennies");
             });
    }

    $scope.GetTotalNoOfBenniesSignedUpPerMonth = function () {
        var userId = $scope.UserId;
        $scope.TotalNoOfBenniesSignedUpPerMonth = [];
        homeService.GetTotalNoOfBenniesSignedUpPerMonth(userId)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.TotalNoOfBenniesSignedUpPerMonth = res.data.ResponseData[0].BenniesSignedUpPerMonthInfoData;

                         var months = $scope.TotalNoOfBenniesSignedUpPerMonth.map(function (a) { return a.month; });
                         var users = $scope.TotalNoOfBenniesSignedUpPerMonth.map(function (a) { return a.users; });
                         $scope.SetChartValues(months, users, "BenniesByMonth");

                 } else {
                    // JSAlert.alert("Bennies Not Found");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load Bennies");
             });
    }

    $scope.GetTotalNoOfSubscriptions = function () {
        var userId = $scope.UserId;
        $scope.TotalNoOfSubscriptions = [];
        homeService.GetTotalNoOfSubscriptions(userId)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.TotalNoOfSubscriptions = res.data.ResponseData[0].TotalSubscriptionInfoData;

                     var subscriptionTypes = $scope.TotalNoOfSubscriptions.map(function (obj) { return obj.title; })
                     var subscriptionCounts = $scope.TotalNoOfSubscriptions.map(function (obj) { return obj.totalcount; })
                     $scope.SetChartValues(subscriptionTypes, subscriptionCounts,"SubscriptionByType")
                 } else {
                     // JSAlert.alert("Bennies Not Found");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load Bennies");
             });
    }

    $scope.GetTotalNoOfHelpRequestPerMonth = function () {
        var userId = $scope.UserId;
        $scope.TotalNoOfHelpRequestPerMonth = [];
        homeService.GetTotalNoOfHelpRequestPerMonth(userId)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.TotalNoOfHelpRequestPerMonth = res.data.ResponseData[0].TotalHeplRequestsPerMonthInfoData;
                     var helpmonths = $scope.TotalNoOfHelpRequestPerMonth.map(function (obj) { return obj.month; });
                     var helpcounts = $scope.TotalNoOfHelpRequestPerMonth.map(function (obj) { return obj.totalcount; });
                     $scope.SetHelpChartValues(helpmonths, helpcounts);//, "HelpRequestByMonth")
                 } else {
                     // JSAlert.alert("Bennies Not Found");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load Help request");
             });
    }

    $scope.GetTotalRevenuePerMonth = function () {
        var userId = $scope.UserId;
        $scope.TotalRevenuePerMonth = [];
        homeService.GetTotalRevenuePerMonth(userId)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.TotalRevenuePerMonth = res.data.ResponseData[0].TotalRevenuePerMonthInfoData;
                     var revmonths = $scope.TotalRevenuePerMonth.map(function (obj) { return obj.month; });
                     var revmonthbytotal = $scope.TotalRevenuePerMonth.map(function (obj) { return obj.revenue; });
                     $scope.SetRevenueChartValues(revmonths, revmonthbytotal);
                 } else {
                     // JSAlert.alert("Bennies Not Found");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load Bennies");
             });
    }
    
    $scope.GetTotalNoOfBenniesRankings = function () {
        var userId = $scope.UserId;
        $scope.TotalNoOfBenniesRankings = [];
        homeService.GetTotalNoOfBenniesRankings(userId)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.TotalNoOfBenniesRankings = res.data.ResponseData[0];
                 } else {
                     // JSAlert.alert("Bennies Not Found");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load Bennies");
             });
    }

    $scope.GetTotalNoOfBenniesSignedUpPerState = function () {
        var userId = $scope.UserId;
        $scope.TotalNoOfBenniesSignedUpPerState = [];
        homeService.GetTotalNoOfBenniesSignedUpPerState(userId)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.TotalNoOfBenniesSignedUpPerState = res.data.ResponseData[0].BenniesSignedUpPerStateInfoData;

                     var states = $scope.TotalNoOfBenniesSignedUpPerState.map(function (obj) { return obj.stateName; })
                     var counts = $scope.TotalNoOfBenniesSignedUpPerState.map(function (obj) { return obj.totalcount; })
                     $scope.SetChartValues(states, counts, "BenniesByState")
                 } else {
                     // JSAlert.alert("Bennies Not Found");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load Bennies");
             });
    }

    $scope.SetChartValues=function(chartLabels,chartData,chartName)
    {
        if (chartName == "BenniesByMonth") {
            $scope.benniesPerMonthLabels = chartLabels;
            $scope.benniesPerMonthdata = chartData;
        }
        else if(chartName=="SubscriptionByType")
        {
            $scope.subscriptionByTypeLabels = chartLabels;
            $scope.subscriptionByTypeData = chartData;
        }
        else if(chartName="BenniesByState")
        {
            $scope.benniesByStateLabels = chartLabels;
            $scope.benniesByStateData = chartData;
        }
    }

    $scope.SetHelpChartValues = function (chartLabels, chartData) {
            $scope.helpRequestByMonthLabels = chartLabels;
            $scope.helpRequestByMonthData = chartData;
    }

    $scope.SetRevenueChartValues = function (chartLabels, chartData) {
        $scope.revenueByMonthLabels = chartLabels;
        $scope.revenueByMonthData = chartData;
    }

    $scope.GetTotalNumberOfbennies();
    $scope.GetTotalNoOfBenniesSignedUpPerMonth();
    $scope.GetTotalNoOfSubscriptions();
    $scope.GetTotalRevenuePerMonth();
    $scope.GetTotalNoOfHelpRequestPerMonth();
    $scope.GetTotalNoOfBenniesRankings();
    $scope.GetTotalNoOfBenniesSignedUpPerState();
});