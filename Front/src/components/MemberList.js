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
          id:''
        };
    }
      componentDidMount(){

        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            login : decoded.login
        })

        axios.get('http://localhost:4242/users/findUsers')
        .then(response => {
            console.log(response.data);
          this.setState({users: response.data});
        })
        .catch(function (error) {
          console.log(error);
        })
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
                  <tr>
                    <td><strong>Geronimo's member</strong></td>
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
