//
// Self-executing anonymous function.
//
// This prevents the accidental creation of global variables.
// This protects the module's values from being accessed and altered.
//
(function(window) {

	// Constructor
	function SHA1() {

		// Initilization variables
		this.h0 = 0x67452301;
		this.h1 = 0xEFCDAB89;
		this.h2 = 0x98BADCFE;
		this.h3 = 0x10325476;
		this.h4 = 0xC3D2E1F0;
	}

	// messages will be made up of chars so 8bit chunks only
   	preProcessMessage = function (message) {

		// find the message bit length
		var initalBitLength = (message.length * 8) >>> 0;

		// Pad with the initial 1 bit follow 0x0 by 7 bits.
		var preProcessedMessage = message + '\x10';
	
		// Calculate the inital bit length	
		var initialModuloBitLength = (preProcessedMessage.length * 8) % 512;
		var requiredCharLength = 0;

		// Calculate the number of remaining characters needed
		if (initialModuloBitLength <= 448) {
			requiredCharLength = (448 - initialModuloBitLength) / 8;
		} else {
			requiredCharLength = ((512 - initialModuloBitLength) + 448) / 8;
		}

		// Padding character of 0x0 by 8bits
		var paddingChar = '\x00';

		// Pad 0s until
		for (var i=0; i<requiredCharLength; i++) {
			preProcessedMessage += paddingChar;
		}

		// Remove bits 64 to 33 of the message length
		// only allow messages of length 2^32-1 for now
		for (var i=0; i<32/8; i++) {
			preProcessedMessage += paddingChar;
		}

		// Append the remaining bit length as a 32 bit big endian number
		for (var i=0; i<32/8; i++) {
			preProcessedMessage += String.fromCharCode(0xFF & initalBitLength);
			initalBitLength = initalBitLength >>> 8;
		}

		return preProcessedMessage;
	}

	SHA1.prototype.encode = function (message) {
		return preProcessMessage(message);
	}

	// Right circular shift, rotateBits number of bits within a totalBits size 'register'
	SHA1.prototype.rightRotate = function (number, rotateBits, totalBits) {
		
		if (totalBits === undefined)
			totalBits = 32;

		return ((number >>> rotateBits) | (number << (totalBits - rotateBits)) & (0xFFFFFFFF >>> (32 - totalBits))) >>> 0;
	}

	// Left circular shift, rotateBits number of bits within a totalBits size 'register'
	SHA1.prototype.leftRotate = function (number, rotateBits, totalBits) {

		if (totalBits === undefined)
			totalBits = 32;

		return this.rightRotate(number, (totalBits-rotateBits), totalBits);		
	}

	//
	// Expose the module.
	//
	window.SHA1 = SHA1;

})(window);
