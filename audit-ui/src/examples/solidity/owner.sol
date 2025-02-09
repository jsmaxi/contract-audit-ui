// SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

contract Owner {
    uint[] public data;
    address private owner;

    constructor(address initialOwner) {
        owner = initialOwner;
    }

    function addData(uint _value) public {
        data.push(_value);
    }
}
