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
    let movementPath =()=>{};
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


              
////////////////////////ANIMATION OBJECT/////////////////

    let drawMovingObject = (data)=>{

   
     c = $document[0].getElementById("canvas1").getContext('2d');

        function AnimaObj(x,y,dx,dy,radius,dRadius,r,dr,g,dg,b,db,radians,velocity){
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.radius = Math.floor((Math.random() * 100) + 6);
            this.dRadius = 1;
            this.r = Math.floor((Math.random() * 255) +1);
            this.dr= 1/4;
            this.g = Math.floor((Math.random() * 255) +1);
            this.dg= 1/4;
            this.b = Math.floor((Math.random()* 255)+1);
            this.db = 1/4;
            this.radians = 8;
            this.velocity = 0.05;
        
/////////DRAW HELPER FUNCTIONS/////
//    let lastPoint = {x:this.x, y:this.y};

            let shapeChoose = (data)=>{
                
                if (data.shape === 0){
                    
                } else if (data.shape === 1){
                    c.lineTo(this.x, this.y);
                    c.lineTo(data.x, data.y);
                } else if (data.shape === 2){
                    c.lineTo(this.x*4/4, this.y*3/4);
                    c.lineTo(this.x1, this.y1*1/4);
                    c.fill();
                } else {
                    c.arc(this.x, this.y, data.radius, 0, Math.PI *2, false);
                    
                }    
            };
////////////TEXT//////
            let textData = (data)=>{
                if (data.paramImageText === undefined){
                    return   c.strokeText("",this.x,this.y);
                } else {    
                    c.font=`${data.radius}px Futura`;
                    c.strokeText(data.paramImageText,this.x,this.y);
                }
            };


/////FILL TODO INTEGRATE WITH FORM!!!!//////
            let fillOnOff = (data)=>{
                if (data.fillSw === 0){
                    c.fillStyle="rgba(0,0,0,0.00)";
                } else if (data.fillSw === 1 ) {
                    c.fillStyle = 'rgb(' + data.r +',' + data.g + ',' + data.b + ')';
                } if (data.fillSw === 2){
                    c.fillStyle = 'rgb(' + this.r +',' + this.g + ',' + this.b + ')';
                }
            };


/////BLUR//////
            let blurOnOff = (data)=>{
                if (data.blur === 0){
                    c.shadowColor = 'rgb(' + data.r +',' + data.g + ',' + data.b + ')';
                    c.shadowBlur = data.blurAmt;
                    c.shadowOffsetX = this.x + data.x2/10;
                    c.shadowOffsetY = this.y + data.y2/10;
                } else if (data.blur === 1){
                    c.shadowColor = "rgba(0,0,0,0.00)";
                    c.shadowBlur = 0;
                    c.shadowOffsetX = this.x;
                    c.shadowOffsetY = this.y;
                }
     
            };

            this.draw = function(data){
                c.beginPath();
                shapeChoose(data);
                textData(data);
                c.strokeStyle='rgb(' + data.r +',' + data.g + ',' + data.b + ')';
                // fillOnOff(data);
                blurOnOff(data);
                c.stroke();
                };


            this.update = function(){
                
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

////////////////PATH DEFINE
                if (data.path === 0 ){
                    this.x =  x + (Math.cos(this.radians)*100);
                    this.y =  y + (Math.sin(this.radians)*100);

                } else if(data.path === 1){
                    this.x = x+ Math.cos(this.x * data.v) * 10+data.x1;
                    this.y = y+ Math.sin(this.y * data.v) * 10;
                }
                
                /////////RANDOM
                else if(data.path === 2){
                    this.x += this.dx;
                    this.y += this.dy; 
                }

                if (this.x + data.radius > 1080 || this.x - data.radius < 0) {
                    this.dx = -this.dx;
                }   
                if (this.y + data.radius > 512 || this.y - data.radius < 0) {
                    this.dy = -this.dy;
                }

                this.r += this.dr;
                this.g += this.dg;
                this.b += this.db;
                this.radius += this.dRadius;
                this.draw(data);
                
                };
            }
       

        let printArray = [];

        for(let i=0; i<2;i++){
            let x = (Math.floor (Math.random()*10)) + data.radius;
            let y = (Math.floor (Math.random()*10))  + data.radius;
            let dx = 1;
            let dy = 1;
            printArray.push(new AnimaObj(x,y,dx,dy,radius,dRadius,r,dr,g,dg,b,db));
        }   

        let trailOnOff = ()=>{
            console.log("yo",data.switch);
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

        function drawObj(){
            // id = window.requestAnimationFrame(drawObj);
            // if (data.anOnOff === 0){
            window.requestAnimationFrame(drawObj);
                // } else {
                    // window.cancelAnimationFrame(id);
                // }
            trailOnOff();
            for(let i=0;i<printArray.length; i++){
                printArray[i].update(data);
            }
        }

        drawObj(data);
    };


//////////////PAUSE ANIMATION//////////////////
    let pauseAnimation= (currentAnime)=>{
        console.log("maybe?");
        $route.reload("/scene");
        // window.cancelAnimationFrame(window.requestAnimationFrame(currentAnime)); 
        return;
    };
////////////////////////////////////////  



        return {drawMovingObject, pauseAnimation};
    
});


