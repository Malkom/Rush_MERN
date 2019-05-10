import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";

class TableLeader extends Component {
    constructor(props) {
        super(props);
        this.onBan = this.onBan.bind(this);
        this.onUnban = this.onUnban.bind(this);

        this.state = {
            user_id: '',
            login : '',
            email : '',
            ban : false,
            value: 'Ban',
            class: 'btn btn-danger',
            onSubmit: this.onBan
        };
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


    render()
    {
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
                <td className="col-lg-8"> {this.props.obj.id_follower.login} </td>
                <td className="col-lg-4">
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


export default TableLeader;