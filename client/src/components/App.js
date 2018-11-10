import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import InterviewerLogin from './interviewer-login';
import InterviewerSignup from './interviewer-signup';
import InterviewerInfo from './interviewer-info';
import InterviewerLandingHeader from './interviewer-landing-header';
import InterviewerHomeNavbar from './interviewer-home-navbar';
import InterviewerHomePage from './interviewer-home-page';
import AddCandidate from './add-candidate';
import 'materialize-css/dist/css/materialize.min.css';
import '../stylesheets/App.css';
import DropdownNavList from './dropdown-navlist';
import Schedule from './schedule'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      switchNav: false,
      showNavDropDown: false
    }
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleDropDownNav = this.toggleDropDownNav.bind(this);
    this.hideDropDown = this.hideDropDown.bind(this);
  }
  componentDidMount(){
    document.body.addEventListener("click", ()=>{
      this.hideDropDown();
    })
  }
  // componentWillMount(){
  //   var container = document.getElementsByClassName("container");
  //   for(var i =0 ; i < container.length; i++){
  //     container[i].addEventListener('click', function(){
  //       this.toggleDropDownNav();
  //     })
  //   }
  // }
  // componentWillMount(){
  //   document.getElementsByClassName("app")[0].addEventListener("click", function(){
  //     this.hideDropDown();
  //   });
  // }
  toggleDropDownNav(){
    const {showNavDropDown} = this.state;
    if(showNavDropDown){
      this.setState({
        showNavDropDown: false
      });
      return;
    }
    this.setState({
      showNavDropDown: true
    });
  }
  hideDropDown(){
    this.setState({
      showNavDropDown: false
    });
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
        <DropdownNavList showNavDropDown={this.state.showNavDropDown}/>
        {/* <Route exact path="/" component={InterviewerLandingPage} /> */}
        <Route exact path="/" render={(props)=> <InterviewerLogin {...props} switchNav={this.toggleNavbar}/>} />
        <Route path="/interviewer-signup" render={(props)=><InterviewerSignup switchNav={this.toggleNavbar} hideDropDown={this.hideDropDown}/>}/>
        <Route path="/add-candidate" render={(props)=><AddCandidate switchNav={this.toggleNavbar} hideDropDown={this.hideDropDown}/>}/>
        <Route path="/interviewer-info" component={InterviewerInfo} />
        <Route path="/interviewer-homepage" render={(props)=><InterviewerHomePage switchNav={this.toggleNavbar} hideDropDown={this.hideDropDown}/>}/>
        <Route path="/schedule" component={Schedule}/>
      </div>
    );

  }

}

export default App;
