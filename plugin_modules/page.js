var PluginProvider = function () {
    
};

//PluginProvider.prototype.prepareRequest = function (async) {
//    console.log( "PluginProvider:prepareRequest")
//    var request = new XMLHttpRequest();
//    request.open('POST', this.host, async);
//    request.setRequestHeader('Content-Type','application/json');
//    return request;
//};

(function() {
        var timeouts = [];
        var messageName = "zero-timeout-message";

        // Like setTimeout, but only takes a function argument.  There's
        // no time argument (always zero) and no arguments (you have to
        // use a closure).
        function setZeroTimeout(fn) {
            timeouts.push(fn);
            window.postMessage(messageName, "*");
        }

        function handleMessage(event) {
            if (event.source == window && event.data == messageName) {
                event.stopPropagation();
                if (timeouts.length > 0) {
                    var fn = timeouts.shift();
                    fn();
                }
            }
        }

        window.addEventListener("message", handleMessage, true);

        // Add the one thing we want added to the window object.
        window.setZeroTimeout = setZeroTimeout;
})();

PluginProvider.prototype.send = function (payload) {
    console.log( "PluginProvider:send")
    returned_result = null
    returned_error = 0
    done = false;

    this.sendAsync( payload, function( error, result ) {
        returned_error = error;
        returned_result = result;
        done = true;
        
    }) 
    
    start_time = new Date()
    while( ! done ) { 
        if( new Date() - start_time >= 20000 ) {
            throw new Error( "PluginProvider TimeOut" )
        }    
        window.setZeroTimeout( function(){})
    }
    
    if( returned_error ==  0 ) return returned_result
    else throw new Error( returned_error )
};

PluginProvider.prototype.sendAsync = function (payload, callback) {
    console.log( "PluginProvider:sendAsync")

    _call_ethereum_plugin( {
        type: 'sendAsync',
        data: payload
        }, function( response ) {
            response = response;
            
            //callback( error, result )
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
    


