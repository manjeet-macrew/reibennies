'use strict';

rEIBenniesApp.controller("rankapproverController", function ($scope, $rootScope, rankService, userService) {
    $rootScope.IsRankApprover = true;
    $rootScope.SelectedPage = "RankApprover";
    $scope.IsList = true;
    $rootScope.CurrentYear = getCurrentYear();
    $scope.SelectedTab = 'N';
    $scope.UserData = [];
    $scope.GetAllRankedUnrankedUserRequests = function (isRanked) {
        $scope.UnrankedUserData = [];
        $scope.UserData = [];
        if (isRanked == 'Y') {
            rankService.GetAllRankedUnrankedUserRequests(isRanked)
                        .then(function (res) {
                            if (res.data.ResponseCode == 200) {
                                
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
        else {
            rankService.GetAllRankedUnrankedUserRequests(isRanked)
            .then(function (res) {
                if (res.data.ResponseCode == 200) {
                    if (res.data.ResponseData[0] != null)
                        $scope.UnrankedUserData = res.data.ResponseData[0].UserRankRequestInfoData;
                } else {
                    JSAlert.alert("Failed to load users data");
                }
            }).catch(function (ex) {
                $('#ajaxSpinnerContainer').hide();
                JSAlert.alert("Failed to load users data");
            });
        }

    }
    $scope.GetAllRankedUnrankedUserRequests('N');
    //$scope.GetAllUserRankRequests = function () {
    //    $scope.UserData = [];
    //    rankService.GetAllUserRankRequests()
    //         .then(function (res) {
    //             if (res.data.ResponseCode == 200) {
    //                 if (res.data.ResponseData[0] != null)
    //                     $scope.UserData = res.data.ResponseData[0].UserRankRequestInfoData;
    //             } else {
    //                 JSAlert.alert("Failed to load users data");
    //             }
    //         }).catch(function (ex) {
    //             $('#ajaxSpinnerContainer').hide();
    //             JSAlert.alert("Failed to load users data");
    //         });
    //}
    //$scope.GetAllUserRankRequests();


    $scope.SelectedUser = {};
    $scope.UserRanks = [];
    $scope.ShowDetail = function (user) {
        $scope.UserRanks = [];
        $scope.IsDetail = true;
        $scope.SelectedUser = user;
        $scope.IsList = false;
        $scope.RequestApprove = { Value: user.rankApproved };
        //var data = { userIdToView: user.userId, userId: sessionStorage.getItem('UID') }
        //var queryString = $.param(data);
        //rankService.ViewAUser(queryString)
        //    .then(function (res) {
        //        
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
        var data = {
            userId: user.userId,
            rankedUserId: user.rankedUserId,
            rankApproved: $scope.RequestApprove.Value,
            rankApprovedNotes: user.rankApprovedNotes,
            modifiedBy: sessionStorage.getItem('UID')
        }
        rankService.ApproveDenyUserRank(data)
            .then(function (res) {
                if (res.data.ResponseCode == 200) {
                    JSAlert.alert(res.data.Message);
                    $('#myModal').modal('hide');
                    if( $scope.SelectedTab == 'N')
                        $scope.GetAllRankedUnrankedUserRequests('N');
                    else
                        $scope.GetAllRankedUnrankedUserRequests('Y');
                    $scope.IsList = true;
                    $scope.IsDetail = false;
                } else {
                    JSAlert.alert("Failed to update");
                }
            }).catch(function (ex) {
                $('#ajaxSpinnerContainer').hide();
                JSAlert.alert("Failed to update");
            });
    }

    $scope.ShowTab = function (id, element) {
        if (element != undefined) {
            $('.panel-heading.panel-heading-tab1.active_tab').removeClass('active_tab');
            element.currentTarget.parentNode.parentNode.classList.add('active_tab')
        }

        $('.tab-pane.fade.in.active').removeClass('in active');
        $(id).addClass('in active');

        if (id == '#unranked') {
            $scope.SelectedTab = 'N';
            $scope.GetAllRankedUnrankedUserRequests('N');
        }
        else if (id == '#ranked') {
            $scope.SelectedTab = 'Y';
            $scope.GetAllRankedUnrankedUserRequests('Y');
        }

    }

});