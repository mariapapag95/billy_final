import React from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';

export default class PostContainer extends React.Component {
    constructor(props) {
        super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
        collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
        collapsed: !this.state.collapsed
        });
    }
    render() {
        return (
        <div className="container">
            <Navbar color="faded" light>
            <div> posdfafasHOW ABOUT A MUCH LONGER THIING LIEKAFt here </div>
            <div>this is the second line</div>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
                <Nav navbar>
                <NavItem>
                    <NavLink href="/components/">Components</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                </NavItem>
                </Nav>
            </Collapse>
            </Navbar>
        </div>
        );
    }
    }