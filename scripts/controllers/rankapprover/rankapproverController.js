'use strict';

rEIBenniesApp.controller("rankapproverController", function ($scope, $rootScope, rankService, userService) {
    $rootScope.IsRankApprover = true;
    $rootScope.SelectedPage = "RankApprover";
    $scope.IsList = true;
    $rootScope.CurrentYear = getCurrentYear();

    $scope.UserData = [];
    $scope.GetAllUserRankRequests = function () {
        $scope.UserData = [];
        rankService.GetAllUserRankRequests()
             .then(function (res) {
                 debugger;
                 if (res.data.ResponseCode == 200) {
                     debugger;
                     if (res.data.ResponseData[0] != null)
                         $scope.UserData = res.data.ResponseData[0].UserRankRequestInfoData;
                 } else {
                     JSAlert.alert("Failed to load users data");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load users data");
             });
    }

    $scope.GetAllUserRankRequests();

    $scope.SelectedUser = {};
    $scope.UserRanks = [];
    $scope.ShowDetail = function (user) {
        debugger;
        $scope.UserRanks = [];
        $scope.IsDetail = true;
        $scope.SelectedUser = user;
        $scope.IsList = false;
        $scope.RequestApprove = { Value: user.rankApproved };
        //var data = { userIdToView: user.userId, userId: sessionStorage.getItem('UID') }
        //var queryString = $.param(data);
        //rankService.ViewAUser(queryString)
        //    .then(function (res) {
        //        debugger;
        //        if (res.data.ResponseCode == 200) {
        //            if (res.data.ResponseData[0] != null)
        //                $scope.SelectedUser = res.data.ResponseData[0].ViewUserInfoData[0];
        //            var rank = parseInt($scope.SelectedUser.Rank);
        //            for (var i = 1; i < 6; i++) {
        //                if (i <= rank)
        //                    $scope.UserRanks.push({ SN: i, Value: true })
        //                else
        //                    $scope.UserRanks.push({ SN: i, Value: false })
        //            }
        //        } else {
        //            JSAlert.alert("Failed to load Old Investor Types");
        //        }
        //    }).catch(function (ex) {
        //        $('#ajaxSpinnerContainer').hide();
        //        JSAlert.alert("Failed to load Old Investor Types");
        //    });
    }

    $scope.Cancel = function () {
        $scope.IsList = true;
        $scope.IsDetail = false;
    }

    $scope.Request = [
       { Value: 'Y', Name: "Approve" },
       { Value: 'N', Name: "Deny" }
    ]

    $scope.RankingUser = {};
    $scope.OpenRankModel = function (user) {
        $scope.RankingUser = user;

    }

    $scope.RequestApprove = { Value: "0" };
    $scope.Submit = function (user) {
        debugger;
        var data = {
            userId: user.userId,
            rankedUserId: user.rankedUserId,
            rankApproved: $scope.RequestApprove.Value,
            rankApprovedNotes: user.rankApprovedNotes,
            modifiedBy: sessionStorage.getItem('UID')
        }
        debugger;
        rankService.ApproveDenyUserRank(data)
            .then(function (res) {
                debugger;
                if (res.data.ResponseCode == 200) {
                    JSAlert.alert(res.data.Message);
                    $('#myModal').modal('hide');
                    $scope.GetAllUserRankRequests();
                    $scope.IsList = true;
                    $scope.IsDetail = false;
                } else {
                    JSAlert.alert("Failed to load Old Investor Types");
                }
            }).catch(function (ex) {
                $('#ajaxSpinnerContainer').hide();
                JSAlert.alert("Failed to load Old Investor Types");
            });
    }



});