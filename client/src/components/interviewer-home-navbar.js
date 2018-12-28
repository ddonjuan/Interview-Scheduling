import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { dropdown } from 'materialize-css';

class InterviewHomeNavbar extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <nav className="header">
                <div className="nav-wrapper">
                    <div class="nav-logo-container">
                        <Link to="/interviewer-homepage" className="home-nav-logo">INTRVWS</Link>
                    </div>
                    <div className="nav-items">
                        <div>
                            <div className="nav-button">
                                <Link to="interviewer-homepage">Candidates</Link>
                            </div>
                            <div className="nav-button">
                                <Link to="candidate-progress">Potential Employees</Link>
                            </div>
                            <div className="nav-icon">
                                <div onClick={()=>{this.props.toggleDropDownNav()}} className="dropdown-trigger" data-target="dropdown1"><i className="material-icons icon">person</i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }


}

export default InterviewHomeNavbar;