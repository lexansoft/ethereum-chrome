httpProvider = require( "./httpprovider.js" )

Web3 = require( "web3")
web3 = new Web3( httpProvider )

tabs = require( "./tabs.js" )
accounts = require( "./accounts.js" )


function _call_content_page( tab, dataload, id, callback ) {
    
      if( typeof tab == "object" ) tab_id = tab.id
      else tab_id = tab
    
      console.log( "_call_content_page = " + JSON.stringify( dataload, 3, 3 ))
      
      
      chrome.tabs.sendMessage( tab_id, 
      {
        type: 'ethereum_bg2content', 
        dataload: dataload,
        id: id
      }, function(response) {
          if( callback ) callback()
      });
}

window._call_content_page = _call_content_page //DEBUG


chrome.runtime.onMessage.addListener( function(message, sender, sendResponse ) {
    if (message && message.type == 'ethereum_content2bg') {

        tabs.showPageIcon( sender.tab.id )

        if( !!message.request && !!message.request.type && message.request.data ) {
            if( message.request.type == "sendAsync" ) {

                if( message.request.data.method == "eth_sendTransaction" ) {
                    addr_from = message.request.data.params[0].from

                    if( accounts.isLocked( addr_from ) ) {
                        tabs.getTab( sender.tab.id ).queue.add( message.request.data, message.request.id );
                        tabs.needUserAction( sender.tab.id, true )
                        return;
                    }
                }

                httpProvider.sendAsync( message.request.data, function( error, data ) {
                    _call_content_page( sender.tab, { error:error, data:data }, message.request.id );
                })
            }
            else
            {
                _call_content_page( 
                    sender.tab, 
                    { error: "ethereum_plugin: wrong message type:" + message.request.type },
                    message.request.id );
            }
        } 
        else
        {
            _call_content_page( 
                sender.tab, 
                { error: "ethereum_plugin: wrong sendAsync parameters" }, 
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
