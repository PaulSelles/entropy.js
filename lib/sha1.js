//
// Self-executing anonymous function.
//
// This prevents the accidental creation of global variables.
// This protects the module's values from being accessed and altered.
//
(function(window) {

	// Constructor
	function SHA1() {
	}

	// Preprocessing will ensure that the message length is
	// Padded to 448 bits (mod 512) and the original message
	// Length is added to the end as a 64 bit big endian number 
   	preProcessMessage = function (message) {

		// find the message bit length
		var initalBitLength = (message.length * 8) >>> 0;

		// Pad with the initial 1 bit follow 0x0 by 7 bits.
		var preProcessedMessage = message + '\x80';
	
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

		// Pad 0s until we are congruent with 448 (mod 512) bits
		for (var i=0; i<requiredCharLength; i++) {
			preProcessedMessage += paddingChar;
		}

		// Remove bits 64 to 33 of the message length
		// only allow messages of length 2^32-1 for now
		for (var i=0; i<4; i++) {
			preProcessedMessage += paddingChar;
		}
		
		// Append the remaining bit length as a 32 bit big endian number
		var bitLengthMask = 0xFF000000;
		for (var i=0; i<4; i++) {
			preProcessedMessage += String.fromCharCode((bitLengthMask & initalBitLength) >>> 8*(4-i-1));
			bitLengthMask = bitLengthMask >>> 8;
		}

		return preProcessedMessage;
	}

	// Convert the pre process message into 512 bit blocks
	// Each block is divide into 16 by 32bit words and
	// 64 by 32bit extented words from the first 16.
	convertToBlocks = function (preProcessedMessage) {
	
		var blocks = new Array();

		for(var i=0; i<preProcessedMessage.length/(512/8); i++) {

			// each block is a new word array
			blocks[i] = new Array();

			// 16 intial 32 bit words
			for (var j=0; j<16; j++) {

				var temp = 0x00000000;

				// Read each 8bit char code
				for (var k=0; k<4; k++) {
					temp = temp | preProcessedMessage.charCodeAt(64*i+4*j+k);
					if (k != 3) {
						temp = temp << 8;
					}
				}
				blocks[i][j] = temp >>> 0;
			}

			for (var j=16; j<80; j++) {
				blocks[i][j] = leftRotate((blocks[i][j-3]^blocks[i][j-8]^blocks[i][j-14]^blocks[i][j-16]) >>> 0,1) >>> 0;
			}	 
		}

		return blocks;
	}

	hashing = function (blocks) {

		// Initialize components
		var h0 = 0x67452301;
		var h1 = 0xEFCDAB89;
		var h2 = 0x98BADCFE;
		var h3 = 0x10325476;
		var h4 = 0xC3D2E1F0;

		for (var blockIndex=0; blockIndex<blocks.length; blockIndex++) {

			var a = h0 >>> 0;
			var b = h1 >>> 0;
			var c = h2 >>> 0;
			var d = h3 >>> 0;
			var e = h4 >>> 0;
			var temp = 0;

			for (var i=0; i<80; i++) {

				temp = ((leftRotate(a,5) + F(i,b,c,d) + e + K(i) + blocks[blockIndex][i]) & 0xFFFFFFFF) >>> 0;
				e = d >>> 0;
				d = c >>> 0;
				c = leftRotate(b,30) >>> 0;
				b = a >>> 0;
				a = temp >>> 0;
			}

			h0 = ((h0 + a) & 0xFFFFFFFF) >>> 0;
			h1 = ((h1 + b) & 0xFFFFFFFF) >>> 0;
			h2 = ((h2 + c) & 0xFFFFFFFF) >>> 0;
			h3 = ((h3 + d) & 0xFFFFFFFF) >>> 0;
			h4 = ((h4 + e) & 0xFFFFFFFF) >>> 0;
		
		}
		return toHexString(h0) + toHexString(h1) + toHexString(h2) + toHexString(h3) + toHexString(h4);
	}

	// Convert number into a 8 digit hex string
	toHexString = function (number)
	{
		numberString = "00000000" + (+number).toString(16);
		return (numberString.substring(numberString.length-8));
	}

	K = function (iteration) {
		k = {
			0: 0x5A827999,
			1: 0x6ED9EBA1,
			2: 0x8F1BBCDC, 
			3: 0xCA62C1D6
		};

		return k[Math.floor(iteration/20)];
	}

	F = function (iteration, b, c, d) {
		if (iteration >= 0 & iteration < 20) {
			return ((b & c) | ((~b) & d)) >>> 0;
		}
		else if (iteration < 40) {
			return (b ^ c ^ d) >>> 0;
		}
		else if (iteration < 60) {
			return ((b & c) | (b & d) | (c & d)) >>> 0; 
		}
	    else  if (iteration < 80) {
			return (b ^ c ^ d) >>> 0;
		}
	} 
		 

	SHA1.prototype.encode = function (message) {
	    this.preProcessedMessage = preProcessMessage(message);
		//return hashing(convertToBlocks(this.preProcessedMessage));

		blocks = convertToBlocks(this.preProcessedMessage);
		return blocks;
	}

	SHA1.prototype.hash = function (message) {
	    this.preProcessedMessage = preProcessMessage(message);
	    return hashing(convertToBlocks(this.preProcessedMessage));
	}

	// Right circular shift, rotateBits number of bits within a totalBits size 'register'
	//SHA1.prototype.rightRotate = function (number, rotateBits, totalBits) { return rightRotate(number, rotateBits, totalBits); }
	rightRotate = function (number, rotateBits, totalBits) {
		
		if (totalBits === undefined)
			totalBits = 32;

		return ((number >>> rotateBits) | (number << (totalBits - rotateBits)) & (0xFFFFFFFF >>> (32 - totalBits))) >>> 0;
	}

	// Left circular shift, rotateBits number of bits within a totalBits size 'register'
	//SHA1.prototype.leftRotate = function (number, rotateBits, totalBits) { return leftRotate(number, rotateBits, totalBits); }
	leftRotate = function (number, rotateBits, totalBits) {

		if (totalBits === undefined)
			totalBits = 32;

		return ((number >>> (totalBits - rotateBits) | (number << rotateBits)) & (0xFFFFFFFF >>> (32 - totalBits))) >>> 0; 
	}

	//
	// Expose the module.
	//
	window.SHA1 = SHA1;

})(window);
