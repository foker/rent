/**
 * Created by macbook on 11.04.15.
 */


angular.module('rent.main')
    .controller('mainController', [
        '$scope', 'items', '$rootScope',
        function($scope, items, $rootScope) {
            function init(){
                $scope.config = {
                    page: 1,
                    city: localStorage.getItem('city')
                };

                $scope.items = items;
            }

            init();

            $rootScope.$on('city:change', function(event, city){
                $scope.config.city = city.id;
                 $scope.loadElse()
            });

            $scope.loadElse = function (lazy) {
                $scope.config.page = lazy ? $scope.config.page+1 : 1;
                $scope.items.get($scope.config)
                    .then(function(items){
                        $scope.items.collection = lazy ? $scope.items.collection.concat(items.collection) : items.collection;
                        $scope.count = items.count;
                    })
            };
        }
    ]);
