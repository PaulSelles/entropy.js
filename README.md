entropy.js
==========

>Collect user entropy from your browser window.

About
-----

- entropy.js allows you to collect user entropy from your browser window.
- Currently only keyboard entropy generation is supported
- Entropy generated through keycode and timestamp hashing
- Output as hex string
- Not intended for encryption or security, entropy.js carries no guarantees or warrantees

Usage
-----

*Source*

    <!-- include both sha1.js and entropy.js -->
    <script type="text/javascript" src="sha1.js"></script>
    <script type="text/javascript" src="sha1.js"></script>
  
*Functions*

    // Constructor
    var entropy = new Entropy();
    var entropy = new Entropy(bitLength);
    var entropy = new Entropy(bitLenght, resolution);

    // Enabling keyboard entropy
    entropy.enableKeyboardEntropy();

    // Disabling keyboard entropy
    entropy.disableKeyboardEntropy();

    // Set and get desired bit length (to the next nibble)
    entropy.setBitLength();
    entropy.getBitLength();

    // Set byte resolution
    // Keycode bytes to output entropy bytes
    // It is recommended to use a resolution no higher than 0.5
    entropy.setResolution(resolution);
    entropy.setByteResolution(resolution);

    // Set bit resolution
    // Keycode bits to output entropy bits
    // It is recommended to use a resolution no higher than 4
    entropy.setBitResolution(resolution);
    
    // Reset entropy collection (this will dump all currently collected keystrokes)
    entropy.reset();
    
    // Test is hashed output is ready to be read
    entropy.isReady();
    
    // Create a listener that will trigger when hashed output is ready
    entropy.isReadyListener(isReadyCallbackFunction);
    
    // Read entropy output
    entropy.readHash();
    
*Example*

From index.html

    <!DOCTYPE HTML>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Example file entroy.js</title>

        <script type="text/javascript" src="lib/entropy.js"></script>
        <script type="text/javascript" src="lib/sha1.js"></script>
        <script type="text/javascript">
      
          entropy = new Entropy();
        
          entropy.isReadyListener(function() {
            window.alert(entropy.readHash());
            entropy.reset();
          });
      
          entropy.enableKeyboardEntropy();
          entropy.setBitLength(128);
          entropy.setResolution(0.5);
          
        </script>
      </head>
      <body></body>
    </html>
