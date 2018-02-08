"use strict";




angular.module("PseudoSceneApp")
    .controller("AnimateCtrl", function($scope, $document, $window, $route){

        //this sets canvas context
        const c = $document[0].getElementById("canvas1").getContext('2d');
        let x;
        let y;
       


       // data from inputs
        $scope.data = ()=>{
    
            x = $scope.formData.x1;
            y = $scope.formData.y1;


        //begin animation logic, all animation logic should be moved to a factory??   

            let draw = ()=>{
                
                c.beginPath();
                c.lineTo(x,y);
                c.lineTo(x*10,y*10);
                c.strokeStyle = "red";
                c.stroke();   
            };

            draw();
        };

       

        
      
         
       
        
       
    
    
           
        
       

});
