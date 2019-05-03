import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

export default class ShowArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: []
        };
      }
      componentDidMount(){
        axios.get('http://localhost:4242/article/display', { params : { id: this.props.match.params.id }})
        .then(response => {
            console.log(response.data);
          this.setState({
              article: response.data
            });
        })
        .catch(function (error) {
          console.log(error);
        })

        this.setState({
            article: '',
        })
      }
      

      render() {
        const { article } = this.state
        return (
            <div className="container">
                <div className="card" style={{width: 800}}>
                    <img className="card-img-top" src={article.image}></img>
                    <div className="card-body">
                        <h5 className="card-title">{article.title}</h5>
                        <p className="card-text">{article.description}</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        )
    }
}