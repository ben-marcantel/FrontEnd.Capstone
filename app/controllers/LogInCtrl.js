"use strict";


angular.module("PseudoSceneApp").controller("LogInCtrl", function($scope, AuthFactory, $location, $window, AnimationFactory, DataFactory) {

    $scope.onloadAnime=()=>{
        AnimationFactory.onload()
    };


    $scope.get1stImage=()=>{
        DataFactory.getImage()
        .then((images)=>{
        images.forEach(image => {
                if(image.public === true){
                    
                }else{

                };
            });
        });

    }




    $scope.loginInput = [
        {
            name: "Login",
            bang: "!"
        },
        {
            name: "Logout"
        }
    ];    

    $scope.logInAuth = (item) => {
        if (item === "Login") {
            AuthFactory.login()
            .then(user => {
                $window.location = "/#!/scene";
            });
        } else {
            AuthFactory.logout();
        }
    }; 

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.$apply($scope.loggedIn = true);
        } else {
            $scope.loggedIn = false;
            $scope.$apply();
        }
    });
    

    $scope.onloadAnime();

});