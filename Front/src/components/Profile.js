import  React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

class Profile extends Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            login : '',
            email:'', 
            wrong: '',
            id: '',
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
                login : decoded.login,
                email: decoded.email,
                id: decoded._id
            })
        }
    }

    onSubmit(e) {
        e.preventDefault();
        //console.log(typeof this.state.id);
        //let string_id = JSON.stringify(this.state.id);
        axios.delete('http://localhost:4242/users/delete', { params : { id: this.state.id }})
        .then((response) => {
            if(response.data.message === "Successful")
            {
                e.preventDefault()
                localStorage.removeItem('usertoken')
                this.props.history.push('/')
            }
            else
            {
                this.setState({
                    wrong: response.data.message
                });
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <div className="container">
                 <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center"> Your profile </h1>
                    </div>
                        <table className="table col-md-6 mx-auto">
                            <tbody>
                                <tr>
                                    <td>Login</td>
                                    <td>{this.state.login}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{this.state.email}</td>
                                </tr>
                            </tbody>
                        </table>
                        <form action={"/" + this.state.login + "/edit_profile"}>
                            <div className="form-group">
                                <input type="submit" value="Edit Profile" className="btn btn-primary"/>
                            </div>
                        </form>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="submit" value="Delete Profile" className="btn btn-primary"/>
                            </div>
                        </form>
                </div>
            </div>   
        )        

    }
}

export default Profile