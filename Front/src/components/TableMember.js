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
        console.log('Props de MemberList : ', this.props.obj);
    }
    componentDidMount(){

        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        this.setState({
            user_id : decoded._id,
            login : decoded.login,
            email : decoded.email
        });
        axios.get('http://localhost:4242/follow', {params: {id: decoded._id}})
            .then(response => {
                //console.log(response.data);
                this.setState({followers: response.data});
            })
            .catch(function (error) {
                console.log(error);
            });


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
        return (newArray.length > 0) ? (newArray.indexOf(id_inList) === -1 ) ?
            <SwitchButton user_id = {this.state.user_id} id={id_inList} bool={false}/> :
            <SwitchButton user_id = {this.state.user_id} id={id_inList} bool={true}/> : null;
    }




  render() {
      let value = '';
      let className = '';
      let onSubmit = null;
      // console.log(this.props.obj.id_follower.login);
      if (this.state.ban) {
          value = 'Unban';
          className = 'btn btn-primary';
          onSubmit = this.onUnban;

      } else {
          value = 'Ban';
          className = 'btn btn-danger';
          onSubmit = this.onBan;
      }

      return (
        <tr className="row">
            <td className="col-lg-6">
            {this.props.obj.login}
            </td>
            <td className="col-lg-3">
                {this.tab()}
            </td>
            <td className="col-lg-3">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="submit" value={value} className={className}/>
                    </div>
                </form>
            </td>
        </tr>
    );
  }
}

export default TableMember;