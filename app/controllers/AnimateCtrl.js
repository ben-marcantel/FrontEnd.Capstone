"use strict";


angular.module("PseudoSceneApp")
    .controller("AnimateCtrl", function($scope, $document, $window, $route, DataShareFactory, AnimationFactory){
        let window = $window;
        $window.requestAnimationFrame = $window.requestAnimationFrame || $window.mozRequestAnimationFrame || $window.webkitRequestAnimationFrame || $window.msRequestAnimationFrame;
        const  cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
        let canvas = $document[0].getElementById("canvas1");
        const c = $document[0].getElementById("canvas1").getContext('2d');
        let x1;
        let y1;
        let x;
        let y;
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
        c.closePath();
        c.translate(0, 0);
        c.clearRect(0, 0, 10000, 10000);
    };

/////////DATA SHARE FACTORY GETTER/////////
    $scope.formExe=()=>{
       dataFromGetter = DataShareFactory.getData();
       return dataFromGetter;
    };

///////////PAUSE ANIMATION///////////
    $scope.stopAnimation =()=>{
        console.log("yo");
        cancelAnimationFrame(animationToPause);
    };


///////EQUATION CALLERS/////
    $scope.static = ()=>{
        $scope.formExe();
        AnimationFactory.draw(dataFromGetter);
    };

    $scope.animate = ()=>{
        $scope.formExe();
        AnimationFactory.drawTenPrint(dataFromGetter);
        animationToPause = AnimationFactory.drawTenPrint(dataFromGetter);
    };
    


});















/////////////////data from inputs/////////////
// let newFormData;
//         $scope.data = ()=>{
//             newFormData = $scope.formData;
//             AnimationFactory.draw(newFormData);
            
//         };
// });

      


       
        
       
    
    
           
        
       


