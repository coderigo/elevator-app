'use strict';

describe('Filter: otherFloors', function () {

    // load the filter's module
    beforeEach(module('elevatorAppApp'));

    // initialize a new instance of the filter before each test
    var otherFloors;
    beforeEach(inject(function ($filter) {
        otherFloors = $filter('otherFloors');
    }));

    it('should return an array of floors excluding the current floor"', function () {
        var currentFloor = { number : 1 },
            mockFloors   = [
                currentFloor, 
                { number : 2 }, 
                { number : 3 }
            ];
        expect( otherFloors(mockFloors, currentFloor.number) ).not.toContain(currentFloor);
    });

});
