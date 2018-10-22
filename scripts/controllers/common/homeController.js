'use strict';

rEIBenniesApp.controller("homeController", function ($scope, $rootScope, homeService, userService) {
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
    $scope.HelpRequestMethCallCount = 0;
    $scope.GetTotalNoOfHelpRequestPerMonth = function (requestType) {
        var userId = $scope.UserId;
        $scope.Data = {
            userId: userId,
            requestType: requestType
        };
        var data = $scope.Data;
        var queryString = $.param(data);
        if(requestType=='A')
            $scope.TotalNoOfHelpRequestPerMonth = [];
        else if (requestType == 'Y')
            $scope.TotalResolvedHelpRequestPerMonth = [];
        else if (requestType == 'N')
            $scope.TotalUnResolvedHelpRequestPerMonth = [];
        homeService.GetTotalNoOfHelpRequestPerMonth(queryString)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                     {
                         $scope.HelpRequestMethCallCount++
                         debugger;
                         if (requestType == 'A')
                             $scope.TotalNoOfHelpRequestPerMonth =res.data.ResponseData[0].TotalHeplRequestsPerMonthInfoData.map(function (obj) { return obj.totalcount; });
                     else if (requestType == 'Y')
                         $scope.TotalResolvedHelpRequestPerMonth =res.data.ResponseData[0].TotalHeplRequestsPerMonthInfoData.map(function (obj) { return obj.totalcount; });
                     else if (requestType == 'N')
                     {
                         $scope.TotalUnResolvedHelpRequestPerMonth = res.data.ResponseData[0].TotalHeplRequestsPerMonthInfoData.map(function (obj) { return obj.totalcount; });
                         
                     }
                         if ($scope.HelpRequestMethCallCount == 3)
                         {
                             $scope.months = res.data.ResponseData[0].TotalHeplRequestsPerMonthInfoData.map(function (obj) { return obj.month; });
                             $scope.HelpRequestChart();
                         }
                           
                        
                     }
                    
                   
                     //$scope.SetHelpChartValues(helpmonths, helpcounts);//, "HelpRequestByMonth")
                 } else {
                      JSAlert.alert("Help Request Not Found");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed To Load Help Request");
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
                     var revtotalbymonth = $scope.TotalRevenuePerMonth.map(function (obj) { return obj.revenue; });
                     $scope.SetRevenueChartValues(revmonths, revtotalbymonth);
                 } else {
                     // JSAlert.alert("Bennies Not Found");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load RevenuePerMonth");
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
                 JSAlert.alert("Failed to load Bennies By State");
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

    $scope.SetYearRevenueChartValues = function (chartLabels, chartData) {
        debugger;
        $scope.revenueByYearLabels = chartLabels;
        $scope.revenueByYearData = chartData;
    }

    $scope.UserIds = [];
    $scope.GetAllUsers = function () {

        $scope.UserIds = [];
        var userId = sessionStorage.getItem('UID')
        userService.GetAllUsers()
             .then(function (res) {

                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                     $scope.UserIds = res.data.ResponseData[0].AllUsersInfoData.map(function (obj) { return obj.userId; });
                 } else {
                     JSAlert.alert("Failed to load users data");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load users data");
             });
    }

    $scope.OpenSendNotificationModal = function () {
        $scope.GetAllUsers();
        $scope.bodyValidation = false;
        $scope.titleValidation = false;
        $scope.NotificationData = {
            userId: 0,
            body: "",
            title: ""
        };
    }

    $scope.SendNotificationSubmit = function (notificationData) {
        $scope.bodyValidation = false;
        $scope.titleValidation = false;
        $scope.SentNotificationCount = 0;
        $scope.RequestProcessed = 0;
        if ($scope.notificationform.$valid) {
            angular.forEach($scope.UserIds, function (val, key) {
                $scope.Data = {
                    userId: val,
                    body: notificationData.body,
                    title: notificationData.title
                };
                var data = $scope.Data;
                var queryString = $.param(data);
                userService.SendFcmNotification(queryString)
                 .then(function (res) {
                     if (res.data.ResponseCode == 200) {
                         $scope.SentNotificationCount++;
                         $scope.RequestProcessed++;
                         if ($scope.RequestProcessed == $scope.UserIds.length) {
                             $('#sendNotificationModal').modal('hide');
                             JSAlert.alert("Notification Sent SuccessFully To " + $scope.SentNotificationCount + " Out Of " + $scope.UserIds.length + " Users.");
                         }
                     } else {
                         $scope.RequestProcessed++;
                         if ($scope.RequestProcessed == $scope.UserIds.length) {
                             $('#sendNotificationModal').modal('hide');
                             JSAlert.alert("Notification Sent SuccessFully To " + $scope.SentNotificationCount + " Out Of " + $scope.UserIds.length + " Users.");
                         }
                        // JSAlert.alert("Failed to Sent Notification");
                     }
                 }).catch(function (ex) {
                     $('#ajaxSpinnerContainer').hide();
                     $scope.RequestProcessed++;
                     if ($scope.RequestProcessed == $scope.UserIds.length) {
                         $('#sendNotificationModal').modal('hide');
                         JSAlert.alert("Notification Sent SuccessFully To " + $scope.SentNotificationCount + " Out Of " + $scope.UserIds.length + " Users.");
                     }
                 });
            });
        }
        else {
            if ($scope.NotificationData.body == null || $scope.NotificationData.body == '')
                $scope.bodyValidation = true;
            if ($scope.NotificationData.title == null || $scope.NotificationData.title == '')
                $scope.titleValidation = true;
        }
    }

    $scope.GetTotalRevenuePerYear = function () {
        var userId = $scope.UserId;
        $scope.TotalRevenuePerYear = [];
        homeService.GetTotalRevenuePerYear(userId)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     debugger;
                     if (res.data.ResponseData[0] != null)
                         $scope.TotalRevenuePerYear = res.data.ResponseData[0].TotalRevenuePerYearInfoData;
                     var revyears = $scope.TotalRevenuePerYear.map(function (obj) { return obj.year; });
                     var revtotalbyyear = $scope.TotalRevenuePerYear.map(function (obj) { return obj.revenue; });
                     $scope.SetYearRevenueChartValues(revyears, revtotalbyyear);
                 } else {
                     JSAlert.alert("Revenue Not Found");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load RevenuePerYear");
             });
    }

    $scope.HelpRequestChart = function () {

        var helpRequestCanvas = document.getElementById("cnhelpreqbymonth");

        Chart.defaults.global.defaultFontFamily = "Lato";
        Chart.defaults.global.defaultFontSize = 15;

        var months = $scope.TotalUnResolvedHelpRequestPerMonth.map(function (obj) { return obj.month; });

        var dataTotalHelpRequest = {
            label: "Total Request",
            data: $scope.TotalNoOfHelpRequestPerMonth,
            lineTension: 0.3,
            fill: false,
            borderColor: 'Black',
            backgroundColor: 'transparent',
            pointBorderColor: 'black',
            pointBackgroundColor: 'lightgreen',
            pointRadius: 5,
            pointHoverRadius: 5,
            pointHitRadius: 5,
            pointBorderWidth: 1,
            pointStyle: 'rect'
        };

        var dataResolvedHelpRequest = {
            label: "Resolved Request",
            data: $scope.TotalResolvedHelpRequestPerMonth,
            lineTension: 0.3,
            fill: false,
            borderColor: 'Green',
            backgroundColor: 'transparent',
            pointBorderColor: 'purple',
            pointBackgroundColor: 'lightgreen',
            pointRadius: 5,
            pointHoverRadius: 5,
            pointHitRadius: 1,
            pointBorderWidth: 2
        };

        var dataUnResolvedHelpRequest = {
            label: "UnResolved Request",
            data: $scope.TotalUnResolvedHelpRequestPerMonth,
            lineTension: 0.3,
            fill: false,
            borderColor: 'red',
            backgroundColor: 'transparent',
            pointBorderColor: 'red',
            pointBackgroundColor: 'lightgreen',
            pointRadius: 5,
            pointHoverRadius: 5,
            pointHitRadius: 5,
            pointBorderWidth: 1,
            pointStyle: 'dot'
        };

        var helpData = {
            labels: $scope.months,
            datasets: [dataTotalHelpRequest, dataResolvedHelpRequest, dataUnResolvedHelpRequest]
        };

        var chartOptions = {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 2,
                    fontColor: 'black'
                }
            }
        };
        var lineChart = new Chart(helpRequestCanvas, {
            type: 'line',
            data: helpData,
            options: chartOptions
        });
    }
   
    $scope.GetTotalNumberOfbennies();
    $scope.GetTotalNoOfBenniesSignedUpPerMonth();
    $scope.GetTotalNoOfSubscriptions();
    $scope.GetTotalRevenuePerMonth();
    $scope.GetTotalNoOfHelpRequestPerMonth('A');
    $scope.GetTotalNoOfHelpRequestPerMonth('Y');
    $scope.GetTotalNoOfHelpRequestPerMonth('N');
    $scope.GetTotalNoOfBenniesRankings();
    $scope.GetTotalNoOfBenniesSignedUpPerState();
    $scope.GetTotalRevenuePerYear();
});