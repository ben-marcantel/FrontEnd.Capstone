"use strict";

angular.module("PseudoSceneApp").controller("LogInCtrl", function($scope, AuthFactory, $location, $window) {
    

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
                    $window.location = "/#!";
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
});