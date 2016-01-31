page_str_js="var PluginProvider = function () {\n"+
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
"(function() {\n"+
"        var timeouts = [];\n"+
"        var messageName = \"zero-timeout-message\";\n"+
"\n"+
"        // Like setTimeout, but only takes a function argument.  There's\n"+
"        // no time argument (always zero) and no arguments (you have to\n"+
"        // use a closure).\n"+
"        function setZeroTimeout(fn) {\n"+
"            timeouts.push(fn);\n"+
"            window.postMessage(messageName, \"*\");\n"+
"        }\n"+
"\n"+
"        function handleMessage(event) {\n"+
"            if (event.source == window && event.data == messageName) {\n"+
"                event.stopPropagation();\n"+
"                if (timeouts.length > 0) {\n"+
"                    var fn = timeouts.shift();\n"+
"                    fn();\n"+
"                }\n"+
"            }\n"+
"        }\n"+
"\n"+
"        window.addEventListener(\"message\", handleMessage, true);\n"+
"\n"+
"        // Add the one thing we want added to the window object.\n"+
"        window.setZeroTimeout = setZeroTimeout;\n"+
"})();\n"+
"\n"+
"PluginProvider.prototype.send = function (payload) {\n"+
"    console.log( \"PluginProvider:send\")\n"+
"    returned_result = null\n"+
"    returned_error = 0\n"+
"    done = false;\n"+
"\n"+
"    this.sendAsync( payload, function( error, result ) {\n"+
"        returned_error = error;\n"+
"        returned_result = result;\n"+
"        done = true;\n"+
"        \n"+
"    }) \n"+
"    \n"+
"    start_time = new Date()\n"+
"    while( ! done ) { \n"+
"        if( new Date() - start_time >= 20000 ) {\n"+
"            throw new Error( \"PluginProvider TimeOut\" )\n"+
"        }    \n"+
"        window.setZeroTimeout( function(){})\n"+
"    }\n"+
"    \n"+
"    if( returned_error ==  0 ) return returned_result\n"+
"    else throw new Error( returned_error )\n"+
"};\n"+
"\n"+
"PluginProvider.prototype.sendAsync = function (payload, callback) {\n"+
"    console.log( \"PluginProvider:sendAsync\")\n"+
"\n"+
"    _call_ethereum_plugin( {\n"+
"        type: 'sendAsync',\n"+
"        data: payload\n"+
"        }, function( response ) {\n"+
"            response = response;\n"+
"            \n"+
"            //callback( error, result )\n"+
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
