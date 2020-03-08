// Environment variables

if (window.location.hostname === "localhost"){
    apiBase = "https://dev.hub.ituk.ee";
} else {
    apiBase = "https://dev.hub.ituk.ee";
}

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
