"use strict";


angular.module("PseudoSceneApp").factory("AnimationFactory", function($window, $document, $route, $interval) {
    
    let window = $window;
    $window.requestAnimationFrame = $window.requestAnimationFrame || $window.mozRequestAnimationFrame ||                $window.webkitRequestAnimationFrame || $window.msRequestAnimationFrame;
    let cancelAnimationFrame = $window.cancelAnimationFrame || $window.mozCancelAnimationFrame;


/////////////////MASTER VARIABLE LIST//////////////////////
    let x = null;
    let y = null; 
    let x1 = null;       
    let y1 = null;
    let x2 = null;
    let y2 = null;
    let v = null;
    let r = null;
    let g = null;
    let b = null;
    let blur = null;
    let fontsize = null;
    let end = null;
    let rgbRange = null;
    let consBounX = 1080;
    let consBounY = 512;
    let numObjects = 1;
    let radius;
    let dRadius;
    let dr;
    let dg;
    let db;
    let id;
    let c;
    let dx;
    let dy;
    let dx1;
    let dy1;
    let velocity;
    let radians;


              
////////////////////////ANIMATION OBJECT/////////////////

    let drawMovingObject = (data)=>{


        let dist = (x1, y1, x2, y2)=> {
            let xDist = x2 - x1;
            let yDist = y2 - y1;
            return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
        };

        let randNum = (min, max)=> {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };
   
     c = $document[0].getElementById("canvas1").getContext('2d');

        function AnimaObj(x,y,x1,y1,dx,dy,radius,dRadius,r,dr,g,dg,b,db,radians,velocity){
            this.x = x;
            this.y = y;
            this.x1 = x1;
            this.y1 = y1;
            this.dx = dx;
            this.dy = dy;
            this.dx1 = dx1;
            this.dy1 = dy1;
            this.radius = radius;
            this.dRadius = dRadius;
            this.r =Math.floor((Math.random() * 255) +1);
            this.dr= 1/4;
            this.g = Math.floor((Math.random() * 255) +1);
            this.dg= 1/4;
            this.b = Math.floor((Math.random() * 255) +1);
            this.db = 1/4;
            this.radians = radians;
            this.velocity = velocity;
            this.distOfCntr = {x:randNum(50,200), y:randNum(100,200)};
        
/////////DRAW HELPER FUNCTIONS/////

     

            let lastPoint;
            let shapeChoose = (data)=>{
                
                if (data.shape === 0){
                    c.moveTo(lastPoint.x+data.x,lastPoint.y+data.y);
                    c.lineTo(this.x,this.y);
                   
                } else if (data.shape === 1){
                    c.lineTo(this.x + data.x + 1/20, this.y + data.y);
                    c.lineTo(this.x + data.y1, this.y + data.y1);

                } else if (data.shape === 2){
                    c.arc(this.x + data.x, this.y + data.y, data.radius, 0, Math.PI * 2, false);
                    

                } else if (data.shape === 3){
                    // c.arc(this.x + data.x, this.y + data.y, data.radius, 0, Math.PI * 2, false);
                    c.translate(c.innerWidth/2,c.innerHeight/2);
                    c.lineTo(Math.sin(this.radians)+this.x,Math.cos(this.radians)+this.y);
                    // c.rotate((Math.sin(this.radians/2+this.x) * Math.PI)/ 180);
                    c.lineTo(3*this.x+Math.sin(this.radians)*10,this.y+Math.sin(this.radians));
                    // c.rotate((Math.sin(this.radians) * Math.PI)/ 180);
                    c.lineTo(2*this.x1+Math.cos(this.radians)*10,this.y+Math.sin(this.radians/2));
                    c.closePath();
                    
                }  else if (data.shape === 4){
                    c.lineTo(this.x,this.y);
                    c.save();
                    c.lineTo(this.x+this.y1,this.y+this.y1);
                    c.lineTo(this.x1,this.y1);
                    c.lineTo(this.x1-this.y1,this.y1-this.y);
                    c.arc(this.x, this.y, this.radians, 0, Math.PI * 2, false);
                    c.lineTo(this.radians+this.x1,this.velocity+this.y);
                    c.restore();
                }  
                
            };
////////TEXT///
            let textData = (data)=>{
                if (data.paramImageText === undefined){
                    return   c.strokeText("",this.x,this.y);
                } else {    
                    c.font=`${data.radius}px Futura`;
                    c.strokeText(data.paramImageText,this.x,this.y);
                }
            };
////////FILL///
            let fillOnOff = (data)=>{
                if (data.fillSw === 0 ) {
                    c.strokeStyle = 'rgb(' + data.r +',' + data.g + ',' + data.b + ')';
                } else if (data.fillSw === 1){
                    c.strokeStyle = 'rgb(' + this.r +',' + this.g + ',' + this.b + ')';
                }
            };
////////BLUR///
            let blurOnOff = (data)=>{
                if (data.blur === 0){
                    c.shadowColor = 'rgb(' + data.r +',' + data.g + ',' + data.b + ')';
                    c.shadowBlur = data.blurAmt;
                    c.shadowOffsetX = this.x;
                    c.shadowOffsetY = this.y;
                } else if (data.blur === 1){
                    c.shadowColor = "rgba(0,0,0,0.00)";
                    c.shadowBlur = 0;
                    c.shadowOffsetX = this.x;
                    c.shadowOffsetY = this.y;
                }
     
            };

            this.draw = function(lastPoint,data){
                c.beginPath();
                c.translate(data.x1,data.y1);
                
                

                shapeChoose(data);
                textData(data);
                c.strokeStyle='rgb(' + data.r +',' + data.g + ',' + data.b + ')';
                fillOnOff(data);
                blurOnOff(data);
                
                // c.scale(3/4,3/4);
                // c.setTransform((data.y2/100) ,(data.x2/100),(data.x2/100),(data.y2/100),(data.x/100),(data.y/100) );
                c.rotate((data.x2 * Math.PI)/ 180);
                // c.skew(data.x2/100);
                c.stroke();
                };
        
                

            this.update = function(){
                lastPoint = {x:this.x, y:this.y, x1:this.x1, y1:this.y1};
                
                if(this.r > 255 || this.r<1){
                    this.dr= -this.dr;
                }
                if(this.g > 255 || this.g<1){
                    this.dg= -this.dg;
                }
                if(this.b > 255 || this.b<1){
                    this.db= -this.db;
                }
                if(this.radius>100|| this.radius<1){
                    this.dRadius = -this.dRadius; 
                }
                this.radians += this.velocity;

/////PATH DEFINE//
                if (data.path === 0 ){
                    this.x = data.x + x + (Math.cos(this.radians) * this.distOfCntr.x);
                    this.y =  data.y + y + (Math.sin(this.radians)*this.distOfCntr.y);

                    
                }  else if(data.path === 1){
                    this.x = data.x+x + (Math.cos(2*this.radians)*150);
                    this.y += data.y +this.dy; 
                    this.x1 =  data.x + (Math.cos(this.radians)*150);
                    this.y1 = data.y + y1 + (Math.sin(this.radians)*150);
                }
                
                
                
                
                
                else if(data.path === 2){
                    this.x = data.x+x+(Math.cos(this.radians)*150);
                    this.y = data.y+y+(Math.sin(2*this.radians)*100);
                    this.x1 = y1+(Math.cos(this.radians))+(Math.cos(this.radians)* this.x);
                    this.y1 = y1+data.y + y + Math.sin(this.radians)*10+Math.sin
                    (this.radians*1/this.y1);

                } else if(data.path === 3){
                    this.x = data.x;
                    this.y = data.y; 
                    this.x1 = data.x1;
                    this.y1 = data.y1;  

                }else if(data.path ===4){

                    this.x = x + Math.sin(this.radians/10) * 1 + Math.sin(this.radians/5)*1;   
                    this.y = y + Math.cos(this.radians/10)+1;   
                    this.x1 = x1 + Math.sin(this.radians /10)*2 + Math.cos(this.radians)*2;
                    this.y1 = y1 + Math.cos(this.radians/20)* 2 + 2 + Math.cos(this.radians /12) * 2;  
                    if (this.x + data.radius > 1080 || this.x - data.radius < 0) {
                        this.dx = -this.dx;
                    }   
                    if (this.y + data.radius > 512 || this.y - data.radius < 0) {
                        this.dy = -this.dy;
                    }
                    if (this.x1 + data.radius > 1080 || this.x1 - data.radius < 0) {
                        this.dx1 = -this.dx1;
                    }   
                    if (this.y1 + data.radius > 512 || this.y1 - data.radius < 0) {
                        this.dy1 = -this.dy1;
                    }
                }


                 else if(data.path === 5){
                    this.x = x + Math.sin(this.radians)*100+Math.sin(this.radians*3)*10+ Math.sin(this.radians*4)+ data.x;
                    this.y = y + Math.cos(this.radians*4)*100+data.y+ Math.cos(this.radians*4); 
                    this.x1 = this.x;
                    this.y1 = this.y;  
                }
                
                /////////RANDOM
                else if (data.path === 6){
                    this.x += this.dx;
                    this.y += this.dy; 
                    this.x1 += this.dx1;
                    this.y1 += this.dy1; 
                }   

                if (this.x + data.radius > 1080 || this.x - data.radius < 0) {
                    this.dx = -this.dx;
                }   
                if (this.y + data.radius > 512 || this.y - data.radius < 0) {
                    this.dy = -this.dy;
                }
                if (this.x1 + data.radius > 1080 || this.x1 - data.radius < 0) {
                    this.dx1 = -this.dx1;
                }   
                if (this.y1 + data.radius > 512 || this.y1 - data.radius < 0) {
                    this.dy1 = -this.dy1;
                }
                this.radians += this.velocity;
                this.r += this.dr;
                this.g += this.dg;
                this.b += this.db;
                this.radius += this.dRadius;
                this.draw(lastPoint, data);
                };
                
     
                
            }
       let printArray;
       let num = data.numObj;
       
    let implement = (num)=>{
         printArray = [];
         console.log(num);

        for(let i=0; i<3+num;i++){
            let x =  (Math.floor (Math.random()*10)) + data.radius;
            let y =  (Math.floor (Math.random()*10)) + data.radius;
            let x1 = (Math.floor (Math.random()*10)) + data.radius;
            let y1 = (Math.floor (Math.random()*10)) + data.radius;
            let dx = 1;
            let dy = 1;
            let dx1 = 1/2;
            let dy1 = 1/2; 
            let r = Math.floor((Math.random() * 255) +1);
            let g = Math.floor((Math.random() * 255) +1);
            let b = Math.floor((Math.random() * 255) +1);
            let dr = 1/4;
            let dg = 1/4;
            let db = 1/4;
            let radius = (Math.random()*2)+1;
            let dradius = 1;
            let radians = Math.random()*Math.PI*2;
            let velocity = 0.005;
            printArray.push(new AnimaObj(x,y,x1,y1,dx,dy,dx1,dy1,radius,dRadius,r,dr,g,dg,b,db,radians,velocity));
        }   
    };
  

        let trailOnOff = ()=>{
            if (data.switch === 0){
                c.clearRect(0,0, 1080,1080);  
            } else if (data.switch === 1) {
                c.fillRect(0,0,0,0);
                c.fillStyle="rgba(0,0,0,0.00)";
            } else if (data.switch === 2){
                c.fillRect(0,0, 1080,512);
                c.fillStyle="rgba(0,0,0,0.05)";
            }
        };
        
        function drawObj(on){
            
            id = window.requestAnimationFrame(drawObj);
            if (data.anOnOff === 0){
                trailOnOff();
                for (let i=0;i<printArray.length; i++){
                    printArray[i].update(data);
                } 
            }   else if (data.anOnOff === 1){
                    window.cancelAnimationFrame(id);
                }
            }


        implement(num);
        drawObj(data);
        
        // c.moveTo(data.x1,data.y1);
        
    };

////////////ONLOAD



let onload =()=> {
    console.log("test");
    c = $document[0].getElementById("landing").getContext('2d');
    let x;
    let y;
    let x1;
    let y1;
    let dx;
    let dy;
    let dx1;
    let dy1;
    let pos =[];
    let radians;
    let velocity;
  

    function HomeObj(x,y,x1,y1,dx,dy,dx1,dy1,pos,radians,velocity){
        this.x= x;
        this.y= y;
        this.x1= x1;
        this.y1= y1;
        this.dx= dx;
        this.dy= dy;
        this.dx1= dx1;
        this.dy1= dy1;
        this.pos= pos;
        this.radians= radians;
        this.velocity= velocity;

        this.draw = function(){
            // c.save();
            c.beginPath();
            // c.translate (1+this.x,1+this.y+1);
            c.lineTo(this.x,this.y);
            // c.rotate((10 * Math.PI)/ 180);
            c.lineTo(this.x+this.y1+5,this.y+this.y1);
            c.closePath();
            // c.rotate((4 * Math.PI)/ 180);
            c.lineTo(this.x1+5,this.y1);
            c.lineTo(this.x1-this.y1,this.y1-this.y);
            c.closePath();
            
            // c.arc(this.x, this.y, this.radians, 0, Math.PI * 2, false);
            c.lineTo(this.radians+this.x1,this.velocity+this.y);
            // c.restore();
            c.shadowColor = "rgba(255,0,154.0.5)";
            c.strokeStyle="rgb(255,0,154)";
            c.shadowBlur = 25;
            
            // c.font="40px Futura";
            // c.strokeText("Java Lamp",this.x,this.y);
            c.stroke();
        };

        this.update = function(){
            pos.push(this.x);
            pos.push(this.y);
            this.x = x + (Math.cos(2*this.radians)*150);
            this.y += this.dy; 
            this.x1 = x + x1 + (Math.sin(this.radians)*150);
            this.y1 += this.dy1;
            this.radians += this.velocity;
            if (this.x  > 520|| this.x  < 0) {
                this.dx = -this.dx;
            }   
            if (this.y > 240|| this.y < 0) {
                this.dy = -this.dy;
            }
            if (this.x1  > 520 || this.x1  < 0) {
                this.dx1 = -this.dx1;
            }   
            if (this.y1 > 240 || this.y1 < 0) {
                this.dy1 = -this.dy1;
            }
            this.draw();
        };
    }

        let homeArray;
        let implement = ()=>{
            homeArray = [];
            for(let i=0; i<3;i++){
                let x =  10;
                let y =  10;
                let x1 = 5;
                let y1 =  5;
                let dx = 1;
                let dy = 1;
                let dx1 = 1/2;
                let dy1 = 1/2 + Math.cos((x/10));
                let pos = [];
                let radians = Math.random()*Math.PI*2;
                let velocity = 0.002;
                homeArray.push(new HomeObj(x,y,x1,y1,dx,dy,dx1,dy1,pos,radians,velocity));
            }   
        };

        function drawObj(){
            window.requestAnimationFrame(drawObj);
            c.translate(c.Width/2,c.Height/2);
            c.clearRect(0,0,540,540);
            c.fillRect(0,0,540,540);
            c.translate(c.Width/2,c.Height/2);
            c.fillStyle="rgba(0,0,0,0.05)";
            // c.translate (-1,0);
                for (let i=0;i<homeArray.length; i++){
                    homeArray[i].update();
                }
            }
       


    implement();    
    drawObj();
    // c.scale(4/5,4/5);
    c.translate(c.Width/2,c.Height/2);
    

    

 };











        return {drawMovingObject,onload};    
});




