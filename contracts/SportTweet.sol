// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract SportTweet{
    uint public tweetCount = 0;
    uint public likeCount = 0;
    struct Sportweet{
        uint id;
        string content;
        bool like;
        bool deleted;
    }
    mapping(uint => Sportweet) public sporttweet;
    Sportweet[] public listtweet;

    constructor() public{
        createSportTweet("Etoo fils is the best footballer in cameroun since 1998");
    }


    function createSportTweet(string memory _content) public{
        tweetCount++;
        sporttweet[tweetCount] = Sportweet(tweetCount, _content, false,false);
    }

    function createLikeTweet(uint a) public returns(uint){
        likeCount++;
        Sportweet storage tweet = sporttweet[a];
        tweet.like = true;
        return(likeCount);
    }

    function deleteTweet(uint a) public{
        tweetCount++;
        Sportweet storage tweet = sporttweet[a];
        if (tweet.deleted = false){
            tweet.deleted = true;
            sporttweet[tweetCount] = tweet;
        }
    }
    function getTweet(uint a) public {

    }
}
