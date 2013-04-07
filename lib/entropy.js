var defaultBitLength = 8;

var Entropy = (function () {

    // Define our private variables
    var _bitLength;
    var _entropyArray;

    // Constructor will set up desired bit length (or default)
    // and initialize our entropy array
    function Entropy(bitLength) {

        if (bitLength === undefined)
           bitLength = defaultBitLength;

        _bitLength = bitLength;
        _entropyArray = [];
    }

    // Allow the user to set the bit length
    Entropy.prototype.setBitLength = function (bitLength) {
        if (bitLength === undefined)
            bitLength = defaultBitLength;

        _bitLength = bitLength;
    }

    // Allow the user to retreive the current bit length
    Entropy.prototype.getBitLength = function () {
        return _bitLength;
    }

    // Checks if the number of entropy collected matches
    // the bit length
    Entropy.prototype.isReady = function () {
        return (_entropyArray.length >= _bitLength);
    }
   
    return Entropy;

})();