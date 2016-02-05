module.exports = new function HttpProvider(host) {
    this.host = host || 'http://localhost:8545';

    this.prepareRequest = function (async) {
        var request = new XMLHttpRequest();
        request.open('POST', this.host, async);
        request.setRequestHeader('Content-Type','application/json');
        return request;
    };

    this.send = function (payload) {
        throw new Error( "Sync operations are not supported")
    };

    this.sendAsync = function (payload, callback) {
        var request = this.prepareRequest(true); 

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                var result = request.responseText;
                var error = null;

                try {
                    result = JSON.parse(result);
                } catch(e) {
                    var message = 
                        !!request.responseText && 
                        !!request.responseText.error && 
                        !!request.responseText.error.message 
                        ? request.responseText.error.message 
                        : 'Invalid JSON RPC response: ' + JSON.stringify(request.responseText);
                    error = Error(message);                
                }

                callback(error, result);
            }
        };

        try {
            request.send(JSON.stringify(payload));
        } catch(error) {
            callback( new Error('CONNECTION ERROR: Couldn\'t connect to node '+ this.host +'.') );
        }
    };

    this.isConnected = function() {
        try {
            this.send({
                id: 9999999999,
                jsonrpc: '2.0',
                method: 'net_listening',
                params: []
            });
            return true;
        } catch(e) {
            return false;
        }
    };
}()