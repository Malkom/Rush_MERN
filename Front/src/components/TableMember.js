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
            baned: [],
        };
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

        axios.get('http://localhost:4242/ban', {params: {id: decoded._id}})
            .then(response => {
                // console.log(response.data[0].baned);

                response.data[0].baned.map( (object) => {
                    return this.state.baned.push(object._id)
                });
                // console.log(this.state.baned);
            })
            .catch( (error) => {
                console.log(error);
            });
        this.forceUpdate();
    }



    tabBan(){
        // console.log(this.state.baned);
        // console.log(this.props.obj._id);

        return (this.state.baned.length > 0) ? (this.state.baned.indexOf(this.props.obj._id) !== -1) ?
            console.log('BAN') :
            console.log('UNBAN') : null;
    }

    tab(){
        let id_inList = this.props.obj._id;
        let newArray = [];
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

    onBan(e){
        e.preventDefault();

        let user_id = jwt_decode(localStorage.usertoken)._id;
        // console.log(user_id);
        // console.log(this.props.obj.id_follower._id);

        const ban = {
            user_id: user_id,
            ban_id: this.props.obj.id_follower._id
        };

        axios.post('http://localhost:4242/ban', ban)
            .then((response) => {
                if (response.data.message === 'Successful Ban :(') {
                    //alert('Successful Ban :(')
                    this.setState({ban : true});
                    this.props.update(this.props.var)
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

    onUnban(e){
        e.preventDefault();

        let user_id = jwt_decode(localStorage.usertoken)._id;
        console.log(user_id);
        console.log(this.props.obj.id_follower._id);

        const unban = {
            user_id: user_id,
            ban_id: this.props.obj.id_follower._id
        };

        axios.put('http://localhost:4242/ban', { data : unban })
            .then((response) => {
                if (response.data.message === 'Successful UnBan :D') {
                    //alert('Successful Ban :(')
                    this.setState({
                        ban : false
                    })
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
      let value = '';
      let className = '';
      let onSubmit = null;
      // console.log(this.state.baned);
      // console.log(this.props.obj._id);
      if (this.state.baned.indexOf(this.props.obj._id) !== -1) {
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
                {this.tabBan()}
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