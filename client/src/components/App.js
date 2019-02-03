import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import InterviewerLogin from './interviewer-login';
import InterviewerSignup from './interviewer-signup';
import InterviewerInfo from './interviewer-info';
import InterviewerLandingHeader from './interviewer-landing-header';
import InterviewerHomeNavbar from './interviewer-home-navbar';
import InterviewerHomePage from './interviewer-home-page';
import AddCandidate from './add-candidate';
import CandidateProgress from './candidates-progress';
import MessageBoard from './message-board';
import 'materialize-css/dist/css/materialize.min.css';
import '../stylesheets/App.css';
import Loader from './loader';
import DropdownNavList from './dropdown-navlist';
import Schedule from './schedule'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      showLoader: false,
      switchNav: false,
      showNavDropDown: false
    }
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleDropDownNav = this.toggleDropDownNav.bind(this);
    this.hideDropDown = this.hideDropDown.bind(this);
    this.displayLoader = this.displayLoader.bind(this);
    this.hideLoader = this.hideLoader.bind(this);

  }
  componentDidMount(){
    document.body.addEventListener("click", ()=>{
      this.hideDropDown();
    })
  }
  displayLoader(){
    const {showLoader} = this.state;

    this.setState({
      showLoader: true
    });
  }
  hideLoader(){
    const {showLoader} = this.state;

    this.setState({
      showLoader: false
    });
  }

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

    const {switchNav, showLoader} = this.state;
    const displayLoader = showLoader ? <Loader/> : "";
    const header = switchNav ? <InterviewerHomeNavbar toggleDropDownNav={this.toggleDropDownNav}/>: <InterviewerLandingHeader/>;
    return (
      <div className="app">
        {displayLoader}
        {header}
        <MessageBoard/>
        <DropdownNavList showNavDropDown={this.state.showNavDropDown}/>
        {/* <Route exact path="/" component={InterviewerLandingPage} /> */}
        <Route exact path="/" render={(props)=> <InterviewerLogin {...props} switchNav={this.toggleNavbar}/>} />
        <Route path="/interviewer-signup" render={(props)=><InterviewerSignup switchNav={this.toggleNavbar} hideDropDown={this.hideDropDown}/>}/>
        <Route path="/add-candidate" render={(props)=><AddCandidate switchNav={this.toggleNavbar} hideDropDown={this.hideDropDown}/>}/>
        <Route path="/interviewer-info" component={InterviewerInfo} />
        <Route path="/candidate-progress" render={(props)=> <CandidateProgress showLoader={this.displayLoader} hideLoader={this.hideLoader} switchNav={this.toggleNavbar} hideDropDown={this.hideDropDown}/>}/> 
        {/* <Route path="/message-board" render={(props)=> <MessageBoard switchNav={this.toggleNavbar} hideDropDown={this.hideDropDown}/>}/>  */}
        <Route path="/interviewer-homepage" render={(props)=><InterviewerHomePage showLoader={this.displayLoader} hideLoader={this.hideLoader} switchNav={this.toggleNavbar} hideDropDown={this.hideDropDown}/>}/>
        <Route path="/schedule" component={Schedule}/>
      </div>
    );

  }

}

export default App;
