import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export default class Equipment extends React.Component {
  constructor(props) {
	super(props)
	this.state = {
	  numRegistro: null,
	  descrBem: null,
	  isValid: false,
	  validate_class_name: null
	};

	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleSearch = this.handleSearch.bind(this);
  }
  
  handleChange(event) {
	this.setState({
	  numRegistro: event.target.value,
	  descrBem: null
	});
  }
  
  handleSubmit(event) {
	event.preventDefault();

	let patr = `/api/sim/show_sim_assets/${this.state.numRegistro}.json`

	fetch(patr)
	  .then(response => response.json())
	  .then(data => {
		if (data["numRegistro"] === "NÃO ENCONTRADO!") {
		  this.setState({
			validate_class_name: "is-invalid",
			descrBem: "Patrimônio não encontrado!"
		  });
		} else {
		  this.setState({
			numRegistro: data["numRegistro"],
			descrBem: data["descrBem"],
			isValid: true,
			validate_class_name: "is-valid"
		  })	
		}
	  });
  }

  handleSearch(event) {
	event.preventDefault();
	this.setState({
	  isValid: false,
	  descrBem: null,
	  validate_class_name: null
	});

	console.log("TODO implement validation by descrBem!!");
  }

  render() {
	return (
	  <div>
		<Form.Group className="mb-3" controlId="formEquipment">
		  <Form.Label>Equipamento</Form.Label>
		  <InputGroup className="mb-3" hasValidation>
			<InputGroup.Text id="basic-addon1" onClick={this.handleSearch}>pms-</InputGroup.Text>
			<FormControl
			  placeholder="Patrimônio"
			  aria-label="Patrimônio"
			  onChange={this.handleChange}
			  disabled={this.state.isValid}
			  className={this.state.validate_class_name}
			  required
			/>
			<Button disabled={this.state.isValid} variant="info" onClick={this.handleSubmit}>
			  <span className="bi bi-search"></span>
			</Button>
		  </InputGroup>
		  {this.state.descrBem}
		  <br />
		  <Form.Text className="text-muted">
			Somente equipamentos da Prefeitura ou serviço relacionados as atividades da Prefeitura serão atendidos.
		  </Form.Text>
		</Form.Group>
	  </div>
	);
  }
}
