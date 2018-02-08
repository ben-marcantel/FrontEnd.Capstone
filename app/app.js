"use strict";

//main control hub
angular.module("PseudoSceneApp", ["ngRoute"])
    .constant('_')
    .config($routeProvider=>{
    $routeProvider
    .when("/", {
        templateUrl: "/templates/partials/login.html",
        controller: "LogInCtrl",
    })
    .when("/scene", {
        templateUrl: "/templates/partials/onload.html",
        controller: "AnimateCtrl", 
    })
    .when("/scene", {
        templateUrl: "/templates/partials/onload.html",
        controller: "SceneCtrl", 
    })
    .otherwise("/");
    })
    .run(FBcreds => {
        let creds = FBcreds;
        let authConfig = {
            apiKey: creds.apiKey,
            authDomain: creds.authDomain
        };
        firebase.initializeApp(authConfig);
    });