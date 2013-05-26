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
	var defaultResolution = 0.5;

	// Constructor
	function Entropy(bitLength, resolution) {

		var sha1 = new SHA1();
		
		var hash = "";
		var lastKey = 0x00;
		var keystrokesRequired = 0;
		var currentKeystrokesRequired = 0;

		var callbackFunction = undefined;

		// Returns hash
		_readHash = function () {
			return hash;
		}

		_setKeystrokesRequired = function () {
			keystrokesRequired = Math.ceil((bitLength/8)/resolution);
		}

		// Resets entropy generator
		_reset = function () {
			sha1.clearMessage();
			hash = "";
			_setKeystrokesRequired();
			lastKey = 0x00;
		}

		// Allow the user to set the bit length
		_setBitLength = function (varBitLength) {
	    	bitLength = varBitLength === undefined ? defaultBitLength : 4*Math.ceil(varBitLength/4);
			_reset();
		}

		_setResolution = function (varResolution) {
			resolution = varResolution === undefined ? defaultResolution : varResolution;
			_reset();
		}

		// Returns bit length
		_getBitLength = function () {
			return bitLength;
		}

		// Sets callback function for when hash is complete
		_isReadyListener = function (isReadyCallbackFunction) {
			callbackFunction = isReadyCallbackFunction;
		}

		// Checks if hash is complete
		_isReady = function () {
			return (hash.length == bitLength/4);
		}

		// enable keyboad entropy
    	_enableKeyboardEntropy = function (element) {
			eventListener(element, 'keydown', keyDown, true);
        	eventListener(element, 'keyup', keyUp, true);
    	}

		// disable keyboard entropy
		_disableKeyboardEntropy = function (element) {
			eventListener(element, 'keydown', keyDown, false);
			eventListener(element, 'keyup', keyUp, false);
		}

    	// set custom bit length
		_setBitLength(bitLength);
		_setResolution(resolution);
		
	
		keyDown = function (e) {	   
 
			// Collect entropy
			var date = new Date();
			var keyCode = e.keyCode;
			if (keyCode != lastKey && !_isReady()) {
				lastKey = keyCode;
				tempHash = keyCode;
				shiftbyte = 1000*date.getSeconds() + date.getMilliseconds();

				while (shiftbyte != 0) {
					tempHash = ((shiftbyte & 255) ^ hash);
					shiftbyte = shiftbyte >>> 8;
				}

				sha1.appendMessage(String.fromCharCode(tempHash));
			
				if (sha1.message.length == keystrokesRequired || sha1.message.length == Math.ceil(20/resolution)) {
					hash += sha1.hashMessage().substring(0,keystrokesRequired*resolution < 20 ? (2*keystrokesRequired*resolution) : 40);
					sha1.clearMessage();
					keystrokesRequired -= Math.ceil(20/resolution);

					if (keystrokesRequired <= 0) {
						done();
						return;
					}
				}
			}
		}

		// Collect entropy on a key up event
		keyUp = function (e) {
	    	// Collect Entropy
			// 
		}
			
		// When done trigger callback function
		done = function () {
			if (callbackFunction)
				callbackFunction.call();
		}

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
		return _readHash();
	}

	Entropy.prototype.reset = function () {
		_reset();
	}

	// Allow the user to set the bit length
	Entropy.prototype.setBitLength = function (bitLength) {
		_setBitLength(bitLength);
	}

	// Allow the user to set the resolution byte of resolution per ketstroke
	Entropy.prototype.setResolution = function (resolution) {
		_setResolution(resolution);
	}

	// Allow the user to set the byte resolution (same as set resolution)
	Entropy.prototype.setByteResolution = function (resolution) {
		_setResolution(resolution);
	}

	// Allow the user to set the bit resolution (bits of entropy per keystroke)
	Entropy.prototype.setBitResolution = function (resolution) {
		_setResolution(resolution/8.0);
	}

	// Allow the user to retreive the current bit length
	Entropy.prototype.getBitLength = function () {
    	return _getBitLength();
	}

	// Event listener will get triggered when done
	Entropy.prototype.isReadyListener = function (isReadyCallbackFunction) {
		_isReadyListener(isReadyCallbackFunction);
	}

	// Checks if the number of entropy collected matches
	// the bit length
	Entropy.prototype.isReady = function () {
		return _isReady();
	}
   
	// Create event listener for keypresses
	Entropy.prototype.enableKeyboardEntropy = function (element) {
	    _enableKeyboardEntropy(element);
	}
   
	// Create event listener for keypresses
	Entropy.prototype.disableKeyboardEntropy = function (element) {
	    _disableKeyboardEntropy(element);
	}


	//
	// Expose the module.
	//
	window.Entropy = Entropy;

})(window);
