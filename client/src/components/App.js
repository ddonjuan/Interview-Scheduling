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
        <header className="card-panel blue lighten-1 header">
          <h1 className='left'>Allergan Rx</h1>
        </header>
        <Route exact path="/" component={InterviewerLandingPage} />
        <Route path="/interviewer-login" component={InterviewerLogin} />
        <Route path="/interviewer-signup" component={InterviewerSignup} />
        <Route path="/interviewer-info" component={InterviewerInfo} />
      </div>
    );

  }

}

export default App;
