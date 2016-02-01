var EVENT_FROM_PAGE = '__rw_chrome_ext_ethereum' 
var EVENT_REPLY = '__rw_chrome_ext_reply_ethereum' 
var TRANSPORTER_ID = '__ethereum_plugin_event_transporter__'

s = document.createElement('script');
s.textContent = web3_str_js
document.documentElement.appendChild(s);
s.parentNode.removeChild(s);

s = document.createElement('script');
s.textContent = page_str_js
document.documentElement.appendChild(s);
s.parentNode.removeChild(s);

s = document.createElement('script');
s.textContent = '(' + function(send_event_name, reply_event_name ) {
    console.log( "injection is here!!!")

    var TRANSPORTER_ID = '__ethereum_plugin_event_transporter__'
    
    window._call_ethereum_plugin = function ( message, callback ) {
        var transporter = document.getElementById( TRANSPORTER_ID )
        if( !transporter ) {
            var transporter = document.createElement( '__ethereum_plugin_event_transporter__' );
            transporter.id = TRANSPORTER_ID
            
            transporter.addEventListener( reply_event_name, function(event) {
                var result = this.getAttribute('result');
//                if (this.parentNode) this.parentNode.removeChild(this);
                // After having cleaned up, send callback if needed:
                if (typeof callback == 'function') {
                    response = JSON.parse(result);
                    callback( response );
                }
            });
        }
        
        // Functionality to notify content script
        var event = document.createEvent('Events');
        event.initEvent(send_event_name, true, false);
        transporter.setAttribute('data', JSON.stringify(message));
        (document.body||document.documentElement).appendChild(transporter);
        transporter.dispatchEvent(event);
    }    
} + ')(' + JSON.stringify(/*string*/EVENT_FROM_PAGE) + ', ' +
           JSON.stringify(/*string*/EVENT_REPLY) + ')';
document.documentElement.appendChild(s);
s.parentNode.removeChild(s);


// Handle messages from/to page:
document.addEventListener( EVENT_FROM_PAGE, function(e) {
    var transporter = e.target;
    if (transporter) {
        var request = JSON.parse(transporter.getAttribute('data'));
        // Example of handling: Send message to background and await reply
        chrome.runtime.sendMessage({
            type: 'ethereum_content2bg',
            request: request
        }, function(data) {
            // Received message from background, pass to page
            var event = document.createEvent('Events');
            event.initEvent(EVENT_REPLY, false, false);
            transporter.setAttribute('result', JSON.stringify(data));
            transporter.dispatchEvent(event);
        });
    }
});

chrome.runtime.onMessage.addListener( function(message ) {
    if (message && message.type == 'ethereum_bg2content') {
        
        console.log( "Got message back!!!") 
            // Received message from background, pass to page
        
        s = document.createElement('script');
        s.textContent = '(' + function( message ) {
            console.log( "injection is here!!! " + message )

            if( web3.currentProvider.constructor.name == "PluginProvider") {
                
                web3.currentProvider.onPlugingEvent( message )
            }    
        } + ')(' + JSON.stringify( message ) + ')';

        document.documentElement.appendChild(s);
        s.parentNode.removeChild(s);
    }
});
console.log( "Content file completed!!!")
