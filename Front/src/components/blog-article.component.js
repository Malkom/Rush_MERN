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

      tab(){
        let self = this;
        return this.state.articles.map(function(object, i){
            return <TableRow obj={object} key={i} var={i} alert={self.getAlert} />;
        });
      }

      getAlert(key){
        ;
        var array = [...this.state.articles]; // make a separate copy of the array
        var index = array.indexOf(key)
        if (index !== -1) {
          array.splice(index, 1);
          this.setState({articles: array});
        }
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
