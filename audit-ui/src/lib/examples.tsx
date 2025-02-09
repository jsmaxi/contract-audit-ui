interface ExampleContract {
  name: string;
  code: string;
}

interface ContractsByLanguage {
  [key: string]: ExampleContract[];
}

export const exampleContracts: ContractsByLanguage = {
  Solidity: [
    {
      name: "Withdraw",
      code: `
// SPDX-License-Identifier: MIT

pragma solidity 0.6.2;

contract Withdraw {
    mapping(address => uint256) public balances;

    function withdraw() public {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call{value: amount}("");
        balances[msg.sender] = 0;
    }
}
`,
    },
    {
      name: "Timestamp",
      code: `
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
`,
    },
    {
      name: "Owner",
      code: `
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
`,
    },
  ],

  "Flow Cadence": [
    {
      name: "Access",
      code: `
access(all) contract Access {
    access(all) var totalSupply: UFix64
    
    access(all) fun mintTokens(amount: UFix64) {
        // Anyone can mint tokens
        self.totalSupply = self.totalSupply + amount
    }
    
    access(all) resource Administrator {
        access(all) fun adjustSupply(amount: UFix64) {
            Access.totalSupply = amount
        }
    }
    
    init() {
        self.totalSupply = 0.0
    }
}`,
    },
    {
      name: "Resource",
      code: `
access(all) contract Resource {
    access(all) resource Token {
        access(all) var value: UFix64
        
        init(_ value: UFix64) {
            self.value = value
        }
    }
    
    access(all) fun transferToken(token: @Token) {
        destroy token
    }
    
    access(all) fun createAndProcess(): @Token {
        let token <- create Token(10.0)
        return <- token
    }
}
`,
    },
    {
      name: "Types",
      code: `
access(all) contract Types {
    access(all) struct Interface {
        access(all) var value: UFix64
        
        init(_ value: UFix64) {
            self.value = value
        }
    }
    
    // Type confusion
    access(all) fun processValue(value: AnyStruct): UFix64 {
        var i: Interface = value as! Interface
        return i.value
    }
}
`,
    },
  ],

  "Arbitrum Stylus": [
    {
      name: "1",
      code: `
`,
    },
    {
      name: "2",
      code: `
`,
    },
    {
      name: "3",
      code: `
`,
    },
  ],

  "Starknet Cairo": [
    {
      name: "Fibonacci",
      code: `
#[starknet::contract]
mod Fibonacci {
    #[storage]
    struct Storage {
        n: u128,
    }

    #[generate_trait]
    impl CalculationImpl of CalculationTrait {
        fn calculate_fib(self: @ContractState) -> u128 {
            fib(1, 1, self.n.read())
        }
    }

    fn fib(a: u128, b: u128, n: u128) -> u128 {
        match n {
            0 => a,
            _ => fib(b, a + b, n - 1),
        }
    }
}

use Fibonacci::CalculationTrait;

fn main() -> u128 {
    let mut state = Fibonacci::contract_state_for_testing();
    state.n.write(5);

    let result = state.calculate_fib();
    result
}
`,
    },
    {
      name: "Array",
      code: `
use array::ArrayTrait;

fn main() {
    let mut a = ArrayTrait::new();

    a.append(1);
    a.append(2);

    assert!(a.len() == 2, "wrong array length");

    let _first_element = *a.get(0).unwrap().unbox();

    let _second_element = *a.at(1);
}
`,
    },
    {
      name: "Balances",
      code: `
fn main() {
    let mut balances: Felt252Dict<u64> = Default::default();

    balances.insert('Alex', 100);
    balances.insert('Maria', 200);

    let alex_balance = balances.get('Alex');
    assert!(alex_balance == 100, "Balance is not 100");

    let maria_balance = balances.get('Maria');
    assert!(maria_balance == 200, "Balance is not 200");
}
`,
    },
  ],
};
