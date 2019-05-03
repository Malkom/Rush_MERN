import React from 'react';
/*import { Redirect } from 'react-router';*/



export default class User extends React.Component {
    
    render(){
        let userName = this.props.match.params.user;
        
            return (
                <div style={{ marginLeft: 100}}>
                    <p> Welcome {userName}</p>
                    {this.props.children}
                </div>
            )
        
    }
}