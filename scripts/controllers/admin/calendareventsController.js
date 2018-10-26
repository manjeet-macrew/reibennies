'use strict';

rEIBenniesApp.controller("calendareventsController", function ($scope, $rootScope, calendareventsService, $location, $timeout) {
    $rootScope.IsCalendarEvents = true;
    $rootScope.SelectedPage = "CalendarEvents";
    $rootScope.CurrentYear = getCurrentYear();
    $scope.CurrentDate = new Date();

    $scope.CalenderItems = [];
    $scope.eventsDetail = {};
    
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
                             $scope.events[i] = {
                                 id: data[i].eventId,
                                 title: data[i].eventTitle,
                                 start: new Date(data[i].startDateTime),
                                 end: new Date(data[i].endDateTime), allDay: false,
                                 eventAccess: data[i].eventAccess,
                                 eventAddressOne: data[i].eventAddressOne,
                                 eventAddressTwo: data[i].eventAddressTwo,
                                 eventCity: data[i].eventCity,
                                 eventDescription: data[i].eventDescription,
                                 eventDuration: data[i].eventDuration,
                                 eventId: data[i].eventId,
                                 eventPhone: data[i].eventPhone,
                                 eventPrice: data[i].eventPrice,
                                 eventTitle: data[i].eventTitle,
                                 eventURL: data[i].eventURL,
                                 eventZip: data[i].eventZip,
                                 firstName: data[i].firstName,
                                 isActive: data[i].isActive,
                                 lastName: data[i].lastName,
                                 profilePicPath: data[i].profilePicPath,
                                 stateName: data[i].stateName,
                                 timeZone: data[i].stateName,
                                 userId: data[i].userId
                             };
                         }
                         console.log($scope.CalenderItems);
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
      
        $scope.eventsDetail = {};
        debugger;
        $scope.eventsDetail = {
            start: data.start._d,
            end: new Date(data.end),
            allDay: false,
            eventAccess: data.eventAccess,
            eventAddressOne: data.eventAddressOne,
            eventAddressTwo: data.eventAddressTwo,
            eventCity: data.eventCity,
            eventDescription: data.eventDescription,
            eventDuration: data.eventDuration,
            eventId: data.eventId,
            eventPhone: data.eventPhone,
            eventPrice: data.eventPrice,
            eventTitle: data.eventTitle,
            eventURL: data.eventURL,
            eventZip: data.eventZip,
            firstName: data.firstName,
            isActive: data.isActive,
            lastName: data.lastName,
            profilePicPath: data.profilePicPath,
            stateName: data.stateName,
            timeZone: data.stateName,
            userId: data.userId
        };
        $('#eventDetail').modal('show');
        $scope.eventName = $scope.eventsDetail.eventTitle;
        angular.element('#calendar').scope().$apply();
       
    }

    $scope.LoadCalendar=function()
    {
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
                $scope.LoadEventDetail(event);
            },
            dayClick: function (date, jsEvent, view) {
               // JSAlert.alert('clicked on ' + date.format());
            }
        });
    }
   
    
});