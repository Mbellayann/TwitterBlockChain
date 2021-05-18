


const SportTweet = artifacts.require("./contracts/SportTweet.sol");

module.exports = function(deployer) {
  deployer.deploy(SportTweet);
};
