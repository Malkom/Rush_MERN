import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';

class TableMember extends Component {
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
            {this.props.obj.login}
          </td>
          <td className="mr-auto">
            <form>
                  <div className="form-group">
                      <input type="submit" value="Follow" className="btn btn-primary"/>
                  </div>
            </form>
            {/* <form action={'/' + this.state.login + '/show_article/' + this.props.obj._id}>
                  <div className="form-group">
                      <input type="submit" value="Show Article" className="btn btn-primary"/>
                  </div>
            </form> */}
          </td>
        </tr>
    );
  }
}

export default TableMember;