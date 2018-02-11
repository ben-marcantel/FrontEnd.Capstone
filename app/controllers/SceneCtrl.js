"use strict";


angular.module("PseudoSceneApp")
.controller("SceneCtrl", function($scope, $routeParams, $location, $route, $window, AuthFactory, DataFactory, DataShareFactory){
    
 
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            
            ////////////////FORM SCOPE DATA
            // $scope.formData = {
            //     x1: null,
            //     y1: null,
            //     paramName: null
            // };

/////////////////SETTER FOR DATA SHARE FACTORY
            $scope.submitData = function(formData)  { 
                        DataShareFactory.setData(formData);
                          console.log(formData);
                     };



///////////////////DATA FORM CRUD/////////////////////////////




            //send form data to fire base
            $scope.save = ()=>{ 
                if ($scope.formData.$$hashKey === undefined){
                    $scope.formData.uid = firebase.auth().currentUser.uid;
                    DataFactory.addParameter($scope.formData)
                    .then((form)=>{
                        $scope.loadParam();
                    });
                }
                else {
                    // $scope.formData.$$hashKey = null;
                    delete $scope.formData.$$hashKey;
                    console.log("pre-patch data set",$scope.formData);
                    DataFactory.updateParameters($scope.formData.paramsId,$scope.formData)
                    .then((form)=>{
                        $scope.loadParam();
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
                });
            };

            //exit parameter
            $scope.exitParamEdit = ()=>{
                $scope.loadParam();
            };



        }
    });
});