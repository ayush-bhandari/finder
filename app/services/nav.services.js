angular.module('nav')
.service('navService', function(appService) {
    this.getValue = function() {
        return appService.getValue();
    };
});
