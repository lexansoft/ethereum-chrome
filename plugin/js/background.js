httpProvider = new HttpProvider()

Web3 = require( "web3")
web3 = new Web3( httpProvider )

var ICON_BLINKING_TIMEOUT = 200
var current_icon_index = {} //default
var user_action_is_needed = {}

function _call_content_page( tab, dataload, id ) {
      chrome.tabs.sendMessage(tab.id, 
      {
        type: 'ethereum_bg2content', 
        dataload: dataload,
        id: id
      }, function(response) {});
}

function flipPageIcon( tab_id ) {
    
    current_icon_index[tab_id] = ( current_icon_index[tab_id] + 1 ) % 2
    
    if( current_icon_index[tab_id] == 0 ) {
        chrome.pageAction.setIcon( {
            tabId: tab_id,
            path: {
                "19": "images/ethereum_logo19.png",      
                "38": "images/ethereum_logo38.png"           
            }
        })
    }
    else {    
        chrome.pageAction.setIcon( {
            tabId: tab_id,
            path: {
                "19": "images/ethereum_logo_red19.png",      
                "38": "images/ethereum_logo_red38.png"           
            }
        })
    }
    
    if( user_action_is_needed[ tab_id ] ) {
        setTimeout( function() { flipPageIcon( tab_id ) }, ICON_BLINKING_TIMEOUT )
    }    
}

function RequestForAction( tab_id, v ) {
    user_action_is_needed[ tab_id ] = v
    current_icon_index[tab_id] = 0
    
    if( v ) {
        flipPageIcon( tab_id )
    }
}



chrome.runtime.onMessage.addListener( function(message, sender, sendResponse ) {
    if (message && message.type == 'ethereum_content2bg') {
        
        chrome.pageAction.show( sender.tab.id ) //turn on the icon if needed
        RequestForAction( sender.tab.id, true )
        
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
