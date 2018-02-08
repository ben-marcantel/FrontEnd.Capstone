"use strict";


angular.module("PseudoSceneApp")
.controller("SceneCtrl", function($scope, $routeParams, $location, $route, $window, AuthFactory, DataFactory){
    
 
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {


            //new form
            $scope.formData = {
                x1: null,
                y1: null,
                paramName: null
            };


            //send form data to fire base
            $scope.save = ()=>{ 
                $scope.formData.uid = firebase.auth().currentUser.uid;
                DataFactory.addParameter($scope.formData)
                .then((form)=>{
                    $route.reload("/scene");
                });
            };
           
            
            // retreive user form data
            $scope.loadParam = ()=>{
                DataFactory.getParameters()
                .then((params) => {
                    $scope.params = params; 
                })
                .catch((error) => {
                    console.log("You messed up bruh", error);
                });

            };


            //helper function to scope recalled form data set to draw logic
            $scope.initSavedParam = (data)=>{
                $scope.formData = data;
            };


        }
    });
});