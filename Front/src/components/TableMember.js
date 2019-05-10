import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import SwitchButton from './SwitchButton';

class TableMember extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: '',
            login : '',
            email : '',
            followers: [],
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
    axios.get('http://localhost:4242/follow', {params: {id: decoded._id}})
                  .then(response => {
                      //console.log(response.data);
                      this.setState({followers: response.data});
                  })
                  .catch(function (error) {
                      console.log(error);
                  })
  }

  tab(){
    let id_inList = this.props.obj._id;
    var newArray = [];
    //console.log(this.state.followers);
    this.state.followers.map(function(object){
        return newArray.push(object.id_leader._id); 
        //console.log(object.id_leader._id);
    });
    //console.log(newArray);
    return (newArray.indexOf(id_inList) === -1 ) ?
            <SwitchButton user_id = {this.state.user_id} id={id_inList} bool={false}/> :
            <SwitchButton user_id = {this.state.user_id} id={id_inList} bool={true}/>;  
    }

  render() {
    return (
        <tr className="row">
            <td className="col-lg-8">
            {this.props.obj.login}
            </td>
            {this.tab()}
        </tr>
    );
  }
}

export default TableMember;