import React from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, Container,
         Input, Form, FormGroup, Button } from 'reactstrap';

// Class for the search bar that is located within the Navigation Bar.
class Search extends React.Component {

  constructor (props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  // Toggle for the search bar to change into a textbox where data
  // can be entered.
  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render () {
    if (!this.state.isOpen) {
      // Returns this search bar version when the textbox is not clicked yet.
      return (
        <Container onClick={this.toggle}>
          <span role='img' aria-label='magnifier'>🔍 Search</span>
        </Container>
      );
    }
    // Otherwise returns the search bar version with the textbox the user
    // can enter data into.
    return (
      <Form >
        <FormGroup>
          <Input name='query' />
          <Button>Submit</Button>
        </FormGroup>
      </Form>
    );
  }
}

// The Navigation Bar
export default class NavBar extends React.Component {

  constructor (props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  // Toggle for the nav bar open button that exists when the display is
  // too small for our entire bar to appear (ex: mobile).
  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render () {
    // Returns the information for our nav bar
    return (
      <div>
        <Navbar className='navbar navbar-expand-lg navbar-light bg-faded py-lg-4'>
          <div class='container'>
            <a className='navbar-brand text-uppercase text-expanded font-weight-bold d-lg-none' href='#'>Menu</a>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='mx-auto' style={{'text-align': 'right'}} navbar>
                <NavItem className='px-lg-2'>
                  <NavLink className='text-uppercase text-expanded' href='/'>Home</NavLink>
                </NavItem>
                <NavItem className='px-lg-2'>
                  <NavLink className='text-uppercase text-expanded' href='/about'>About</NavLink>
                </NavItem>
                <NavItem className='px-lg-2'>
                  <NavLink className='text-uppercase text-expanded' href='/parks'>Parks</NavLink>
                </NavItem>
                <NavItem className='px-lg-2'>
                  <NavLink className='text-uppercase text-expanded' href='/campgrounds'>Campgrounds</NavLink>
                </NavItem>
                <NavItem className='px-lg-2'>
                  <NavLink className='text-uppercase text-expanded' href='/visitorcenters'>Visitor Centers</NavLink>
                </NavItem>
                <NavItem className='px-lg-2'>
                  <NavLink className='text-uppercase text-expanded' href='/states'>States</NavLink>
                </NavItem>
                <NavItem className='px-lg-2'>
                  <NavLink className='text-uppercase text-expanded'><Search /></NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}
