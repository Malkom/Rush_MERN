import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";



import blogLogin from "./components/blog-login.component";
import blogRegister from "./components/blog-register.component";
import blog from "./components/blog.component";
import blogUser from "./components/blog-user.component";
import blogArticle from "./components/blog-article.component";
import blogAdd_Article from "./components/blog-add_article.component";
import blogEdit_Article from "./components/blog-edit_article.component";
import blogShow_Article from "./components/blog-show_article.component";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import MemberList from './components/MemberList';
import MyArticle from './components/my_articles.component';




function App() {
  return (
    <Router>
      <Navbar/>
        <Route exact path="/" component={blog}/>
        <Route path="/login" component={blogLogin}/>
        <Route path="/register" component={blogRegister}/>
        <Route path="/:user" component={blogUser}/>
        <Route path="/:user/memberList" component={MemberList}/>
        <Route path="/:user/profile" component={Profile}/>
        <Route path="/:user/edit_profile" component={EditProfile}/>
        <Route path='/:user/articles' component={blogArticle} />
        <Route path='/:user/myarticles' component={MyArticle} />
        <Route path="/:user/add_article" component={blogAdd_Article}/>
        <Route path="/:user/edit_article/:id" component={blogEdit_Article}/>
        <Route path="/:user/show_article/:id" component={blogShow_Article}/>
      <Footer/>  
    </Router>
  )
}

export default App;
