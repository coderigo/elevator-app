describe('elevator-app', function(){

    beforeEach(function() {
        browser.get('#/');
    });
    
    describe('basic look', function(){

        it('should display the correct page title', function() {
            expect(browser.getTitle()).toBe('Ye olde elevator app');
        });

        it('should display instructions', function() {
            var instructionsElement = element.all(by.id('elevatorAppInstructions')),
                instructionsHeader  = instructionsElement.get(0).all(by.tagName('h2')).get(0).getText(),
                instructionsList    = instructionsElement.get(0).all(by.tagName('li'));

            expect(instructionsElement.count()).toBe(1);
            expect(instructionsHeader).toBe('Instructions');
            expect(instructionsList.count()).toBe(5);
        });

        it('should display an elevator app demo title', function() {
            var appDemoElement = element.all(by.id('elevatorAppDemo')),
                appDemoHeader  = appDemoElement.get(0).all(by.tagName('h2')).get(0).getText();

            expect(appDemoElement.count()).toBe(1);
            expect(appDemoHeader).toBe('Elevator administration');
        });

        it('should show ten floors with four elevators each', function() {
            var floors            = element.all(by.repeater('floor in floors')),
                floorCount        = floors.count(),
                expectedFloors    = 10,
                expectedElevators = 4;

            expect(floorCount).toBe(expectedFloors);

            // Should show floors from 10 - 1
            for (var floorNumber = expectedFloors; floorNumber >= 1; floorNumber--) {

                var targetFloor     = floors.get(expectedFloors - floorNumber),
                    floorNumberText = targetFloor.all(by.binding('floor.number')).get(0).getText(),
                    elevatorSlots   = targetFloor.all(by.repeater('elevator in elevators'));

                expect(floorNumberText).toBe(floorNumber.toString());
                expect(elevatorSlots.count()).toBe(expectedElevators);

            };

        });

    });

    describe('basic behaviour', function(){

        var firstFloorIndex,
            tenthFloorIndex,
            mockPassengerLoad,
            mockDestinationFloor,
            firstFloor,
            tenthFloor,
            firstElevator,
            passengersInput,
            destinationFloors,
            destinationFloor,
            dispatchButton;

        beforeEach(function(){
            firstFloorIndex      = 9;
            tenthFloorIndex      = 0;
            mockPassengerLoad    = '10';
            mockDestinationFloor = '10';
            firstFloor           = element.all(by.repeater('floor in floors')).get(firstFloorIndex);
            tenthFloor           = element.all(by.repeater('floor in floors')).get(tenthFloorIndex);
            firstElevator        = tenthFloor.all(by.repeater('elevator in elevators')).get(0);
            passengersInput      = firstFloor.all(by.model('floor.passengers.boarding')).get(0);
            destinationFloors    = firstFloor.all(by.tagName('option'));
            destinationFloor     = firstFloor.all(by.model('floor.passengers.destinationFloor')).get(0);
            dispatchButton       = element(by.buttonText('Dispatch'));
        });

        it('should dispatch passengers to a requested level', function() {

            passengersInput.sendKeys(mockPassengerLoad);
            destinationFloors.get(1).click();
            
            expect(passengersInput.getAttribute('value')).toBe(mockPassengerLoad);
            expect(destinationFloor.getAttribute('value')).toBe('0'); 

            dispatchButton.click();

            expect(firstElevator.all(by.binding('elevator.people')).get(0).getText()).toBe('10');

        });

        it('should refuse to dispatch more than 20 people', function() {

            var selectDisabled = firstFloor.all(by.tagName('select')).get(0).getAttribute('disabled');

            expect(selectDisabled).toBeTruthy();

            passengersInput.sendKeys('21');

            expect(selectDisabled).toBeTruthy();
            
            destinationFloors.get(1).click();

            expect(passengersInput.getAttribute('value')).toBe('21');

            dispatchButton.click();

            expect(firstFloor.all(by.repeater('elevator in elevators')).get(0).getText()).toBe('0');
        });

        it('should empty an elevator', function() {

            passengersInput.sendKeys(mockPassengerLoad);
            destinationFloors.get(1).click();
            dispatchButton.click();

            expect(firstElevator.all(by.binding('elevator.people')).get(0).getText()).toBe('10');

            element.all(by.buttonText('empty')).first().click();

            expect(firstElevator.all(by.binding('elevator.people')).get(0).getText()).toBe('0');

        });

    });

});