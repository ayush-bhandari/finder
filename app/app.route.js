'use strict';
angular
    .module('app')
    .config(config);

function config($routeProvider,$locationProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'app/app.html',
            controller: 'AppController',
            controllerAs: 'vm'
        })
        .otherwise({redirectTo: '/home'});
		$locationProvider.html5Mode(true);
}