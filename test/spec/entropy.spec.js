var testBitLength = 128;
var defaultBitLength = 8;

describe("Entropy", function () {

    describe("Default constructor", function () {

        beforeEach(function () {
            entropy = new Entropy();
        });

        it("should be created", function () {
            expect(entropy).not.toEqual(null);
        });

        it("should have default bitLength", function () {
            expect(entropy.getBitLength()).toEqual(8);
        });

        it("should have bitLength as a private variable", function () {
            expect(entropy._bitLength).toEqual(undefined);
        });

        it("should not be ready after startup", function () {
            expect(entropy.isReady()).toEqual(false);
        });

        it("should be able to change the preset bit length", function () {
            entropy.setBitLength(testBitLength)
            expect(entropy.getBitLength()).toEqual(testBitLength);
        });
    });

    describe("Defined biLegnth constructor", function () {

        beforeEach(function () {
            entropy = new Entropy(testBitLength);
        });

        it("should have defined bitLength", function () {
            expect(entropy.getBitLength()).toEqual(testBitLength);
        });
    });
});