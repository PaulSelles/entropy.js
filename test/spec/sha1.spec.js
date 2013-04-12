describe("SHA1", function () {

	beforeEach(function() {
		sha1 = new SHA1();
	});

	it("sould load message", function () {
		sha1.loadMessage("Test message");
		expect(sha1.message).toEqual("Test message");
	});

	it("sould append message", function () {
		sha1.loadMessage("Test");
		sha1.appendMessage(" message");
		expect(sha1.message).toEqual("Test message");
	});

	it("should clearMessage", function () {
		sha1.loadMessage("Test message");
		sha1.clearMessage(); 
		expect(sha1.message).toEqual("");
	});

	it("should hash from direct string input", function () {
		expect(sha1.hashMessage("").length).toEqual(160/4);
		expect(sha1.hashMessage("")).toEqual("da39a3ee5e6b4b0d3255bfef95601890afd80709");
		expect(sha1.hashMessage("The quick brown fox jumps over the lazy dog")).toEqual("2fd4e1c67a2d28fced849ee1bb76e7391b93eb12");
		expect(sha1.hashMessage("The quick brown fox jumps over the lazy cog")).toEqual("de9f2c7fd25e1b3afad3e85a0bd17d9b100db4b3");
	});

	it("should hash from preloaded string", function () {
		
		testMessage = "The quick brown fox jumps over the lazy ";

		sha1.loadMessage("Test message");
		sha1.clearMessage();
		expect(sha1.hashMessage()).toEqual("da39a3ee5e6b4b0d3255bfef95601890afd80709");

		sha1.loadMessage(testMessage);
		sha1.appendMessage("dog");
		expect(sha1.hashMessage()).toEqual("2fd4e1c67a2d28fced849ee1bb76e7391b93eb12");

		sha1.clearMessage();
		sha1.loadMessage(testMessage + "cog");
		expect(sha1.hashMessage()).toEqual("de9f2c7fd25e1b3afad3e85a0bd17d9b100db4b3");
	});
});
