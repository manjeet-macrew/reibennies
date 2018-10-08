'use strict';

rEIBenniesApp.controller("rolesController", function ($scope, $rootScope, DTColumnDefBuilder, rankService, userService, roleService, $filter) {
    $rootScope.IsRoles = true;
    $rootScope.SelectedPage = "Roles";
    $scope.IsList = true;
    $rootScope.CurrentYear = getCurrentYear();
    $scope.dtColumnDefs = [
     DTColumnDefBuilder.newColumnDef(0).notSortable()
    ];
    $scope.RolesData = [];
    $scope.GetAllRoles = function () {
        $scope.RolesData = [];
        var userId = sessionStorage.getItem('UID')
        roleService.GetAllRoles()
             .then(function (res) {
                 
                 if (res.data.ResponseCode == 200) {
                     if (res.data.ResponseData[0] != null)
                         $scope.RolesData = res.data.ResponseData[0].RolesData;
                 } else {
                     JSAlert.alert("Failed to load users data");
                 }
             }).catch(function (ex) {
                 $('#ajaxSpinnerContainer').hide();
                 JSAlert.alert("Failed to load users data");
             });
    }

    $scope.GetAllRoles();

    $scope.OpenModal = function (roleInfo) {
        
        $scope.RoleInfo = roleInfo;
    };
    $scope.addRoleOpenModal = function () {
        $scope.RoleInfo = {
            "roleId": 0,
            "roleName": "",
            "isActive": "",
            "createDate": formatDate(new Date),
            "createdBy": sessionStorage.getItem('UID')
        };
    };
    $scope.Submit = function (roleInfo) {
        var data = "";
        if (roleInfo.roleId > 0) {
            data = {
                roleId: roleInfo.roleId,
                roleName: roleInfo.roleName,
                isActive: roleInfo.isActive,
                // createDate: roleInfo.createDate,
                //createdBy: roleInfo.createdBy,
                modifiedDate: formatDate(new Date),
                modifiedBy: sessionStorage.getItem('UID')
            };
            roleService.UpdateRole(data)
               .then(function (res) {
                   
                   if (res.data.ResponseCode == 200) {
                       JSAlert.alert(res.data.Message);
                   } else {
                       JSAlert.alert("Failed to process");
                   }
                   $('#addEditRole').modal('hide');
               }).catch(function (ex) {
                   $('#ajaxSpinnerContainer').hide();
                   JSAlert.alert("Failed to process");
               });
        }
        else {
            data = {
                roleId: roleInfo.roleId,
                roleName: roleInfo.roleName,
                isActive: roleInfo.isActive,
                createDate: roleInfo.createDate,
                createdBy: roleInfo.createdBy,
                // modifiedDate: formatDate(new Date),
                // modifiedBy: sessionStorage.getItem('UID')
            };
            roleService.CreateRole(data)
                .then(function (res) {
                    
                    if (res.data.ResponseCode == 200) {
                        JSAlert.alert(res.data.Message);
                        $scope.GetAllRoles();
                    } else {
                        JSAlert.alert("Failed to process");
                    }
                    $('#addEditRole').modal('hide');
                }).catch(function (ex) {
                    $('#ajaxSpinnerContainer').hide();
                    JSAlert.alert("Failed to process");
                });
        }
    };
    $scope.DeleteRole = function (roleInfo) {
        JSAlert.confirm("Are you sure you want to delete this role?").then(function (result) {
            // Check if pressed yes
            if (!result)
                return;

            // User pressed yes!
            var data = roleInfo.roleId;
            roleService.DeleteRole(data)
               .then(function (res) {
                   
                   if (res.data.ResponseCode == 200) {
                       JSAlert.alert(res.data.Message);
                       var index = $scope.RolesData.indexOf(data);
                       $scope.RolesData.splice(index, 1);
                   } else {
                       JSAlert.alert("Failed to process");
                   }
                   $('#addEditRole').modal('hide');
                   $('#ajaxSpinnerContainer').hide();
               }).catch(function (ex) {
                   $('#ajaxSpinnerContainer').hide();
                   JSAlert.alert("Failed to process");
               });
          

        });
    };

    $scope.remove = function (item) {
        var index = $scope.bdays.indexOf(item);
        $scope.bdays.splice(index, 1);
    }
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hour = d.getHours(),
            minutes = d.getMinutes(),
            seconds = d.getSeconds();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        var tDay = [year, month, day].join('-');
        var tTime = hour + ':' + minutes + ':' + seconds;
        return tDay + ' ' + tTime;
    }
});