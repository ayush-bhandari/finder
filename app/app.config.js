'use strict';
angular
    .module('app')
    .config(config);

function config($mdThemingProvider) {
   $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('lime');
}