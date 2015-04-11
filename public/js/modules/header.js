/**
 * Created by macbook on 11.04.15.
 */


angular.module('rent')
    .controller('headerController', ['$scope', 'citySelectService', 'cities', '$rootScope',  function($scope, citySelectService, cities, $rootScope){
        function init(){
            $scope.cities = cities;
            var city = localStorage.getItem('city');
            $scope.city = _.filter(cities, function(item){
                 return item.id == city;
            })[0];
        }

        init();

        $scope.changeCity = function(){
            citySelectService.select($scope.cities)
                .then(function(city){
                    $scope.city = city;
                    localStorage.setItem('city', city.id);
                    $rootScope.$broadcast('city:change', city);
                });
        };
    }])
    .service('citySelectService', function($modal){
        this.select = function(cities){
            return  $modal.open({
                templateUrl: '/views/modal.html',
                size: 'md',
                controller: function($scope, $modalInstance){
                    $scope.cities = cities;

                    $scope.close = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.select = function (network) {
                        $modalInstance.close(network);
                    };
                }
            }).result;

        }
    });