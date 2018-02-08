"use strict";


angular.module("PseudoSceneApp").factory("DataFactory", ($http, $q)=>{



    //send parameter to database
    function addParameter(formData){
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


    //retreive parameter from database
    function getParameters() {
        return $q((resolve, reject) => {
            $http
                .get(`https://frontendcapstone-fe0b1.firebaseio.com/Users.json?orderBy="uid"&equalTo="${firebase.auth().currentUser.uid}"`)
                .then((params) => {
                    let keys = Object.keys(params.data);
                    keys.forEach(key => {
                        params.data[key].paramsId = key;
                    });
                    let paramsDataArr = Object.values(params.data);
                    resolve(paramsDataArr);
                    console.log("form from database",paramsDataArr);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }


    //delete parameter from database
   


    
    return { addParameter, getParameters };

});
