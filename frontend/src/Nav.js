import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar className="navbar navbar-expand-lg navbar-light bg-faded py-lg-4">
          <div class="container">
          <a className="navbar-brand text-uppercase text-expanded font-weight-bold d-lg-none" href="#">Menu</a>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="navbar-nav mx-auto" navbar>
              <NavItem className="nav-item px-lg-4">
                <NavLink className="nav-link text-uppercase text-expanded" href="/">Home</NavLink>
              </NavItem>
              <NavItem className="nav-item px-lg-4">
                <NavLink className="nav-link text-uppercase text-expanded" href="/about">About</NavLink>
              </NavItem>
              <NavItem className="nav-item px-lg-4">
                <NavLink className="nav-link text-uppercase text-expanded" href="/parks">Parks</NavLink>
              </NavItem>
              <NavItem className="nav-item px-lg-4">
                <NavLink className="nav-link text-uppercase text-expanded" href="/campgrounds">Campgrounds</NavLink>
              </NavItem>
              <NavItem className="nav-item px-lg-4">
                <NavLink className="nav-link text-uppercase text-expanded" href="/visitorcenters">Visitor Centers</NavLink>
              </NavItem>
              <NavItem className="nav-item px-lg-4">
                <NavLink className="nav-link text-uppercase text-expanded" href="/states">States</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}
