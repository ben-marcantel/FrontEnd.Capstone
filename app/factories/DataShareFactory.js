"use strict";


angular.module("PseudoSceneApp").factory("DataShareFactory", function() {


    ////////////////////FORM GETTER AND SETTER//////////////
    let formObject = {};     

    let setData = function(formData) {
        formObject.x1 = formData.x1;
        formObject.y1 = formData.y1;
        formObject.paramName = formData.paramName;
        console.log("set data", formData);
    };

    let getData = function() {
        return formObject;
    };

        return {setData, getData};
});