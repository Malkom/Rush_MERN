import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import jwt_decode from 'jwt-decode';
import Textarea from './Textarea';
import Counter from './Counter';

export default class AddArticle extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            description: '',
        }
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
                idCreator: decoded._id
            })
        }

        axios.get('http://localhost:4242/article/display', {params: {id: this.props.match.params.id}})
            .then(response => {
                console.log(response.data.description);
                this.setState({
                    description: response.data.description
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleKeyPress(e) {
        //var value = e.currentTarget.value.split(' ');
        console.log(this.state.length);
        if (this.state.length > 140) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            //console.log(value);
        }
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
            length: e.target.value.length
        });
    }
    
    onSubmit(e) {
        e.preventDefault();
        
        const putArticle = {
            description: this.state.description,
            id: this.props.match.params.id
        }
        axios.post('http://localhost:4242/article/edit', putArticle)
        .then((response) => {
            console.log(response.data);
            if(response.data.message === "Successful")
            {
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
            description: '',
        })
    }

      render() {
        return (
            <div className="container">
                <h3 style={{marginTop: 30, marginLeft: 50}} >Edit Article :</h3>
                <div style={{marginTop: 50, marginLeft: 200, marginRight:350}}>
                <p>{this.state.wrong}</p>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Edit your message: </label>
                            <Textarea value={this.state.description} onChangeDescription={this.onChangeDescription} onKeyPress={ this.handleKeyPress }/>
                            <Counter length={this.state.length} /> 
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Edit" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
                {this.state.fireRedirect && <Redirect to={'/'+ this.state.login + '/articles'} push={true} />}
            </div>
        )
    }
}