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
