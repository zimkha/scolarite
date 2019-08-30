var app = angular.module('appModule', ['ngTable']);
var BASE_URL='http://'+location.host+'/scolarite/public/';

app.factory('FactoryInit', function ($http) {
      $http.defaults.headers.common['Authorization'] = 'Bearer' +$('input[name=api_tokn]').val();
    $http.defaults.headers.common['Accpet']  = 'application/json';
    var apiUrl = BASE_URL+'/api';
    return {
       getAllIncription: function() {
           return $http.get(`${apiUrl}/inscriptions`)
       },
        getAllClasse : function () {
            return  $http.get(`${apiUrl}/classe`);
        }
    };
});

app.controller('InitController', ['$scope','$http', function ($scope, $http, FactoryInit) {
    $scope.inscriptions = [];
    $scope.classes= [];
    $scope.loader = "Chargement des don ées";


    //function de recuperation a partir des factory
    $scope.getIncription = function () {
        $http({
            method: 'GET',
            url : BASE_URL +'/api/inscriptions',
        }).then(function (result) {
            $scope.inscriptions = result.data;
            console.log($scope.inscriptions);
        })
    }
}]);



