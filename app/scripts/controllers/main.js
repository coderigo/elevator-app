'use strict';

/**
 * @ngdoc function
 * @name elevatorAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the elevatorApp
 */
angular.module('elevatorAppApp')
.controller('MainCtrl', ['$scope', '_', function ($scope, _) {

    /**
     * Application constraints
     * @type {Object}
     */
    var constraints = {
        elevatorMaxLoad : 20, // Max number of people in an elevator
        isAllowedLoad   : function(proposedLoad){ // Allowed elevator load
            return proposedLoad > 0 && proposedLoad <= this.elevatorMaxLoad;
        }
    };

    /**
     * Simple floor object
     * @param {integer} floorNumber     Number of floor.
     * Notes:
     *     - In production this could come as an API service collection 
     *     and have methods attached using https://github.com/mgonto/restangular
     */
    var Floor = function(floorNumber){
        return {
            number     : floorNumber,
            passengers : {
                boarding         : 0,
                destinationFloor : ''
            },
            requestElevator : function(){
                return preDispatch.getTargetElevator(this);
            },
            empty : function(){
                this.passengers.boarding         = 0;
                this.passengers.destinationFloor = this.number;
                return this;
            }
        };
    };

    /**
     * Simle elevator
     * @param {string} name Name of elevator.
     * Notes:
     *     - In production this could come as an API service collection 
     *     and have methods attached using https://github.com/mgonto/restangular
     */
    var Elevator = function(name){
        return {
            name             : name,
            people           : 0,
            floor            : 1,
            destinationFloor : 1,
            sourceFloor      : 1,
            travelDirection  : 'stationary',
            addPassengers    : function(passengers){
                if(constraints.isAllowedLoad(this.people + passengers)){
                    this.people += passengers;
                }
                return this;
            },
            setTravelDirection : function(stationary){
                if(stationary){
                    this.travelDirection = 'stationary';
                }
                else{
                    this.travelDirection = this.destinationFloor > this.sourceFloor ? 'up' : 'down';
                }
                return this;
            },
            goToFloor        : function(floorTo, floorFrom){
                this.destinationFloor = floorTo;
                this.floor            = floorTo;
                this.sourceFloor      = floorFrom;
                this.setTravelDirection();
                return this;
            },
            empty : function(){
                this.people = 0;
                this.setTravelDirection(true);
                return this;
            }
        };
    };

    /**
     * Utilities methods for elevator pre-dispatch.
     * Used primarily in $scope.dispatch()
     * @type {Object}
     */
    var preDispatch = {
        availableElevators : function(floor){
            return _.filter($scope.elevators, function(elevator){
                return constraints.isAllowedLoad(elevator.people + floor.passengers.boarding);
            });
        },
        onFloorElevators : function(floor){
            return _.filter(this.availableElevators(floor), function(elevator){
                return elevator.floor === floor.number;
            });
        },
        nearestAvailElevator : function(floor){
            return _.min(this.availableElevators(floor), function(elevator){
                return Math.abs(floor.number - elevator.floor);
            });
        },
        getTargetElevator : function(floor){
            var onFloorElevators = this.onFloorElevators(floor);
            return onFloorElevators.length > 0 ? onFloorElevators[0] : this.nearestAvailElevator(floor);
        },
        isDispatchableFloor : function(floor){
            return constraints.isAllowedLoad(floor.passengers.boarding);
        }
    };

    /**
     * Dispatches elevators to floors.
     * @return {[type]} [description]
     */
    $scope.dispatch = function(){
        $scope.floors.forEach(function(floor){
            if(preDispatch.isDispatchableFloor(floor)){
                floor.requestElevator()
                    .addPassengers(floor.passengers.boarding)
                    .goToFloor(floor.passengers.destinationFloor, floor.number);
                floor.empty();
            }
        });
    };

    // Bootstrap with some dummy data as per the spec
    $scope.elevators = [
        new Elevator('A'),
        new Elevator('B'),
        new Elevator('C'),
        new Elevator('D')
    ];

    $scope.floors = [];
    for (var floor = 10; floor >= 1; floor--) {
        $scope.floors.push(new Floor(floor));
    }

}]);
