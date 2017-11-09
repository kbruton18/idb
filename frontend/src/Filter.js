import React from 'react';
import { DropdownItem } from 'reactstrap';

function createFilterTerms (data, term) {
  return data.map((elem) => elem[term]);
}

function filterElemsByTerms (data, field, term) {
  if (term.length === 0) {
    return data;
  }
  return data.filter((elem) => elem[field].toLowerCase().includes(term.toLowerCase()));
}

function createFilterElem (fun, term) {
  return (
    <DropdownItem onClick={fun.bind(this)}>{term}</DropdownItem>
  );
}

export {createFilterTerms, filterElemsByTerms, createFilterElem};
