import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export default class Person extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	  usename: 'jecampos',
	  name: 'Jefferson Campos',
	  workplace: 'DGTI/Paço',
	  phone: '3238-2175',
	  whatsapp: '15-99723-3588',
	  isValid: false,
	  validate_class_name: null
	};

	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleSearch = this.handleSearch.bind(this);
	this.handleEdit = this.handleEdit.bind(this);
  }

  handleChange(event) {
	this.setState({
	  username: event.target.value
	  /* TODO update all other fields?! */
	});
  }

  handleSubmit(event) {
	event.preventDefault();

	let url = '/' + this.state.username;

	console.log("TODO implement get data with fetch: " + url);
	this.setState({
	  isValid: true,
	  validate_class_name: 'is-valid'
	});
  }

  handleSearch(event) {
	event.preventDefault();
	this.setState({
	  isValid: false,
	  validate_class_name: null,
	  username: null
	  /* TODO handle all other fields here?! */
	});
  }

  handleEdit(event) {
	/* TODO implement edit for all fields */
	event.preventDefault();
	this.setState({
	  isValid: false,
	  validate_class_name: null,
	  username: null
	  /* TODO handle all other fields here?! */
	});
  }

  render() {
	return (
	  <div>
		<Form.Group className="mb-3" controlId="formBasicEmail">
		  <Form.Label>E-mail</Form.Label>
		  <InputGroup className="mb-3">
			<FormControl
			  placeholder="Usuário da Rede"
			  aria-label="Usuário da Rede"
			  aria-describedby="basic-addon2"
			  onChange={this.handleChange}
			  disabled={this.state.isValid}
			  className={this.state.validate_class_name}
			  required
			/>
			<InputGroup.Text id="basic-addon2" onClick={this.handleSearch}>@sorocaba.sp.gov.br</InputGroup.Text>
			<Button variant="info" disabled={this.state.isValid} onClick={this.handleSubmit}>
			  <span className="bi bi-search"></span>
			</Button>
		  </InputGroup>
		  {this.state.username}
		  <br />
		  <Form.Text className="text-muted">
			Confirme os seus dados abaixo antes de enviar o chamado!
		  </Form.Text>
		</Form.Group>
		<Form.Group className="mb-3" controlId="formName">
		  <Form.Label>Nome</Form.Label>
		  <InputGroup className="mb-3">
			<Form.Control type="text" placeholder="Nome Completo" />
			<Button variant="warning" disabled={this.state.isValid} onClick={this.handleEdit}>
			  <span className="bi bi-pencil-square"></span>
			</Button>
		  </InputGroup>
		</Form.Group>
		<Form.Group className="mb-3" controlId="formBasicLocation">
		  <Form.Label>Unidade/Local de Trabalho</Form.Label>
		  <Form.Control type="text" placeholder="Local onde está o seu equipamento" />
		</Form.Group>
		<Form.Group className="mb-3" controlId="formPhone">
		  <Form.Label>Telefone/Ramal Corporativo</Form.Label>
		  <Form.Control type="text" placeholder="Telefone da Prefeitura" />
		</Form.Group>
		<Form.Group className="mb-3" controlId="formBasicWhatsapp">
		  <Form.Label>Whatsapp</Form.Label>
		  <Form.Control type="tel" placeholder="Para agilizar o contato" />
		</Form.Group>
	  </div>
	);
  }
}
