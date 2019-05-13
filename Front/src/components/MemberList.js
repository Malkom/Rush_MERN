import React from 'react';
import axios from 'axios';
/*import { Redirect } from 'react-router';*/
import jwt_decode from 'jwt-decode';
import TableMember from './TableMember';

export default class MemberList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            login : '',
            id:'',
            email: ''
        };
    }
    componentDidMount(){
        const token = localStorage.usertoken;
        if(!token){
            this.props.history.push('/login')
        }
        else {
            const decoded = jwt_decode(token);
            this.setState({
                id: decoded._id,
                login: decoded.login,
                email: decoded.email
            });

            axios.get('http://localhost:4242/users/findUsers', {params: {email: decoded.email}})
                .then(response => {
                    //console.log(response.data);
                    this.setState({users: response.data});
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }
      
      tab(){
        return this.state.users.map(function(object, i){
            return <TableMember obj={object} key={i} />;
        });
    }
      
      render() {
        return (
            <div className="container">
              <table className="table table-striped">
                <thead>
                  <tr className="row">
                    <td className="col-lg-6"><strong>Geronimo's member</strong></td>
                    <td className="col-lg-3"><strong>Follows</strong></td>
                    <td className="col-lg-3"><strong>Leaders</strong></td>
                  </tr>
                </thead>
                <tbody>
                {this.tab()}
                </tbody>
              </table>
          </div>
          );
    }
}
