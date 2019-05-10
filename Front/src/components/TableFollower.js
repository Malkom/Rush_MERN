import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import SwitchButton from './SwitchButton';

class TableFollower extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: '',
            login : '',
            email : ''
    };
  }
  componentDidMount(){

    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
        user_id : decoded._id,
        login : decoded.login,
        email : decoded.email
    })
  }

  render() {
    return (
        <tr className="row">
            <td>{this.props.obj.id_leader.login}</td>
                <SwitchButton update={this.props.update} index={this.props.var} user_id={this.state.user_id} id={this.props.obj.id_leader._id} bool={true}/>
        </tr>
    );
  }
}

export default TableFollower;