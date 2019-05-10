import React from 'react';
import axios from 'axios';
/*import { Redirect } from 'react-router';*/
import jwt_decode from 'jwt-decode';
import MyArticle from './TableMyArticle'
import Totem from '../img/native-american-totem.png';

export default class Articles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            login : '',
            id:'',
            date: '',
            time: new Date().toLocaleTimeString(),
            followers: []
        };
    }
    
    componentDidMount(){
        //console.log(this.state.followers);
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

                    axios.get('http://localhost:4242/articlesByFollow', {params: {id: decoded._id}})
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
            return <MyArticle obj={object} key={i}/>;
        });
      }


      render() {
        return (
        <div className="container">
            <img className="bg" src={Totem} alt="Logo"></img>
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
