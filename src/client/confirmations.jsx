import React from 'react'
import ReactDOM from 'react-dom'
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

(function(React, module, undefined) {
  module.exports = React.createClass({
    
    getInitialState: function() {
        return {
            message_to_confirm: null
        }
    },
      
    onReject: function() {
        window.tab.rejectTransaction( this.props.message_to_confirm, function() { 
            console.log( "Closing window")
            window.close() 
        })
    },  
      
    onConfirm: function( event ) {
        window.tab.confirmTransaction( this.props.message_to_confirm, this.state.password,  function( erro, data ) { 
        })        
    },  
      
    render: function() {
//        console.log( JSON.stringify( this.props.message_to_confirm, 3, 3 ))
        var tr_exists = !!this.props.message_to_confirm
//        console.log( "tr_exists=" + tr_exists )
        var block
        
        if( tr_exists ) {
            
            var tr = this.props.message_to_confirm
            
            console.log( JSON.stringify( tr, 3, 3 ))
//            
//            console.log( "tr=" + tr )
//            console.log( "tr.data.params.to=" +  tr.data.params.to )
            
            block = 
                <div style={{ textAlign: 'center' }} > 
                    
                    <h1>Execute Transaction</h1>
                    
                    <p style={{ textAlign: 'left', paddingLeft: '12em' }} >
                    Address From: { tr.data.params[0].to } <br/>                    
                    Address To: { tr.data.params[0].from } <br/>                    
                    Value: { tr.data.params[0].value } <br/>                    
                    </p>
                    
                    <TextField
                        hintText="Password"
                        type="password"
                        onChange = { e => this.setState( {password: e.target.value} ) }
                    /><br/>
                    
                    <RaisedButton 
                        label="Reject"  
                        secondary={true} 
                        style={{ margin: '1em' }} 
                        onMouseDown = { this.onReject }
                    />
                    <RaisedButton 
                        label="Confirm" 
                        primary={true} 
                        style={{ margin: '1em' }} 
                        onMouseDown = { this.onConfirm }
                    />
                    
                </div>;
            
        }
        else {
            block = 
                <div style={{ textAlign: 'center' }} > 
                    <h1>No transactions to confirm</h1>
                </div>;
            
        }
        
        
        
        
        
        return ( <div>{block}</div> );
    }
                                     
  });
}(React, module));

