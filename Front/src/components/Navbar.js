import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../img/indian-headdress.png";
import jwt_decode from 'jwt-decode'


class Navbar extends Component {
      constructor() {
        super()
        this.state = {
            login : '', 
            email : ''
        }
      }

      logOut(e){
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push('/')
      }

      componentDidMount(){
        const token = localStorage.usertoken
        if(typeof token === 'string' || token instanceof String){
          const decoded = jwt_decode(token)
          this.setState({
            login : decoded.login,
            email : decoded.email
        })
        }
      }


  render() {
      const loginRegLink = (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
            <Link to="/register" className="nav-link">Register</Link>
            </li>
        </ul>
        </div>
      )

      const userLink = (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link to={"/" + this.state.login + "/articles"} className='navbar-brand'>Articles</Link>
            </li>
            <li className="nav-item">
              <Link to={"/"+ this.state.login + "/profile"} className="nav-link">Profile</Link>
            </li>
            <li className="nav-item">
              <Link to={"/"+ this.state.login + "/memberList"} className="nav-link">Member List</Link>
            </li>
            <li className="nav-item">
              <a href="/" onClick={this.logOut.bind(this)} className="nav-link">Logout</a>
            </li>
        </ul>
    </div>
      )

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <a className= "navbar-brand" href="/" target="_blank">
            <img src={logo} width='60' height='60' alt="Logo"></img>
            </a>
            <Link to="/" className='navbar-brand'><strong>Geronimo</strong></Link>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form> */}
            </div>
            {localStorage.usertoken ? userLink : loginRegLink}
        </nav>
      )
    }
}

export default withRouter(Navbar);
