import React from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

class Filter {
  /*
    data: The data we're filtering
    filters: {`term`: [{`term`: value, ...}, ...], ...}
    filters basically takes an object with pairs of a term and a list of objects
  */
  constructor (filters, update) {
    this.filters = filters.reduce((acc, cur) => {
      let key = Object.keys(cur)[0];
      acc[key] = cur[key];
      return acc;
    }, {});

    this.update = update;

    // The terms we can use to filter
    this.filterTerms = {};

    // The applied filters
    this.appliedFilters = {};

    for (const key in this.filters) {
      this.filterTerms[key] = createFilterTerms(this.filters[key], key).sort();
      this.appliedFilters[key] = [];
    }

    console.log(this.filterTerms);
  }

  resetFilter () {
    Object.keys(this.appliedFilters).forEach((key) => { this.appliedFilters[key] = []; });
    this.update();
  }

  setFilter (term, filterArr) {
    this.appliedFilters[term] = filterArr;
    this.update();
  }

  applyFilter (term, filter) {
    this.appliedFilters[term].push(filter);
    this.update();
  }

  removeFilter (term, filter) {
    this.appliedFilters = this.appliedFilters[term].reduce((acc, cur) => {
      if (cur !== filter) {
        acc.push(term);
      }
      return acc;
    });
    this.update();
  }

  filterDataArr (data) {
    return data.filter(this.filterElem.bind(this));
  }

  filterElem (elem) {
    if (Object.values(this.appliedFilters).reduce((acc, cur) => acc && cur.length === 0, true)) {
      return true;
    }
    for (const key in elem) {
      if (this.filterVal(elem[key])) {
        return true;
      }
    }
    return false;
  }

  filterVal (elem) {
    if (typeof elem !== 'string') {
      return false;
    }
    for (const key in this.appliedFilters) {
      if (this.appliedFilters[key].some((term) => term === elem)) {
        return true;
      }
    }
    return false;
  }

  createFilterElem () {
    let ret = [];
    for (const key in this.filterTerms) {
      ret.push(this.createFilterElemForTerm(key));
    }
    return ret;
  }

  createFilterElemForTerm (term) {
    return (
      <UncontrolledDropdown>
        <DropdownToggle caret>
          Filter by
        </DropdownToggle>
        <DropdownMenu>
          {this.filterTerms[term].map(this.createFilterElemForFilter.bind(this, term))}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  createFilterElemForFilter (type, term) {
    console.log(term);
    return (
      <DropdownItem onClick={this.setFilter.bind(this, type, [term])}>{term}</DropdownItem>
    );
  }
}

function createFilterTerms (data, term) {
  return data.map((elem) => elem[term]);
}

function processFetch (url, term) {
  return fetch(url).then((response) => response.json())
    .then((json) => { let obj = {}; obj[term] = json; return obj; });
}

function processPromises (promiseArr) {
  return Promise.all(promiseArr).then((value) => {
    this.setState({filter: new Filter(value, this.forceUpdate.bind(this))});
  });
}

// function createFilterElem (fun, term) {
//   return (
//     <DropdownItem onClick={fun.bind(this)}>{term}</DropdownItem>
//   );
// }
//
// // action for filtering, saves what is pressed
// function filterBy (event) {
//   this.setState({
//     filter: event.currentTarget.textContent,
//     filterBy: true
//   });
// }
export {Filter, processFetch, processPromises};
