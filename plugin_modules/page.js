// web3 provider to communicate with the plugin
var PluginProvider = function PluginProvider() {
    this.MAX_MESSAGES_IN_POOL = 1000    // maximum number of active messages
    this.TIMEOUT = 60000                // forget about message after that seccons
    
    this.message_pool = {}
    
    this.newMessage = function( dataload, callback )
    {
        var m = 
        {
            data: 
            {
                id: 123,
                type: 'sendAsync',
                data: dataload
            },
            callback: callback,
            created: new Date().getTime()
        }
        return m
    }
    
    
    this.send = function (payload) {
        throw new Error( "Ethereum Plugin does not support syncronious web3 calls.")
    }

    this.sendAsync = function ( dataload, callback) {
        console.log( "PluginProvider:sendAsync");
        
        if( this.message_pool.length >= this.MAX_MESSAGES_IN_POOL ) {
            //try to clean the pool
            
            for( var m in this.message_pool ) {
                if( new Date().getTime() - m.created > this.TIMEOUT ) {
                    delete this.message_pool[ m.data.id ];
                }
            }
        }

        if( this.message_pool.length >= this.MAX_MESSAGES_IN_POOL ) {
            callback( new Error( "Too many incompleted transactions..."))        
        }
        
        msg = this.newMessage( dataload, callback )
        this.message_pool[ msg.data.id ] = msg;
        
        _call_ethereum_plugin
        ( 
            msg.data
            , 
            function( response ) 
            {
                //?????
            }
        );
    }
    this.isConnected = function() { return true; }
    
    this.onPlugingEvent = function( data ) {
        console.log( "Got back to provider!!!");
    }
};


window.Web3 = ___require___( "web3" )
window.web3 = new Web3( new PluginProvider() );

//DEBUG

window.hello = function(string) {
        _call_ethereum_plugin
        ( 
            {
                type: 'sayhello',
                data: string
            }, 
            function(response) 
            {
                alert('Background said: ' + response);
            }
        );
    };    
    
console.log( "page.js completed!!!")

