import React from 'react';
import axios from 'axios';
/*import { Redirect } from 'react-router';*/
import TableRow from './TableRow';
import SwitchButton from './SwitchButton';
import jwt_decode from 'jwt-decode';
import imgBack from '../img/indian-village.png';
import back_logo from "../img/Back_Arrow.svg";


export default class Articles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            login : '',
            id:'',
            date: '',
            time: new Date().toLocaleTimeString(),
            followers: [],
            search: '' 
        };
        this.SwitchFollowButton = this.SwitchFollowButton.bind(this);
        this.getAlert = this.getAlert.bind(this);
        this.Search = this.Search.bind(this);
        this.reset = this.reset.bind(this);
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

                    axios.get('http://localhost:4242/articles')
                    .then(response => {
                        // console.log(response.data);
                        this.setState({articles: response.data});
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            
                    axios.get('http://localhost:4242/follow', {params: {id: decoded._id}})
                    .then(response => {
                        //console.log(response.data);
                        this.setState({followers: response.data});
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                }
    }

    SwitchFollowButton(idCreator){
        let id_inList = idCreator;
        var newArray = [];
        this.state.followers.map(function(object){
            return newArray.push(object.id_leader._id); 
            //console.log(object.id_leader._id);
        });
        //console.log(newArray);
        return (newArray.indexOf(id_inList) === -1 ) ?
                <SwitchButton user_id = {this.state.id} id={id_inList} bool={false}/> :
                <SwitchButton user_id = {this.state.id} id={id_inList} bool={true}/>;  
    }

    Search(value) {
            this.setState({
                search: value
            });
        }

    tab(){
        let self = this;
        //console.log(this.state.search);
        const res = this.state.articles.filter(function(article){
            if(self.state.search !== '')
            {
                return article.description.includes(self.state.search)
            }
            else
            {
                return true;
            }
        });
        //console.log(res);
        return res.map(function(object, i){
            return <TableRow obj={object} key={i} var={i} alert={self.getAlert} tooglefollow={self.SwitchFollowButton} search={self.Search}/>;
        });
      }

    getAlert(key){
        var array = [...this.state.articles]; // make a separate copy of the arra
        if (key !== -1) {
          array.splice(key, 1);
          this.setState({articles: array});
        }
    }

    reset()
    {
        this.setState({
            search: ""
        });
    }


      render() {
          let back;
          if(this.state.search !== "")
          {
            back = (<button  /* onClick={this.reset()} */ className="btn btn-primary float-left btn-sm backButton">
                        <img src={back_logo} width='20' height='20' alt="Back"></img>
                    </button>)
          }
        return (
        <div className="container">
            <img className="bg" src={imgBack} alt="Logo"></img>
            <form action={'/'+ this.state.login + '/add_article'}>
                <div className="form-group">
                    <input type="submit" value="Add Message" className="btn btn-primary"/>
                </div>
            </form>
            {back}
            {this.tab()}
        </div>
          );
    }
}
