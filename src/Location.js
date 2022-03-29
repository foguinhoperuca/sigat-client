import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';

export default class Location extends React.Component {
  constructor(props) {
	super(props);

	this.state = {
	  locations: [],
	  location: this.props.location
	};

	this.handleChange = this.handleChange.bind(this);
	this.handleEdit = this.handleEdit.bind(this);
	this.toggleEdit = this.toggleEdit.bind(this);
	this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  componentDidMount() {
	let url = `/sigat-api/otrs/locations/index`;
	fetch(url)
	  .then(response => response.json())
	  .then(data => {
		let locs = [{value: 0, label: '--- UNIDADE INFORMADA NA ÚLTIMA LINHA DA SOLICITAÇÃO ---'}];
		data.forEach(location => locs.push({value: location.id, label: `[${location.configitem_number}] ${location.name}`}));
		this.setState({locations: locs});
	  });
  }

  handleChange(event) {
	switch(event.target.id) {
	  case 'formLocation_ComplementWorkplace':
		this.props.onPropsChange('complementWorkplace', event.target.value);
		break;
	  case 'formLocation_LocalContact':
		this.props.onPropsChange('localContact', event.target.value);
		break;
	  default:
		console.error("Not found location field to handle change!!");
	}
  }

  handleEdit(event) {
	let input_text;
	switch(event.target.id) {
	  case 'btnLocation_ComplementWorkplace':
		input_text = 'formLocation_ComplementWorkplace';
		break;
	  case 'btnLocation_LocalContact':
		input_text = 'formLocation_LocalContact';
		break;
	  default:
		console.error("Not found person field to handle edit!!");
	}
	this.toggleEdit(document.getElementById(input_text), event.target);
  }

  /* TODO move it to a helper function */
  toggleEdit(input_text, button) {
	if (input_text.readOnly) {
	  input_text.readOnly = false;

	  button.classList.remove("btn-warning");
	  button.classList.remove("bi-pencil-square");
	  button.classList.add("btn-success");
	  button.classList.add("bi-check2");
	} else {
	  input_text.readOnly = true;

	  button.classList.remove("btn-success");
	  button.classList.remove("bi-check2");
	  button.classList.add("btn-warning");
	  button.classList.add("bi-pencil-square");
	}
  }

  handleLocationChange(selectedOption) {
	this.setState({location: selectedOption});
	this.props.onPropsChange('workplace', `(${selectedOption.value}) ${selectedOption.label}`);
  }

  render() {
	return (
	  <div>
		<Form.Group className="mb-3" controlId="formLocation_Workplace">
		  <Form.Label>Local da Solicitação</Form.Label>
		  <Select value={this.state.location} onChange={this.handleLocationChange} options={this.state.locations} />
		  <Form.Text className="text-muted">Caso não encontre a sua unidade aqui, mencione-a na última linha da sua solicitação abaixo.</Form.Text>
		</Form.Group>
		<Form.Group className="mb-3" controlId="formLocation_ComplementWorkplace">
		  <Form.Label>Complemento do Local da Solicitação</Form.Label>
		  <InputGroup className="mb-3">
			<Form.Control type="text" placeholder="Local específico dentro da unidade" className={this.state.validate_class_name} onChange={this.handleChange} value={this.props.complementWorkplace} readOnly />
			<Button id="btnLocation_ComplementWorkplace" variant="warning" onClick={this.handleEdit} className="bi bi-pencil-square"></Button>
		  </InputGroup>
		  <Form.Text className="text-muted">Caso a unidade seja grande o complemento nos ajuda a localizar o seu equipamento</Form.Text>
		</Form.Group>
		<Form.Group className="mb-3" controlId="formLocation_LocalContact">
		  <Form.Label>Contato no Local</Form.Label>
		  <InputGroup className="mb-3">
			<Form.Control type="tel" placeholder="Caso não seja você, indique a pessoa para nossa equipe manter o contato" className={this.state.validate_class_name} onChange={this.handleChange} value={this.props.localContact} readOnly />
			<Button id="btnLocation_LocalContact" variant="warning" onClick={this.handleEdit} className="bi bi-pencil-square"></Button>
		  </InputGroup>
		</Form.Group>
	  </div>
	);
  }
}
