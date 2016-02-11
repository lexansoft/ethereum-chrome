// Module encapsulates the Tab information
var ICON_BLINKING_TIMEOUT = 300

Queue = require( "./queue.js" )

module.exports = new function() {
    this.all_tabs = {}
    
    this.needUserAction = function( tab_id, v ) {
        tab = this.getTab( tab_id )
        tab.needUserAction( v )
    }
        
    this.getTab = function( tab_id ) {
        tab = this.all_tabs[ tab_id ]
        
        if( !!tab ) return tab;
        
        tab = {
            tab_id: tab_id,
            current_icon_index: 0, 
            user_action_is_needed: false,
            icon_is_shown: false,
            queue: new Queue( 1000, 15*60*1000 ),

            flipPageIcon: function flipPageIcon() {
                this.current_icon_index = ( this.current_icon_index + 1 ) % 2

                if( this.current_icon_index == 0 || !this.user_action_is_needed) {
                    chrome.pageAction.setIcon( {
                        tabId: this.tab_id,
                        path: {
                            "19": "images/ethereum_logo19.png",      
                            "38": "images/ethereum_logo38.png"           
                        }
                    })
                }
                else {    
                    chrome.pageAction.setIcon( {
                        tabId: this.tab_id,
                        path: {
                            "19": "images/ethereum_logo_red19.png",      
                            "38": "images/ethereum_logo_red38.png"           
                        }
                    })
                }

                if( this.user_action_is_needed ) {
                    me = this
                    setTimeout( function() { me.flipPageIcon() }, ICON_BLINKING_TIMEOUT )
                }   
            },    
            rejectTransaction : function( msg, callback ) {
                var m = this.queue.get( msg.id )
                
                if( m ) {
                    this.queue.delete( msg.id )
                    if( this.queue.getN() == 0 ) this.needUserAction( false )


                    window._call_content_page( 
                        this.tab_id, 
                        { error: "ethereum_plugin: Transaction rejected by the user" },
                        msg.id,
                        callback
                    );
                }
                else {
                    if( callback ) callback();
                }
            },
            confirmTransaction : function( msg, pass, callback ) {
                var m = this.queue.get( msg.id )
                
                if( m ) {
                    web3.personal.unlockAccount( msg.data.params[0].from, pass, 2, function( err, data) {
                        
                        console.log( "unlock returns:" + err )                       
                        if( callback ) callback();    
                    } )
                    
                    //TODO
                }
                else {
                    console.log( "no transaction to confirm. Probably waited too long" )
                    if( callback ) callback();
                }
            },
            needUserAction : function( v ) {
                this.user_action_is_needed = v
                if( v ) tab.flipPageIcon()                
            }
        }
        
        this.all_tabs[ tab_id ] = tab
        
        return tab
    }
        
    this.showPageIcon = function( tab_id ) {
        tab = this.getTab( tab_id )
        
        if( !tab.icon_is_shown ) {
            chrome.pageAction.show( tab_id ) //turn on the icon if needed
            tab.icon_is_shown = true
        }
    }
    
    this.deleteTab = function ( tab_id ) {
        tab = this.all_tabs[ tab_id ]
        if( !!tab ) {
            this.all_tabs[ tab_id ].user_action_is_needed = false;
            delete this.all_tabs[ tab_id ]
        }
    }
    
}();