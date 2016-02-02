
// web3 provider to communicate with the plugin
var PluginProvider = function PluginProvider() {
    this.uuid = ___require___('uuid')
    this.MAX_MESSAGES_IN_POOL = 1000    // maximum number of active messages
    this.TIMEOUT = 60000                // forget about message after that seccons
    
    this.message_pool = {}
    
    this.newMessage = function( dataload, callback )
    {
        var m = 
        {
            data: 
            {
                id: this.uuid.v4(),
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
        
        _call_ethereum_plugin( msg.data, function() {} );
    }
    this.isConnected = function() { return true; }
    
    this.onPlugingEvent = function( msg ) {
//        console.log( "onPlugingEvent=" + JSON.stringify( msg ) );
//        
//        onPlugingEvent={"type":"ethereum_bg2content","dataload":{"error":null,"data":{"id":1,"jsonrpc":"2.0","result":"0xba43b7400"},"id":"ad5c168f-e8cf-4c1f-baf6-6b09050999f3"}}
        
        if( msg.type == "ethereum_bg2content") {
            orig_msg = this.message_pool[ msg.id ] 
            if( orig_msg )
            {
                 delete this.message_pool[ msg.id ]
                 orig_msg.callback( msg.dataload.error, msg.dataload.data )                    
            }
            else
            {
                console.log( "No original message found. Probably expired. id: " + msg.id );        
            }
        }
        
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

