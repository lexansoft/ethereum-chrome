module.exports = function() {
    var path = ""
    
    if (navigator.platform.indexOf("Win") == 0 ) {
       path = '\\\\.\\pipe\\geth.ipc';
    }
    else {
        if (navigator.platform.indexOf("Mac") == 0 ) {
            path = '~/Library/Ethereum/geth.ipc';
        }
        else{
            //Linux?
            path = '~/.ethereum/geth.ipc';            
        }
    }

    console.log('Connect to IPC path: '+ path);
    return path;
}();