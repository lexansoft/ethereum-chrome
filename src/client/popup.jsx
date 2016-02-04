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

injectTapEventPlugin();


const EPApp = React.createClass({    
    getInitialState() {
        return {
            left_nav_open: false,
            active_pane: "info"
        };
    },    
    
    handleToggle() {  
        this.setState( { left_nav_open: !this.state.left_nav_open } ) 
    },    
    
    closeWindow() { 
        window.close()
    },
    
    openPaneInfo() {  this.setState( { left_nav_open: false, active_pane: "info" } ) },    
    openPaneAccounts() {  this.setState( { left_nav_open: false, active_pane: "accounts" } ) },    
    openPaneConfirmations() {  this.setState( { left_nav_open: false, active_pane: "confirmations" } ) },    
    openPaneSettings() {  this.setState( { left_nav_open: false, active_pane: "settings" } ) },    
    openPaneAbout() {  this.setState( { left_nav_open: false, active_pane: "about" } ) },    

    render() {
        return (
            <div>
                <AppBar
                    title="Ethereum Plugin"
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
              <MenuItem primaryText="Node Info" leftIcon={<ActionInfoOutline />} onTouchTap={ this.openPaneInfo } />    
              <MenuItem primaryText="Accounts" leftIcon={<ActionAccountBalance />} onTouchTap={ this.openPaneAccounts } />  
              <MenuItem primaryText="Confirmations" leftIcon={<CommunicationVpnKey />} onTouchTap={ this.openPaneConfirmations } />  
              <MenuItem primaryText="Settings" leftIcon={<ActionSettings />} onTouchTap={ this.openPaneSettings } />  
              <MenuItem primaryText="About" leftIcon={<ActionCopyright />}  onTouchTap={ this.openPaneAbout } /> 
            </LeftNav>    

                
                <div style={ {display: ( this.state.active_pane == "info" ? "block" : "none" ) } } > 
                    <h1>Sorry, still under construction</h1>
                </div>
                <div style={ {display: ( this.state.active_pane == "accounts" ? "block" : "none" ) } } > 
                    <h1>Sorry, still under construction</h1>
                </div>
                <div style={ {display: ( this.state.active_pane == "confirmations" ? "block" : "none" ) } } > 
                    <h1>Sorry, still under construction</h1>
                </div>
                <div style={ {display: ( this.state.active_pane == "settings" ? "block" : "none" ) } } > 
                    <h1>Sorry, still under construction</h1>
                </div>
                <div style={ {display: ( this.state.active_pane == "about" ? "block" : "none" ) } } > 
                    <h1>Sorry, still under construction</h1>
                </div>
                
        </div>
    )}
});
    

ReactDOM.render(<EPApp/>, document.getElementById('app'));
