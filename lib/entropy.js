var defaultBitLength = 128;

// Constructor
function Entropy(bitLength) {

    if (bitLength === undefined)
        bitLength = defaultBitLength;


// Public members
    this.bitLength = bitLength;
    this.entropyArray = [];

    
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
Entropy.prototype.keyDown = function (event) {
    // Collect entropy
}
// Collect entropy on a key up event
Entropy.prototype.keyUp = function (event) {
    // Collect entropy
}