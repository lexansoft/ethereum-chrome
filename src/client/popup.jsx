import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import ActionAccountBalance from 'material-ui/lib/svg-icons/action/account-balance';
import ActionInfoOutline from 'material-ui/lib/svg-icons/action/info-outline';
import ActionSettings from 'material-ui/lib/svg-icons/action/settings';
import ActionCopyright from 'material-ui/lib/svg-icons/action/copyright';
import CommunicationVpnKey from 'material-ui/lib/svg-icons/communication/vpn-key';
import IconButton from 'material-ui/lib/icon-button';

import NodeInfo from './node_info.jsx';
import Accounts from './accounts.jsx';
import Confirmations from './confirmations.jsx';
import About from './about.jsx';
import Settings from './settings.jsx';

injectTapEventPlugin();


const EPApp = React.createClass({    
    getInitialState() {
        var props = {
            left_nav_open: false,
            active_pane: "info",
            title: "Node Info"
        };
        
        return props
    },    

    handleToggle() {  
        this.setState( { left_nav_open: !this.state.left_nav_open } ) 
    },    
    
    closeWindow() { 
        window.close()
    },
    
    openPaneInfo() {  this.setState( { left_nav_open: false, active_pane: "info", title: "Node Info" } ) },    
    openPaneAccounts() {  this.setState( { left_nav_open: false, active_pane: "accounts", title: "Accounts" } ) },    
    openPaneConfirmations() {  this.setState( { left_nav_open: false, active_pane: "confirmations", title: "Confirmations" } ) },    
    openPaneSettings() {  this.setState( { left_nav_open: false, active_pane: "settings", title: "Settings" } ) },    
    openPaneAbout() {  this.setState( { left_nav_open: false, active_pane: "about", title: "About" } ) },    

    render() {
        return (
            <div>
                <AppBar
                    title= { this.state.title }
                    iconElementRight={
                          <IconButton onClick={ this.closeWindow }><NavigationClose /></IconButton>
                        }
                    onLeftIconButtonTouchTap={ this.handleToggle }
                    onRightIconButtonTouchTap={ this.closeWindow }
                />

            <LeftNav 
                docked={false}
                open={ this.state.left_nav_open }
                onRequestChange={ left_nav_open => this.setState({left_nav_open})}
            >
    
                <AppBar
                    title="Ethereum Plugin"
                    iconElementLeft={<div/>}
                    style={ { textAlign: 'center' } }
               />
                                
              <MenuItem primaryText="Node Info" leftIcon={<ActionInfoOutline />} onTouchTap={ this.openPaneInfo } />    
              <MenuItem primaryText="Accounts" leftIcon={<ActionAccountBalance />} onTouchTap={ this.openPaneAccounts } />  
              <MenuItem primaryText="Confirmations" leftIcon={<CommunicationVpnKey />} onTouchTap={ this.openPaneConfirmations } />  
              <MenuItem primaryText="Settings" leftIcon={<ActionSettings />} onTouchTap={ this.openPaneSettings } />  
              <MenuItem primaryText="About" leftIcon={<ActionCopyright />}  onTouchTap={ this.openPaneAbout } /> 
            </LeftNav>    

                
                <div style={ {display: ( this.state.active_pane == "info" ? "block" : "none" ) } } > 
                    <NodeInfo/>
                </div>
                <div style={ {display: ( this.state.active_pane == "accounts" ? "block" : "none" ) } } > 
                    <Accounts/>
                </div>
                <div style={ {display: ( this.state.active_pane == "confirmations" ? "block" : "none" ) } } > 
                    <Confirmations/>
                </div>
                <div style={ {display: ( this.state.active_pane == "settings" ? "block" : "none" ) } } > 
                    <Settings/>
                </div>
                <div style={ {display: ( this.state.active_pane == "about" ? "block" : "none" ) } } > 
                    <About/>
                </div>
                
        </div>
    )}
});
    

var app = new EPApp()

chrome.tabs.getSelected( null, function( tab ) {
    var tab_id = tab.id
    
//    console.log( "Tab:" + tab.id )
//    console.log( "App:" + app )
//    
//    
//    console.log( "chrome:" + JSON.stringify( chrome, 3 , 3 ) )

    chrome.runtime.getBackgroundPage( function( bg ) {
//        console.log( "tabs:" + JSON.stringify( bg.tabs, 3 , 3 ) )
//
//        console.log( "tab_id:" + tab_id )
//        console.log( "bg.tabs.getTab( tab_id ):" + bg.tabs.getTab( tab_id ) )
//        console.log( "bg.tabs.getTab( tab_id ).queue.getN():" + bg.tabs.getTab( tab_id ).queue.getN() )
        
        console.log( "app:" + JSON.stringify( app, 3 , 3 ) )
        
        if( bg.tabs.getTab( tab_id ).queue.getN() > 0 ) {
            app.state.active_pane = "confirmations"
        }
        
        ReactDOM.render( app, document.getElementById('app'));
        
    })
    //t = bg.tabs.getTab( tab.id )
//    if( t.queue.getN() > 0 ) {
////         props.active_pane = "confirmations";
////         props.title = "Confirmations";
//    }
} )
                        
//ReactDOM.render(<EPApp/>, document.getElementById('app'));
