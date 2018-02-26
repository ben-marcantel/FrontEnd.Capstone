"use strict";


angular.module("PseudoSceneApp")
    .controller("AnimateCtrl", function($scope, $document, $window, $route, $location, DataShareFactory, AnimationFactory, DataFactory){
        let window = $window;
        $window.requestAnimationFrame = $window.requestAnimationFrame || $window.mozRequestAnimationFrame || $window.webkitRequestAnimationFrame || $window.msRequestAnimationFrame;
        let  cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
        let canvas = $document[0].getElementById("canvas1");
        let c = $document[0].getElementById("canvas1").getContext('2d');
        let image={};
        let dataFromGetter;
       


        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {

/////////DOWNLOAD IMAGE/////////
    $scope.downloadImg = ()=>{
        image.data = canvas.toDataURL('image/jpeg', 1.0);
        image.uid = firebase.auth().currentUser.uid;
        DataFactory.addImage(image);
    };

    $scope.sendImage = (image)=>{
       DataShareFactory.setImage(image);
    };

    



////////CLEAR IMAGE///////
    $scope.clearImage = ()=>{
        c.beginPath();
        c.translate(0, 0);
        c.closePath();
        c.clearRect(0, 0, 10000, 10000);
    };


/////////DATA SHARE FACTORY GETTER/////////
    $scope.formExe = ()=>{
       dataFromGetter = DataShareFactory.getData();
       return dataFromGetter;
    };

//////////////////////////EQUATION CALLERS////////////////////////////
    $scope.static = ()=>{
        $scope.formExe();
        AnimationFactory.drawStatic(dataFromGetter);
    };

    $scope.animate = ()=>{
        $scope.formExe();
        dataFromGetter.anOnOff = 0;
        AnimationFactory.drawMovingObject(dataFromGetter);
    };

    $scope.pause=()=>{
        $scope.formExe();
        dataFromGetter.anOnOff = 1;
        AnimationFactory.drawMovingObject(dataFromGetter);
    };
    
 /////////NAV/////////////////  
    $scope.galleryView = ()=>{
        $location.url("/images");
    };

    $scope.homeView = ()=>{
        $location.url("/");
    };

        }
    });
        
});













       
        
       
    
    
           
        
       


