// Random unique name, to be used to minimize conflicts:
var EVENT_FROM_PAGE = '__rw_chrome_ext_ethereum' 
var EVENT_REPLY = '__rw_chrome_ext_reply_ethereum' 

//var p = document.createElement('script');
//p.src = chrome.extension.getURL("js/bundle.js")
//document.documentElement.appendChild(p);
//p.parentNode.removeChild(p);
//
//var p = document.createElement('script');
//p.src = chrome.extension.getURL("js/page.js")
//document.documentElement.appendChild(p);
//p.parentNode.removeChild(p);


s = document.createElement('script');
s.src = chrome.extension.getURL('js/bundle.js');
//s.onload = function() {
//    this.parentNode.removeChild(this);
//};
(document.head || document.documentElement).appendChild(s);

s = document.createElement('script');
s.src = chrome.extension.getURL('js/page.js');
//s.onload = function() {
//    this.parentNode.removeChild(this);
//};
(document.head || document.documentElement).appendChild(s);



s = document.createElement('script');
s.textContent = '(' + function(send_event_name, reply_event_name, bundle_url, page_url ) {
    // NOTE: This function is serialized and runs in the page's context
    // Begin of the page's functionality
    
    console.log( "injection is here!!!")
    
//    function syncJSLoad( url ) {
//        var ajax = new XMLHttpRequest();
//        ajax.open( 'GET', url, false ); // <-- the 'false' makes it synchronous
//        ajax.onreadystatechange = function () {
//            var script = ajax.response || ajax.responseText;
//            if (ajax.readyState === 4) {
//                switch( ajax.status) {
//                    case 200:
//                        eval.apply( window, [script] );
//                        break;
//                    default:
//                        console.log("ERROR: script not loaded: ", url);
//                }
//            }
//        };
//        ajax.send(null);
//    }  
    
    // End of your logic, begin of messaging implementation:
    function _call_ethereum_plugin( message, callback) {
        var transporter = document.createElement('dummy');
        // Handles reply:
        transporter.addEventListener(reply_event_name, function(event) {
            var result = this.getAttribute('result');
            if (this.parentNode) this.parentNode.removeChild(this);
            // After having cleaned up, send callback if needed:
            if (typeof callback == 'function') {
                result = JSON.parse(result);
                callback(result);
            }
        });
        // Functionality to notify content script
        var event = document.createEvent('Events');
        event.initEvent(send_event_name, true, false);
        transporter.setAttribute('data', JSON.stringify(message));
        (document.body||document.documentElement).appendChild(transporter);
        transporter.dispatchEvent(event);
    }    
    
//    syncJSLoad( bundle_url )
//    syncJSLoad( page_url )
    
    
} + ')(' + JSON.stringify(/*string*/EVENT_FROM_PAGE) + ', ' +
           JSON.stringify(/*string*/EVENT_REPLY) + ', ' +
           JSON.stringify( chrome.extension.getURL("js/bundle.js") ) + ', ' + 
           JSON.stringify( chrome.extension.getURL("js/page.js") ) + ')';
document.documentElement.appendChild(s);
s.parentNode.removeChild(s);


// Handle messages from/to page:
document.addEventListener(EVENT_FROM_PAGE, function(e) {
    var transporter = e.target;
    if (transporter) {
        var request = JSON.parse(transporter.getAttribute('data'));
        // Example of handling: Send message to background and await reply
        chrome.runtime.sendMessage({
            type: 'page',
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

console.log( "Content file completed!!!")