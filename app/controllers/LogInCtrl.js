"use strict";


angular.module("PseudoSceneApp").controller("LogInCtrl", function($scope, AuthFactory, $location, $window, AnimationFactory, DataFactory) {

    // $scope.onloadAnime=()=>{
    //     AnimationFactory.onload();
    // };

    let display = [];
    $scope.get1stImage=()=>{
        DataFactory.getImage()
        .then((images)=>{
            console.log(images);
        images.forEach(image => {
                if(image.public === "yes"){
                    display.push(image);
                    $scope.onLoadImages = display;
                }else{

                }
            });
        });

    };



    $scope.seeGallery = ()=>{
        $scope.get1stImage();
    };


    

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

            $scope.toGallery = ()=>{
                $location.url("/images");
            };


            $scope.toScene = ()=>{
                $location.url("/scene");
            };

        } else {
            $scope.loggedIn = false;
            $scope.$apply();
        }



        
    });
    
    $window.onload = function(){
        $scope.get1stImage();
    };
    // $scope.onloadAnime();

});