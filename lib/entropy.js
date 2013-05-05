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

		// enable keyboad entropy
    	this._enableKeyboardEntropy = function (element) {
			eventListener(element, 'keydown', this.keyDown, true);
        	eventListener(element, 'keyup', this.keyUp, true);
    	}

		this._disableKeyboardEntropy = function (element) {
			eventListener(element, 'keydown', this.keyDown, false);
			eventListener(element, 'keyup', this.keyUp, false);
		}		


	// Private members

    	// General event listener
    	eventListener = function (element, eventName, eventHandler, enable) {

			// Use document as the default element
        	if (element === undefined)
            	element = document;

			// Add or remove our event listener 
        	if (element[(enable ? 'add' : 'remove') + 'EventListener']) {
        	    element[(enable ? 'add' : 'remove') + 'EventListener'](eventName, eventHandler, false);
	        } else if (element[(enable ? 'attach' : 'remove') + 'Event']) {
    	       	element[(enable ? 'attach' : 'remove') + 'Event']("on" + eventName, eventHandler);
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
   
	// Create event listener for keypresses
	Entropy.prototype.disableKeyboardEntropy = function (element) {
	    this._disableKeyboardEntropy(element);
	}

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

			window.alert(hash);
		
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
