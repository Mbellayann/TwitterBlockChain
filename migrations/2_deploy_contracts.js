const GeneralTweet = artifacts.require("./contracts/GeneralTweet.sol");

module.exports = function(deployer) {
  deployer.deploy(GeneralTweet);
};
