'use strict';

rEIBenniesApp.controller("rankController", function ($scope, $rootScope, rankService, userService) {
    $rootScope.IsRank = true;
    $rootScope.SelectedPage = "Rank";
    $scope.IsList = true;
    $scope.IsFilter = false;
    $rootScope.CurrentYear = getCurrentYear();

    $scope.UserData = [];
    $scope.GetAllActiveUsers = function () {
        $scope.UserData = [];
        var userId = sessionStorage.getItem('UID')
        rankService.GetAllActiveUsers(userId)
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.UserData = res.data.ResponseData[0].ActiveUsersInfoData;
                 } else {
                     JSAlert.alert("Failed to load users data");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load users data");
             });
    }

    $scope.GetAllActiveUsers();

    $scope.States = [];
    $scope.GetStates = function () {
        $scope.States = [];
        userService.GetStates()
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.States = res.data.ResponseData[0].ActiveStateInfoData;
                 } else {
                     JSAlert.alert("Failed to load States");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load States");
             });
    }

    $scope.GetStates();

    $scope.InvestorTypes = [];
    $scope.GetInvestorTypes = function () {
        angular.copy($scope.UserData.userInvestorTypes, $scope.UserInvestorTypes);
        $scope.InvestorTypes = [];
        userService.GetInvestorTypes()
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.InvestorTypes = res.data.ResponseData[0].InvestorTypesLookupInfoData;
                 } else {
                     JSAlert.alert("Failed to load Old Investor Types");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load Old Investor Types");
             });
    }

    $scope.GetInvestorTypes();

    $scope.SelectedUser = {};
    $scope.UserRanks = [];
    $scope.ShowDetail = function (user) {
        $scope.UserRanks = [];
        $scope.IsFilter = false;
        $scope.IsDetail = true;
        $scope.SelectedUser = {};
        $scope.IsList = false;
        var data = { userIdToView: user.userId, userId: sessionStorage.getItem('UID') }
        var queryString = $.param(data);
        rankService.ViewAUser(queryString)
            .then(function (res) {
                if (res.data.ResponseCode == 200) {
                    if (res.data.ResponseData[0] != null)
                        $scope.SelectedUser = res.data.ResponseData[0].ViewUserInfoData[0];
                    var rank = parseInt($scope.SelectedUser.Rank);
                    for (var i = 1; i < 6; i++) {
                        if (i <= rank)
                            $scope.UserRanks.push({ SN: i, Value: true })
                        else
                            $scope.UserRanks.push({ SN: i, Value: false })
                    }
                } else {
                    JSAlert.alert("Failed to load Old Investor Types");
                }
            }).catch(function (ex) {
                $('#ajaxSpinnerContainer').hide();
                JSAlert.alert("Failed to load Old Investor Types");
            });
    }

    $scope.Cancel = function () {
        $scope.IsList = true;
        $scope.IsDetail = false;
    }

    $scope.Filter = function () {
        $scope.IsFilter = !$scope.IsFilter;
    }

    $scope.FilterData = {
        userId: '',
        firstname: '',
        lastname: '',
        city: '',
        state: '',
        investortype: ''
    };

    $scope.Search = function () {
        $scope.UserData = [];
        $scope.FilterData.userId = sessionStorage.getItem('UID');

        var data = $scope.FilterData;
        var queryString = $.param(data);
        rankService.SearchForUser(queryString)
            .then(function (res) {
                if (res.data.ResponseCode == 200) {
                    if (res.data.ResponseData[0] != null)
                        $scope.UserData = res.data.ResponseData[0].ActiveUsersInfoData;
                } else {
                    JSAlert.alert("Failed to load Old Investor Types");
                }
            }).catch(function (ex) {
                $('#ajaxSpinnerContainer').hide();
                JSAlert.alert("Failed to load Old Investor Types");
            });
    }


    $scope.Reset = function () {
        $scope.GetAllActiveUsers();
        $scope.FilterData = {
            userId: '',
            firstname: '',
            lastname: '',
            city: '',
            state: '',
            investortype: ''
        };
    }


    $scope.Close = function () {
        $scope.IsFilter = false;
    }

    $scope.Ranks = [
       { Value: 5, Name: "5-Highly recommend" },
       { Value: 4, Name: "4-Most likely recommend" },
       { Value: 3, Name: "3-Recommend" },
       { Value: 2, Name: "2-Most likely not recommend" },
       { Value: 1, Name: "1-Highly not recommend" }
    ]

    $scope.RankingUser = {};
    $scope.OpenRankModel = function (user) {
        $scope.RankingUser = user;

    }

    $scope.Submit = function (user) {
        var data = {
            userId: sessionStorage.getItem('UID'),
            rankedUserId: user.userId,
            rankValue: user.Rank,
            rankReason: user.Notes
        }
        rankService.ApproveDenyUserRank(data)
            .then(function (res) {
                if (res.data.ResponseCode == 200) {
                    JSAlert.alert(res.data.Message);
                } else {
                    JSAlert.alert("Failed to process");
                }
            }).catch(function (ex) {
                $('#ajaxSpinnerContainer').hide();
                JSAlert.alert("Failed to process");
            });
    }



});