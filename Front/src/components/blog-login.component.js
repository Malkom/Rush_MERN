import React from 'react';
import { Redirect } from 'react-router';
import {login} from './UserFunctions';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            wrong: '',
            cred: ''
        }
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        console.log(`email is ${this.state.email}, password is ${this.state.password}`);
        
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        login(user)
        .then((response) => {
            console.log(response.data.name)
            if(response.data.message === "Successful")
            {
                localStorage.setItem('usertoken', response.data.token)
                console.log(response.data);
                this.setState({
                    wrong: '',
                    cred: response.data.name,
                    fireRedirect: true
                });
            }
            else
            {
                this.setState({
                    wrong: response.data.message
                });
                console.log(response.data);
            }
        })
        .catch((error) => {
            console.error(error);
        });


        this.setState({
            email: '',
            password: '',
        })
    }


    render(){
        return (
            <div className="container">
                <h3 style={{marginTop: 30, marginLeft: 50}} >Please Sign in :</h3>
                <p>{this.state.wrong}</p>
                <div style={{marginTop: 50, marginLeft: 300, marginRight:300}}>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Email: </label>
                            <input type="email" className="form-control"value={this.state.email} onChange={this.onChangeEmail}/>
                        </div>
                        <div className="form-group">
                            <label>Password: </label>
                            <input type="password" className="form-control"value={this.state.password} onChange={this.onChangePassword}/>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Register" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
                {this.state.fireRedirect && <Redirect to={'/' + this.state.cred + '/articles'} push={true} />}
            </div>
        )
    }
}