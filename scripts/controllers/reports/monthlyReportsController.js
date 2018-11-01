'use strict';

rEIBenniesApp.controller("monthlyReportsController", function ($scope, $rootScope, reportsService) {
    $rootScope.IsMonthlyReports = true;
    $rootScope.SelectedPage = "MonthlyReports";
    $scope.reportTitle = "";
    $scope.disCreateBtn = true;
    $scope.disYearddl = true;
    $scope.disMonthddl = true;
    $scope.selectedReportType = "";
    $scope.reportDataExist = false;
    $scope.showbenniesbystate = false;
    $scope.showsubscriptionbytype = false;
    $scope.showpermonthbennies = false;
    $scope.options = { title: { display: true, text: "" } };
    $scope.showtitle = true;
    $scope.HelpRequestMethCallCount = 0
    $scope.CreateReportByType = function () {
        var reportName = $scope.selectedReportType;

        if (reportName == "BenniesPerYearByMonth") {
            $scope.showbenniesbystate = false;
            $scope.showsubscriptionbytype = false;
            $scope.showpermonthbennies = true;
            $scope.showrevenuebymonth = false;
            $scope.showhelprequest = false;
            $scope.showtitle = true;
            $scope.reportTitle = "Total Bennies By Month"
            $scope.GetTotalNoOfBenniesSignedUpPerMonthByYearMonth();
        }
        else if (reportName == "SubscriptionPerYearByMonth") {
            $scope.showbenniesbystate = false;
            $scope.showsubscriptionbytype = true;
            $scope.showpermonthbennies = false;
            $scope.showrevenuebymonth = false;
            $scope.showhelprequest = false;
            $scope.showtitle = true;
            $scope.reportTitle = "Total Subscription By Type";
            $scope.GetTotalNoOfSubscriptionsByYearMonth();
        }
        else if (reportName == "BenniesSignedUpPerStateByMonth") {
            $scope.showbenniesbystate = true;
            $scope.showsubscriptionbytype = false;
            $scope.showpermonthbennies = false;
            $scope.showrevenuebymonth = false;
            $scope.showhelprequest = false;
            $scope.showtitle = true;
            $scope.reportTitle = "Total Bennies By State"
            $scope.GetTotalNoOfBenniesSignedupPerStateByYearMonth();
        }
        else if (reportName == "RevenueByMonthPerYearByMonth") {
            $scope.showbenniesbystate = false;
            $scope.showsubscriptionbytype = false;
            $scope.showpermonthbennies = false;
            $scope.showrevenuebymonth = true;
            $scope.showhelprequest = false;
            $scope.showtitle = true;
            $scope.reportTitle = "Total Revenue By Month"
            $scope.GetTotalRevenuePerMonthByYearMonth();
        }
        else if (reportName == "HelpRequestByMonthPerYear") {
            $scope.showbenniesbystate = false;
            $scope.showsubscriptionbytype = false;
            $scope.showpermonthbennies = false;
            $scope.showrevenuebymonth = false;
            $scope.showhelprequest = true;
            $scope.showtitle = true;
            $scope.reportTitle = "Total Help Request BY Month"
            $scope.HelpRequestMethCallCount = 0
            $scope.GetTotalNoOfHelpRequestPerMonthByYearMonth('A');
            $scope.GetTotalNoOfHelpRequestPerMonthByYearMonth('Y');
            $scope.GetTotalNoOfHelpRequestPerMonthByYearMonth('N');

        }
    }

    $scope.IntializeControls = function () {

        $scope.reportType = [];
        $scope.reportType = [{ Key: "BenniesPerYearByMonth", Value: "Total Bennies Per Year By Month" },
                             { Key: "SubscriptionPerYearByMonth", Value: "Total Subscription Per Year By Month" },
                              { Key: "BenniesSignedUpPerStateByMonth", Value: "Total Bennies Signed Up Per State" },
                               { Key: "RevenueByMonthPerYearByMonth", Value: "Total Revenue Per Year By Month" },
                               { Key: "HelpRequestByMonthPerYear", Value: "Total Help Request Per Year By Month" }
        ];

        $scope.reportingMonth = [];
        $scope.reportingMonth = [{ Key: "1", Value: "01" },
                                { Key: "2", Value: "02" },
                                { Key: "3", Value: "03" },
                                { Key: "4", Value: "04" },
                                { Key: "5", Value: "05" },
                                { Key: "6", Value: "06" },
                                { Key: "7", Value: "07" },
                                { Key: "8", Value: "08" },
                                { Key: "9", Value: "09" },
                                { Key: "10", Value: "10" },
                                { Key: "11", Value: "11" },
                                { Key: "12", Value: "12" }];

        $scope.reportingYear = [];
        $scope.reportingYear = [
                                { Key: "2018", Value: "2018" },
                                { Key: "2019", Value: "2019" },
                                { Key: "2020", Value: "2020" },
                                { Key: "2021", Value: "2021" },
                                { Key: "2022", Value: "2022" },
                                { Key: "2023", Value: "2023" },
                                { Key: "2024", Value: "2024" },
                                { Key: "2025", Value: "2025" },
                                { Key: "2026", Value: "2026" },
                                { Key: "2027", Value: "2027" },
                                { Key: "2028", Value: "2028" }];
    }

    $scope.GetTotalNoOfBenniesSignedUpPerMonthByYearMonth = function () {
        var userId = sessionStorage.getItem('UID');
        var year = $scope.selectedYear;
        var month = $scope.selectedMonth;
        $scope.Data = {
            userId: userId,
            year: year,
            month: month
        };
        var queryString = $.param($scope.Data);
        $scope.TotalNoOfBenniesSignedUpPerMonth = [];
        reportsService.GetTotalNoOfBenniesSignedUpPerMonthByYearMonth(queryString)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.TotalNoOfBenniesSignedUpPerMonth = res.data.ResponseData[0].BenniesSignedUpPerMonthInfoData;
                     if ($scope.TotalNoOfBenniesSignedUpPerMonth.length > 0) {
                         $scope.reportDataExist = true;
                         var months = $scope.TotalNoOfBenniesSignedUpPerMonth.map(function (a) { return a.month; });
                         var users = $scope.TotalNoOfBenniesSignedUpPerMonth.map(function (a) { return a.users; });
                         months.unshift("");
                         users.unshift("0");
                         $scope.CreateReport(months, users, "BenniesByMonth");
                     }
                     else {
                         $scope.showbenniesbystate = false;
                         $scope.showsubscriptionbytype = false;
                         $scope.showpermonthbennies = false;
                         $scope.showrevenuebymonth = false;
                         $scope.showhelprequest = false;
                         $scope.showtitle = false;
                         JSAlert.alert("No Record Exist For Particular Year and Month");
                         $('#ajaxSpinnerContainer').hide();
                     }

                 } else {
                     $scope.showbenniesbystate = false;
                     $scope.showsubscriptionbytype = false;
                     $scope.showpermonthbennies = false;
                     $scope.showrevenuebymonth = false;
                     $scope.showhelprequest = false;
                     $scope.showtitle = false;
                     JSAlert.alert("No Record Exist For Particular Year and Month.");
                     $('#ajaxSpinnerContainer').hide();
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load Bennies");
             });
    }

    $scope.GetTotalNoOfSubscriptionsByYearMonth = function () {
        var userId = sessionStorage.getItem('UID');
        var year = $scope.selectedYear;
        var month = $scope.selectedMonth;
        $scope.Data = {
            userId: userId,
            year: year,
            month: month
        };
        var queryString = $.param($scope.Data);
        $scope.TotalNoOfSubscriptions = [];
        reportsService.GetTotalNoOfSubscriptionsByYearMonth(queryString)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     debugger;
                     if (res.data.ResponseData[0] != null)
                         $scope.TotalNoOfSubscriptions = res.data.ResponseData[0].TotalSubscriptionInfoData;
                     if ($scope.TotalNoOfSubscriptions.length > 0) {
                         $scope.reportDataExist = true;
                         var subscriptionTypes = $scope.TotalNoOfSubscriptions.map(function (a) { return a.title; });
                         var subscriptionCounts = $scope.TotalNoOfSubscriptions.map(function (a) { return a.totalcount; });
                         $scope.CreateReport(subscriptionTypes, subscriptionCounts, "SubscriptionByType");
                         subscriptionTypes.unshift("");
                         subscriptionCounts.unshift("0");
                     }
                     else {
                         $scope.showbenniesbystate = false;
                         $scope.showsubscriptionbytype = false;
                         $scope.showpermonthbennies = false;
                         $scope.showrevenuebymonth = false;
                         $scope.showhelprequest = false;
                         $scope.showtitle = false;
                         JSAlert.alert("No Record Exist For Particular Year and Month.");
                         $('#ajaxSpinnerContainer').hide();
                     }

                 } else {
                     $scope.showbenniesbystate = false;
                     $scope.showsubscriptionbytype = false;
                     $scope.showpermonthbennies = false;
                     $scope.showrevenuebymonth = false;
                     $scope.showhelprequest = false;
                     $scope.showtitle = false;
                     JSAlert.alert("No Record Exist For Particular Year and Month.");
                     $('#ajaxSpinnerContainer').hide();
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to Subscriptions");
             });
    }

    $scope.GetTotalNoOfBenniesSignedupPerStateByYearMonth = function () {
        var userId = sessionStorage.getItem('UID');
        var year = $scope.selectedYear;
        var month = $scope.selectedMonth;
        $scope.Data = {
            userId: userId,
            year: year,
            month: month
        };
        var queryString = $.param($scope.Data);
        $scope.TotalNoOfBenniesSignedUpPerState = [];
        reportsService.GetTotalNoOfBenniesSignedupPerStateByYearMonth(queryString)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.TotalNoOfBenniesSignedUpPerState = res.data.ResponseData[0].BenniesSignedUpPerStateInfoData;
                     if ($scope.TotalNoOfBenniesSignedUpPerState.length > 0) {
                         $scope.reportDataExist = true;
                         var states = $scope.TotalNoOfBenniesSignedUpPerState.map(function (a) { return a.stateName; });
                         var counts = $scope.TotalNoOfBenniesSignedUpPerState.map(function (a) { return a.totalcount; });
                         states.unshift("");
                         counts.unshift("0");
                         $scope.CreateReport(states, counts, "BenniesByState");
                     }
                     else {
                         $scope.showbenniesbystate = false;
                         $scope.showsubscriptionbytype = false;
                         $scope.showpermonthbennies = false;
                         $scope.showrevenuebymonth = false;
                         $scope.showhelprequest = false;
                         $scope.showtitle = false;
                         JSAlert.alert("No Record Exist For Particular Year And Month");
                         $('#ajaxSpinnerContainer').hide();
                     }

                 } else {
                     $scope.showbenniesbystate = false;
                     $scope.showsubscriptionbytype = false;
                     $scope.showpermonthbennies = false;
                     $scope.showrevenuebymonth = false;
                     $scope.showhelprequest = false;
                     $scope.showtitle = false;
                     JSAlert.alert("No Record Exist For Particular Year");
                     $('#ajaxSpinnerContainer').hide();
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load Subscriptions");
             });
    }

    $scope.GetTotalRevenuePerMonthByYearMonth = function () {
        var userId = sessionStorage.getItem('UID');
        var year = $scope.selectedYear;
        var month = $scope.selectedMonth;
        $scope.Data = {
            userId: userId,
            year: year,
            month: month
        };
        var queryString = $.param($scope.Data);
        $scope.TotalRevenuePerMonth = [];
        reportsService.GetTotalRevenuePerMonthByYearMonth(queryString)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     debugger;
                     if (res.data.ResponseData[0] != null)
                         $scope.TotalRevenuePerMonth = res.data.ResponseData[0].TotalRevenuePerMonthInfoData;
                     if ($scope.TotalRevenuePerMonth.length > 0) {

                         var revmonths = $scope.TotalRevenuePerMonth.map(function (obj) { return obj.month; });
                         var revtotalbymonth = $scope.TotalRevenuePerMonth.map(function (obj) { return obj.revenue; });
                         revmonths.unshift("");
                         revtotalbymonth.unshift("0");
                         $scope.CreateRevenueByMonthReport(revmonths, revtotalbymonth);
                     }
                     else {
                         $scope.showbenniesbystate = false;
                         $scope.showsubscriptionbytype = false;
                         $scope.showpermonthbennies = false;
                         $scope.showrevenuebymonth = false;
                         $scope.showhelprequest = false;
                         $scope.showtitle = false;
                         JSAlert.alert("No Record Exist For Particular Year and Month.");
                         $('#ajaxSpinnerContainer').hide();
                     }

                 } else {
                     $scope.showbenniesbystate = false;
                     $scope.showsubscriptionbytype = false;
                     $scope.showpermonthbennies = false;
                     $scope.showrevenuebymonth = false;
                     $scope.showhelprequest = false;
                     $scope.showtitle = false;
                     JSAlert.alert("No Record Exist For Particular Year and Month.");
                     $('#ajaxSpinnerContainer').hide();
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
    $scope.GetTotalNoOfHelpRequestPerMonthByYearMonth = function (requestType) {
        var userId = sessionStorage.getItem('UID');
        var year = $scope.selectedYear;
        var month = $scope.selectedMonth;
        $scope.Data = {
            userId: userId,
            requestType: requestType,
            year: year,
            month: month
        };
        var data = $scope.Data;
        var queryString = $.param(data);
        if (requestType == 'A')
            $scope.TotalNoOfHelpRequestPerMonthByYearMonth = [];
        else if (requestType == 'Y')
            $scope.TotalResolvedHelpRequestPerMonthByYearMonth = [];
        else if (requestType == 'N')
            $scope.TotalUnResolvedHelpRequestPerMonthByYearMonth = [];
        reportsService.GetTotalNoOfHelpRequestPerMonthByYearMonth(queryString)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null) {
                         $scope.HelpRequestMethCallCount++
                         if (requestType == 'A') {
                             $scope.TotalNoOfHelpRequestPerMonthByYearMonth = res.data.ResponseData[0].TotalHeplRequestsPerMonthInfoData;//.map(function (obj) { return obj.totalcount; });
                         }
                         else if (requestType == 'Y') {
                             $scope.TotalResolvedHelpRequestPerMonthByYearMonth = res.data.ResponseData[0].TotalHeplRequestsPerMonthInfoData;//.map(function (obj) { return obj.totalcount; });
                         }
                         else if (requestType == 'N') {
                             $scope.TotalUnResolvedHelpRequestPerMonthByYearMonth = res.data.ResponseData[0].TotalHeplRequestsPerMonthInfoData;//.map(function (obj) { return obj.totalcount; });
                         }
                         if ($scope.HelpRequestMethCallCount == 3) {
                             // $scope.months = res.data.ResponseData[0].TotalHeplRequestsPerMonthInfoData.map(function (obj) { return obj.month; });
                             if ($scope.TotalNoOfHelpRequestPerMonthByYearMonth.length > 0 || $scope.TotalResolvedHelpRequestPerMonthByYearMonth.length > 0 || $scope.TotalUnResolvedHelpRequestPerMonthByYearMonth.length > 0) {
                                 $scope.showhelprequest = true;
                                 $scope.showtitle = true;
                                 $scope.HelpRequestChart();
                             }
                             else {
                                 $scope.showbenniesbystate = false;
                                 $scope.showsubscriptionbytype = false;
                                 $scope.showpermonthbennies = false;
                                 $scope.showrevenuebymonth = false;
                                 $scope.showhelprequest = false;
                                 $scope.showtitle = false;
                                 JSAlert.alert("No Record Exist For Particular Year and Month.");
                                 $('#ajaxSpinnerContainer').hide();
                             }

                         }

                     }
                     //$scope.SetHelpChartValues(helpmonths, helpcounts);//, "HelpRequestByMonth")
                 } else {
                     $scope.showbenniesbystate = false;
                     $scope.showsubscriptionbytype = false;
                     $scope.showpermonthbennies = false;
                     $scope.showrevenuebymonth = false;
                     $scope.showhelprequest = false;
                     $scope.showtitle = false;
                     JSAlert.alert("No Record Exist For Particular Year and Month.");
                     $('#ajaxSpinnerContainer').hide();
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
            $scope.disMonthddl = true;
        }
        if ($scope.selectedYear != null && $scope.selectedMonth != null && repType != null) {
            $scope.disCreateBtn = false;
            $scope.disYearddl = false;
            $scope.disMonthddl = false;
        }
        else
        {
            if ($scope.selectedYear != null && repType != null) {
                $scope.disYearddl = false;
                $scope.disMonthddl = true;
                $scope.disCreateBtn = true;
            }
            if ($scope.selectedMonth != null && repType != null) {
                $scope.disCreateBtn = false;
                $scope.disYearddl = false;
                $scope.disMonthddl = false;
            }
        }
      
    }
    $scope.SelectedYear = function (year) {
        if (year != null) {
            $scope.selectedYear = year;
            if ($scope.selectedMonth != null) {
                $scope.disCreateBtn = false;
            }
            else
            {
                $scope.disCreateBtn = true;
            }
            $scope.disMonthddl = false;
        }
        else {
            $scope.disMonthddl = true;
            $scope.disCreateBtn = true;
        }
    }
    $scope.SelectedMonth = function (month) {
        debugger;
        if (month != null) {
            $scope.selectedMonth = month;
            $scope.disCreateBtn = false;
        }
        else {
            $scope.disCreateBtn = true;
        }
    }
    $scope.CreateTotalBenniesSignedPerMonthReport = function (months, users) {
        $scope.benniesPerMonthLabels = chartLabels;
        $scope.benniesPerMonthdata = chartData;
    }


    $scope.CreateReport = function (chartLabels, chartData, chartName) {

        if (chartName == "BenniesByMonth") {
            var cnbenniesbystate = document.getElementById("cnbenniesbystate");
            if (cnbenniespermonth) {
                var ctx = cnbenniesbystate.getContext('2d');
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
            var cnsubscriptionbytype = document.getElementById("cnsubscriptionbytype");
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
        else if (chartName = "BenniesByState") {
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
    $scope.CreateRevenueByMonthReport = function (chartLabels, chartData) {
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
            var countHelpRequest = $scope.TotalNoOfHelpRequestPerMonthByYearMonth.filter(function (node) {
                return node.month == $scope.mainHelpRequestObj[i].month;
            });

            var countResolvedHelpRequest = $scope.TotalResolvedHelpRequestPerMonthByYearMonth.filter(function (node) {
                return node.month == $scope.mainHelpRequestObj[i].month;
            });

            var countUnResolvedHelpRequest = $scope.TotalUnResolvedHelpRequestPerMonthByYearMonth.filter(function (node) {
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
        $scope.HelpRequestObj.unshift({ month: "", helpRequestCount: 0, unResolvedHelpRequestCount: 0, resolvedHelpRequestCount: 0 });
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
            pointHitRadius: 1,
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