import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import RouteNavItem from "./RouteNavItem";
import RouteNavItemLogout from "./RouteNavItemLogout";
import "./Navbar.css";


class Header extends Component {
    
    render() {
      return (
        <div className="App-container">
            <Navbar fluid collapseOnSelect >
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">TO DO</Link>
                    </Navbar.Brand>
                <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                <Nav pullRight>
                {window.localStorage.getItem("jwt")
                    ? <RouteNavItemLogout href="/">Logout</RouteNavItemLogout>
                    : [
                        <RouteNavItem key={1} href="/signup">Signup</RouteNavItem>,
                        <RouteNavItem key={2} href="/">Login</RouteNavItem>
                        ]}
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
      );
    }
  }
  
  export default Header;