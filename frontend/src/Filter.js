import Select from 'react-select';
import React from 'react';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

export default class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      options: []
    }

    this.processData(props.data, props.term);
  }

  processData(data, term) {
    this.setState({
      options: data.map((elem) => {
      return {
        value: elem[term],
        label: elem[term]
      };}
    )
    });
  }

  render() {
    return (
      <Select name={this.state.name} options={this.state.options}/>
    );
  }
}
