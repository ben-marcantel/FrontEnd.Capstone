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
        formObject.blur = formData.blur;
        formObject.blurAmt =formData.blurAmt;
        formObject.fontsize = formData.fontsize;
        formObject.rgbRange = formData.rgb;
        formObject.shape = formData.shape;
        formObject.fillSw = formData.fillSw;
        formObject.path = formData.path;
        formObject.numObj = formData.numObj;
        formObject.paramName = formData.paramName;
        formObject.paramImageText = formData.paramImageText;
        formObject.radius = formData.radius;
        formObject.switch = formData.switch;
        formObject.anOnOff = 0; 
    };

    let getData = function() {
        return formObject;
    };

    let setImage = function() {
        // to send to scene ctrl if needed;
    };

        return {setData, getData, setImage};
});