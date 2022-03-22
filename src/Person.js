import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export default class Person extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	  username: '',
	  name: '',
	  department: '',
	  workplace: '',
	  complementWorkplace: '',
	  localContact: '',
	  phone: '',
	  whatsapp: '',
	  isValid: false,
	  isValidComplement: true,
	  validate_class_name: null
	};

	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleSearch = this.handleSearch.bind(this);

	this.handleChange = this.handleChange.bind(this);
	this.handleEdit = this.handleEdit.bind(this);
	this.toggleEdit = this.toggleEdit.bind(this);
  }

  handleSubmit(event) {
	event.preventDefault();

	/* TODO handle errors here and in backend! */
	let url = `/rci/events/filter_by_login.json?login=${this.state.username}&limit=1`;

	/* TODO use state to show a spinner <Spinner animation="border" role="status" variant="info" size="sm"><span className="visually-hidden">Loading...</span></Spinner> */

	fetch(url)
	  .then(response => response.json())
	  .then(data => {
		/* console.log("showing data...");
		   console.log(data);
		   console.log(data[0]);
		   console.log(data[0] === undefined); */
		if (data[0] === undefined) {
		  this.setState({
			name: '',
			department: '',
			phone: '',
			whatsapp: '',
			isValid: false,
			validate_class_name: "is-invalid"
		  });
		} else {
		  /* TODO implement API to get phone and whatsapp data! */
		  this.setState({
			name: data[0]["NOME_USUARIO"],
			department: data[0]["LOTACAO_USUARIO"],
			phone: '',
			whatsapp: '',
			isValid: true,
			validate_class_name: "is-valid"
		  });
		}
	  });
  }

  handleSearch(event) {
	event.preventDefault();

	/* TODO implement set focus */
	/* document.getElementById('formBasicEmail').focus(); */
	
	this.setState({
	  isValid: false,
	  validate_class_name: null,
	  username: ''
	  /* TODO handle all other fields here?! */
	});
  }

  handleChange(event) {
	let state_update;

	switch(event.target.id) {
	  case 'formBasicEmail':
		state_update = {
		  username: event.target.value
		};
		break;
	  case 'formName':
		state_update = {
		  name: event.target.value
		};
		break;
	  case 'formDepartment':
		state_update = {
		  name: event.target.value
		};
		break;
	  case 'formPhone':
		state_update = {
		  phone: event.target.value
		};
		break;
	  case 'formWhatsapp':
		state_update = {
		  whatsapp: event.target.value
		};
		break;
	  default:
		console.error("Not found person field to handle change!!");
	}
	this.setState(state_update);
  }
  
  handleEdit(event) {
	let input_text;

	event.preventDefault();

	switch(event.target.id) {
	  case 'btnName':
		input_text = 'formName';
		break;
	  case 'btnDepartment':
		input_text = 'formDepartment';
		break;
	  case 'btnPhone':
		input_text = 'formPhone';
		break;
	  case 'btnWhatsapp':
		input_text = 'formWhatsapp';
		break;
	  default:
		console.error("Not found person field to handle edit!!");
	}
	this.toggleEdit(document.getElementById(input_text), event.target);
  }

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
		<Form.Group className="mb-3" controlId="formBasicEmail">
		  <Form.Label>E-mail</Form.Label>
		  <InputGroup className="mb-3">
			<FormControl placeholder="Usuário da Rede" aria-label="Usuário da Rede" aria-describedby="basic-addon2" onChange={this.handleChange} disabled={this.state.isValid} className={this.state.validate_class_name} value={this.state.username} required />
			<InputGroup.Text id="basic-addon2" onClick={this.handleSearch}>@sorocaba.sp.gov.br</InputGroup.Text>
			<Button variant="info" disabled={this.state.isValid} onClick={this.handleSubmit}><span className="bi bi-search"></span></Button>
			<Button id="btnEditSearch" variant="warning" onClick={this.handleSearch} className="bi bi-pencil-square"></Button>
		  </InputGroup>
		  {(this.state.validate_class_name == null) ? '' : (this.state.isValid ? 'Dados carregados com sucesso!!' : 'Usuário não encontrado!!')}<br />
	  <Form.Text className="text-muted">Confirme os seus dados abaixo antes de enviar o chamado!</Form.Text>
		</Form.Group>
		<Form.Group className="mb-3" controlId="formName">
		  <Form.Label>Nome</Form.Label>
		  <InputGroup className="mb-3">
			<Form.Control type="text" placeholder="Nome Completo" disabled className={this.state.validate_class_name} onChange={this.handleChange} value={this.state.name} />
			<Button id="btnName" variant="warning" onClick={this.handleEdit} className="bi bi-pencil-square"></Button>
		  </InputGroup>
		</Form.Group>
		<Form.Group className="mb-3" controlId="formDepartment">
		  <Form.Label>Secretaria</Form.Label>
		  <InputGroup className="mb-3">
			<Form.Control type="text" placeholder="Secretaria Vinculada" disabled className={this.state.validate_class_name} onChange={this.handleChange} value={this.state.department} />
			<Button id="btnDepartment" variant="warning" onClick={this.handleEdit} className="bi bi-pencil-square"></Button>
		  </InputGroup>
		</Form.Group>
		<Form.Group className="mb-3" controlId="formPhone">
		  <Form.Label>Telefone/Ramal Corporativo</Form.Label>
		  <InputGroup className="mb-3">
			<Form.Control type="text" placeholder="Telefone da Prefeitura" disabled className={this.state.validate_class_name} onChange={this.handleChange} value={this.state.phone} required />
			<Button id="btnPhone" variant="warning" onClick={this.handleEdit} className="bi bi-pencil-square"></Button>
		  </InputGroup>
		</Form.Group>
		<Form.Group className="mb-3" controlId="formWhatsapp">
		  <Form.Label>Whatsapp</Form.Label>
		  <InputGroup className="mb-3">
			<Form.Control type="tel" placeholder="Para agilizar o contato" disabled className={this.state.validate_class_name} onChange={this.handleChange} value={this.state.whatsapp} />
			<Button id="btnWhatsapp" variant="warning" onClick={this.handleEdit} className="bi bi-pencil-square"></Button>
		  </InputGroup>
		</Form.Group>
	  </div>
	);
  }
}
