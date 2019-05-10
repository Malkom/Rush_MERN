import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import ReactHashtag from "react-hashtag";
//import { Redirect } from 'react-router';
let dateFormat = require('dateformat');



class TableRow extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        //this.Search = this.Search.bind(this);
        this.state = {
            login : '',
            email : '',
            date : '',
            idCreator: '',
            idArticle: '',
            fireRedirect: false,
            hashsearch: this.props.hashvalue
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
                      //console.log(response.data.login);
                      this.setState({
                        result: response.data.login,
                      })
                  })
                  .catch(function (error) {
                      console.log(error);
                  })


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

    Search(value) {
        alert("searching the Hashtag : " + value)
    }

  render() {
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
                                {this.state.result}
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
                            <div className = "card-text m-3" >
                            <ReactHashtag renderHashtag={(hashtagValue) => (
                                <button className="hashtag" value = {hashtagValue} onClick={this.Search.bind(this, hashtagValue)}>
                                    <ReactHashtag >{hashtagValue}</ReactHashtag>
                                </button>)}>
                                {this.props.obj.description}
                            </ReactHashtag>
                            </div>
                        </div>
                        <div className="card-text mx-3">
                            <small>
                                Last updated { dateFormat(new Date() - new Date(this.props.obj.updated_at), "H") } hour(s) ago
                            </small>
                            <div className="float-right">
                                {this.props.tooglefollow(this.props.obj.idCreator)}
                            </div>
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