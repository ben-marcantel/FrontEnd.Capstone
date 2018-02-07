"use strict";


angular.module("PseudoSceneApp")
.controller("SceneCtrl", function($scope, $routeParams, $location, $route, $window, AuthFactory, DataFactory ){
    
 
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {


            //new form
            let formData = {
                x1: $scope.x1,
                y1: $scope.y1,
            };


            //send form data to fire base
            $scope.save = ()=>{ 
                formData.uid = firebase.auth().currentUser.uid;
                console.log("step2",formData);
                DataFactory.addParameter(formData)
                .then((form)=>{
                    $route.reload("/scene");
                });
            };
           
            

        }
    });
});