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
