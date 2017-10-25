import React, {Component} from 'react';
import CustomCard from './CustomCard.js';

class VisitorCenterDetail extends Component {

  constructor({match}) {
    super(match);
    this.state = {
      id: match.params.id, 
      data: []
    }
  }

  componentDidMount() {
    fetch(this.state.id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson
        })
      })
  }

  render() {
    return (
      <div>
        <CustomCard title={this.state.id}/>
      </div>
    );
  }
}

export default VisitorCenterDetail