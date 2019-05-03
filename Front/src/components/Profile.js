import  React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            login : '', 
            email : ''
        }
    }
    
    componentDidMount(){
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            login : decoded.login,
            email : decoded.email
        })
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
                </div>
            </div>   
        )        

    }
}

export default Profile