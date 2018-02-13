"use strict";


angular.module("PseudoSceneApp").factory("DataShareFactory", function() {


    ////////////////////FORM GETTER AND SETTER//////////////
    let formObject = {};     

    let setData = function(formData) {
        formObject.x = formData.x;
        formObject.y = formData.y;
        formObject.x1 = formData.x1;
        formObject.y1 = formData.y1;
        formObject.x2 = formData.x2;
        formObject.y2 = formData.y2;
        formObject.v = formData.v;
        formObject.r = formData.r;
        formObject.g = formData.g;
        formObject.b = formData.b;
        formObject.hsl = formData.hsl;
        formObject.fontsize = formData.fontsize;
        formObject.rgbRange = formData.rgb;
        formObject.movementPath =()=>{};
        formObject.consBounX = 1080;
        formObject.consBounY = 512;
        formObject.numObjects = formData.numObjects;
        formObject.paramName = formData.paramName;
        formObject.paramImageText = formData.paramImageText;
        formObject.radius = formData.radius;
        console.log("set data", formData);
    };

    let getData = function() {
        return formObject;
    };

        return {setData, getData};
});