httpProvider = require( "./httpprovider.js" )

Web3 = require( "web3")
web3 = new Web3( httpProvider )

tabs = require( "./tabs.js" )


function _call_content_page( tab, dataload, id ) {
      chrome.tabs.sendMessage(tab.id, 
      {
        type: 'ethereum_bg2content', 
        dataload: dataload,
        id: id
      }, function(response) {});
}

chrome.runtime.onMessage.addListener( function(message, sender, sendResponse ) {
    if (message && message.type == 'ethereum_content2bg') {
        
        tabs.showPageIcon( sender.tab.id )
        //tabs.needUserAction( sender.tab.id, true ) //DEBUG
        
        if( !!message.request && !!message.request.type && message.request.data ) {
            if( message.request.type == "sendAsync" ) {
                httpProvider.sendAsync( message.request.data, function( error, data ) {
                    _call_content_page( sender.tab, { error:error, data:data }, message.request.id );
                })
            }
            else
            {
                _call_content_page( 
                    sender.tab, 
                    { error:new Error( "ethereum_plugin: wrong message type:" + message.request.type ) },
                    message.request.id );
            }
        } 
        else
        {
            _call_content_page( 
                sender.tab, 
                { error:new Error( "ethereum_plugin: wrong sendAsync parameters" )}, 
                message.request.id );
        }
    }
    
    sendResponse( {} )
});


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, updatedTab) {
    tabs.deleteTab( tabId ) 
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    tabs.deleteTab( tabId )
});