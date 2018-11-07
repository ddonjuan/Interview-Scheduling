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
import Schedule from './schedule'

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
  emailValidation(name, value){
    var emailFlag = false;

      if(name === 'email'){
        var emailCheck = /[@]/;
        var testEmail = emailCheck.test(value);
        emailFlag = false;
        if(testEmail){
            this.showValid(name);
            if(emailCheck){
                this.emailConfirmCheck(name);
            }
            return;
          }
          this.showInvalid(name);
          this.setState({
              cEmailCheck: false
          })
      }
      if(name === 'c_email'){
        const {email} = this.state;
        if(value === email){
            this.showValid(name);
            document.getElementsByClassName(name+"Right")[0].classList.add("showCEmail");
            emailCheck = true;
            this.setState({
                cEmailCheck: true
            });
            return
        }
        this.showInvalid(name);
        document.getElementsByClassName(name+"Right")[0].classList.remove("showCEmail");
        this.setState({
            cEmailCheck: false
        });
      }
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
        <Route path="/schedule" component={Schedule}/>
      </div>
    );

  }

}

export default App;
