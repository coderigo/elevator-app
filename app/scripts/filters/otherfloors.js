'use strict';

/**
 * @ngdoc filter
 * @name elevatorAppApp.filter:otherFloors
 * @function
 * @description
 * # otherFloors
 * Filter in the elevatorAppApp.
 */
angular.module('elevatorAppApp')
.filter('otherFloors', ['_', function (_) {
    return function (floors, currentFloor) {
        return _.filter(floors, function(floor){
            return floor.number !== currentFloor;
        });
    };
}]);
