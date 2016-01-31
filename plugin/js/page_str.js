page_str_js="var PluginProvider = function PluginProvider() {\n"+
"    \n"+
"};\n"+
"\n"+
"//PluginProvider.prototype.prepareRequest = function (async) {\n"+
"//    console.log( \"PluginProvider:prepareRequest\")\n"+
"//    var request = new XMLHttpRequest();\n"+
"//    request.open('POST', this.host, async);\n"+
"//    request.setRequestHeader('Content-Type','application/json');\n"+
"//    return request;\n"+
"//};\n"+
"\n"+
"\n"+
"PluginProvider.prototype.send = function (payload) {\n"+
"    throw new Error( \"Ethereum Plugin does not support syncronious web3 calls.\")\n"+
"//    console.log( \"PluginProvider:send\")\n"+
"//    returned_result = null\n"+
"//    returned_error = 0\n"+
"//    done = false;\n"+
"//\n"+
"//    this.sendAsync( payload, function( error, result ) {\n"+
"//        returned_error = error;\n"+
"//        returned_result = result;\n"+
"//        done = true;\n"+
"//        \n"+
"//    }) \n"+
"//    \n"+
"//    start_time = new Date()\n"+
"//    while( ! done ) { \n"+
"//        if( new Date() - start_time >= 10000 ) {\n"+
"//            throw new Error( \"PluginProvider TimeOut\" )\n"+
"//        }    \n"+
"//        setTimeout(function(){}, 0);\n"+
"//    }\n"+
"//    \n"+
"//    if( returned_error ==  0 ) return returned_result\n"+
"//    else throw new Error( returned_error )\n"+
"};\n"+
"\n"+
"PluginProvider.prototype.sendAsync = function (payload, callback) {\n"+
"    console.log( \"PluginProvider:sendAsync\")\n"+
"\n"+
"    _call_ethereum_plugin( {\n"+
"        type: 'sendAsync',\n"+
"        data: payload\n"+
"        }, function( response ) {\n"+
"            callback( JSON.stringify({ error: 0, data: response }) );\n"+
"            \n"+
"        });\n"+
"    \n"+
"    \n"+
"    \n"+
"    \n"+
"    //    var request = this.prepareRequest(true); \n"+
"//\n"+
"//    request.onreadystatechange = function() {\n"+
"//        if (request.readyState === 4) {\n"+
"//            var result = request.responseText;\n"+
"//            var error = null;\n"+
"//\n"+
"//            try {\n"+
"//                result = JSON.parse(result);\n"+
"//            } catch(e) {\n"+
"//                error = errors.InvalidResponse(request.responseText);                \n"+
"//            }\n"+
"//\n"+
"//            callback(error, result);\n"+
"//        }\n"+
"//    };\n"+
"//    \n"+
"//    try {\n"+
"//        request.send(JSON.stringify(payload));\n"+
"//    } catch(error) {\n"+
"//        callback(errors.InvalidConnection(this.host));\n"+
"//    }\n"+
"};\n"+
"\n"+
"PluginProvider.prototype.isConnected = function() { return true; }\n"+
"\n"+
"\n"+
"window.Web3 = ___require___( \"web3\" )\n"+
"window.web3 = new Web3( new PluginProvider() );\n"+
"\n"+
"    window.hello = function(string) {\n"+
"        _call_ethereum_plugin( {\n"+
"            type: 'sayhello',\n"+
"            data: string\n"+
"        }, function(response) {\n"+
"            alert('Background said: ' + response);\n"+
"        });\n"+
"    };    \n"+
"    \n"+
"\n"+
"\n"+
"";