//////////////////////////Static group///////////////////
   
// let drawStatic =(data)=> {
//     c = $document[0].getElementById("canvas1").getContext('2d');
    
//      // for (var i = 0; i < 10; i++) {
//      //   for (var j = 0; j < 15; j++) {
//      //     c.save();
//      //     c.rotate((Math.PI / 180) * data.y1/10);
//      //     // c.fillStyle = 'rgb(' + (51 * j) + ', ' + (255 - 51 * j) + ', 255)';
//      //     c.translate(50 + j * 50, 50 + i * 50);
//      //     c.fillRect(0, 0, 25 , 25);
//      //     c.strokeStyle = 'rgb(' + (51 * j) + ', ' + (255 - 51 * j) + ', 255)';
//      //     // c.font = "25px Futura";
//      //     // c.strokeText(data.paramImageText,10,10);
//      //     c.restore();
//      //     // c.rotate((Math.PI / 180) * (data.x1/100));
//      //     // window.requestAnimationFrame(draw);
//      //     }
//      // }
//  };
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
    //////////////////// PARAMETRIC GROUP//////////////

    // let drawParametric = (data)=>{
        // let i;
        // let t = data.x1;
        // let lines  = data.y1;
        // let x1 = function(t){
        //     return Math.sin(t/10) * 100 + Math.sin(t /5)*100;
        // };
        // let y1 = function(t){
        //     return Math.cos(t/10)+100;
        // };
        // let x2= function(t){
        //     return Math.sin(t /10)*200 + Math.cos(t)*2;
        //  };
        // let y2 = function(t){
        //     return Math.cos(t/20)* 200 + 200 + Math.cos(t /12) * 20;  
        // };
    
        // /////////$scoped variables
        // x += 0.25;
        // y += 0.25;
        

        // /////////draw logic
        // c.translate(1080/2, 512/2);
        // c.fillRect(0, 0, 1080, 512);
        // c.fillStyle='rgb(' + data.r +',' + data.g + ',' + data.b + ')';    
        // // c.beginPath();
        // for(let i =0; i<10;i++){
        // c.arc(x1(t+i), y1(t+i), 10, 0, 2 * Math.PI, false);
        // c.lineTo(x1(t+i), y1(t+i));
        // c.lineTo(x2(t+i), y2(t+i));
        // c.closePath();
        // c.fill();
        // }
        // window.requestAnimationFrame(drawParametric);
        
    // };

    // let squiggle = (data)=>{
  
        // let w = 1080;
        // let h = 512;
        // let p = [];
        // let clr;
        // let n = data.x1;

        // clr = [ 'red', 'green', 'blue', 'yellow', 'purple' ];

        // for (let i=0; i<n; i++){
        // // generate particle with random initial velocity, radius, and color
        //     p.push({
        //         x: w/2,
        //         y: h/2,
        //         vx: Math.random()*12-6,
        //         vy: Math.random()*12-6,
        //         r: Math.random()*4+3,
        //         clr: Math.floor(Math.random()*clr.length)
        //     });
        // }

        // function frame(data) {
        //  // cover the canvas with 50% opacity (creates fading trails)
        //     c.fillStyle = 'rgba(0,0,0,0.5)';
        //     c.fillRect(0, 0, w, h);

        //     for (var i = 0; i < n; i++) {
        //     // reduce velocity to 99%
        //         p[i].vx *= 0.99;
        //         p[i].vy *= 0.99;

        //     // adjust position by the current velocity
        //         p[i].x += p[i].vx;
        //         p[i].y += p[i].vy;


        //         if (p[i].x < p[i].r || p[i].x > w-p[i].r) {
        //             p[i].vx = -p[i].vx;
        //             p[i].x += p[i].vx;
        //     }
           
        //         if (p[i].y < p[i].r || p[i].y > h-p[i].r) {
        //             p[i].vy = -p[i].vy;
        //             p[i].y += p[i].vy;
        //     }

        //     // draw the circle at the new postion
        //         c.fillStyle = clr[p[i].clr]; // set color
        //         c.beginPath();
        //         c.arc(p[i].x, p[i].y, p[i].r, 0, Math.PI*2, false);
        //         c.fill();
        //         c.strokeStyle = "red";
        //         c.stroke();
        //     }
 

        // }

       
        // window.requestAnimationFrame(frame);
    // };

