//url = require( "url" )

//chrome.webRequest.onBeforeRequest.addListener( function ( params ) {
// 
//    u = url.parse( params.url )
//    
//    //if( u.protocol == "eid") 
//    //if( params.url.startsWith ("eid") ) 
//    if( u.host == ("etherid.org") ) 
//    {
//        console.log( u.path )
////        console.log( "YES!!!" + u.protocol )
//        //return { redirectUrl: "" }
//    }
//    
//    
//}, { urls: [ "*://*/*" ] }, [ "blocking" ] )


//chrome.runtime.onInstalled.addListener(function() {
//  chrome.declarativeContent.onPageChanged.removeRules( undefined, function() {
//    chrome.declarativeContent.onPageChanged.addRules([{
//      conditions: [
//        // When a page contains a <video> tag...
//        new chrome.declarativeContent.PageStateMatcher({
//          css: ["video"]
//        })
//      ],
//      // ... show the page action.
//      actions: [new chrome.declarativeContent.ShowPageAction() ]
//    }]);
//  });
//});

//navigator.registerProtocolHandler( "web+eid", "http://cnn.com/%s", "Hmm...")

//navigator.registerProtocolHandler("mailto","https://mail.google.com/mail/?extsrc=mailto&url=%s","Gmail")

//navigator.registerProtocolHandler("web+eid", "https://www.example.com/?uri=%s", "My Cool App");

//chrome.tabs.onUpdated.addListener(function ( tabId, changeInfo, tab ) {
// 
//    //u = url.parse( params.url )
//    
//    //if( u.protocol == "eid") 
//    //if( params.url.startsWith ("eid") ) 
////    if( params.url.indexOf("eid") >= 0 ) 
//    {
//        console.log( "YES!!!" + changeInfo.url )
////        console.log( "YES!!!" + u.protocol )
//        //return { redirectUrl: "" }
//    }
//    
//    
//})

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message && message.type == 'page') {
        var page_message = message.message;
        // Simple example: Get data from extension's local storage
        var result = localStorage.getItem('whatever');
        // Reply result to content script
        sendResponse( "result" );
    }
});

////background.html
//chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//    if (changeInfo.status == 'complete') {
//        // Execute some script when the page is fully (DOM) ready
//        chrome.tabs.executeScript(null, { code:"web3='bg_event'"});
//    }
//});

//chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
//  if (request.method == 'ping')
//    sendResponse({ data: 'pong' });
//  else 
//    sendResponse({});
//});
//
//
//chrome.tabs.onUpdated.addListener(function(tab) {
//
//    chrome.tabs.executeScript({
//        file: chrome.extension.getURL("js/page.js")
//    }); 
//
//});

//window.addEventListener('message', function(event) {
//
//    chrome.tabs.executeScript(
//        null,
//        { file:chrome.extension.getURL("js/page.js")},
//        function(results){ console.log( "result=" + results); }
//    );
//    
//    
//    console.log('content_script.js got message:', event);
//    // check event.type and event.data
//});