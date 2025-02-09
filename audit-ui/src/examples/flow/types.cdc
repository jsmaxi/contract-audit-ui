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