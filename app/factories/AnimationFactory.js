"use strict";


angular.module("PseudoSceneApp").factory("AnimationFactory", function($window, $document) {

    $window.requestAnimationFrame = $window.requestAnimationFrame || $window.mozRequestAnimationFrame || $window.webkitRequestAnimationFrame || $window.msRequestAnimationFrame;
    let window = $window;
    const c = $document[0].getElementById("canvas1").getContext('2d');



/////////////////MASTER VARIABLE LIST//////////////////////

        let x1;
        let y1;
        let x;
        let y;
        let r;
        let g;
        let b;
        let fontsize;



///////////TEST GROUP////////////////////
     //Static group
   
        let draw=(data)=> {

            for (var i = 0; i < data.x1/10; i++) {
              for (var j = 0; j < 15; j++) {
                c.save();
                c.rotate((Math.PI / 180) * data.y1/10);
                // c.fillStyle = 'rgb(' + (51 * j) + ', ' + (255 - 51 * j) + ', 255)';
                c.translate(50 + j * 50, 50 + i * 50);
                // c.fillRect(0, 0,25 , 25);
                c.strokeStyle = 'rgb(' + (51 * j) + ', ' + (255 - 51 * j) + ', 255)';
                c.font = "25px Futura";
                c.strokeText(data.paramImageText,10,10);
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

        function drawParametric(data){
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
        
            // $scoped variables
            x += 0.25;
            y += 0.25;
            r = x;
            g = y;
            b = 0;

            //    draw logic
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
        }
       

//////////////////////////////////L SYSTEM//////////////

        let currentString = "X";
        let nextString = "";
        
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
        
        
        let interpret = ()=>{
            for (let i =0; i<currentString.length; i++){
                let decoder = currentString.charAt(i);
                
                let x = 0;
                let y = 100;
                let newX = x;
                let newY = y;
                let currentX = "";
                let currentY = "";
                
                if (decoder == "F"){ 
                    // F means "draw forward
                    c.restore(); 
                    c.lineTo(newX,newY);
                    c.save();
        
                    // c.closePath();
                    
                } else if (decoder == "X"){
                    // X does not correspond to any drawing action and is used to control the evolution of the curve. 
                    
                    c.rotate((i * Math.PI)/ 180);
                    c.closePath();
        
                } else if (decoder == "+"){
                    // − means "turn left 25°"
                    newX = x;
                    newY = y + (y/2);
                    c.lineTo(newX,newY);
                    c.closePath();
                    c.rotate(-(45 * Math.PI / 180));
                    
                } else if (decoder == "-"){
                    // + means "turn right 25°"
                   
                    newX = x;
                    newY = y + (y/2);
                    c.lineTo(newX,newY);
                    c.closePath();
                    c.rotate(45 * Math.PI / 180);
                    
                    
                } else if (decoder == "["){
                    // The square bracket "[" corresponds to saving the current values for position and angle,
                    // c.save();
                
                } else if (decoder == "]");
                // which are restored when the corresponding "]" is executed
                    c.restore(); 
                    
            }   
        };
        
        
        let initLsystem = ()=>{
            console.log(currentString);
            c.beginPath();
            // c.lineTo(canvas.width/2,canvas.height/2);
            c.translate(c.width/2,c.height/2);   
            interpret();
            c.strokeStyle = "rgb(255,0,200)";
            c.stroke();
        };
        
        
        let drawLsystem = ()=>{
            for (let i=0; i<1;i++){
                generate(); 
                // initLsystem();
            }
        };

        //////////////////////ANIMATION GROUP/////////////////////

    
    function TenPrint(x,y,dx,dy){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    

        this.draw = function(){
            c.beginPath();
            c.lineTo(this.x, this.y);
            c.lineTo(this.x*x, this.y*y);
            c.strokeStyle = "red";
            c.stroke();
        };

        this.update = function(){
            if (this.x > 540 || this.x < 0) {
            this.dx = -this.dx;
        }
            if (this.y > 312 || this.y < 0) {
            this.dy = -this.dy;
        }
            this.x += this.dx;
            this.y += this.dy;
            this.draw();


        };
    }

    let printArray = [];

    for(let i=0; i<2;i++){

        let x= Math.floor(Math.random()*10);
        let y= Math.floor(Math.random()*10);
        let dx = Math.floor(Math.random()*4);
        let dy = Math.floor(Math.random()*4);
        printArray.push(new TenPrint(x,y,dx,dy));
    }

    function drawTenPrint(){
        window.requestAnimationFrame(drawTenPrint);
        // c.clearRect(0,0, innerWidth, innerWidth);
        for(let i=0;i<printArray.length; i++){
            printArray[i].update();
        }
    }

// animate();

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

        
        



        return {draw, drawParametric, drawLsystem, drawTenPrint};
    
});