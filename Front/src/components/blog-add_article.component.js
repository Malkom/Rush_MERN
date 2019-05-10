import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import jwt_decode from 'jwt-decode';
import Textarea from './Textarea';
import Counter from './Counter';
import Cactus from '../img/cactus.png';

export default class AddArticle extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id:'',
            description: '',
            login : '', 
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
                login : decoded.login,
                idCreator: decoded._id
            })
        }
    }

    handleKeyPress(e) {
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
        
        const newArticle = {
            description: this.state.description,
            id: this.state.idCreator
        }
        axios.post('http://localhost:4242/article/add', newArticle)
        .then((response) => {
            console.log(response.data)
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
                <img id='cactus' className="bg" src={Cactus} alt="Logo"></img>
                <div style={{marginTop: 50, marginLeft: 200, marginRight:350}}>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Your Message: </label>
                            <Textarea value={this.state.description} onChangeDescription={this.onChangeDescription} onKeyPress={ this.handleKeyPress }/>
                            <Counter length={this.state.length} /> 
                        </div>
                        <div id="textarea_feedback"></div>
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