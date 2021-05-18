// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract SportTweet{
    uint public tweetCount = 0;
    uint public likeCount = 0;
    struct Sportweet{
        uint id;
        string content;
        bool like;
    }
    mapping(uint => Sportweet) public sporttweet;

    constructor() public{
        createSportTweet("Etoo fils is the best footballer in cameroun since 1998");
    }


    function createSportTweet(string memory _content) public{
        tweetCount++;
        sporttweet[tweetCount] = Sportweet(tweetCount, _content, false);
    }

    function createLikeTweet(uint a) public returns(uint){
        likeCount++;
        Sportweet storage tweet = sporttweet[a];
        tweet.like = true;
        return(likeCount);
    }
}