////////////////////////AFTER P01//////////////////
//     let time;
//     let frame;
//     let timeNextFrame; 
//     let max = 96*60;
//     let currentTime;
//     let vines = {};
//     let dx;
//     let dy;
//     let p;


// //run on load
//     function update(){

//         $window.requestAnimationFrame(update);

//         if (!window.time){
//         time = 0;
//         frame = 0;
//         timeNextFrame = 0; 
//         vines = [{x:0, y:0, a:0, ai:0, w1:8, p:[], l:max}];
//         }
//         currentTime = Date.now()/1000;
//         while(time < currentTime){
//             while(time < timeNextFrame){
//                 time += 1/16384;
//             }
//             frame++;
//             time +=1/60;
       
        
//         //update visuals
//         vines = vines.filter(v => v.l--);
//         // lifetime of vine^
//         vines.forEach(v => {
            
//             dx = Math.cos(v.a)* (v.w1)/2;
//             dy = Math.sin(v.a)* (v.w1)/2;
//             v.x += dx;
//             v.y += dy;
//             v.a += v.ai / (v.w1) /2;
//             v.p.splice(0, v.p.length - v.l);
//             v.p.splice(0, v.p.length - 60 * 5);
//             v.p.push({x:v.x, y:v.y, dx:dx, dy:dy});
//             if (frame % 30 === 0) {
//                 v.ai = Math.random() - (1/2);
//             }
//             if (v.w1 > 1 && Math.random () < v.l /16384/2){
//                 vines.push({x:v.x, y:v.y, a:v.a, ai:v.ai, w1:v.w1/2, p:[], l:Math.min(v.l, 0 | v.w1 * 32 * (1+Math.random()))});
//             }
//         });

//     }
    
// //render visuals

//     c.height = 1080;
//     c.width = 0 | c.height * c.innerWidth/c.innerHeight;

//     let h = c.height;
//     let w = c.width;
//     let l;
//     // 
//     // c.translate(w/2,h/2);
//     c.shadowBlur = 45;
//     c.translate(w/2,h/2);
//     vines.forEach(v => {
//         // c.strokeStyle ='white';
//         c.shadowColor ='hsl('+(v.a*60|0) + ',100%, '+ (60 + v.w1*5)+ '%)';
//         c.strokeStyle ='hsl('+(v.a*60|0) + ',100%, '+ (60 + v.w1*5)+ '%)';
//         if(v.w1 == 8) {
//             c.translate(-v.x, -v.y);
//         }
       
//         c.beginPath();
//         let l = v.p.length -1;
        
//         for(let i=l; p < p.length ; i--){
//             p = v.p[i]; 
//            c.lineTo(p.x,p.y);
//            c.lineTo(p.x,p.y);
//        }
//        c.stroke();
//     });
// }
// update();