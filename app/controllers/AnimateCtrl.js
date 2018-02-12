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
        let newFormData;
        let image;


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
        // c.rotate((Math.PI / 180) * 1);
        
        // c.rotate()
        c.clearRect(0, 0, 10000, 10000);
    };



    /////////DATA SHARE FACTORY GETTER/////////
    $scope.formExe=()=>{
        DataShareFactory.getData();
        console.log("right here!!!", $scope.data);
    };


/////////////////data from inputs/////////////
        $scope.data = ()=>{
            console.log("yooooo!", $scope.formData);
            x = $scope.formData.x1;
            y = $scope.formData.y1;
            newFormData = $scope.formData;
            AnimationFactory.draw(newFormData);
            
        };
});

      


       
        
       
    
    
           
        
       


