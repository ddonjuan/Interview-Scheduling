import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { dropdown } from 'materialize-css';

class InterviewHomeNavbar extends Component {
    constructor(props) {
        super(props);
    }
    displayMessageBoard(){
        document.getElementsByClassName("message-board-container")[0].classList.remove("close-message-container");
        document.getElementsByClassName("message-board-container")[0].classList.remove("hide-message-container");
        document.getElementsByClassName("message-board-container")[0].classList.add("full-message-container");
    }
    toggleHighlightNavButton(e){
        var navButton = document.getElementsByClassName("nav-button");
        for(var i = 0; i < navButton.length; i++){
            navButton[i].classList.remove("nav-button-color");
        }
        e.target.classList.add("nav-button-color");
    }
    render() {
        return (
            <nav className="header">
                <div className="nav-wrapper">
                    <div class="nav-logo-container">
                        <Link to="/interviewer-homepage" className="home-nav-logo">INTRVWS</Link>
                    </div>
                    <div className="nav-items">
                        <div>
                            <Link to="interviewer-homepage" onClick={this.toggleHighlightNavButton} className="nav-button nav-button-color">Candidates</Link>
                            <Link to="candidate-progress" onClick={this.toggleHighlightNavButton} className="nav-button">Potential Employees</Link>
                            <div className="nav-button">
                                <div onClick={this.displayMessageBoard}>Message Board</div>
                            </div>
                            <div className="nav-icon">
                                <div onClick={() => { this.props.toggleDropDownNav() }} className="dropdown-trigger" data-target="dropdown1"><i className="material-icons icon">person</i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }


}

export default InterviewHomeNavbar;