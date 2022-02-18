import React from 'react';


export default class Equipment extends React.Component {
  constructor(props) {
	super(props)
	this.state = {
	  numRegistro: '307005',
	  descrBem: 'MICRO NUCLEO QUADRUPLO 2.9 GHZ 500 GB 4 GB'
	};

	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
	this.setState({
	  numRegistro: event.target.value
	});
  }
  
  handleSubmit(event) {
	event.preventDefault();

	let patr = '/' + this.state.numRegistro;
	console.log(patr);

	/* TODO handle api's return null */
	/* TODO implement a sub-form to get data from server and make input readonly. */
	fetch(patr)
	  .then(response => response.json())
	  .then(data =>
		/* console.log(data["descrBem"]) */
		this.setState({
		  numRegistro: data["numRegistro"],
		  descrBem: data["descrBem"]
		})
	  );

  }

  render() {
	return (
	  <div>
		Patrimônio é: {this.state.numRegistro} -> {this.state.descrBem}
		<br />
		<form onSubmit={this.handleSubmit}>
          <label>
			Patrimônio:
			<br />
			<input type="text" onChange={this.handleChange} />
          </label>
		  <br />
          <input type="submit" value="Submit" />
		</form>
	  </div>
	);
  }
}
