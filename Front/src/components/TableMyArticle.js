import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
//import { Redirect } from 'react-router';
let dateFormat = require('dateformat');



class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login : '',
            email : '',
            date : '',
            idCreator: '',
            idArticle: '',
            fireRedirect: false
        };
  }

  componentDidMount(){
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
        login : decoded.login,
        email : decoded.email,
        id: decoded._id,
        idArticle: this.props.obj._id,
        idCreator: this.props.obj.idCreator
    });

    axios.get('http://localhost:4242/users/findOneByIdCreator', { params : { id: this.props.obj.idCreator }})
                  .then(response => {
                      console.log(response.data.login);
                      this.setState({
                        result: response.data.login,
                      })
                  })
                  .catch(function (error) {
                      console.log(error);
                  })
  }

  render() {
    return (
        <div className="container">
            <div className="row">
                <div className= "col-lg-3"></div>
                <div className = "col-lg-6 mt-4" >
                    <div className = "card card-inverse card-info" >
                        <div className="card-header">
                                <img className="avatar" src="https://picsum.photos/30/30/" alt="avatar"></img>
                                {this.state.result}
                            <div className="float-right d-inline-flex">
                                <form action={'/' + this.state.login + '/show_article/' + this.props.obj._id}>
                                    <div className="form-group">
                                        <input type="submit" value="Show Article" className="btn btn-primary btn-sm"/>
                                    </div>
                                </form>
                            </div>

                        </div>
                        <div className = "card-block" >
                            <div className = "card-text m-3" >
                                {this.props.obj.description}
                            </div>
                        </div>
                        <div className="card-text mx-3">
                            <small>
                                Last updated { dateFormat(new Date() - new Date(this.props.obj.updated_at), "H") } hour(s) ago
                            </small>
                        </div>
                    </div>
                </div>
                <div className= "col-lg-3"></div>
            </div>
        </div>
    );
  }
}

export default TableRow;