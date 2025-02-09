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
}