'use strict';

rEIBenniesApp.controller("yearlyReportsController", function ($scope, $rootScope, reportsService) {
    $rootScope.IsYearlyReports = true;
    $rootScope.SelectedPage = "YearlyReports";
    $scope.reportTitle = "";
    $scope.disCreateBtn = true;
    $scope.disYearddl = true;
    $scope.selectedReportType = "";
    $scope.reportDataExist = false;
    $scope.showbenniesbystate = false;
    $scope.showsubscriptionbytype = false;
    $scope.showpermonthbennies = false;
    $scope.options = { title: { display: true, text: "" } };
    $scope.showtitle = true;
    $scope.HelpRequestMethCallCount=0
    $scope.CreateReportByType = function ()
    {
        var reportName = $scope.selectedReportType;
       
        if (reportName == "BenniesPerMonthByYear") {
            $scope.showbenniesbystate = false;
            $scope.showsubscriptionbytype = false;
            $scope.showpermonthbennies = true;
            $scope.showrevenuebymonth = false;
            $scope.showhelprequest = false;
            $scope.showtitle = true;
            $scope.reportTitle = "Total Bennies Per Month"
            $scope.GetTotalNoOfBenniesSignedUpPerMonthByYear();
            }
        else if (reportName == "SubscriptionPerYear") {
            $scope.showbenniesbystate = false;
            $scope.showsubscriptionbytype = true;
            $scope.showpermonthbennies = false;
            $scope.showrevenuebymonth = false;
            $scope.showhelprequest = false;
            $scope.showtitle = true;
            $scope.reportTitle = "Total Subscription By Type";
            $scope.GetTotalNoOfSubscriptionsByYear();
            }
        else if (reportName == "BenniesSignedUpPerState") {
            $scope.showbenniesbystate = true;
            $scope.showsubscriptionbytype = false;
            $scope.showpermonthbennies = false;
            $scope.showrevenuebymonth = false;
            $scope.showhelprequest = false;
            $scope.showtitle = true;
            $scope.reportTitle = "Total Bennies By State"
            $scope.GetTotalNoofBenniesSignedUpPerStateByYear();
            }
        else if (reportName == "RevenueByMonthPerYear") {
            $scope.showbenniesbystate = false;
            $scope.showsubscriptionbytype = false;
            $scope.showpermonthbennies = false;
            $scope.showrevenuebymonth = true;
            $scope.showhelprequest = false;
            $scope.showtitle = true;
            $scope.reportTitle = "Total Revenue Per Month"
            $scope.GetTotalRevenuePerMonthByYear();
            }
        else if (reportName == "HelpRequestByMonthPerYear") {
            $scope.showbenniesbystate = false;
            $scope.showsubscriptionbytype = false;
            $scope.showpermonthbennies = false;
            $scope.showrevenuebymonth = false;
            $scope.showhelprequest = true;
            $scope.showtitle = true;
            $scope.reportTitle = "Total Help Request Per Month"
            $scope.HelpRequestMethCallCount=0
            $scope.GetTotalNoOfHelpRequestPerMonthByYear('A');
            $scope.GetTotalNoOfHelpRequestPerMonthByYear('Y');
            $scope.GetTotalNoOfHelpRequestPerMonthByYear('N');

            }
    }

    $scope.IntializeControls=function()
    {
    
        $scope.reportType = [];
        $scope.reportType = [{ Key: "BenniesPerMonthByYear", Value: "Total Bennies Per Month By Year" },
                             { Key: "SubscriptionPerYear", Value: "Total Subscription Per Year" },
                             { Key: "BenniesSignedUpPerState", Value: "Total Bennies Signed Up Per State" },
                             { Key: "RevenueByMonthPerYear", Value: "Total Revenue By Month" },
                             { Key: "HelpRequestByMonthPerYear", Value: "Total Help Request Per Month By Year" }
                            ];

       
        $scope.reportingYear = [];
        $scope.reportingYear = [
                                { Key: "2016", Value: "2016" },
                                { Key: "2017", Value: "2017" },
                                { Key: "2018", Value: "2018" },
                                { Key: "2019", Value: "2019" }];
    }

    $scope.GetTotalNoOfBenniesSignedUpPerMonthByYear = function () {
        var userId = sessionStorage.getItem('UID');
        var year = $scope.selectedYear;
        $scope.Data = {
            userId: userId,
            year: year
        };
        var queryString = $.param($scope.Data);
        $scope.TotalNoOfBenniesSignedUpPerMonth = [];
        reportsService.GetTotalNoOfBenniesSignedUpPerMonthByYear(queryString)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.TotalNoOfBenniesSignedUpPerMonth = res.data.ResponseData[0].BenniesSignedUpPerMonthInfoData;
                     if ($scope.TotalNoOfBenniesSignedUpPerMonth.length>0) {
                         $scope.reportDataExist = true;
                         var months = $scope.TotalNoOfBenniesSignedUpPerMonth.map(function (a) { return a.month; });
                         var users = $scope.TotalNoOfBenniesSignedUpPerMonth.map(function (a) { return a.users; });
                         $scope.CreateReport(months, users, "BenniesByMonth");
                     }
                     else {
                         $scope.showbenniesbystate = false;
                         $scope.showsubscriptionbytype = false;
                         $scope.showpermonthbennies = false;
                         $scope.showrevenuebymonth = false;
                         $scope.showhelprequest = false;
                         $scope.showtitle = false;
                         JSAlert.alert("No Record Exist For Particular Year");
                     }

                 } else {
                     $scope.showbenniesbystate = false;
                     $scope.showsubscriptionbytype = false;
                     $scope.showpermonthbennies = false;
                     $scope.showrevenuebymonth = false;
                     $scope.showhelprequest = false;
                     $scope.showtitle = false;
                     JSAlert.alert("No Record Exist For Particular Year");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load Bennies");
             });
    }

    $scope.GetTotalNoOfSubscriptionsByYear = function () {
        var userId = sessionStorage.getItem('UID');
        var year = $scope.selectedYear;
        $scope.Data = {
            userId: userId,
            year: year
        };
        var queryString = $.param($scope.Data);
        $scope.TotalNoOfSubscriptions = [];
        reportsService.GetTotalNoOfSubscriptionsByYear(queryString)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.TotalNoOfSubscriptions = res.data.ResponseData[0].TotalSubscriptionInfoData;
                     if ($scope.TotalNoOfSubscriptions.length > 0) {
                         $scope.reportDataExist = true;
                         var subscriptionTypes = $scope.TotalNoOfSubscriptions.map(function (a) { return a.title; });
                         var subscriptionCounts = $scope.TotalNoOfSubscriptions.map(function (a) { return a.totalcount; });
                         $scope.CreateReport(subscriptionTypes, subscriptionCounts, "SubscriptionByType");
                     }
                     else {
                         $scope.showbenniesbystate = false;
                         $scope.showsubscriptionbytype = false;
                         $scope.showpermonthbennies = false;
                         $scope.showrevenuebymonth = false;
                         $scope.showhelprequest = false;
                         $scope.showtitle = false;
                         JSAlert.alert("No Record Exist For Particular Year");
                     }

                 } else {
                     $scope.showbenniesbystate = false;
                     $scope.showsubscriptionbytype = false;
                     $scope.showpermonthbennies = false;
                     $scope.showrevenuebymonth = false;
                     $scope.showhelprequest = false;
                     $scope.showtitle = false;
                     JSAlert.alert("No Record Exist For Particular Year");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to Subscriptions");
             });
    }

    $scope.GetTotalNoofBenniesSignedUpPerStateByYear = function () {
        var userId = sessionStorage.getItem('UID');
        var year = $scope.selectedYear;
        $scope.Data = {
            userId: userId,
            year: year
        };
        var queryString = $.param($scope.Data);
        $scope.TotalNoOfBenniesSignedUpPerState = [];
        reportsService.GetTotalNoofBenniesSignedUpPerStateByYear(queryString)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.TotalNoOfBenniesSignedUpPerState = res.data.ResponseData[0].BenniesSignedUpPerStateInfoData;
                     if ($scope.TotalNoOfBenniesSignedUpPerState.length > 0) {
                         $scope.reportDataExist = true;
                         var states = $scope.TotalNoOfBenniesSignedUpPerState.map(function (a) { return a.stateName; });
                         var counts = $scope.TotalNoOfBenniesSignedUpPerState.map(function (a) { return a.totalcount; });
                         $scope.CreateReport(states, counts,"BenniesByState");
                     }
                     else {
                         $scope.showbenniesbystate = false;
                         $scope.showsubscriptionbytype = false;
                         $scope.showpermonthbennies = false;
                         $scope.showrevenuebymonth = false;
                         $scope.showhelprequest = false;
                         $scope.showtitle = false;
                         JSAlert.alert("No Record Exist For Particular Year");
                     }

                 } else {
                     $scope.showbenniesbystate = false;
                     $scope.showsubscriptionbytype = false;
                     $scope.showpermonthbennies = false;
                     $scope.showrevenuebymonth = false;
                     $scope.showhelprequest = false;
                     $scope.showtitle = false;
                     JSAlert.alert("No Record Exist For Particular Year");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load Subscriptions");
             });
    }

    $scope.GetTotalRevenuePerMonthByYear = function () {
        var userId = sessionStorage.getItem('UID');
        var year = $scope.selectedYear;
        $scope.Data = {
            userId: userId,
            year: year
        };
        var queryString = $.param($scope.Data);
        $scope.TotalRevenuePerMonth = [];
        reportsService.GetTotalRevenuePerMonthByYear(queryString)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     debugger;
                     if (res.data.ResponseData[0] != null)
                         $scope.TotalRevenuePerMonth = res.data.ResponseData[0].TotalRevenuePerMonthInfoData;
                     if ($scope.TotalRevenuePerMonth.length > 0) 
                     {
                        
                         var revmonths = $scope.TotalRevenuePerMonth.map(function (obj) { return obj.month; });
                         var revtotalbymonth = $scope.TotalRevenuePerMonth.map(function (obj) { return obj.revenue; });
                         $scope.CreateRevenueByMonthReport(revmonths, revtotalbymonth);
                     }
                     else
                     {
                         $scope.showbenniesbystate = false;
                         $scope.showsubscriptionbytype = false;
                         $scope.showpermonthbennies = false;
                         $scope.showrevenuebymonth = false;
                         $scope.showhelprequest = false;
                         $scope.showtitle = false;
                         JSAlert.alert("No Record Exist For Particular Year");
                     }
                      
                 } else {
                     $scope.showbenniesbystate = false;
                     $scope.showsubscriptionbytype = false;
                     $scope.showpermonthbennies = false;
                     $scope.showrevenuebymonth = false;
                     $scope.showhelprequest = false;
                     $scope.showtitle = false;
                     JSAlert.alert("No Record Exist For Particular Year");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to Load RevenuePerMonth");
                 $scope.showbenniesbystate = false;
                 $scope.showsubscriptionbytype = false;
                 $scope.showpermonthbennies = false;
                 $scope.showrevenuebymonth = false;
                 $scope.showhelprequest = false;
                 $scope.showtitle = false;
             });
    }
    $scope.HelpRequestMethCallCount = 0;
    $scope.GetTotalNoOfHelpRequestPerMonthByYear = function (requestType) {
        var userId = sessionStorage.getItem('UID');
        var year = $scope.selectedYear;
        $scope.Data = {
            userId: userId,
            requestType: requestType,
            year: year
        };
        var data = $scope.Data;
        var queryString = $.param(data);
        if (requestType == 'A')
            $scope.TotalNoOfHelpRequestPerMonthByYear = [];
        else if (requestType == 'Y')
            $scope.TotalResolvedHelpRequestPerMonthByYear = [];
        else if (requestType == 'N')
            $scope.TotalUnResolvedHelpRequestPerMonthByYear = [];
        reportsService.GetTotalNoOfHelpRequestPerMonthByYear(queryString)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null) {
                         $scope.HelpRequestMethCallCount++
                         if (requestType == 'A') {
                             $scope.TotalNoOfHelpRequestPerMonthByYear = res.data.ResponseData[0].TotalHeplRequestsPerMonthInfoData;//.map(function (obj) { return obj.totalcount; });
                         }
                         else if (requestType == 'Y') {
                             $scope.TotalResolvedHelpRequestPerMonthByYear = res.data.ResponseData[0].TotalHeplRequestsPerMonthInfoData;//.map(function (obj) { return obj.totalcount; });
                         }
                         else if (requestType == 'N') {
                             $scope.TotalUnResolvedHelpRequestPerMonthByYear = res.data.ResponseData[0].TotalHeplRequestsPerMonthInfoData;//.map(function (obj) { return obj.totalcount; });
                         }
                         if ($scope.HelpRequestMethCallCount == 3) {
                             // $scope.months = res.data.ResponseData[0].TotalHeplRequestsPerMonthInfoData.map(function (obj) { return obj.month; });
                             if ($scope.TotalNoOfHelpRequestPerMonthByYear.length > 0 || $scope.TotalResolvedHelpRequestPerMonthByYear.length > 0 || $scope.TotalUnResolvedHelpRequestPerMonthByYear.length > 0)
                             {
                                 debugger;
                                 $scope.showhelprequest = true;
                                 $scope.showtitle = true;
                                 $scope.HelpRequestChart();
                             }
                             else
                             {
                                 $scope.showbenniesbystate = false;
                                 $scope.showsubscriptionbytype = false;
                                 $scope.showpermonthbennies = false;
                                 $scope.showrevenuebymonth = false;
                                 $scope.showhelprequest = false;
                                 $scope.showtitle = false;
                                 JSAlert.alert("No Record Exist For Particular Year");
                             }

                         }

                     }
                 } else {
                     $scope.showbenniesbystate = false;
                     $scope.showsubscriptionbytype = false;
                     $scope.showpermonthbennies = false;
                     $scope.showrevenuebymonth = false;
                     $scope.showhelprequest = false;
                     $scope.showtitle = false;
                     JSAlert.alert("No Record Exist For Particular Year");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed To Load Help Request");
             });
    }

    $scope.SelectedReport = function (repType) {
        if (repType != null) {
            $scope.selectedReportType = repType;
            $scope.disCreateBtn = true;
            $scope.disYearddl = false;
        }
       if ($scope.selectedYear != null)
        {
            $scope.disCreateBtn = false;
            $scope.disYearddl = false;
        }
        else
        {
            $scope.disCreateBtn = true;
            $scope.disYearddl = false;
        }
    }
    $scope.SelectedYear = function (year) {
        if (year != null) {
            $scope.selectedYear = year;
            $scope.disCreateBtn = false;
        }
        else {
            $scope.disCreateBtn = true;
        }
    }
    $scope.CreateTotalBenniesSignedPerMonthReport=function(months, users)
    {
        $scope.benniesPerMonthLabels = chartLabels;
        $scope.benniesPerMonthdata = chartData;
    }


    $scope.CreateReport = function (chartLabels, chartData, chartName) {

        if (chartName == "BenniesByMonth")
        {
            var cnbenniesbystate = document.getElementById("cnbenniesbystate");
            if (cnbenniespermonth) {
                var ctx = cnbenniesbystate.getContext('2d');
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
            var cnsubscriptionbytype = document.getElementById("cnsubscriptionbytype");
            if (cnsubscriptionbytype)
            {
                var ctx = cnsubscriptionbytype.getContext('2d');
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
            var cnrevenuebymonth = document.getElementById("cnrevenuebymonth");
            if (cnrevenuebymonth) {
                var ctx = cnrevenuebymonth.getContext('2d');
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
            var cnhelpreqbymonth = document.getElementById("cnhelpreqbymonth");
            if (cnhelpreqbymonth) {
                var ctx = cnhelpreqbymonth.getContext('2d');
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
            $scope.benniesPerMonthLabels = chartLabels;
            $scope.benniesPerMonthdata = chartData;
        }
        else if (chartName == "SubscriptionByType") {
            
            var cnbenniesbystate = document.getElementById("cnbenniesbystate");
            if (cnbenniesbystate) {
                var ctx = cnbenniesbystate.getContext('2d');
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
            var cnsubscriptionbytype = document.getElementById("cnbenniespermonth");
            if (cnsubscriptionbytype) {
                var ctx = cnsubscriptionbytype.getContext('2d');
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
            var cnrevenuebymonth = document.getElementById("cnrevenuebymonth");
            if (cnrevenuebymonth) {
                var ctx = cnrevenuebymonth.getContext('2d');
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
            var cnhelpreqbymonth = document.getElementById("cnhelpreqbymonth");
            if (cnhelpreqbymonth) {
                var ctx = cnhelpreqbymonth.getContext('2d');
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
            $scope.subscriptionByTypeLabels = chartLabels;
            $scope.subscriptionByTypeData = chartData;
        }
        else if (chartName = "BenniesByState")
        {
            var cnbenniespermonth = document.getElementById("cnsubscriptionbytype");
            if (cnbenniespermonth) {
                var ctx = cnbenniespermonth.getContext('2d');
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
            var cnsubscriptionbytype = document.getElementById("cnbenniespermonth");
            if (cnsubscriptionbytype) {
                var ctx = cnsubscriptionbytype.getContext('2d');
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
            var cnbenniesbystate = document.getElementById("cnbenniesbystate");
            if (cnbenniesbystate) {
                var ctx = cnbenniesbystate.getContext('2d');
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
            var cnhelpreqbymonth = document.getElementById("cnhelpreqbymonth");
            if (cnhelpreqbymonth) {
                var ctx = cnhelpreqbymonth.getContext('2d');
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
            
            $scope.benniesByStateLabels = chartLabels;
            $scope.benniesByStateData = chartData;
        }
       
    }
    $scope.CreateRevenueByMonthReport = function (chartLabels, chartData)
        {
        var cnbenniespermonth = document.getElementById("cnsubscriptionbytype");
        if (cnbenniespermonth) {
            var ctx = cnbenniespermonth.getContext('2d');
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
        var cnsubscriptionbytype = document.getElementById("cnbenniespermonth");
        if (cnsubscriptionbytype) {
            var ctx = cnsubscriptionbytype.getContext('2d');
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
        var cnbenniesbystate = document.getElementById("cnbenniesbystate");
        if (cnbenniesbystate) {
            var ctx = cnbenniesbystate.getContext('2d');
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
        var cnhelpreqbymonth = document.getElementById("cnhelpreqbymonth");
        if (cnhelpreqbymonth) {
            var ctx = cnhelpreqbymonth.getContext('2d');
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
        $scope.revenueByMonthLabels = chartLabels;
        $scope.revenueByMonthData = chartData;
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
            var countHelpRequest = $scope.TotalNoOfHelpRequestPerMonthByYear.filter(function (node) {
                return node.month == $scope.mainHelpRequestObj[i].month;
            });

            var countResolvedHelpRequest = $scope.TotalResolvedHelpRequestPerMonthByYear.filter(function (node) {
                return node.month == $scope.mainHelpRequestObj[i].month;
            });

            var countUnResolvedHelpRequest = $scope.TotalUnResolvedHelpRequestPerMonthByYear.filter(function (node) {
                return node.month == $scope.mainHelpRequestObj[i].month;
            });
            if (countHelpRequest.length > 0)
                $scope.mainHelpRequestObj[i].helpRequestCount = countHelpRequest[0].totalcount;
            if (countResolvedHelpRequest.length > 0)
                $scope.mainHelpRequestObj[i].resolvedHelpRequestCount = countResolvedHelpRequest[0].totalcount;
            if (countUnResolvedHelpRequest.length > 0)
                $scope.mainHelpRequestObj[i].unResolvedHelpRequestCount = countUnResolvedHelpRequest[0].totalcount;
        }
        $scope.HelpRequestObj = [];
        for (let obj of $scope.mainHelpRequestObj) {
            if (obj.helpRequestCount != 0 || obj.resolvedHelpRequestCount != 0 || obj.unResolvedHelpRequestCount != 0) {
                $scope.HelpRequestObj.push(obj);
                // $scope.mainHelpRequestObj.splice($scope.mainHelpRequestObj.indexOf(obj), 1);
            }
        }
    }
    $scope.HelpRequestChart = function () {

        var cnbenniespermonth = document.getElementById("cnsubscriptionbytype");
        if (cnbenniespermonth) {
            var ctx = cnbenniespermonth.getContext('2d');
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
        var cnsubscriptionbytype = document.getElementById("cnbenniespermonth");
        if (cnsubscriptionbytype) {
            var ctx = cnsubscriptionbytype.getContext('2d');
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
        var cnbenniesbystate = document.getElementById("cnbenniesbystate");
        if (cnbenniesbystate) {
            var ctx = cnbenniesbystate.getContext('2d');
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
        var cnrevenuebymonth = document.getElementById("cnrevenuebymonth");
        if (cnrevenuebymonth) {
            var ctx = cnrevenuebymonth.getContext('2d');
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
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
            pointBorderWidth: 2
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
            pointBorderWidth: 1
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
    $scope.IntializeControls();
  //  $scope.GetTotalNoOfBenniesSignedUpPerMonthByYear();
});