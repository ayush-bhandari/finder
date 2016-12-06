angular.module('app')
.service('appService', function() {
    this.getValue = function() {
    	var current= {
    		currentPos: this.currentPos,
    		currentMap: this.currentMap
    	}
        return current;
    };

    this.setValue = function(currentPos,currentMap) {
        this.currentPos = currentPos;
        this.currentMap = currentMap;
    }
});