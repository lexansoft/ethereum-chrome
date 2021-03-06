page_str_js="\n"+
"// web3 provider to communicate with the plugin\n"+
"var PluginProvider = function PluginProvider() {\n"+
"    this.uuid = ___require___('uuid')\n"+
"    this.Queue = ___require___('/src/background/queue.js')\n"+
"    this.MAX_MESSAGES_IN_POOL = 1000    // maximum number of active messages\n"+
"    this.TIMEOUT = 60000                // forget about message after that seccons\n"+
"    \n"+
"    this.message_pool = new this.Queue( this.MAX_MESSAGES_IN_POOL, this.TIMEOUT )\n"+
"    \n"+
"    this.newMessage = function( dataload, callback )\n"+
"    {\n"+
"        var m = \n"+
"        {\n"+
"            data: \n"+
"            {\n"+
"                id: this.uuid.v4(),\n"+
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
"\n"+
"        try {\n"+
"            msg = this.newMessage( dataload, callback )\n"+
"            this.message_pool.add( msg, msg.data.id )\n"+
"        }\n"+
"        catch( x ) {\n"+
"            callback( new Error( \"Too many incompleted transactions...\"))        \n"+
"            return;\n"+
"        }\n"+
"        \n"+
"        _call_ethereum_plugin( msg.data, function() {} );\n"+
"    }\n"+
"    this.isConnected = function() { return true; }\n"+
"    \n"+
"    this.onPlugingEvent = function( msg ) {\n"+
"//        console.log( \"onPlugingEvent=\" + JSON.stringify( msg ) );\n"+
"//        \n"+
"//        onPlugingEvent={\"type\":\"ethereum_bg2content\",\"dataload\":{\"error\":null,\"data\":{\"id\":1,\"jsonrpc\":\"2.0\",\"result\":\"0xba43b7400\"},\"id\":\"ad5c168f-e8cf-4c1f-baf6-6b09050999f3\"}}\n"+
"        \n"+
"        if( msg.type == \"ethereum_bg2content\") {\n"+
"            \n"+
"            console.log( \"Got back ethereum_bg2content id: \" + msg.id);\n"+
"            \n"+
"            console.log( \"msg=\" + JSON.stringify( msg, 3, 3 ) );\n"+
"            \n"+
"            orig_msg = this.message_pool.get( msg.id )\n"+
"            if( orig_msg )\n"+
"            {\n"+
"                 console.log( \"Found original message\" );\n"+
"                 this.message_pool.delete( msg.id )\n"+
"                 console.log( \"msg.dataload.error:\" + msg.dataload.error );\n"+
"                 console.log( \"msg.dataload.data:\" + JSON.stringify( msg.dataload.data, 3, 3 ) );\n"+
"                 console.log( \"orig_msg:\" + JSON.stringify( orig_msg, 3, 3 ) );\n"+
"                 orig_msg.callback( msg.dataload.error, msg.dataload.data )                    \n"+
"            }\n"+
"            else\n"+
"            {\n"+
"                console.log( \"No original message found. Probably expired. id: \" + msg.id );        \n"+
"            }\n"+
"        }\n"+
"    }\n"+
"};\n"+
"\n"+
"\n"+
"window.Web3 = ___require___( \"web3\" )\n"+
"window.web3 = new Web3( new PluginProvider() );\n"+
"\n"+
"    \n"+
"console.log( \"page.js completed!!!\")\n"+
"\n"+
"";
