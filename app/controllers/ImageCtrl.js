"use strict";


angular.module("PseudoSceneApp")
.controller("ImageCtrl", function($scope, $routeParams, $location, $route, $window, AuthFactory, DataFactory){
    
 
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            DataFactory.getImage()
            .then((images)=>{
                $scope.images= images.data;
                console.log(images);
                
            });
        }
    });
});