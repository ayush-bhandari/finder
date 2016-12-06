'use strict';
angular
    .module('nav')
    .directive('navApp', navApp);

function navApp() {
    var directive = {
        templateUrl: 'app/common/nav/nav.html',
        restrict: 'EA',
        controller: 'NavController',
        controllerAs: 'vm',
        bindToController: true
    };
    return directive;
}