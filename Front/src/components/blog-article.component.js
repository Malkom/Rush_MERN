import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import TableRow from './TableRow';
import jwt_decode from 'jwt-decode'

export default class Articles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          articles: [],
          login : '', 
          id:''
        };
    }
      componentDidMount(){

        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            login : decoded.login
        })

        axios.get('http://localhost:4242/articles', { params : { id: decoded._id }})
        .then(response => {
            console.log(response.data);
          this.setState({articles: response.data});
        })
        .catch(function (error) {
          console.log(error);
        })
      }
      tab(){
        return this.state.articles.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        });

    }
      
  
      render() {
        return (
            <div className="container">
            <form action={'/'+ this.state.login + '/add_article'}>
                <div className="form-group">
                    <input type="submit" value="Add Article" className="btn btn-primary"/>
                </div>
            </form>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <td><strong>Title</strong></td>
                    <td><strong>Description</strong></td>
                  </tr>
                </thead>
                <tbody>
                    {this.tab()}
                </tbody>
              </table>
          </div>
          );
    }
}
