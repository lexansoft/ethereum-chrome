// A simple cache of transactions.


module.exports = new function( max_total, expiration_time ) {
    this.max_total = max_total
    this.expiration_time = expiration_time 
    
    this.transactions = {}
    
    this.add = function( tr, id ) {
        if( this.transactions.length >= this.max_total ) {
            //try to clean the pool
            
            for( var r in this.transactions ) {
                if( new Date().getTime() - r.created > this.TIMEOUT ) {
                    delete this.transactions[ r.id ];
                }
            }
        }    

        if( this.transactions.length >= this.max_total ) throw new Error( "Ethereum Plugin: ERROR: Too many pending transactions" )
        
        r = {
            data:  tr,
            id: id,
            created: new Date().getTime()
        }
        
        this.transactions[ id ] = r
    }
 
    
    this.get = function( id ) {
        r = this.transactions[ id ]
        
        if( !!r ) return r.data
        else return null
    }
    
    this.delete = function( id ) {
        delete this.transactions[ r.id ];
    }
}