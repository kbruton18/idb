import React from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, Container, Input, Form } from 'reactstrap';

class Search extends React.Component {
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
    var contents;
    if (!this.state.isOpen) {
      return (
      <Container onClick={this.toggle}>
        🔍 Search
      </Container>
      );
    }

    return (
      <Form>
        <Input name="query"/>
      </Form>
    );
  }
}

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
              <Nav className="mx-auto" style={{"text-align":"right"}} navbar>
                <NavItem className="px-lg-2">
                  <NavLink className="text-uppercase text-expanded" href="/">Home</NavLink>
                </NavItem>
                <NavItem className="px-lg-2">
                  <NavLink className="text-uppercase text-expanded" href="/about">About</NavLink>
                </NavItem>
                <NavItem className="px-lg-2">
                  <NavLink className="text-uppercase text-expanded" href="/parks">Parks</NavLink>
                </NavItem>
                <NavItem className="px-lg-2">
                  <NavLink className="text-uppercase text-expanded" href="/campgrounds">Campgrounds</NavLink>
                </NavItem>
                <NavItem className="px-lg-2">
                  <NavLink className="text-uppercase text-expanded" href="/visitorcenters">Visitor Centers</NavLink>
                </NavItem>
                <NavItem className="px-lg-2">
                  <NavLink className="text-uppercase text-expanded" href="/states">States</NavLink>
                </NavItem>
                <NavItem className="px-lg-2">
                  <NavLink className="text-uppercase text-expanded"><Search/></NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}
