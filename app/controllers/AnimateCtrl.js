// "use strict";




// angular.module("PseudoSceneApp")
//     .controller("AnimateCtrl", ['$scope', '$document', function($scope, $document){
//         
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


//         let makeMove=()=>{

//             const canvas = $document.find('canvas')[0];
//             canvas.width  = window.innerWidth;
//             canvas.height = window.innerHeight;
//             const c = canvas.getContext('2d');
    
//             let x = 0;
//             let y = 0;
    
//             function draw(){
//                 x += 1;
//                 y += 1;
    
//                 c.fillStyle = '#000';
//                 c.fillRect(0, 0, window.innerWidth, window.innerHeight);
    
//                 c.fillStyle = "#ffffff";
//                 c.beginPath();
//                 c.arc(x, y, 10, 0, 2 * Math.PI, false);
//                 c.closePath();
    
//                 c.fill();
    
//                 requestAnimationFrame(draw);
//             }
    
//             draw();

//         }
       

// }]);