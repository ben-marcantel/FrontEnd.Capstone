

"use strict";

angular.module("PseudoSceneApp").factory("DataShareFactory", function() {

    let formObject = {}; 

    
    let setData = function(formData) {
        formObject.x1 = formData.x1;
        formObject.y1 = formData.y1;
        formObject.paramName = formData.paramName;
        console.log("set data", formData);
    };

    let getData = function() {
        console.log(formObject);
        return formObject;
    };

        return {setData, getData};
    
});