import React from 'react';
import axios from 'axios';
let dateFormat = require('dateformat');
/*import { Redirect } from 'react-router';*/

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
        const { article } = this.state;
        return (
            <div className="container">
                <div className="card" style={{width: 800}}>
                    <img className="card-img-top" src={article.image} alt='Logo'></img>
                    <div className="card-body">
                        <p className="card-text">{article.description}</p>
                        <p className="card-text"><small className="text-muted">
                            Last updated { dateFormat(new Date() - new Date(article.updated_at), "H") }h ago</small></p>
                        <button  onClick={this.props.history.goBack} className="btn btn-primary">Back</button>
                    </div>
                </div>
            </div>
        )
    }
}