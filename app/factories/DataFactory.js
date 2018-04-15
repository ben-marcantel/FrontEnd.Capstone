"use strict";


angular.module("PseudoSceneApp").factory("DataFactory", ($http, $q)=>{



    //////////PARAMETER CRUD
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
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    function updateParameters(FbId,formData){
        let updatedForm = JSON.stringify(formData);
        return $q((resolve, reject)=>{
            $http
            .put(`https://frontendcapstone-fe0b1.firebaseio.com/Users/${FbId}.json`,updatedForm)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    function deleteParameter(FbId) {
        return $q((resolve, reject) => {
            $http
            .delete(`https://frontendcapstone-fe0b1.firebaseio.com/Users/${FbId}.json`)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }


    /////////////////IMAGE CRUD//////////////
    function addImage(imageData){
       return $q((resolve, reject)=>{
           $http
           .post(`https://frontendcapstone-fe0b1.firebaseio.com/Images.json`, JSON.stringify(imageData))
           .then((data) => {
               resolve(data);
           })
           .catch((error) => {
               reject(error);
           });
       });
   }

   function getImage(){
        return $q((resolve, reject)=>{
            $http
            .get(`https://frontendcapstone-fe0b1.firebaseio.com/Images.json?orderBy="uid"&  equalTo="${firebase.auth().currentUser.uid}"`)
            .then((images) => {
                let keys = Object.keys(images.data);
                keys.forEach(key => {
                    images.data[key].imageId = key;
                });
                let imageArr = Object.values(images.data);
                resolve(imageArr);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    function updateImage(FbId,formData){
        let updatedImage = JSON.stringify(formData);
        return $q((resolve, reject)=>{
            $http
            .put(`https://frontendcapstone-fe0b1.firebaseio.com/Images/${FbId}.json`,updatedImage)
            .then((formData) => {
                resolve(formData);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    function deleteImage(FbId) {
        return $q((resolve, reject) => {
            $http
            .delete(`https://frontendcapstone-fe0b1.firebaseio.com/Images/${FbId}.json`)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    return { addParameter, getParameters, updateParameters, deleteParameter, addImage, getImage, updateImage, deleteImage};

});


















  ////TEMP JSON////
    //    console.log("yep");
    //      return $q((resolve, reject)=>{
    //         $http
    //         .get(`../app/data/frontendcapstone-fe0b1-export.json`)
    //         .then((images) => {
    //             let keys = Object.keys(images.data);
    //             keys.forEach(key => {
    //                 images.data[key].imageId = key;
    //             });
    //             let imageArr = Object.values(images.data);
    //             resolve(imageArr);
    //         })
    //         .catch((error) => {
    //             reject(error);
    //         });
    //     });


       // return $q((resolve, reject) => {
        //     $http
        //         .get(`../app/data/paramter.json`)
        //         .then((params) => {
        //             let keys = Object.keys(params.data);
        //             keys.forEach(key => {
        //                 params.data[key].paramsId = key;
        //             });
        //             let paramsDataArr = Object.values(params.data);
        //             resolve(paramsDataArr);
        //         })
        //         .catch((error) => {
        //             reject(error);
        //         });
        // });