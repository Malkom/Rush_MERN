import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import SwitchButton from './SwitchButton';

class TableMember extends Component {
    constructor(props) {
        super(props);
        this.onFollow = this.onFollow.bind(this);
        this.UnFollow = this.UnFollow.bind(this);

        this.state = {
            user_id: '',
            login : '',
            email : '',
            followers: [] 
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
    axios.get('http://localhost:4242/users/findFollowers', {params: {id: decoded.login}})
                  .then(response => {
                      //console.log(response.data);
                      this.setState({followers: response.data[0].follows});
                  })
                  .catch(function (error) {
                      console.log(error);
                  })
  }

  onFollow(){
      /* console.log(this.state.login);
      console.log(this.props.obj._id); */
      const follow = {
          user_id: this.state.user_id,
          leader_id: this.props.obj._id
      };

      axios.post('http://localhost:4242/follow', follow)
          .then((response) => {
              if (response.data.message === 'Successful Follow :D') {
                  alert('Successful Follow :D')
              }
              else
              {
                  console.log(response.data);
              }
          })
          .catch((error) => {
              console.error(error);
          });
  }

  UnFollow(idMember){
    //console.log(idMember);
    axios.delete('http://localhost:4242/follow', idMember)
    .then((response) => {
        if (response.data.message === 'Successful') {
            alert('You are not following this user.')
        }
        else
        {
            console.log(response.data);
        }
    })
    .catch((error) => {
        console.error(error);
    });
  }

  render() {
    let self = this;
    return (
        <tr className="row">
            <td className="col-lg-8">
            {this.props.obj.login}
            </td>
            <SwitchButton array={this.state.followers} id={this.props.obj._id} follow={self.onFollow} unfollow={self.UnFollow}/>
        </tr>
    );
  }
}

export default TableMember;