import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { dropdown } from 'materialize-css';

class InterviewHomeNavbar extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <nav className="blue header">
                <div className="nav-wrapper">
                    <Link to="/interviewer-homepage" className="home-nav-logo">Allergan USC</Link>
    
                    <ul className="right nav-items">
                        <li>
                            <Link to="interviewer-homepage">Candidates</Link>
                        </li>
                        <li>
                            <Link to="candidate-progress">Potential Employees</Link>
                        </li>
                        <li>
                            <div onClick={()=>{this.props.toggleDropDownNav()}} className="dropdown-trigger" data-target="dropdown1"><i className="material-icons icon">person</i></div>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }


}

export default InterviewHomeNavbar;