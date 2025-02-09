// SPDX-License-Identifier: MIT

contract Timestamp {
    uint256 public constant REWARD = 1 ether;
    mapping(address => uint256) public lastPlayed;

    function play() public {
        require(block.timestamp >= lastPlayed[msg.sender] + 1 days, "Too soon");
        payable(msg.sender).transfer(REWARD);
        lastPlayed[msg.sender] = block.timestamp;
    }
}
