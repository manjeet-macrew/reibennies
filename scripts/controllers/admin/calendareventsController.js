'use strict';

rEIBenniesApp.controller("calendareventsController", function ($scope, $rootScope, calendareventsService, $location, $timeout) {
    $rootScope.IsCalendarEvents = true;
    $rootScope.SelectedPage = "CalendarEvents";
    $rootScope.CurrentYear = getCurrentYear();
    $scope.CurrentDate = new Date();

    $scope.CalenderItems = [];

    $scope.GetAllCalendarItems = function () {
        $scope.CalenderItems = [];
        $scope.events = [];
        calendareventsService.GetAllCalendarItems()
             .then(function (res) {
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                     {
                         $scope.CalenderItems = res.data.ResponseData[0].EventInfoData;
                         var data = res.data.ResponseData[0].EventInfoData;
                         for (var i = 0; i < data.length; i++) {
                             $scope.events[i] = { id: data[i].eventId,userId: data[i].userId,profilePicPath:data[i].profilePicPath, title: data[i].eventTitle, start: new Date(data[i].startDateTime), end: new Date(data[i].endDateTime), allDay: false };
                         }
                         //console.log($scope.CalenderItems);
                         $scope.LoadCalendar();
                     }
                        
                 } else {
                     JSAlert.alert("No Calendar Events Exist");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load Calendar Events");
             });
    }

    $scope.GetAllCalendarItems();

    $scope.LoadEventDetail=function(data)
    {
        JSAlert.alert(" Calender Events");
    }

    $scope.LoadCalendar=function()
    {
       // var today = Date();
       // var currentDate = today.getFullYear + '-' + today.getMonth() + 1 + '-' + today.getDate();
        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,basicWeek,basicDay,list'
            },
            defaultDate: '2018-10-23', //,
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: $scope.events,
            eventClick: function (event) {
               // $scope.LoadEventDetail(event);
            },
            dayClick: function (date, jsEvent, view) {
               // JSAlert.alert('clicked on ' + date.format());
            }
        });
    }
    
});