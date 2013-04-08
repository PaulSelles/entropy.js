describe("Entropy", function () {

    describe("Default constructor", function () {

        beforeEach(function () {
            entropy = new Entropy();
        });

        it("should be created", function () {
            expect(entropy).not.toEqual(null);
        });

        it("should have default bitLength", function () {
            expect(entropy.getBitLength()).toEqual(entropyHelper.defaultBitLength);
        });

        it("should have bitLength as a private variable", function () {
            expect(entropy._bitLength).toEqual(undefined);
        });

        it("should not be ready after startup", function () {
            expect(entropy.isReady()).toEqual(false);
        });

        it("should be able to change the preset bit length", function () {
            entropy.setBitLength(entropyHelper.testBitLength)
            expect(entropy.getBitLength()).toEqual(entropyHelper.testBitLength);
        });
    });

    describe("Defined bitLegnth constructor", function () {

        beforeEach(function () {
            entropy = new Entropy(entropyHelper.testBitLength);
        });

        it("should have defined bitLength", function () {
            expect(entropy.getBitLength()).toEqual(entropyHelper.testBitLength);
        });

        it("should be able to change the preset bit length", function () {
            entropy.setBitLength(entropyHelper.defaultBitLength)
            expect(entropy.getBitLength()).toEqual(entropyHelper.defaultBitLength);
        });
    });

    describe("Keyboard entropy", function () {

        beforeEach(function () {
            entropy = new Entropy();
        });

        it("should trigger event on keydown for default document", function () {

            // enable a keyboard entropy and spy on KeyDownCalled
            entropy.enableKeyboardEntropy();
            spyOn(entropy, "keyDown");
                
            // Ultimately would like to use the event listener for this test.
            //keyboardEvent = document.createEvent("KeyboardEvent");
            //keyboardEvent.initKeyboardEvent("keydown", true, true, document.defaultView, false, false, false, false, false);
            //keyboardEvent.keyCode = 32;
            //document.dispatchEvent(keyboardEvent);

            // Spoof out keyboard event.
            var event = KeyboardEvent
            event.keyCode = entropyHelper.testKeyCode;

            // Call the keyDown event
            entropy.keyDown(event);
            expect(entropy.keyDown).toHaveBeenCalled();
        });

        // See comments above
        it("should trigger event on keyup for default document", function () {

            // enable a keyboard entropy and spy on KeyDownCalled
            entropy.enableKeyboardEntropy();
            spyOn(entropy, "keyUp");

            // Spoof out keyboard event.
            var event = KeyboardEvent
            event.keyCode = entropyHelper.testKeyCode;

            // Call the keyDown event
            entropy.keyUp(event);
            expect(entropy.keyUp).toHaveBeenCalled();
        });
    });
});