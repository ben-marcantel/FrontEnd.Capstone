"use strict";




angular.module("PseudoSceneApp")
    .controller("AnimateCtrl", function($scope, $document, $window, $route){

        $window.requestAnimationFrame = $window.requestAnimationFrame || $window.mozRequestAnimationFrame || $window.webkitRequestAnimationFrame || $window.msRequestAnimationFrame;

        let window = $window;
        //this sets canvas context
        const c = $document[0].getElementById("canvas1").getContext('2d');
        let x1;
        let y1;
        let x;
        let y;
       


       // data from inputs
        $scope.data = ()=>{
    
            x = $scope.formData.x1;
            y = $scope.formData.y1;

            

        //begin animation logic, all animation logic should be moved to a factory??   
        function draw(){
            x += 1;
            y += 1;

            c.fillStyle = '#000';
            c.fillRect(0, 0, x1, y1);

            c.fillStyle = "#ffffff";
            c.beginPath();
            c.arc(x, y, 10, 0, 2 * Math.PI, false);
            c.closePath();

            c.fill();

            window.requestAnimationFrame(draw);
        }

        draw();
    };
      


});

      


       
        
       
    
    
           
        
       


