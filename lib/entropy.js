//
// Self-executing anonymous function.
//
// This prevents the accidental creation of global variables.
// This protects the module's values from being accessed and altered.
//
(function(window) {

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Entropy class
///////////////////////////////////////////////////////////////////////////////
	var defaultBitLength = 128;
	var lastKey = 0x00;

	// Constructor
	function Entropy(bitLength) {

		// Public members
    	this.bitLength = defaultBitLength;
    	this.entropyArray = [];
		this.resolution = 0.5;

    	// set custom bit length
    	this.setBitLength(bitLength);

    	this._enableKeyboardEntropy = function (element) {
        	eventListener(element, 'keydown', this.keyDown);
        	eventListener(element, 'keyup', this.keyUp);
    	}

		// Private members

    	// General event listener
    	eventListener = function (element, eventName, eventHandler) {

        	// Use document as the default element
        	if (element === undefined)
            element = document;

        	// Attach an event listener, or add event (some browers have problems)
        	if (element.addEventListener) {
        	    element.addEventListener(eventName, eventHandler, false);
	        } else if (element.attacheEvent) {
    	        element.attacheEvent("on" + eventName, eventHandler);
        	}
	    }
	}

	// Allow the user to set the bit length
	Entropy.prototype.setBitLength = function (bitLength) {
    	if (bitLength === undefined)
        	bitLength = defaultBitLength;

	    this.bitLength = bitLength;
	}

	// Allow the user to retreive the current bit length
	Entropy.prototype.getBitLength = function () {
    	return this.bitLength;
	}

	// Checks if the number of entropy collected matches
	// the bit length
	Entropy.prototype.isReady = function () {
    	return (this.entropyArray.length >= this.bitLength);
	}
   
	// Create event listener for keypresses
	Entropy.prototype.enableKeyboardEntropy = function (element) {
	    this._enableKeyboardEntropy(element);
	}

	// Beware of keydown events, js has a funny habit of spamming
	// TODO:    Disable the keyDown event once it is triggered and enable keyUp
	//          Enable keyDown even on keyUp event
	// Collect entropy on a key down event
	Entropy.prototype.keyDown = function (e) {
	    
		// Collect entropy
		var date = new Date();
		var keyCode = e.keyCode;
		if (keyCode != lastKey) {
			lastKey = keyCode;
			hash = keyCode;
			shiftbyte = 1000*date.getSeconds() + date.getMilliseconds();

			while (shiftbyte != 0) {
				hash = ((shiftbyte & 255) ^ hash);
				shiftbyte = shiftbyte >>> 8;
			}
		
			this.entropyArray += hash;
		}
	}
	// Collect entropy on a key up event
	Entropy.prototype.keyUp = function (event) {
	    // Collect Entropy
		// 
	}

	//
	// Expose the module.
	//
	window.Entropy = Entropy;

})(window);
