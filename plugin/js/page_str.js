page_str_js="// web3 provider to communicate with the plugin\n"+
"var PluginProvider = function PluginProvider() {\n"+
"    this.MAX_MESSAGES_IN_POOL = 1000    // maximum number of active messages\n"+
"    this.TIMEOUT = 60000                // forget about message after that seccons\n"+
"    \n"+
"    this.message_pool = {}\n"+
"    \n"+
"    this.newMessage = function( dataload, callback )\n"+
"    {\n"+
"        var m = \n"+
"        {\n"+
"            data: \n"+
"            {\n"+
"                id: 123,\n"+
"                type: 'sendAsync',\n"+
"                data: dataload\n"+
"            },\n"+
"            callback: callback,\n"+
"            created: new Date().getTime()\n"+
"        }\n"+
"        return m\n"+
"    }\n"+
"    \n"+
"    \n"+
"    this.send = function (payload) {\n"+
"        throw new Error( \"Ethereum Plugin does not support syncronious web3 calls.\")\n"+
"    }\n"+
"\n"+
"    this.sendAsync = function ( dataload, callback) {\n"+
"        console.log( \"PluginProvider:sendAsync\");\n"+
"        \n"+
"        if( this.message_pool.length >= this.MAX_MESSAGES_IN_POOL ) {\n"+
"            //try to clean the pool\n"+
"            \n"+
"            for( var m in this.message_pool ) {\n"+
"                if( new Date().getTime() - m.created > this.TIMEOUT ) {\n"+
"                    delete this.message_pool[ m.data.id ];\n"+
"                }\n"+
"            }\n"+
"        }\n"+
"\n"+
"        if( this.message_pool.length >= this.MAX_MESSAGES_IN_POOL ) {\n"+
"            callback( new Error( \"Too many incompleted transactions...\"))        \n"+
"        }\n"+
"        \n"+
"        msg = this.newMessage( dataload, callback )\n"+
"        this.message_pool[ msg.data.id ] = msg;\n"+
"        \n"+
"        _call_ethereum_plugin\n"+
"        ( \n"+
"            msg.data\n"+
"            , \n"+
"            function( response ) \n"+
"            {\n"+
"                //?????\n"+
"            }\n"+
"        );\n"+
"    }\n"+
"    this.isConnected = function() { return true; }\n"+
"    \n"+
"    this.onPlugingEvent = function( data ) {\n"+
"        console.log( \"Got back to provider!!!\");\n"+
"    }\n"+
"};\n"+
"\n"+
"\n"+
"window.Web3 = ___require___( \"web3\" )\n"+
"window.web3 = new Web3( new PluginProvider() );\n"+
"\n"+
"//DEBUG\n"+
"\n"+
"window.hello = function(string) {\n"+
"        _call_ethereum_plugin\n"+
"        ( \n"+
"            {\n"+
"                type: 'sayhello',\n"+
"                data: string\n"+
"            }, \n"+
"            function(response) \n"+
"            {\n"+
"                alert('Background said: ' + response);\n"+
"            }\n"+
"        );\n"+
"    };    \n"+
"    \n"+
"console.log( \"page.js completed!!!\")\n"+
"\n"+
"";
