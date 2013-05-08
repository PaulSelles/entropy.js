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
		
		it("should be ready after required keystrokes collected", function () {
			entropy.enableKeyboardEntropy();

			// Expecting 40 bytes 
			entropy.setBitLength(160);
			entropy.reset();

			// Send a string 39 chars long
			entropyHelper.typeMessage(entropy, "012345678901234567890123456789012345678");
			expect(entropy.isReady()).toEqual(false);
	
			// Send the 40th char
			entropyHelper.typeMessage(entropy, "9");
			expect(entropy.isReady()).toEqual(true);	
		});

        // See comments above
        it("should trigger event on keyup for default document", function () {

            // enable a keyboard entropy and spy on KeyDownCalled
            entropy.enableKeyboardEntropy();
			entropy.reset();
            spyOn(entropy, "keyUp");

            // Spoof out keyboard event.
            var event = KeyboardEvent;
            event.keyCode = entropyHelper.testKeyCode;

            // Call the keyDown event
            entropy.keyUp(event);
            expect(entropy.keyUp).toHaveBeenCalled();
        });
		
		// We don't have custom lenght enabled yet
		it("should retrun a 160 bit hash", function () {
			entropy.enableKeyboardEntropy();

			// Expecting 40 bytes 
			entropy.setBitLength(160);
			entropy.reset();

			// Send a string 40 chars long
			entropyHelper.typeMessage(entropy, "0123456789012345678901234567890123456789");
			expect(entropy.isReady()).toEqual(true);
			expect(entropy.hash.length).toEqual(40);	
		});

		// We don't have custom lenght enabled yet
		it("should retrun a 128 bit hash", function () {
			entropy.enableKeyboardEntropy();

			// Expecting 32 bytes 
			entropy.setBitLength(128);
			entropy.reset();

			// Send a string 32 chars long
			entropyHelper.typeMessage(entropy, "01234567890123456789012345678901");
			expect(entropy.isReady()).toEqual(true);
			expect(entropy.hash.length).toEqual(32);	
		});
		
		
		// We don't have custom lenght enabled yet
		it("should retrun a 256 bit hash", function () {
			entropy.enableKeyboardEntropy();

			// Expecting 64 bytes 
			entropy.setBitLength(256);
			entropy.reset();

			// Send a string 64 chars long
			entropyHelper.typeMessage(entropy, "0123456789012345678901234567890123456789012345678901234567890123");
			expect(entropy.isReady()).toEqual(true);
			expect(entropy.hash.length).toEqual(64);	
		});
		
		// We don't have custom lenght enabled yet
		it("should retrun a 320 bit hash", function () {
			entropy.enableKeyboardEntropy();

			// Expecting 80 bytes 
			entropy.setBitLength(320);
			entropy.reset();

			// Send a string 80 chars long
			entropyHelper.typeMessage(entropy, "01234567890123456789012345678901234567890123456789012345678901234567890123456789");
			expect(entropy.isReady()).toEqual(true);
			expect(entropy.hash.length).toEqual(80);	
		});

		// We don't have custom lenght enabled yet
		it("should retrun a 512 bit hash", function () {
			entropy.enableKeyboardEntropy();

			// Expecting 128 bytes 
			entropy.setBitLength(512);
			entropy.reset();

			// Send a string 128 chars long
			entropyHelper.typeMessage(entropy, "01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567");
			expect(entropy.isReady()).toEqual(true);
			expect(entropy.hash.length).toEqual(128);	
		});
    	});
});
