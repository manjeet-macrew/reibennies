//Live URL
var BaseUrl = "https://www.reibens.com/";

//Local URL
//var BaseUrl = "http://localhost:63808/";

angular.module('app.config', []).constant('config', {
    txtGrantType: "password",
    txtLoginAlert: "All login form elements must be populated.",
    txtLoginFailure400: "Unfortunately, there is an issue with your account. Please contact Tech Support.",
    txtLoginFailure: "This application is currently experiencing technical difficulties. Please contact Tech Support.",
    epLoginToken: BaseUrl + "token",
    epGetUserInfo: BaseUrl + "getuserinfo",
    epGetUserProfile: BaseUrl + "getprofileinfo",
    epGetUserProfileInfo: BaseUrl + "getuserprofileinfo?userId=",
    epModifyUserSettingsDemographics: BaseUrl + "modifyusersettingsdemographics?userId=",
    epModifyUserPassword: BaseUrl + "modifyuserpassword",
    epGetUserPassword: BaseUrl + "getuserpassword?userId=",
    epGetStates: BaseUrl + "getstates",
    epGetSubscriptions: BaseUrl + "getSubscriptions?userId=",
    epGetFaqs: BaseUrl + "getfaqs",
    epGetInvestorTypes: BaseUrl + "getinvestortypes",
    epUpdateUserInvestorTypes: BaseUrl + "updateuserInvestortypes",
    epChangeSubscription: BaseUrl + "changesubscription",
    epCancelSubscription: BaseUrl + "cancelsubscription?userId=",
    epGetHelpTopics: BaseUrl + "gethelptopics",
    epSaveConcern: BaseUrl + "saveconcern"
});
