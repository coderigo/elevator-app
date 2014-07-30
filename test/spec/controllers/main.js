'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('elevatorAppApp'));

    var MainCtrl,
      scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope    = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope : scope
        });
    }));

    it('should create four elevators in scope', function () {
        expect(scope.elevators.length).toBe(4);
    });

    it('should create ten floors in scope', function () {
        expect(scope.floors.length).toBe(10);
    });

    it('should not allow more than 20 people in an elevator', function() {
        var exampleElevator = scope.elevators[0];
        expect(exampleElevator.people).toBe(0);
        exampleElevator.addPassengers(21);
        expect(exampleElevator.people).toBe(0);
    });

    it('should dispatch the nearest elevator to the floor on request', function() {
        // All elevators start at the bottom floor, so send 3/4 to level 3 and 1/4 to level 2
        // and empty them
        scope.elevators.forEach(function(elevator, elevatorIndex){
            if(elevatorIndex > 0){
                elevator.goToFloor(3).empty();
            }
            else {
                elevator.goToFloor(2).empty();
            }
        });
        expect(scope.elevators[0].travelDirection).toBe('stationary');

        // Request an elevator from level 1 for 2 people going to level 10
        var level1             = scope.floors[scope.floors.length - 1],
            boardingPassengers = 2,
            destinationFloor   = 10;

        level1.passengers = {
            boarding         : boardingPassengers,
            destinationFloor : destinationFloor
        };

        scope.dispatch();

        // The first elevator (A) should have been dispatched to get level 1 passengers
        // and taken them to level 10
        expect(scope.elevators[0].people).toBe(boardingPassengers);
        expect(scope.elevators[0].destinationFloor).toBe(destinationFloor);
        expect(scope.elevators[0].floor).toBe(destinationFloor);
        expect(scope.elevators[0].destinationFloor).toBe(destinationFloor);
        expect(scope.elevators[0].sourceFloor).toBe(1);
        expect(scope.elevators[0].travelDirection).toBe('up');

        // Request an elevator from level 3 for 2 people going to level 2
        // It already has 3 elevators on the floor so it should use the first available
        // on its own floor
        var level3 = scope.floors[scope.floors.length - 3];

        boardingPassengers = 2;
        destinationFloor   = 2;

        level3.passengers = {
            boarding         : boardingPassengers,
            destinationFloor : destinationFloor
        };

        scope.dispatch();

        expect(scope.elevators[1].people).toBe(boardingPassengers);
        expect(scope.elevators[1].destinationFloor).toBe(destinationFloor);
        expect(scope.elevators[1].floor).toBe(destinationFloor);
        expect(scope.elevators[1].destinationFloor).toBe(destinationFloor);
        expect(scope.elevators[1].sourceFloor).toBe(3);
        expect(scope.elevators[1].travelDirection).toBe('down');

    });

});
