/**
 * Created by macbook on 11.04.15.
 */

angular.module('rent')
    .run(function(){
        var city = localStorage.getItem('city');
        if(!city) localStorage.setItem('city', 2);
    })

    .config(function(RestangularProvider){
        RestangularProvider.setBaseUrl('/v1')
    })
    .config(function($stateProvider, $urlRouterProvider){

        $stateProvider.state('main', {
            url: '/',
            views: {
                '': {
                    controller: 'mainController',
                    templateUrl: '/views/main.html',
                    resolve: {
                        items: function(Restangular){
                            return Restangular.one('rent').get({
                                city: localStorage.getItem('city')
                            });
                        }
                    }
                },
                'header': {
                    controller: 'headerController',
                    templateUrl: '/views/header.html',
                    resolve: {
                        cities: function(Restangular){
                            return Restangular.one('city').get()
                        }
                    }
                }
            }
        });

        $urlRouterProvider.otherwise('/')
    });