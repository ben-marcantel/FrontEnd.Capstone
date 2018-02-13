"use strict";


angular.module("PseudoSceneApp").factory("AnimationFactory", function($window, $document, $interval) {
    let window = $window;
    $window.requestAnimationFrame = $window.requestAnimationFrame || $window.mozRequestAnimationFrame || $window.webkitRequestAnimationFrame || $window.msRequestAnimationFrame;
    let cancelAnimationFrame = $window.cancelAnimationFrame || $window.mozCancelAnimationFrame;
    const c = $document[0].getElementById("canvas1").getContext('2d');



/////////////////MASTER VARIABLE LIST//////////////////////
        let x = null;
        let y = null;
        let x1 = null;
        let y1 = null;
        let x2 = null;
        let y3 = null;
        let v = null;
        let r = null;
        let g = null;
        let b = null;
        let hsl = null;
        let fontsize = null;
        let end = null;
        let rgbRange = null;
        let movementPath =()=>{};
        let consBounX = 1080;
        let consBounY = 512;
        let numObjects = 1;
        let radius;

     
//////////////////////////Static group///////////////////
   
        let draw=(data)=> {

            for (var i = 0; i < data.x1/10; i++) {
              for (var j = 0; j < 15; j++) {
                c.save();
                c.rotate((Math.PI / 180) * data.y1/10);
                // c.fillStyle = 'rgb(' + (51 * j) + ', ' + (255 - 51 * j) + ', 255)';
                c.translate(50 + j * 50, 50 + i * 50);
                c.fillRect(0, 0, 25 , 25);
                c.strokeStyle = 'rgb(' + (51 * j) + ', ' + (255 - 51 * j) + ', 255)';
                c.font = "25px Futura";
                // c.strokeText(data.paramImageText,10,10);
                c.restore();
                // c.rotate((Math.PI / 180) * (data.x1/100));
                // window.requestAnimationFrame(draw);
                }
            }
        };


    // let draw= ()=>{
    //     x += 1;
    //     y += 1;

    //     c.fillStyle = 'red';
    //     c.fillRect(0, 0, x1, y1);

    //     c.fillStyle = "#ffffff";
    //     c.beginPath();
    //     c.arc(x, y, 10, 0, 2 * Math.PI, false);
    //     c.closePath();

    //     c.fill();

        // window.requestAnimationFrame(draw);
    // };


//////////////////// PARAMETRIC GROUP//////////////

        let drawParametric = (data)=>{
            let i;
            let t= x;
            let lines  = y;
            let x1 = function(t){
                return Math.sin(t/10) * 100 + Math.sin(t /5)*100;
            };
            let y1 = function(t){
                return Math.cos(t/10)+100;
            };
            let x2= function(t){
                return Math.sin(t /10)*200 + Math.cos(t)*2;
             };
            let y2 = function(t){
                return Math.cos(t/20)* 200 + 200 + Math.cos(t /12) * 20;  
            };
        
            /////////$scoped variables
            x += 0.25;
            y += 0.25;
            r = x;
            g = y;
            b = 0;

            /////////draw logic
            i=x;
            t=t+0.5;
            c.translate(312/2, 540/2);
            c.fillStyle = '#000';
            c.fillRect(0, 0, window.innerWidth, window.innerHeight);
            c.fillStyle='rgb(' + r +',' + g + ',' + b + ')';    
            c.beginPath();
            for(let i =0; i<10;i++){
            c.arc(x1(t+i), y1(t+i), 10, 0, 2 * Math.PI, false);
            c.lineTo(x1(t+i), y1(t+i));
            c.lineTo(x2(t+i), y2(t+i));
            c.closePath();
            c.fill();
            }

            window.requestAnimationFrame(drawParametric);
        };
       

//////////////////////////////////L SYSTEM//////////////////

        let drawLsystem = (data)=>{

            let currentString = "X";
            let nextString = "";
    
            /////GENERATE STRING///////
            let generate = ()=>{
                for (let i = 0; i<currentString.length; i++){
                    let chAt = currentString.charAt(i);
                    if (chAt == "X"){
                        nextString += "F[-X][X]F[-X]+FX";
                    } else if (chAt == "F"){
                        nextString += "FF";
                    }
                } 
                currentString += nextString;
            };
            
            ////////INTERPRET STRING RULES//////////
            let interpret = ()=>{
                for (let i =0; i<currentString.length; i++){
                    let decoder = currentString.charAt(i);
                    
                 
                    
                    if (decoder == "F"){ 
                        // F means "draw forward
                        
               
                    } else if (decoder == "X"){
                        // X does not correspond to any drawing action and is used to control the evolution of the curve. 
                        
                        c.rotate((5 * Math.PI)/ 180);
                        c.closePath();
            
                    } else if (decoder == "+"){
                        // − means "turn left 25°"
                        
                        c.closePath();
                        c.rotate(-(45 * Math.PI / 180));
                        
                    } else if (decoder == "-"){
                        // + means "turn right 25°"
                       
                        c.closePath();
                        c.rotate(45 * Math.PI / 180);
                        
                        
                    } else if (decoder == "["){
                        // The square bracket "[" corresponds to saving the current values for position and angle,
                        
                    
                    } else if (decoder == "]");
                    // which are restored when the corresponding "]" is executed
                        
                        
                }   
            };
            
            
            let initLsystem = ()=>{
                
                c.beginPath();
                c.translate(1080/2,512/2);   
                interpret();
                c.strokeStyle = "rgb(255,0,200)";
                c.stroke();
            };
            
            
            let magic = (data)=>{
                for (let i=0; i<1;i++){
                    generate(); 
                    initLsystem();
                }
            };

            magic();
        };
       

//////////////////////ANIMATION GROUP/////////////////////


    let drawMovingObject = (data)=>{

    function AnimaObj(x,y,dx,dy,radius,dRadius,r,dr,g,dg,b,db){
        this.x =data.x;
        this.y =data.y;
        this.dx = dx;
        this.dy = dy;
        this.radius = Math.floor((Math.random() * 100) +6);
        this.dRadius =1;
        this.r = Math.floor((Math.random() * 255) +1);
        this.dr= 1/4;
        this.g = Math.floor((Math.random() * 255) +1);
        this.dg= 1/4;
        this.b = Math.floor((Math.random()* 255)+1);
        this.db = 1/4;

        this.draw = function (){
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI *2, false);
            // c.lineTo(this.x,this.y);  /*Line maker  */
            c.lineTo(this.x*x,this.y*y);
            c.strokeStyle='rgb(' + this.r +',' + this.g + ',' + this.b + ')';
            c.stroke();
            c.fillStyle = 'rgb(' + this.r +',' + this.g + ',' + this.b + ')';
            c.fill();
        };

        this.update = function(){
            if (this.x + this.radius > 1080 || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }   
            if (this.y + this.radius > 512 || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }
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
            this.x += this.dx;
            this.y += this.dy;
            this.r += this.dr;
            this.g += this.dg;
            this.b += this.db;
            this.radius += this.dRadius;
            this.draw();
        };
    }  

    let objArray =[];

        for (let i=0;i<1;i++){
        let radius = Math.floor((Math.random() * 100) +6);
        let dRadius =2;
        let x = Math.random() * (1080 - radius* 2) + radius;
        let y = Math.random()* (512 - radius *2) +  radius;
        let dx = 1;
        let dy = 1;
        let r = Math.floor((Math.random() * 255) +1);
        let dr= 1/4;
        let g = Math.floor((Math.random() * 255) +1);
        let dg= 1/4;
        let b = Math.floor((Math.random()*255)+1);
        let db = 1/4;
    objArray.push(new AnimaObj(x,y,dx,dy,radius,dRadius,r,dr,g,dg,b,db));
}


    function animate(){
            window.requestAnimationFrame(animate);
            c.clearRect(0, 0, 1080, 512);  
            for(let i=0;i<objArray.length; i++){
            objArray[i].update();
            } 
    }

   animate();

};






/////////////////////////////////////////

    // let drawMovingObject = (data)=>{
        
    //     function TenPrint(x,y,dx,dy){
    //         this.x = data.x1;
    //         this.y = data.y1;
    //         this.dx = dx;
    //         this.dy = dy;
            
    //         this.draw = function(){
    //         c.beginPath();
    //         c.lineTo(this.x, this.y);
    //         c.lineTo(data.x1, data.y1);
    //         c.font = "25px Futura";
    //         // c.strokeText(data.paramImageText,this.x,this.y);
    //         c.strokeStyle = "red";
    //         c.stroke();
    //         };

    //         this.update = function(){
    //             if (this.x > 1080 || this.x < 0) {
    //             this.dx = -this.dx;
    //         }
    //             if (this.y > 512|| this.y < 0) {
    //             this.dy = -this.dy;
    //         }
    //             this.x += this.dx;
    //             this.y += this.dy;

    //             this.draw();
    //         };
    //     }

    //     let printArray = [];

    //     for(let i=0; i<2;i++){
    //         let f1 = data.x1;
    //         let f2 = data.y1;

    //         let x = Math.floor(Math.random()*1);
    //         let y = Math.floor(Math.random()*1);
    //         let dx = Math.floor(Math.random()*(f1/10));
    //         let dy = Math.floor(Math.random()*(10));
    //         printArray.push(new TenPrint(x,y,dx,dy));
    //     }   

    //     function drawTenPrint(){
    //         window.requestAnimationFrame(drawTenPrint);

    //         c.clearRect(0,0, 1040,1040 );
    //         for(let i=0;i<printArray.length; i++){
    //             printArray[i].update();
    //         }
    //     }

    //     drawTenPrint();
    // };

    let squiggle = (data)=>{
  
        let w = 1080;
        let h = 512;
        let p = [];
        let clr;
        let n = data.x1;

        clr = [ 'red', 'green', 'blue', 'yellow', 'purple' ];

        for (let i=0; i<n; i++){
        // generate particle with random initial velocity, radius, and color
            p.push({
                x: w/2,
                y: h/2,
                vx: Math.random()*12-6,
                vy: Math.random()*12-6,
                r: Math.random()*4+3,
                clr: Math.floor(Math.random()*clr.length)
            });
        }

        function frame(data) {
         // cover the canvas with 50% opacity (creates fading trails)
            c.fillStyle = 'rgba(0,0,0,0.5)';
            c.fillRect(0, 0, w, h);

            for (var i = 0; i < n; i++) {
            // reduce velocity to 99%
                p[i].vx *= 0.99;
                p[i].vy *= 0.99;

            // adjust position by the current velocity
                p[i].x += p[i].vx;
                p[i].y += p[i].vy;


                if (p[i].x < p[i].r || p[i].x > w-p[i].r) {
                    p[i].vx = -p[i].vx;
                    p[i].x += p[i].vx;
            }
           
                if (p[i].y < p[i].r || p[i].y > h-p[i].r) {
                    p[i].vy = -p[i].vy;
                    p[i].y += p[i].vy;
            }

            // draw the circle at the new postion
                c.fillStyle = clr[p[i].clr]; // set color
                c.beginPath();
                c.arc(p[i].x, p[i].y, p[i].r, 0, Math.PI*2, false);
                c.fill();
                c.strokeStyle = "red";
                c.stroke();
            }
 

        }

       
        window.requestAnimationFrame(frame);
    };




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

        
      
//////////////PAUSE ANIMATION//////////////////
    let pauseAnimation= (currentAnime)=>{
        console.log("maybe?");
        window.cancelAnimationFrame(window.requestAnimationFrame(currentAnime)); 
        return;
    };

////////////////////////////////////////  



        return {draw, drawParametric, drawLsystem, drawMovingObject, pauseAnimation, squiggle};
    
});