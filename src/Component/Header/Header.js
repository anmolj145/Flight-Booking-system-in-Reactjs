import React, { Component } from 'react';
import './Header.css'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class Header extends Component {

    deleteStorage = (e) => {
        e.preventDefault();
        localStorage.clear();
        this.props.history.push("/");
    }

    render() {
        let navigation;
        if (localStorage.getItem("token") !== null) {
            navigation = (<div className="pg">
                <Link className="lnk" to="/booking">Book</Link>
                <Link className="lnk" to="/showbooking">My Booking</Link>
                <Link className="lnk" to="/showbooking" onClick={this.deleteStorage} >Logout</Link>
            </div>);
        }
        else {
            navigation = (<div className="pg">
                <Link className="lnk" to="/booking">Book</Link>
                <Link className="lnk" to="/login">Login</Link>
                <Link className="lnk" to="/registration">Register</Link>
            </div>);
        }

        return (
            <div className="header" >
                <div>
                    <p className="logo">Flight Booking</p>
                    {navigation}
                </div>
            </div>
        );
    }
}
export default withRouter(Header);