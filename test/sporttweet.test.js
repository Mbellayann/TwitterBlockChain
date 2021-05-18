const { assert } = require("chai");

const SportTweet = artifacts.require("./contracts/SportTweet.sol");
contract ('sporttweetcontract', ('account')=>{
    let contracttweet
    describe('tweet', async()=> {
        let tweet, tweetCount
        before (async () => {
            tweet = await SportTweet.createSportTweet()
            tweet = await SportTweet.tweetCount()
        })
        it('create tweet', async()=> {
            assert.equal(tweetCount, 1)
        })
    })
})
