"use strict";


angular.module("PseudoSceneApp")
    .controller("AnimateCtrl", function($scope, $document, $window, $route, $animate, DataShareFactory, AnimationFactory){
        let window = $window;
        $window.requestAnimationFrame = $window.requestAnimationFrame || $window.mozRequestAnimationFrame || $window.webkitRequestAnimationFrame || $window.msRequestAnimationFrame;
        let  cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
        let canvas = $document[0].getElementById("canvas1");
        let c = $document[0].getElementById("canvas1").getContext('2d');
        let image;
        let dataFromGetter;
        let animationToPause;


/////////DOWNLOAD IMAGE/////////
    $scope.downloadImg = ()=>{
        image = canvas.toDataURL('image/jpeg', 1.0);
        console.log(image);
    };

////////CLEAR IMAGE///////
    $scope.clearImage = ()=>{
        c.beginPath();
        c.translate(0, 0);
        c.closePath();
        c.clearRect(0, 0, 10000, 10000);
    };

///////////PAUSE ANIMATION///////////
    $scope.stopAnimation = ()=>{
        $route.reload("/scene");
        // AnimationFactory.pauseAnimation();
        return;
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
        AnimationFactory.drawMovingObject(dataFromGetter);
    };
   

});















/////////////////data from inputs/////////////
// let newFormData;
//         $scope.data = ()=>{
//             newFormData = $scope.formData;
//             AnimationFactory.draw(newFormData);
            
//         };
// });

      


       
        
       
    
    
           
        
       


