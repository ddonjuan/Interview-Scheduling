import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import interviewerLandingPage from './interviewer-landing-page';
import InterviewerLogin from './interviewer-login';
import InterviewerSignup from './interviewer-signup';
import InterviewerInfo from './interviewer-info';
import 'materialize-css/dist/css/materialize.min.css';
import '../stylesheets/App.css';
import InterviewerLandingPage from './interviewer-landing-page';

class App extends Component {
  render() {

    return (
      <div className="app">
        <h1 className='center'>Allocate Rx</h1>
        {/* <InterviewerLandingPage/> */}
        {/* <InterviewerSignup/> */}
        <InterviewerInfo/>
      </div>
    );

  }

}

export default App;
