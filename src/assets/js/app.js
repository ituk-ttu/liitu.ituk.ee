// Environment variables

if (window.location.hostname === "localhost"){
    apiBase = "https://dev.hub.ituk.ee/application";
    apiBase2 = "https://dev.hub.ituk.ee";
} else {
    apiBase = "https://dev.hub.ituk.ee/application";
    apiBase2 = "https://dev.hub.ituk.ee";
}
/*
https://dev.hub.ituk.ee/application - UUS API
https://api.hub.ituk.ee/apply - VANA API
https://dev.hub.ituk.ee/swagger-ui.html -> Application POST
{
    "createdAt": "2020-03-07T11:56:32.589Z",
    "curriculum": "string",
    "email": "string",
    "firstName": "string",
    "id": 0,
    "lastName": "string",
    "mentorId": 0,
    "mentorSelectionCode": "string",
    "personalCode": "string",
    "processedById": 0,
    "studentCode": "string",
    "updatedAt": "2020-03-07T11:56:32.589Z"
}*/

var app = angular.module("joinItuk", [
    "ui.router",
    "ui.utils",
    'ui.bootstrap'
]).run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .otherwise("");
    $stateProvider
        .state("join", {
            url: "",
            templateUrl: "templates/join.html",
            controller: "joinController"
        })
        .state("selectMentor", {
            url: "/:id/:mentorSelectionCode/:origin",
            templateUrl: "templates/selectMentor.html",
            controller: "selectMentorController"
        })
});
