"use strict";


angular.module("PseudoSceneApp")
.controller("ImageCtrl", function($scope, $routeParams, $location, $route, $window, AuthFactory, DataFactory){
    
 
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            $scope.collection=()=>{
                DataFactory.getImage()
                .then((images)=>{
                    $scope.images = images;
                });
            };
           
            $scope.back = ()=>{
                $location.url("/scene");
            };

            $scope.update = (id,form)=>{
                console.log(id,form);
                DataFactory.updateImage(id,form)
                .then(()=>{
                    $scope.collection();
                });
            };

            $scope.delete = (imageId)=>{
                console.log(imageId);
                DataFactory.deleteParameter(imageId)
                .then(()=>{
                   $scope.collection();
                });
            };

            $scope.submit = (imageData,formData)=>{
                imageData.public = formData.public;
                imageData.name = formData.name;
                delete imageData.$$hashKey;
                let newObj = imageData;
                $scope.update(newObj.imageId,newObj);
            };

        $scope.collection();

        }
    });
});