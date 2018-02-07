"use strict";


angular.module("PseudoSceneApp")
.controller("SceneCtrl", function($scope, $routeParams, $location, $route, $window, AuthFactory, DataFactory ){
    
 
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {


            $scope.save = function(){
                console.log($scope.xSetting);
            };

            
            $scope.sendNewParameter = ()=>{ 
                
                $scope.newParameterState.uid = firebase.auth().currentUser.uid;
                DataFactory.addParameter($scope.newParameterState)
                .then((param)=>{
                    $route.reload("/scene");
                });
            };
        }
    });
});