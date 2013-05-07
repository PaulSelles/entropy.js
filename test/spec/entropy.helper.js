entropyHelper = {
    testBitLength: 64,
    defaultBitLength: 128,
    
    testKeyCode: 32,

	// Use char code instead of keycode for testng

	typeMessage: function (entropy, message) {
		
		var e = KeyboardEvent;

		for (var i=0; i<message.length; i++) {
			e.keyCode = String.charCodeAt(message[i]);
			entropy.keyDown(e);
		}
	}
};
