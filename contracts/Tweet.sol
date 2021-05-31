// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract Tweet {

    uint public tweetCount = 0;

    struct TweetStructure {

        uint id;
        string content;
        bool modified;
        bool deleted;
        uint date;

    }
    
    //mapping(uint => TweetStructure) public key;
    TweetStructure[] public listtweet;

    function createSportTweet(string memory _content) public {
        uint id = listtweet.length + 1;
        listtweet.push(TweetStructure(id, _content, false, false, block.timestamp));
    }

    function modifyTweet(uint a, string memory _content) public {
        TweetStructure storage tweet_ = listtweet[a - 1];
        tweet_.content = _content;
        tweet_.modified = true;
    }

    function deleteTweet(uint a) public {
        TweetStructure storage tweet_ = listtweet[a - 1];
        tweet_.deleted = true;
    }

    function getListTweet() public view returns(TweetStructure[] memory) {
        return listtweet;
    }
}
