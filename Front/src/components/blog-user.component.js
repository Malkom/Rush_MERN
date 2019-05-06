import React from 'react';
/*import { Redirect } from 'react-router';*/



export default class User extends React.Component {
    
    render(){
        let userName = this.props.match.params.user;
        
            return (
                <div className="user">
                    <h1> Welcome {userName}</h1>
                    {this.props.children}
                </div>
            )
        
    }
}