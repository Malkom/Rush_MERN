import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import jwt_decode from 'jwt-decode'

export default class AddArticle extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id:'',
            title: '',
            description: '',
            login : '', 
        }
    }

    componentDidMount(){
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            login : decoded.login,
            idCreator: decoded._id
        })
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        console.log(`title is ${this.state.title}, description is ${this.state.description}`);
        
        const newArticle = {
            title: this.state.title,
            description: this.state.description,
            id: this.state.idCreator
        }
        axios.post('http://localhost:4242/article/add', newArticle)
        .then((response) => {
            console.log(response.data)
            if(response.data.message === "Successful")
            {
                /* this.props.authenticate({
                    name: this.state.name,
                    email: this.state.email,
                    isLoggedIn: true
                }); */
                this.setState({
                    wrong: '',
                    fireRedirect: true
                });
            }
            else
            {
                this.setState({
                    wrong: response.data.message
                });
                console.log(response.data);
            }
        })
        .catch((error) => {
            console.error(error);
        });


        this.setState({
            title: '',
            description: '',
        })
    }

      render() {
        return (
            <div className="container">
                <h3 style={{marginTop: 30, marginLeft: 50}} >Add Article :</h3>
                <div style={{marginTop: 50, marginLeft: 200, marginRight:350}}>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Title: </label>
                            <input type="text" className="form-control" value={this.state.title} onChange={this.onChangeTitle}/>
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <textarea style={{height: 200, width: 550}}
                            type="text" className="form-control" value={this.state.description} onChange={this.onChangeDescription}/>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Add" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
                {this.state.fireRedirect && <Redirect to={'/'+ this.state.login + '/articles'} push={true} />}
            </div>
        )
    }
}