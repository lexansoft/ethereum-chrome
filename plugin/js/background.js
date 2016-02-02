httpProvider = new HttpProvider()

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
