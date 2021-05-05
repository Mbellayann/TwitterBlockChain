const GeneralTweet = artifacts.require("./contracts/GeneralTweet.sol");

module.exports = function(deployer) {
  deployer.deploy(GeneralTweet);
};

const SportTweet = artifacts.require("./contracts/SportTweet.sol");

module.exports = function(deployer) {
  deployer.deploy(SportTweet);
};
