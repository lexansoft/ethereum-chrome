var PluginProvider = function PluginProvider() {
    
};

//PluginProvider.prototype.prepareRequest = function (async) {
//    console.log( "PluginProvider:prepareRequest")
//    var request = new XMLHttpRequest();
//    request.open('POST', this.host, async);
//    request.setRequestHeader('Content-Type','application/json');
//    return request;
//};


PluginProvider.prototype.send = function (payload) {
    throw new Error( "Ethereum Plugin does not support syncronious web3 calls.")
//    console.log( "PluginProvider:send")
//    returned_result = null
//    returned_error = 0
//    done = false;
//
//    this.sendAsync( payload, function( error, result ) {
//        returned_error = error;
//        returned_result = result;
//        done = true;
//        
//    }) 
//    
//    start_time = new Date()
//    while( ! done ) { 
//        if( new Date() - start_time >= 10000 ) {
//            throw new Error( "PluginProvider TimeOut" )
//        }    
//        setTimeout(function(){}, 0);
//    }
//    
//    if( returned_error ==  0 ) return returned_result
//    else throw new Error( returned_error )
};

PluginProvider.prototype.sendAsync = function (payload, callback) {
    console.log( "PluginProvider:sendAsync")

    _call_ethereum_plugin( {
        type: 'sendAsync',
        data: payload
        }, function( response ) {
            callback( JSON.stringify({ error: 0, data: response }) );
            
        });
    
    
    
    
    //    var request = this.prepareRequest(true); 
//
//    request.onreadystatechange = function() {
//        if (request.readyState === 4) {
//            var result = request.responseText;
//            var error = null;
//
//            try {
//                result = JSON.parse(result);
//            } catch(e) {
//                error = errors.InvalidResponse(request.responseText);                
//            }
//
//            callback(error, result);
//        }
//    };
//    
//    try {
//        request.send(JSON.stringify(payload));
//    } catch(error) {
//        callback(errors.InvalidConnection(this.host));
//    }
};

PluginProvider.prototype.isConnected = function() { return true; }


window.Web3 = ___require___( "web3" )
window.web3 = new Web3( new PluginProvider() );

    window.hello = function(string) {
        _call_ethereum_plugin( {
            type: 'sayhello',
            data: string
        }, function(response) {
            alert('Background said: ' + response);
        });
    };    
    


