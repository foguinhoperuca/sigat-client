import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
/* import FormControl from 'react-bootstrap/FormControl'; */
import Button from 'react-bootstrap/Button';

export default class Location extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	  workplace: this.props.workplace,
	  complementWorkplace: this.props.complementWorkplace,
	  localContact: this.props.localContact
	};

	this.handleSearch = this.handleSearch.bind(this);
	this.handleChange = this.handleChange.bind(this);
	this.handleEdit = this.handleEdit.bind(this);
	this.toggleEdit = this.toggleEdit.bind(this);
  }

  /* TODO implement backend and frontend methods to handle data */
  
  handleSearch(event) {
	event.preventDefault();

	/* TODO implement set focus */
	/* document.getElementById('formBasicEmail').focus(); */
	
	this.setState({
	  isValid: false,
	  validate_class_name: null,
	  workplace: ''
	  /* TODO handle all other fields here?! */
	});
  }

  
  handleChange(event) {
	switch(event.target.id) {
	  case 'formLocation_Workplace':
		this.props.onWorkplaceChange(event.target.value);
		break;
	  case 'formLocation_ComplementWorkplace':
		this.props.onComplementWorkplaceChange(event.target.value);
		break;
	  case 'formLocation_LocalContact':
		this.props.onLocalContactChange(event.target.value);
		break;
	  default:
		console.error("Not found location field to handle change!!");
	}
  }

  handleEdit(event) {
	let input_text;

	event.preventDefault();

	switch(event.target.id) {
	  case 'btnLocation_Workplace':
		input_text = 'formLocation_Workplace';
		break;
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
	if (input_text.disabled) {
	  input_text.disabled = false;
	  input_text.classList.remove("is-valid");
	  input_text.classList.remove("is-invalid");

	  button.classList.remove("btn-warning");
	  button.classList.remove("bi-pencil-square");
	  button.classList.add("btn-success");
	  button.classList.add("bi-check2");
	} else {
	  input_text.disabled = true;
	  input_text.classList.remove("is-invalid");
	  input_text.classList.add("is-valid");

	  button.classList.remove("btn-success");
	  button.classList.remove("bi-check2");
	  button.classList.add("btn-warning");
	  button.classList.add("bi-pencil-square");
	}
  }

  render() {
	return (
	  <div>
		<Form.Group className="mb-3" controlId="formLocation_Workplace">
		  <Form.Label>Local da Solicitação</Form.Label>
		  <InputGroup className="mb-3">
			<Form.Control type="text" placeholder="Local onde está o seu equipamento" disabled className={this.state.validate_class_name} onChange={this.handleChange} value={this.props.workplace} required />
			<Button id="btnLocation_Workplace" variant="warning" onClick={this.handleEdit} className="bi bi-pencil-square"></Button>
		  </InputGroup>
		</Form.Group>
		<Form.Group className="mb-3" controlId="formLocation_ComplementWorkplace">
		  <Form.Label>Complemento do Local da Solicitação</Form.Label>
		  <InputGroup className="mb-3">
			<Form.Control type="text" placeholder="Local específico dentro da unidade" disabled className={this.state.validate_class_name} onChange={this.handleChange} value={this.props.complementWorkplace} />
			<Button id="btnLocation_ComplementWorkplace" variant="warning" onClick={this.handleEdit} className="bi bi-pencil-square"></Button>
		  </InputGroup>
		  <Form.Text className="text-muted">Caso a unidade seja grande o complemento nos ajuda a localizar o seu equipamento</Form.Text>
		</Form.Group>
		<Form.Group className="mb-3" controlId="formLocation_LocalContact">
		  <Form.Label>Contato no Local</Form.Label>
		  <InputGroup className="mb-3">
			<Form.Control type="tel" placeholder="Caso não seja você, indique a pessoa para nossa equipe manter o contato" disabled className={this.state.validate_class_name} onChange={this.handleChange} value={this.props.localContact} />
			<Button id="btnLocation_LocalContact" variant="warning" onClick={this.handleEdit} className="bi bi-pencil-square"></Button>
		  </InputGroup>
		</Form.Group>
	  </div>
	);
  }
}
