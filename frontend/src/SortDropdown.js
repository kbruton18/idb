import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// Sort dropdown to display for all models.
export default class SortDropdown extends React.Component {
  constructor (props) {
    super(props);
    this.toggleSort = this.toggleSort.bind(this);
    this.sort = props.sortFunction;
    this.state = {
      sortDropdown: false,
      sortType: ''
    };
  }

  // Toggle to determine when the dropdown is open.
  toggleSort () {
    this.setState({
      sortDropdown: !this.state.sortDropdown
    });
  }

  // Returns the dropdown display.
  render () {
    return (
      <Dropdown isOpen={this.state.sortDropdown} toggle={this.toggleSort}>
        <DropdownToggle caret>
          Sort By
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.sort.bind(this, 'Ascending')}>Ascending</DropdownItem>
          <DropdownItem onClick={this.sort.bind(this, 'Descending')}>Descending</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
