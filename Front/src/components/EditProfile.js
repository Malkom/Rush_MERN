import React from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function validate(user) {
    // we are going to store errors for all fields
    // in a signle array
    const errors = [];
  
    if (user.name.length < 2 || user.name.length > 20) {
      errors.push("Name must be between 2 and 20 characters");
    }
  
    if (user.password !== user.confPass) {
      errors.push("Password did not match confirmation");
    }
  
    return errors;
  }


export default class EditUser extends React.Component {

    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfPass = this.onChangeConfPass.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            confPass: '',
            errors: [], 
            wrong: '',
            newName: "",
            login:''
        }
    }

    componentDidMount(){
        const token = localStorage.usertoken;
        if(!token){
            this.props.history.push('/login')
        }
        else {
            const decoded = jwt_decode(token);
            this.setState({
                id: decoded._id,
                login: decoded.login,
                token_email: decoded.email
            })
        }
    }

    onChangeName(e) {
        this.setState({
            login: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            token_email: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onChangeConfPass(e) {
        this.setState({
            confPass: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        console.log(`name is ${this.state.name} , email is ${this.state.email}, password is ${this.state.password}, confpass is ${this.state.confPass}`);
        
        const user = {
            id: this.state.id,
            name: this.state.login,
            email: this.state.token_email,
            password: this.state.password,
            confPass: this.state.confPass,
        }
        const errors = validate(user);
        if (errors.length > 0) {
            this.setState({ errors });
            return;
        }
        else
        {
            axios.post('http://localhost:4242/users/edit', user)
            .then((response) => {
            if(response.data.message === "Successful")
            {
                localStorage.setItem('usertoken', response.data.token)
                this.setState({
                    newName: response.data.editName,
                    wrong: '',
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
            name: '',
            email: '',
            password: '',
            confPass: ''
            })
        } 
    }


    render(){
        const { errors } = this.state;
        return (
            <div className="container">
                <h3 style={{marginTop: 30, marginLeft: 50}} >Edit your Profile information :</h3>
                <p>{this.state.wrong}</p>
                <div style={{marginTop: 50, marginLeft: 300, marginRight:300}}>
                    <form onSubmit={this.onSubmit}>
                        {errors.map(error => (
                        <p key={error}>Error: {error}</p>
                            ))}  
                        <div className="form-group">
                            <label>Name:  </label>
                            <input type="text" className="form-control" value={this.state.login} onChange={this.onChangeName}/>
                        </div>
                        <div className="form-group">
                            <label>Email: </label>
                            <input type="email" required className="form-control" value={this.state.token_email} placeholder={this.state.token_email} onChange={this.onChangeEmail}/>
                        </div>
                        <div className="form-group">
                            <label>Password: </label>
                            <input type="password" className="form-control" value={this.state.password} onChange={this.onChangePassword}/>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password: </label>
                            <input type="password" className="form-control" value={this.state.confPass} onChange={this.onChangeConfPass}/>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Edit" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
                {this.state.fireRedirect && <Redirect to={'/' + this.state.newName + '/profile'} push={true} />}
            </div>
        )
    }
}