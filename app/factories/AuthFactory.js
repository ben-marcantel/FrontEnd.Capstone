"use strict";


angular.module("PseudoSceneApp").factory("AuthFactory", (FBcreds, $q)=>{
    const provider = new firebase.auth.GoogleAuthProvider();

    let login = () => {
    return firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result){
            var token = result.credential.accessToken;
            var user = result.user.G;
            console.log("RESULT",result);
            return user;
        }).catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log("error",error);
        });
    };

    let logout = () => {
        firebase.auth().signOut()
        .then(function() {
            
          }).catch(function(error) {
            
          });
        };
        return {login, logout};
});