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

	// Left circular shift, rotateBits number of bits within a totalBits size 'register'
	SHA1.prototype.leftRotate = function (number, rotateBits, totalBits) {
		return rightRotate(number, totalBits-rotateBits, totalBits);		
	}

	// Right circular shift, rotateBits number of bits within a totalBits size 'register'
	SHA1.prototype.rightRotate = function (number, rotateBits, totalBits) {
		return (number >>> rotateBits) | (number << (totalBits - rotateBits)) & (0xFFFFFFFF >>> (32 - totalBits))
	}

	//
	// Expose the module.
	//
	window.SHA1 = SHA1;

})(window);
