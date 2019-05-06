import back_logo from "../img/Back_Arrow.svg";
import React from 'react';
import axios from 'axios';
import logo from "../indian-headdress.png";
let dateFormat = require('dateformat');


/*import { Redirect } from 'react-router';*/

export default class ShowArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: []
        };
      }

      componentDidMount(){
          const token = localStorage.usertoken;
          if(!token){
              this.props.history.push('/login')
          }
          else {
              axios.get('http://localhost:4242/article/display', {params: {id: this.props.match.params.id}})
                  .then(response => {
                      console.log(response.data);
                      this.setState({
                          article: response.data
                      });
                  })
                  .catch(function (error) {
                      console.log(error);
                  });

              this.setState({
                  article: '',
              })
          }
      }
      

      render() {
        const { article } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className= "col-lg-3"></div>
                    <div className = "col-lg-6 mt-4" >
                        <div className = "card card-inverse card-info" >
                            <div className="card-header">
                                <button  onClick={this.props.history.goBack}
                                         className="btn btn-primary float-left btn-sm backButton">
                                    <img src={back_logo} width='20' height='20' alt="Back"></img>
                                </button>
                            </div>
                            <div className = "card-block" >
                                <figure className = "profile profile-inline" >

                                </figure>
                                <div className = "card-text m-3" >
                                    {article.description}
                                </div>
                            </div>
                            <div className="card-text m-3">
                                <small>
                                    Last updated { dateFormat(new Date() - new Date(article.updated_at), "H") } hour(s) ago
                                </small>
                                <button className="btn btn-primary float-right btn-sm">Follow</button>
                            </div>
                        </div>
                    </div>
                    <div className= "col-lg-3"></div>
                </div>
            </div>
        )
    }
}