import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login : '', 
      email : ''
    };
  }
  componentDidMount(){

    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
        login : decoded.login,
        email : decoded.email
    })
  }
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.title}
          </td>
          <td>
            {this.props.obj.description}
          </td>
          <td>
          <form action={'/' + this.state.login + '/edit_article/' + this.props.obj._id}>
                <div className="form-group">
                    <input type="submit" value="Edit Article" className="btn btn-primary"/>
                </div>
          </form>
          <form action={'/' + this.state.login + '/show_article/' + this.props.obj._id}>
                <div className="form-group">
                    <input type="submit" value="Show Article" className="btn btn-primary"/>
                </div>
          </form>
          </td>
        </tr>
    );
  }
}

export default TableRow;