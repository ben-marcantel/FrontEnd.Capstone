"use strict";


angular.module("PseudoSceneApp").factory("DataFactory", ($http, $q)=>{

    function addParameter(formData){
        console.log("data to FB", formData);
        return $q((resolve, reject)=>{
            $http
            .post(`https://frontendcapstone-fe0b1.firebaseio.com/Users.json`, JSON.stringify(formData))
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    return { addParameter };

});
