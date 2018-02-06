"use strict";


angular.module("PseudoSceneApp").factory("DataFactory", ($http, $q) => {

    function addParameter(newParam) {
        return $q((resolve, reject) => {
            $http
                .post(`https://frontendcapstone-fe0b1.firebaseio.com/`, JSON.stringify(newParam))
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