//////////////////////////Static group///////////////////
   

// let drawLsystem = (data)=>{

    //     let currentString = "X";
    //     let nextString = "";

    //     /////GENERATE STRING///////
    //     let generate = ()=>{
    //         for (let i = 0; i<currentString.length; i++){
    //             let chAt = currentString.charAt(i);
    //             if (chAt == "X"){
    //                 nextString += "F[-X][X]F[-X]+FX";
    //             } else if (chAt == "F"){
    //                 nextString += "FF";
    //             }
    //         } 
    //         currentString += nextString;
    //     };
        
    //     ////////INTERPRET STRING RULES//////////
    //     let interpret = ()=>{
    //         for (let i =0; i<currentString.length; i++){
    //             let decoder = currentString.charAt(i);
                
             
                
    //             if (decoder == "F"){ 
    //                 // F means "draw forward
                    
           
    //             } else if (decoder == "X"){
    //                 // X does not correspond to any drawing action and is used to control the evolution of the curve. 
                    
    //                 c.rotate((5 * Math.PI)/ 180);
    //                 c.closePath();
        
    //             } else if (decoder == "+"){
    //                 // − means "turn left 25°"
                    
    //                 c.closePath();
    //                 c.rotate(-(45 * Math.PI / 180));
                    
    //             } else if (decoder == "-"){
    //                 // + means "turn right 25°"
                   
    //                 c.closePath();
    //                 c.rotate(45 * Math.PI / 180);
                    
                    
    //             } else if (decoder == "["){
    //                 // The square bracket "[" corresponds to saving the current values for position and angle,
                    
                
    //             } else if (decoder == "]");
    //             // which are restored when the corresponding "]" is executed
                    
                    
    //         }   
    //     };
        
        
    //     let initLsystem = ()=>{
            
    //         c.beginPath();
    //         c.translate(1080/2,512/2);   
    //         interpret();
    //         c.strokeStyle = "rgb(255,0,200)";
    //         c.stroke();
    //     };
        
        
    //     let magic = (data)=>{
    //         for (let i=0; i<1;i++){
    //             generate(); 
    //             initLsystem();
    //         }
    //     };

    //     magic();
    // };
  
    
        

       

