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

    $scope.options = {
        title: { display: true, text: "" }, scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

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
        debugger;
        var userId = $scope.UserId;
        $scope.TotalNoOfBenniesSignedUpPerMonth = [];
        homeService.GetTotalNoOfBenniesSignedUpPerMonth(userId)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.TotalNoOfBenniesSignedUpPerMonth = res.data.ResponseData[0].BenniesSignedUpPerMonthInfoData;
                        var months = $scope.TotalNoOfBenniesSignedUpPerMonth.map(function (a) { return a.month; });
                         var users = $scope.TotalNoOfBenniesSignedUpPerMonth.map(function (a) { return a.users; });
                         //months.unshift("");
                         //users.unshift("0");
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
                     //subscriptionTypes.unshift("");
                     //subscriptionCounts.unshift("0");
                     debugger;
                     $scope.SetChartValues(subscriptionTypes, subscriptionCounts, "SubscriptionByType")
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
                         if (requestType == 'A')
                         {
                             $scope.TotalNoOfHelpRequestPerMonth = res.data.ResponseData[0].TotalHeplRequestsPerMonthInfoData;//.map(function (obj) { return obj.totalcount; });
                         }
                         else if (requestType == 'Y')
                         {
                             $scope.TotalResolvedHelpRequestPerMonth = res.data.ResponseData[0].TotalHeplRequestsPerMonthInfoData;//.map(function (obj) { return obj.totalcount; });
                         }
                         else if (requestType == 'N')
                         {
                             $scope.TotalUnResolvedHelpRequestPerMonth = res.data.ResponseData[0].TotalHeplRequestsPerMonthInfoData;//.map(function (obj) { return obj.totalcount; });
                         }
                         if ($scope.HelpRequestMethCallCount == 3)
                         {
                            // $scope.months = res.data.ResponseData[0].TotalHeplRequestsPerMonthInfoData.map(function (obj) { return obj.month; });
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
                     //revmonths.unshift("");
                     //revtotalbymonth.unshift("0");
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
                     //states.unshift("");
                     //counts.unshift("0");
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
            if (chartLabels.length == 0 && chartData.length ==0) {
                $scope.noRecordBenniesByMonth = true;
            }
            else {
                $scope.noRecordBenniesByMonth = false;
            }
            $scope.benniesPerMonthLabels = chartLabels;
            $scope.benniesPerMonthdata = chartData;
        }
        else if(chartName=="SubscriptionByType")
        {
            if (chartLabels.length ==0 && chartData.length ==0) {
                $scope.noRecordSubByType = true;
            }
            else {
                $scope.noRecordSubByType  = false;
            }
            chartLabels.unshift("");
            chartData.unshift("0");
            $scope.subscriptionByTypeLabels = chartLabels;
            $scope.subscriptionByTypeData = chartData;
        }
        else if(chartName="BenniesByState")
        {
            if (chartLabels.length ==0  && chartData.length ==0) {
                $scope.noRecordBennByState = true;
            }
            else {
                $scope.noRecordBennByState = false;
            }
            $scope.benniesByStateLabels = chartLabels;
            $scope.benniesByStateData = chartData;
        }
    }

    $scope.SetHelpChartValues = function (chartLabels, chartData) {
        if (chartLabels.length == 0 && chartData.length ==0) {
            $scope.noRecordHelp = true;
        }
        else {
            $scope.noRecordHelp = true;
            $scope.helpRequestByMonthLabels = chartLabels;
            $scope.helpRequestByMonthData = chartData;

        }
           
    }

    $scope.SetRevenueChartValues = function (chartLabels, chartData) {
       
        if (chartLabels.length == 0 && chartData.length ==0 )
        {
            $scope.noRecordRevByMon = true;
        }
        else
        {
            $scope.noRecordRevByMon = false;
            $scope.revenueByMonthLabels = chartLabels;
            $scope.revenueByMonthData = chartData;
        }
       
    }

    $scope.SetYearRevenueChartValues = function (chartLabels, chartData) {
        if (chartLabels.length == 0 && chartData.length ==0) {
            $scope.noRecordRevByYear = true;
        }
        else {
            $scope.noRecordRevByYear = false;
            $scope.revenueByYearLabels = chartLabels;
            $scope.revenueByYearData = chartData;
        }
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
    $scope.GetTotalRevenuePerYear = function () {
        var userId = $scope.UserId;
        $scope.TotalRevenuePerYear = [];
        homeService.GetTotalRevenuePerYear(userId)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.TotalRevenuePerYear = res.data.ResponseData[0].TotalRevenuePerYearInfoData;
                     var revyears = $scope.TotalRevenuePerYear.map(function (obj) { return obj.year; });
                     var revtotalbyyear = $scope.TotalRevenuePerYear.map(function (obj) { return obj.revenue; });
                     //revyears.unshift("");
                     //revtotalbyyear.unshift(0);
                     $scope.SetYearRevenueChartValues(revyears, revtotalbyyear);
                 } else {
                     JSAlert.alert("Revenue Not Found");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load RevenuePerYear");
             });
    }

    $scope.CreateHelpRequestChartdata = function () {

        $scope.mainHelpRequestObj = [{ month: "January", helpRequestCount: 0, unResolvedHelpRequestCount: 0, resolvedHelpRequestCount: 0 },
        { month: "February", helpRequestCount: 0, unResolvedHelpRequestCount: 0, resolvedHelpRequestCount: 0 },
        { month: "March", helpRequestCount: 0, unResolvedHelpRequestCount: 0, resolvedHelpRequestCount: 0 },
        { month: "April", helpRequestCount: 0, unResolvedHelpRequestCount: 0, resolvedHelpRequestCount: 0 },
        { month: "May", helpRequestCount: 0, unResolvedHelpRequestCount: 0, resolvedHelpRequestCount: 0 },
        { month: "June", helpRequestCount: 0, unResolvedHelpRequestCount: 0, resolvedHelpRequestCount: 0 },
        { month: "July", helpRequestCount: 0, unResolvedHelpRequestCount: 0, resolvedHelpRequestCount: 0 },
        { month: "August", helpRequestCount: 0, unResolvedHelpRequestCount: 0, resolvedHelpRequestCount: 0 },
        { month: "September", helpRequestCount: 0, unResolvedHelpRequestCount: 0, resolvedHelpRequestCount: 0 },
        { month: "October", helpRequestCount: 0, unResolvedHelpRequestCount: 0, resolvedHelpRequestCount: 0 },
        { month: "November", helpRequestCount: 0, unResolvedHelpRequestCount: 0, resolvedHelpRequestCount: 0 },
        { month: "December", helpRequestCount: 0, unResolvedHelpRequestCount: 0, resolvedHelpRequestCount: 0 }];

        for (var i = 0; i < $scope.mainHelpRequestObj.length; i++) {
            var countHelpRequest = $scope.TotalNoOfHelpRequestPerMonth.filter(function (node) {
                return node.month == $scope.mainHelpRequestObj[i].month;
            });

            var countResolvedHelpRequest = $scope.TotalResolvedHelpRequestPerMonth.filter(function (node) {
                return node.month == $scope.mainHelpRequestObj[i].month;
            });

            var countUnResolvedHelpRequest = $scope.TotalUnResolvedHelpRequestPerMonth.filter(function (node) {
                return node.month == $scope.mainHelpRequestObj[i].month;
            });
            if (countHelpRequest.length > 0)
                $scope.mainHelpRequestObj[i].helpRequestCount = countHelpRequest[0].totalcount;
            if (countResolvedHelpRequest.length > 0)
                $scope.mainHelpRequestObj[i].resolvedHelpRequestCount = countResolvedHelpRequest[0].totalcount;
            if (countUnResolvedHelpRequest.length > 0)
                $scope.mainHelpRequestObj[i].unResolvedHelpRequestCount = countUnResolvedHelpRequest[0].totalcount;
        }
       // console.log($scope.mainHelpRequestObj);
        $scope.HelpRequestObj = [];
        for (let obj of $scope.mainHelpRequestObj) {
            if (obj.helpRequestCount != 0 || obj.resolvedHelpRequestCount != 0 || obj.unResolvedHelpRequestCount != 0) {
                $scope.HelpRequestObj.push(obj);
               // $scope.mainHelpRequestObj.splice($scope.mainHelpRequestObj.indexOf(obj), 1);
            }
        }
        console.log($scope.ModifiedObj);
    }
    
    $scope.HelpRequestChart = function () {
        $scope.TotalResolvedHelpRequestPerMonth
        $scope.TotalUnResolvedHelpRequestPerMonth
        if ($scope.TotalNoOfHelpRequestPerMonth.length == 0 && $scope.TotalNoOfHelpRequestPerMonth.length == 0 && $scope.TotalNoOfHelpRequestPerMonth.length == 0) {
            $scope.noRecordHelpChart = true;
        }
        else {
            $scope.noRecordHelpChart = false;

            $scope.CreateHelpRequestChartdata();
            var helpRequestCanvas = document.getElementById("cnhelpreqbymonth");

            Chart.defaults.global.defaultFontFamily = "Lato";
            Chart.defaults.global.defaultFontSize = 15;
            var months = $scope.HelpRequestObj.map(function (obj) { return obj.month; });
            var helpRequestPerMonth = $scope.HelpRequestObj.map(function (obj) { return obj.helpRequestCount; });
            var unResolvedHelpRequestPerMonth = $scope.HelpRequestObj.map(function (obj) { return obj.unResolvedHelpRequestCount; });
            var resolvedHelpRequestPerMonth = $scope.HelpRequestObj.map(function (obj) { return obj.resolvedHelpRequestCount; });

            var dataTotalHelpRequest = {
                label: "Total Request",
                data: helpRequestPerMonth,
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
                data: resolvedHelpRequestPerMonth,
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
                data: unResolvedHelpRequestPerMonth,
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
                labels: months,
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
    }
    if ($rootScope.UserRole == "App Admin" || $rootScope.UserRole == "Staff")
    {
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
    }
  
});