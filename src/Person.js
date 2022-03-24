import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

export default class Person extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	  /* FIXME need it? */
	  username: '',
	  name: '',
	  department: '',
	  phone: '',
	  whatsapp: '',

	  isValid: false,
	  isValidComplement: true,
	  validate_class_name: null,
	  searchMessage: '',
	  isValid_phone: false,
	  isInvalid_phone: false
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
	let url = `/rci/events/filter_by_login.json?login=${this.props.username}&limit=1`;

	this.setState({searchMessage: <Spinner animation="border" role="status" variant="info" size="sm"><span className="visually-hidden">Loading...</span></Spinner>});
	fetch(url)
	  .then(response => response.json())
	  .then(data => {
		/* console.log("showing data PERSON...");
		   console.log(data);
		   console.log(data[0]);
		   console.log(data[0] === undefined); */
		if (data[0] === undefined) {
		  this.setState({
			isValid: false,
			validate_class_name: "is-invalid",
			searchMessage: 'Usuário não encontrado!!',
			isValid_phone: false,
			isInvalid_phone: true
		  });
		  this.props.onNameChange('name', '');
		  this.props.onDepartmentChange('department', '');
		  this.props.onPhoneChange('phone', '');
		  this.props.onWhatsappChange('whatsapp', '');
		} else {
		  console.log("TODO implement API to get phone and whatsapp data!");
		  const phone_valid = (data[0]["PHONE"] === undefined || data[0]["PHONE"] === "") ? false : true;
		  console.log("phone_validation: " + phone_valid);
		  this.setState({
			isValid: true,
			validate_class_name: "is-valid",
			searchMessage: 'Dados carregados com sucesso!!',
			isValid_phone: phone_valid,
			isInvalid_phone: !phone_valid
		  });
		  this.props.onNameChange('name', data[0]["NOME_USUARIO"]);
		  this.props.onDepartmentChange('department', data[0]["LOTACAO_USUARIO"]);
		  this.props.onPhoneChange('phone', '');
		  this.props.onWhatsappChange('whatsapp', '');
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
	  searchMessage: '',
	  isValid_phone: false,
	  isInvalid_phone: false
	});

	/* TODO handle all other fields here?! */
	this.props.onUsernameChange('');
  }

  handleChange(event) {
	switch(event.target.id) {
	  case 'formBasicEmail':
		this.props.onUsernameChange('username', event.target.value);
		break;
	  case 'formName':
		this.props.onNameChange('name', event.target.value);
		break;
	  case 'formDepartment':
		this.props.onDepartmentChange('department', event.target.value);
		break;
	  case 'formPhone':
		this.props.onPhoneChange('phone', event.target.value);
		break;
	  case 'formWhatsapp':
		this.props.onWhatsappChange('whatsapp', event.target.value);
		break;
	  default:
		console.error("Not found person field to handle change!!");
	}
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

	if (input_text.id === 'formPhone' && input_text.checkValidity() === false) {
	  console.log("can't continue. Validity: " + input_text.checkValidity());
	  this.setState({
		isValid_phone: false,
		isInvalid_phone: true
	  });
	} else {
	  console.log("GO GO GO!! Validity: " + input_text.checkValidity());
	  this.setState({
		isValid_phone: true,
		isInvalid_phone: false
	  });
	  
	  if (input_text.readOnly) {
		input_text.readOnly = false;
		input_text.classList.remove("is-valid");
		input_text.classList.remove("is-invalid");

		button.classList.remove("btn-warning");
		button.classList.remove("bi-pencil-square");
		button.classList.add("btn-success");
		button.classList.add("bi-check2");
	  } else {
		input_text.readOnly = true;
		input_text.classList.remove("is-invalid");
		input_text.classList.add("is-valid");

		button.classList.remove("btn-success");
		button.classList.remove("bi-check2");
		button.classList.add("btn-warning");
		button.classList.add("bi-pencil-square");
	  }
	}
  }

  render() {
	const btnEditPhone = (this.state.isValid_phone) ? <Button id="btnPhone" variant="warning" onClick={this.handleEdit} className="bi bi-pencil-square"></Button> : <Button id="btnPhone" variant="success" onClick={this.handleEdit} className="bi bi-check2"></Button>;
	return (
	  <div>
		<Form.Group className="mb-3" controlId="formBasicEmail">
		  <Form.Label>E-mail</Form.Label>
		  <InputGroup className="mb-3">
			<FormControl placeholder="Usuário da Rede" aria-label="Usuário da Rede" aria-describedby="basic-addon2" onChange={this.handleChange} readOnly={this.state.isValid} className={this.state.validate_class_name} value={this.props.username} required />
			<InputGroup.Text id="basic-addon2" onClick={this.handleSearch}>@sorocaba.sp.gov.br</InputGroup.Text>
			<Button variant="info" disabled={this.state.isValid} onClick={this.handleSubmit}><span className="bi bi-search"></span></Button>
			<Button id="btnEditSearch" variant="warning" onClick={this.handleSearch} className="bi bi-pencil-square"></Button>
		  </InputGroup>
		  {this.state.searchMessage}
		  <br />
		  <Form.Text className="text-muted">Confirme os seus dados abaixo antes de enviar o chamado!</Form.Text>
		</Form.Group>
		<Form.Group className="mb-3" controlId="formName">
		  <Form.Label>Nome</Form.Label>
		  <InputGroup className="mb-3">
			<Form.Control type="text" placeholder="Nome Completo" readOnly className={this.state.validate_class_name} onChange={this.handleChange} value={this.props.name} />
			<Button id="btnName" variant="warning" onClick={this.handleEdit} className="bi bi-pencil-square"></Button>
		  </InputGroup>
		</Form.Group>
		<Form.Group className="mb-3" controlId="formDepartment">
		  <Form.Label>Secretaria</Form.Label>
		  <InputGroup className="mb-3">
			<Form.Control type="text" placeholder="Secretaria Vinculada" readOnly className={this.state.validate_class_name} onChange={this.handleChange} value={this.props.department} />
			<Button id="btnDepartment" variant="warning" onClick={this.handleEdit} className="bi bi-pencil-square"></Button>
		  </InputGroup>
		</Form.Group>
		<Form.Group className="mb-3" controlId="formPhone">
		  <Form.Label>Telefone/Ramal Corporativo</Form.Label>
		  <InputGroup className="mb-3">
			{/* <Form.Control type="text" placeholder="Local onde está o seu equipamento" onChange={this.handleChange} value={this.props.workplace} readOnly={this.state.isValid_workplace} isInvalid={this.state.isInvalid_workplace} isValid={this.state.isValid_workplace} required /> */}
			<Form.Control type="text" placeholder="Telefone da Prefeitura" readOnly={this.state.isValid_phone} className={this.state.validate_class_name} onChange={this.handleChange} value={this.props.phone} isInvalid={this.state.isInvalid_phone} isValid={this.state.isValid_phone} required />
			{btnEditPhone}
			<Form.Control.Feedback type="invalid">Telefone de contato é <b>essencial</b>!</Form.Control.Feedback>
		  </InputGroup>
		</Form.Group>
		<Form.Group className="mb-3" controlId="formWhatsapp">
		  <Form.Label>Whatsapp</Form.Label>
		  <InputGroup className="mb-3">
			<Form.Control type="tel" placeholder="Para agilizar o contato" readOnly className={this.state.validate_class_name} onChange={this.handleChange} value={this.props.whatsapp} />
			<Button id="btnWhatsapp" variant="warning" onClick={this.handleEdit} className="bi bi-pencil-square"></Button>
		  </InputGroup>
		</Form.Group>
	  </div>
	);
  }
}
