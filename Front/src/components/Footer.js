import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
//import logo from "../indian-headdress.png";
//import jwt_decode from 'jwt-decode'


class Footer extends Component {
    render(){
        return(
        <footer className="footer mt-auto py-3">
            <nav className="navbar fixed-bottom text-white bg-dark">
                <div className="navbar-collapse font-italic text-center" id="navbarText">
                © Copyright Geronimo 2019
                </div>
            </nav>
        </footer>
        )
    }

}
export default withRouter(Footer);