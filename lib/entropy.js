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
	var keystrokesCollected = 0;
	var keystrokesRequired = 0;
	

	// Constructor
	function Entropy(bitLength, resolution) {

	// Public members
		this.hash = "";
    	this.bitLength = defaultBitLength;
		this.resolution = 0.5;

    	// set custom bit length
    	this.setBitLength(bitLength);

		this.keystrokesRequired = Math.ceil((this.bitLength/8)/this.resolution);

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

		sha1 = new SHA1();
		sha1.clearMessage();

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

	Entropy.prototype.readHash = function () {
		return this.hash;
	}

	Entropy.prototype.reset = function () {
		sha1.clearMessage();
		this.keystrokesCollected = 0;
		this.hash = "";
	}

	// Allow the user to set the bit length
	Entropy.prototype.setBitLength = function (bitLength) {
	    this.bitLength = bitLength === undefined ? defaultBitLength : 8*Math.ceil(bitLength/8);
		this.keystrokesRequired = Math.ceil((this.bitLength/8)/this.resolution);
	}

	// Allow the user to retreive the current bit length
	Entropy.prototype.getBitLength = function () {
    	return this.bitLength;
	}

	// Checks if the number of entropy collected matches
	// the bit length
	Entropy.prototype.isReady = function () {
		return (this.hash.length == this.bitLength/4);
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

			sha1.appendMessage(String.fromCharCode(hash));
			
			if (sha1.message.length == this.keystrokesRequired || sha1.message.length == Math.ceil(20/this.resolution)) {
				this.hash += sha1.hashMessage().substring(0,this.keystrokesRequired*this.resolution < 20 ? (this.keystrokesRequired*this.resolution)*2 : 40);
				sha1.clearMessage();
				this.keystrokesRequired -= Math.ceil(20/this.resolution);
			}
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
