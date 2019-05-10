import  React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import imgHead from '../img/native-american-skull.png';
import anonyme from '../img/anonyme.jpeg';
import TableFollower from './TableFollower';
import TableLeader from './TableLeader';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.UpdateList = this.UpdateList.bind(this);

        this.state = {
            login : '',
            email:'', 
            wrong: '',
            user_id: '',
            result: [],
            leader: []
        }
    }
    
    componentDidMount(){
        const token = localStorage.usertoken;
        if(!token){
            this.props.history.push('/login')
        }
        else {
            let decoded = jwt_decode(token);
            this.setState({
                login : decoded.login,
                email: decoded.email,
                user_id: decoded._id
            });

            // REQUETE POUR RECUPERER LES FOLLOWERS //
            axios.get('http://localhost:4242/follow', {params: {id: decoded._id}})
                  .then(response => {
                      // console.log('Response.data de get follow : ', response.data);
                      this.setState({result: response.data});
                  })
                  .catch(function (error) {
                      console.log(error);
                  });

            // REQUETE POUR RECUPERER LES LEADERS //
            axios.get('http://localhost:4242/leader', {params: {id: decoded._id}})
                .then(response => {
                    // console.log('Response.data de get leader : ', response.data);
                    this.setState({leader: response.data});
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }

    tab(){
        let self = this;
        return this.state.result.map(function(object, i){
            return <TableFollower obj={object} key={i} var={i} update={self.UpdateList}/>;
        })
    }

    tabLeader(){
        // console.log(this.state.leader);
        return this.state.leader.map(function(object, key){
            return <TableLeader obj={object} key={key} />;
        })
    }

    UpdateList(key){
        var array = [...this.state.result]; // make a separate copy of the arra
        if (key !== -1) {
          array.splice(key, 1);
          this.setState({result: array});
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
                <div className="row">
                    <img id="profile" className="bg" src={imgHead} alt="Logo"></img>
                    <div className='col-lg-3'>
                    <div className="jumbotron ml-3 mt-5">
                            <div className="col-sm-8 mx-auto">
                            <img id="img_profile" src={anonyme} alt="Profile_image"></img>
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
                    <div className='col-lg-5'>
                        <table className="table table-striped mx-3">
                            <thead>
                                <tr className="row">
                                    <td className="col-lg-4"><strong>Follows</strong></td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.tab()}
                            </tbody>
                        </table>
                    </div>
                    <div className='col-lg-4'>
                        <table className="table table-striped mx-3">
                            <thead>
                            <tr className="row">
                                <td className="col-lg-4"><strong>Followed by</strong></td>
                            </tr>
                            </thead>
                            <tbody>
                            {this.tabLeader()}
                            </tbody>
                        </table>
                    </div>
                </div>  
        )        

    }
}

export default Profile