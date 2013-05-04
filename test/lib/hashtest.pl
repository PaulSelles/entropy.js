#! /bin/perl

# Maximum timestamp, list of possible keyboard keycodes, hash result container
$maxtime=60000;
@keycodes=(8, 9, 13, 16..20, 27, 32..46, 48..57, 65..93, 96..123, 144, 145, 182, 183, 186..191, 219..222);
@hashdistribution =  map { 0 } 1..256;

# print "TIMESTAMP\tKEYCODE\tHASHVALUE\n";

# Loop through all possible timestamps
for $timestamp (0..($maxtime-1)) {
	# Loop through all possible key codes
	for $keycode (@keycodes) {

		# Temp varabiles	
		$shiftbyte = $timestamp;
		$hash = $keycode;

		# Perform a Pearson's hash on timestamp with appended keycode
		while ($shiftbyte != 0) {
			$hash = (($shiftbyte & 255) ^ $hash);
			$shiftbyte = $shiftbyte >> 8;
		}

		$hashdistribution[$hash]++;
		# print "$timestamp\t$keycode\t$hash\n";
	}
}

print "HASHVALUE\tCOUNT\n";
for (0..255) { 
	print "$_\t$hashdistribution[$_]\n" 
};
