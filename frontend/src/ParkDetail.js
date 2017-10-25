import React, {Component} from 'react';

class ParkDetail extends Component {

	constructor(props) {
		super(props);
		this.state = {
			id: props.params.id, 
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
		return (<h1>{this.props.params.id}</h1>);
	}
}

export default ParkDetail