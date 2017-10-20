import React from 'react';
import { Link } from 'react-router-dom'
export default class Nav extends React.Component {
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
      <nav className="navbar navbar-expand-lg navbar-light bg-faded py-lg-4">
        <div className="container">
          <a className="navbar-brand text-uppercase text-expanded font-weight-bold d-lg-none" href="#">Menu</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item active px-lg-4">
                <Link className="nav-link text-uppercase text-expanded" to="/">Home</Link>
              </li>
              <li className="nav-item px-lg-4">
                <Link className="nav-link text-uppercase text-expanded" to="/about">About</Link>
              </li>
              <li className="nav-item px-lg-4">
                <Link className="nav-link text-uppercase text-expanded" to="/parks">Parks</Link>
              </li>
              <li className="nav-item px-lg-4">
                <Link className="nav-link text-uppercase text-expanded" to="/campgrounds">Campgrounds</Link>
              </li>
              <li className="nav-item px-lg-4">
                <Link className="nav-link text-uppercase text-expanded" to="/visitorcenters">Visitor Centers</Link>
              </li>
              <li className="nav-item px-lg-4">
                <Link className="nav-link text-uppercase text-expanded" to="/states">States</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
