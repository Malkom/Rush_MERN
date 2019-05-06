import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
//import { Redirect } from 'react-router';
let dateFormat = require('dateformat');



class TableRow extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
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
        idArticle: this.props.obj._id
    });
  }

  onSubmit(e) {
    e.preventDefault();
    //console.log(typeof this.state.id);
    //let string_id = JSON.stringify(this.state.id);
    axios.delete('http://localhost:4242/article/delete', { params : { id: this.state.idArticle }})
    .then((response) => {
        if(response.data.message === "Successful")
        {
            this.props.alert(this.props.var);
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
    console.log('Render');
    let edit;
    let remove;
    if(this.props.obj.idCreator === this.state.id)
    {
      edit = (<form action={'/' + this.state.login + '/edit_article/' + this.props.obj._id}>
                <div className="form-group mr-1">
                  <input type="submit" value="Edit Article" className="btn btn-primary btn-sm"/>
                </div>
              </form>
              )
      remove = (<form onSubmit={this.onSubmit}>
              <div className="form-group mr-1">
                <input type="submit" value="Delete Article" className="btn btn-primary btn-sm"/>
              </div>
            </form>
            )
    }
    return (
        <div className="container">
            <div className="row">
                <div className= "col-lg-3"></div>
                <div className = "col-lg-6 mt-4" >
                    <div className = "card card-inverse card-info" >
                        <div className="card-header">

                                <img className="avatar" src="https://picsum.photos/30/30/" alt="avatar"></img>

                            <div className="float-right d-inline-flex">
                                {edit}
                                {remove}
                                <form action={'/' + this.state.login + '/show_article/' + this.props.obj._id}>
                                    <div className="form-group">
                                        <input type="submit" value="Show Article" className="btn btn-primary btn-sm"/>
                                    </div>
                                </form>
                            </div>

                        </div>
                        <div className = "card-block" >
                            <figure className = "profile profile-inline" >

                            </figure>
                            <div className = "card-text m-3" >
                                {this.props.obj.description}
                            </div>
                        </div>
                        <div className="card-text m-3">
                            <small>
                                Last updated { dateFormat(new Date() - new Date(this.props.obj.updated_at), "H") } hour(s) ago
                            </small>
                            <button className="btn btn-primary float-right btn-sm">Follow</button>
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