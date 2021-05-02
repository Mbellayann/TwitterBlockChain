var GeneralTweet = artifacts.require("./GeneralTweet.sol");

module.exports = function(deployer) {
  deployer.deploy(GeneralTweet);
};
