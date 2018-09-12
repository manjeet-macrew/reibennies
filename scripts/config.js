﻿angular.module('app.config', []).constant('config', {
    txtGrantType: "password",
    txtLoginAlert: "All login form elements must be populated.",
    txtLoginFailure400: "Unfortunately, there is an issue with your account. Please contact Tech Support.",
    txtLoginFailure: "This application is currently experiencing technical difficulties. Please contact Tech Support.",
    appURL: "http://localhost:51692/",
    epLoginToken: "https://www.reibens.com/token",
    epGetUserInfo: "https://www.reibens.com/getuserinfo",
    epGetUserProfile: "https://www.reibens.com/getprofileinfo",
    epGetUserProfileInfo: "https://www.reibens.com/getuserprofileinfo?userId="
    //epLoginToken: "http://localhost:63808/token",
    //epGetUserInfo: "http://localhost:63808/getuserinfo",
    //epGetUserProfile: "http://localhost:63808/getprofileinfo",
});
