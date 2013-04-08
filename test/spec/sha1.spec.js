describe("SHA1", function () {

	beforeEach(function() {
		sha1 = new SHA1();
	});

	it("should contain initialized variables", function () {

		expect(sha1.h0).toEqual(0x67452301);	
		expect(sha1.h1).toEqual(0xEFCDAB89);
		expect(sha1.h2).toEqual(0x98BADCFE);
		expect(sha1.h3).toEqual(0x10325476);
		expect(sha1.h4).toEqual(0xC3D2E1F0);
    });

	it("should right rotate", function() {
		expect(sha1.rightRotate(0x1,1,1)).toEqual(0x1);
		expect(sha1.rightRotate(0x1,1,4)).toEqual(0x8);
		expect(sha1.rightRotate(0x0000000F,8,32)).toEqual(0x0F000000);

		// This test produces the correct bitwise value but an incorrect interger (uint32 vs int32).
		// I'll just have to get back to it.
		expect(sha1.rightRotate(0x0000000F,4,32)).toEqual(0xF0000000);
	});
});
