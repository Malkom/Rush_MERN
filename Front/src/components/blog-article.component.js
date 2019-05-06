import React from 'react';
import axios from 'axios';
/*import { Redirect } from 'react-router';*/
import TableRow from './TableRow';
import jwt_decode from 'jwt-decode'

export default class Articles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            login : '',
            id:'',
            date: ''
        };
    }
      componentDidMount(){
          const token = localStorage.usertoken;
          if(!token){
              this.props.history.push('/login')
          }
          else {
              const decoded = jwt_decode(token);
              this.setState({
                  login: decoded.login
              });

              axios.get('http://localhost:4242/articles')
                  .then(response => {
                      console.log(response.data);
                      this.setState({articles: response.data});
                  })
                  .catch(function (error) {
                      console.log(error);
                  })
          }
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
                    <input type="submit" value="Add Message" className="btn btn-primary"/>
                </div>
            </form>
                    {this.tab()}
          </div>
          );
    }
}
