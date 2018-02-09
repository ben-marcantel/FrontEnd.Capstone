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
                if ($scope.formData.$$hashKey === undefined){
                    $scope.formData.uid = firebase.auth().currentUser.uid;
                    DataFactory.addParameter($scope.formData)
                    .then((form)=>{
                        $route.reload("/scene");
                    });
                }
                else {
                    // $scope.formData.$$hashKey = null;
                    delete $scope.formData.$$hashKey;
                    console.log("pre-patch data set",$scope.formData);
                    DataFactory.updateParameters($scope.formData.paramsId,$scope.formData)
                    .then((form)=>{
                        $route.reload("/scene");
                    });
                }

            };
            
           

            // retrieve user form data
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
            $scope.initSavedParam = (recalledFormData)=>{
                $scope.formData = recalledFormData;
            };



            //delete parameter
            $scope.deleteParam = (paramId)=>{
                DataFactory.deleteParameter(paramId)
                .then(()=>{
                    $scope.loadParam();
                    $route.reload("/scene");
                });
            };


        }
    });
});