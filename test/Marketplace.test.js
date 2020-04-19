const Marketplace = artifacts.require("./Marketplace.sol");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Marketplace", ([deployer, seller, buyer]) => {
  let marketplace;

  before(async () => {
    marketplace = await Marketplace.deployed();
  });

  //check depolyment
  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await marketplace.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await marketplace.name();
      assert.equal(name, "shadow");
    });
  });

  //check products
  describe("products", async () => {
    let result, productCount;

    before(async () => {
      result = await marketplace.createMedicine(
        "0xe51a926c0EC0CcdbBFB07D122A3B38FBC99Daea1",
        "abc",
        "10jan2019",
        "10nov2019",
        "1234",
        "pune",
        100,
        10
      );
      productCount = await marketplace.productCount();
    });

    it("creates product", async () => {
      assert.equal(productCount, 1);
      const event = result.logs[0].args;
      assert.equal(
        event.id.toNumber(),
        productCount.toNumber(),
        "id is correct"
      );
      assert.equal(
        event.mfg_owner,
        "0xe51a926c0EC0CcdbBFB07D122A3B38FBC99Daea1",
        "address is correct"
      );
      assert.equal(event.med_name, "abc", "price is correct");
      assert.equal(event.mfg_month, "10jan2019", "owner is correct");
      assert.equal(event.exp_month, "10nov2019", " is correct");
      assert.equal(event.batch_no, "1234", " is correct");
      assert.equal(event.mfg_location, "pune", " is correct");
      assert.equal(event.med_price, 100, " is correct");
      assert.equal(event.med_amount, 10, " is correct");
    });
  });
});
