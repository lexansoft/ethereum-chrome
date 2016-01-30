//alert( "Hey!!")
console.log( "page.js is here!!!")

    window.hello = function(string) {
        _call_ethereum_plugin( {
            type: 'sayhello',
            data: string
        }, function(response) {
            alert('Background said: ' + response);
        });
    };

var old_require = window.require

window.require

//web3 = require( "web3" )

