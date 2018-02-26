"use strict";


angular.module("PseudoSceneApp")
.controller("ImageCtrl", function($scope, $routeParams, $location, $route, $window, AuthFactory, DataFactory){
    
 
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            
            $scope.formData = {
                data: null,
                name: null,
                imageId: null,
                public: null,
                uid: null
            };

            $scope.collection=()=>{
                DataFactory.getImage()
                .then((images)=>{
                    $scope.images = images;
                });
            };

            $scope.homeView = ()=>{
                $location.url("/");
            };
            
            $scope.back = ()=>{
                $location.url("/scene");
            };

            $scope.update = (id,form)=>{
                DataFactory.updateImage(id,form)
                .then(()=>{
                    $scope.collection();
                });
            };

            $scope.delete = (imageId)=>{
                // console.log(imageId);
                DataFactory.deleteImage(imageId)
                .then(()=>{
                    $route.reload("/images");
                });
            };

            $scope.submit = (formData, imageData)=>{
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