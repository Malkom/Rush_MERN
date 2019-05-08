import React from 'react';
import axios from 'axios';
/*import { Redirect } from 'react-router';*/
import TableRow from './TableRow';
import jwt_decode from 'jwt-decode';
import imgBack from '../img/indian-village.png';

export default class Articles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            login : '',
            id:'',
            date: '',
            time: new Date().toLocaleTimeString()
        };
        this.getAlert = this.getAlert.bind(this);
    }
    
    componentDidMount(){
          const token = localStorage.usertoken;
          if(!token){
              this.props.history.push('/login')
          }
          else {
              const decoded = jwt_decode(token);
              this.setState({
                  login: decoded.login,
                  id : decoded._id
              });

              axios.get('http://localhost:4242/articles', { params : { id: decoded._id }})
                  .then(response => {
                      // console.log(response.data);
                      this.setState({articles: response.data});
                  })
                  .catch(function (error) {
                      console.log(error);
                  })
          }
      }

      tab(){
        let self = this;
        return this.state.articles.map(function(object, i){
            return <TableRow obj={object} key={i} var={i} alert={self.getAlert} />;
        });
      }

      getAlert(key){
        var array = [...this.state.articles]; // make a separate copy of the arra
        if (key !== -1) {
          array.splice(key, 1);
          this.setState({articles: array});
        }
      }


      render() {
        return (
        <div className="container">
            <img className="bg" src={imgBack} alt="Logo"></img>
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
