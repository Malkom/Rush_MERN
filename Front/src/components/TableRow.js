import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
let dateFormat = require('dateformat');

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login : '', 
      email : '',
        date : '', 
        idCreator: ""
    };

  }
  componentDidMount(){

    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
        login : decoded.login,
        email : decoded.email,
        id: decoded._id
    });
  }
  render() {
    let edit;
    if(this.props.obj.idCreator === this.state.id)
    {
      edit = (<form action={'/' + this.state.login + '/edit_article/' + this.props.obj._id}>
                <div className="form-group">
                  <input type="submit" value="Edit Article" className="btn btn-primary"/>
                </div>
              </form>
              )
    }
    return (
        <tr>
          <td>
            {this.props.obj.description}
          </td>
            <td>
                { dateFormat(new Date() - new Date(this.props.obj.updated_at), "H") } hour(s) ago
            </td>
          <td className="">
                {edit}
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