"use strict";




angular.module("PseudoSceneApp")
    .controller("AnimateCtrl", function($scope, $document, $window){
        
        
        // canvas.width = $window.innerwidth;
        // canvas.height = $window.innerHeight;

        $scope.data = ()=>{
            const canvas = $document.find('canvas')[0];
            const c = canvas.getContext('2d');
            console.log('im here');
            let x = $scope.x1.value;
            let y = $scope.y1.value;
            console.log(x,y);
            c.beginPath();
            c.lineTo(10,20);
            c.strokeStyle = "red";
            c.stroke();
       };  
     
       
    
    
           
        
       

});


// window.requestAnimFrame = (function(){
//     return  window.requestAnimationFrame       ||
//       window.webkitRequestAnimationFrame ||
//       window.mozRequestAnimationFrame    ||
//       window.oRequestAnimationFrame      ||
//       window.msRequestAnimationFrame     ||
//       function(/* function */ callback, /* DOMElement */ element){
//         window.setTimeout(callback, 1000 / 60);
//       };
//   })();
// canvas.width  = window.innerWidth;
//             canvas.height = window.innerHeight;