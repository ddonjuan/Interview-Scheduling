import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import InterviewerLogin from './interviewer-login';
import InterviewerSignup from './interviewer-signup';
import InterviewerInfo from './interviewer-info';
import InterviewerLandingHeader from './interviewer-landing-header';
import InterviewerHomeNavbar from './interviewer-home-navbar';
import InterviewerHomePage from './interviewer-home-page';
import 'materialize-css/dist/css/materialize.min.css';
import '../stylesheets/App.css';
import InterviewerLandingPage from './interviewer-landing-page';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      switchNav: false
    }
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleDropDownNav = this.toggleDropDownNav.bind(this);
  }
  toggleDropDownNav(){
    console.log("toggle drop down nav fired")
    document.getElementsByClassName("dropdown-navlist")[0].classList.toggle("showNav");
  }
  toggleNavbar(){
    this.setState({
      switchNav: true
    });
  }
  render() { 
//     <Route
//   path='/dashboard'
//   render={(props) => <Dashboard {...props} isAuthed={true} />}
// />
    const {switchNav} = this.state;
    const header = switchNav ? <InterviewerHomeNavbar toggleDropDownNav={this.toggleDropDownNav}/>: <InterviewerLandingHeader/>;
    return (
      <div className="app">
        {header}
        <Route exact path="/" component={InterviewerLandingPage} />
        <Route path="/interviewer-login" render={(props)=> <InterviewerLogin {...props} switchNav={this.toggleNavbar}/>} />
        <Route path="/interviewer-signup" component={InterviewerSignup} />
        <Route path="/interviewer-info" component={InterviewerInfo} />
        <Route path="/interviewer-homepage" render={(props)=><InterviewerHomePage switchNav={this.toggleNavbar}/>}/>
      </div>
    );

  }

}

export default App;
