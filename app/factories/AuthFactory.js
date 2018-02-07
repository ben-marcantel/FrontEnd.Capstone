"use strict";


angular.module("PseudoSceneApp").factory("AuthFactory", (FBcreds, $q)=>{

    const provider = new firebase.auth.GoogleAuthProvider();

    let login = ()=>{
    return firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result){
            const token = result.credential.accessToken;
            const user = result.user.G;
            return user;
        }).catch(function(error){
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
            // TODO: Need better error alert!! 
            console.log("error",error);
        });
    };

    let logout = ()=>{
        firebase.auth().signOut()
        .then(function() {
            //TODO: Need to decide what to do on logout
        }).catch(function(error) {
            
        });
    };

    return {login, logout};
});