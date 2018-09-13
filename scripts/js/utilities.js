//utilities
function makeJSON(jsonObj) {
    var jData = JSON.stringify(jsonObj);

    return jData;
}

function exposeJSON(jsonObj) {
    var jData = JSON.parse(jsonObj);

    return jData;
}

function removeFirstLast(val) {
    var sData = val.slice(1, -1);

    return sData;
}

function isJSONEmpty(data) {
    var isE = null;

    if(data.length > 0) {
        isE = true;
    }
    else{
        isE = false;
    }

    return isE;
}

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function setEmpty(value) {
    if (value == null || value === '') {
        value = '';
    }

    return value;
}

function AddZero(num) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
}

function getCurrentDate() {
    var nowDate = new Date();
    var currentdate = AddZero(nowDate.getMonth() + 1) + '/' + AddZero(nowDate.getDate()) + '/' + nowDate.getFullYear();

    return currentdate;
}

function getCurrentYear(){
    var nowDate = new Date();
    var currentYear = nowDate.getFullYear();

    return currentYear;
}

function isDate(txtD) {
    var currVal = txtD;
    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var dtArray = currVal.match(rxDatePattern);

    if (currVal == '') {
        return false;
    }

    if (dtArray == null) {
        return false;
    }

    dtMonth = dtArray[1];
    dtDay = dtArray[3];
    dtYear = dtArray[5];

    if (dtMonth < 1 || dtMonth > 12) {
        return false;
    }
    else if (dtDay < 1 || dtDay > 31) {
        return false;
    }
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31) {
        return false;
    }
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));

        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }

    return true;
}

function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

function ping(svcAddress) {
    $.ajax({
        url: svcAddress,
        success: function (result) {
            return true;
        },
        error: function (result) {
            return false;
        }
    });
}

function buckleCollapse() {
    $(".collapse").collapse('hide');
}

function clearLogin(){
    $('#txtbxUsername').val('');
    $('#txtbxPassword').val('');
}

function showSpinner() {
    $('#ajaxSpinnerContainer').show();
}

function hideSpinner() {
    $('#ajaxSpinnerContainer').hide();
}

function isNullNegOne(val) {
    if (val === null) {
        val = -1;
    }
    return val;
}

function goBack(){
    window.history.back();
}

function forceLower(strInput) 
{
    strInput.value=strInput.value.toLowerCase();
}

function getDuration(startDate,endDate){
    var date1 = new Date(startDate);
    var date2 = new Date(endDate);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

    return diffDays;
}

function dumpUserSession(){
    //clear the user's session storage
    sessionStorage.clear();

    //redirect
    window.location.href = "login.html";
}

function createVisitId(atkn) {
  var textId = "";
  var chain = atkn;

  for (var i = 0; i < 8; i++)
    textId += chain.charAt(Math.floor(Math.random() * chain.length));

  return textId;
}

function getGeoLocation(){
    
}

function externalLinkAccess(u){
    JSAlert.confirm(txtExternalLink).then(function(result) {
        if (!result){
            return;
        }
        else{
            openInNewTab(u);
        }
    });
}

function getObjects(obj, key, val) {
    var objects = [];
        
    for (var i in obj) {    
        if (!obj.hasOwnProperty(i)) continue;
        
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } 
        else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }   
    
    return objects;
}


//ajax calls
function loadUserActivity(ua){
    var jsonObject = makeJSON(ua);

    jQuery.ajax({
        type: "POST",
        url: epCreateUserActivity,
        data: jsonObject,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend : function( xhr ) {
            xhr.setRequestHeader( 'Authorization', sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT') );
        },
        success: function (data, status, xhr) {
            status = xhr.responseText;
            statusCode = xhr.status;

            if (statusCode === 200) { 
                //nothing to do; just write data - no need to return anything
            }
        },
        error: function (xhr, status, errorThrown) {
            status = "{'d':'0," + errorThrown + "'}";
            status = status.replace(/'/g, '"');
            console.log("Error Message: " + xhr.statusText + " " + xhr.responseText + " " + errorThrown + ", Ready State: " + xhr.readyState + " and Status Code: " + xhr.status);
        }
    });
}

function loadAppErrors(ae){
    var jsonObject = makeJSON(ae);

    jQuery.ajax({
        type: "POST",
        url: epCreateAppError,
        data: jsonObject,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend : function( xhr ) {
            xhr.setRequestHeader( 'Authorization', sessionStorage.getItem('TT') + ' ' + sessionStorage.getItem('AT') );
        },
        success: function (data, status, xhr) {
            status = xhr.responseText;
            statusCode = xhr.status;

            if (statusCode === 200) { 
                //nothing to do; just write data - no need to return anything
            }
        },
        error: function (xhr, status, errorThrown) {
            status = "{'d':'0," + errorThrown + "'}";
            status = status.replace(/'/g, '"');
            console.log("Error Message: " + xhr.statusText + " " + xhr.responseText + " " + errorThrown + ", Ready State: " + xhr.readyState + " and Status Code: " + xhr.status);
        }
    });
}