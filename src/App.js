import React from 'react';
import './App.css';
import Equipment from './Equipment';
import Person from './Person';
import Location from './Location';
import Issue from './Issue';
import UserBadge from './auth/UserBadge';
import Form from 'react-bootstrap/Form';
import logopms from './images/logo_pms.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

/* import { Link } from "react-router-dom"; */

export default class App extends React.Component {

  constructor(props) {
	super(props);

	this.state = {
	  issue: '',
	  equipments: [
		<Equipment />
	  ],
	  showEquipmentDialog: false,
	  addListMessage: '',

	  username: '',
	  name: '',
	  department: '',
	  phone: '',
	  whatsapp: '',
	  workplace: '',
	  complementWorkplace: '',
	  localContact: '',
	  service: 0,
	  description: ''
	};

	this.handleLink = this.handleLink.bind(this);
	this.handleEquipmentDelete = this.handleEquipmentDelete.bind(this);
	this.handleEquipmentAdd = this.handleEquipmentAdd.bind(this);

	this.closeEquipmentDialog = this.closeEquipmentDialog.bind(this);
	this.openEquipmentDialog = this.openEquipmentDialog.bind(this);
	this.validateEquipmentRange = this.validateEquipmentRange.bind(this);
	this.generateEquipmentList = this.generateEquipmentList.bind(this);
	this.cleanEquipmentList = this.cleanEquipmentList.bind(this);
	this.handleMultipleEquipments = this.handleMultipleEquipments.bind(this);

	this.handleUsernameChange = this.handleUsernameChange.bind(this);
	this.handleNameChange = this.handleNameChange.bind(this);
	this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
	this.handlePhoneChange = this.handlePhoneChange.bind(this);
	this.handleWhatsappChange = this.handleWhatsappChange.bind(this);
	this.handleWorkplaceChange = this.handleWorkplaceChange.bind(this);
	this.handleComplementWorkplaceChange = this.handleComplementWorkplaceChange.bind(this);
	this.handleLocalContactChange = this.handleLocalContactChange.bind(this);
	this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
	this.handleServiceChange = this.handleServiceChange.bind(this);
  }

  handleLink(event) {
	/* TODO lift up children props */
	/* TODO use uncontrolled components to get data */
	let equipment = "";
	document.getElementsByName("txtEquipment").forEach((eqpmnt, index) => {
	  equipment = equipment.concat("pms-", eqpmnt.value, " :: ");
	});
	equipment = equipment.replace(/ :: $/, "");

	let service_descr = document.getElementById('formService').options[document.getElementById('formService').selectedIndex].text;
	let subject = `Suporte Técnico ${service_descr}`;
	let body = encodeURI(`Responsável Abertura Chamado: ${this.state.name} (${this.state.username}@sorocaba.sp.gov.br)
Secretaria: ${this.state.department}
Local da Solicitação: ${this.state.workplace}
Complemento do Local da Solicitação: ${this.state.complementWorkplace}
Contato no Local: ${this.state.localContact}
Telefone Corporativo: ${this.state.phone}
Whatsapp: ${this.state.whatsapp}
Patrimônio(s): ${equipment}
Serviço TI: (${this.state.service}) - ${service_descr}
Descrição: ${this.state.description}`);

	this.setState({
	  issue: `mailto:informatica@sorocaba.sp.gov.br?subject=${subject}&body=${body}`
	});
  }

  handleEquipmentDelete(event) {
	event.preventDefault();

	this.setState(function(state, props) {
	  let first = state.equipments[0];
	  const equips = state.equipments.filter((item, j) => first !== item);

	  return {
		  equipments: equips
		}
	});
  }

  handleEquipmentAdd(event) {
	event.preventDefault();

	this.setState(function(state, props) {
	  return {
		equipments: state.equipments.concat(<Equipment />)
	  }
	});
  }

  openEquipmentDialog(event) {
	this.setState({showEquipmentDialog: true});
  }

  closeEquipmentDialog() {
	this.setState({showEquipmentDialog: false});
  }

  validateEquipmentRange(event) {
	const asset = Number(event.target.value) || null;

	if (isNaN(asset) || asset == null) {
	  event.target.classList.remove("is-valid");
	  event.target.classList.add("is-invalid");
	} else {
	  event.target.classList.remove("is-invalid");
	  event.target.classList.add("is-valid");
	}
  }

  generateEquipmentList(event) {
	event.preventDefault();
	const eqp_start = document.getElementById("txtEquipmentStart");
	const eqp_end = document.getElementById("txtEquipmentEnd");
	const eqp_list = document.getElementById("txtEquipmentList");

	if (!eqp_start.classList.contains("is-valid") || !eqp_end.classList.contains("is-valid")) {
	  this.setState({
		addListMessage: <Alert variant="danger">Somente números!</Alert>
	  });
	} else if (Number(eqp_end.value) <= Number(eqp_start.value)) {
	  this.setState({
		addListMessage: <Alert variant="warning">Patrimônio inicial deve ser maior que o patrimônio final!</Alert>
	  });
	} else {
	  let i = eqp_start.value
	  if (eqp_list.value !== '') {
		eqp_list.value += "\n"
	  }
	  while (i <= eqp_end.value) {
		eqp_list.value += (i !== Number(eqp_end.value)) ? i + "\n" : i;
		i++;
	  }
	  this.setState({
		addListMessage: ''
	  });
	}
  }

  cleanEquipmentList(event) {
	event.preventDefault();

	document.getElementById("txtEquipmentList").value = "";
  }

  handleMultipleEquipments(event) {
	event.preventDefault();

	let eqps = document.getElementById("txtEquipmentList").value.split("\n").map((eqp, index) => {
	  return <Equipment numRegistro={eqp} />
	});

	this.setState(function(state, props) {
	  return {
		equipments: state.equipments.concat(eqps),
		showEquipmentDialog: false
	  }
	});
  }

  handleUsernameChange(value) {
	this.setState({username: value});
  }

  handleNameChange(value) {
	this.setState({name: value});
  }

  handleDepartmentChange(value) {
	this.setState({department: value});
  }

  handlePhoneChange(value) {
	this.setState({phone: value});
  }

  handleWhatsappChange(value) {
	this.setState({whatsapp: value});
  }

  handleWorkplaceChange(value) {
	this.setState({workplace: value});
  }

  handleComplementWorkplaceChange(value) {
	this.setState({complementWorkplace: value});
  }

  handleLocalContactChange(value) {
	this.setState({localContact: value});
  }

  handleDescriptionChange(descr) {
	this.setState({description: descr});
  }

  handleServiceChange(service) {
	this.setState({service: service});
  }

  render() {
	return (
	  <div className="App">
		<header className="App-header" id="main-header">
		  <img src={logopms} className="App-logopms" alt="logo" />
		  <p>
			Portal do Cliente <code>PMS/TI</code>.
		  </p>
		</header>
		<Navbar bg="light" expand="sm" sticky="top">
		  <Container>
			<Navbar.Brand href="#main-header">SIGAT</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
			  <Nav className="me-auto">
				<Nav.Link href="#hdrPerson">Informações</Nav.Link>
				<Nav.Link href="#hdrLocation">Unidade</Nav.Link>
				<Nav.Link href="#hdrEquipments">Equipamentos</Nav.Link>
				<Nav.Link href="#hdrIssue">Solicitação</Nav.Link>
				<a onClick={this.handleLink} className="btn btn-success" href={this.state.issue} target="_blank" rel="noopener noreferrer">Enviar</a>
			  </Nav>
			  {/* FIXME disabled for now... */}
			  {/* <Nav>
				  <Nav.Link as={Link} to="/pesquisar">Pesquisar Chamados</Nav.Link>
				  </Nav> */}
			  <Nav>
				{/* TODO use a good UI (alredy btn btn-primary) with Nav.Link history function */}
				<UserBadge />
			  </Nav>
			</Navbar.Collapse>
		  </Container>
		</Navbar>
		<Form className="container" action={this.state.issue} onSubmit={this.handleLink}>
		  <h3 id="hdrPerson">Informações</h3>
		  <Person
			username={this.state.username} onUsernameChange={this.handleUsernameChange}
			name={this.state.name} onNameChange={this.handleNameChange}
			department={this.state.department} onDepartmentChange={this.handleDepartmentChange}
			phone={this.state.phone} onPhoneChange={this.handlePhoneChange}
			whatsapp={this.state.whatsapp} onWhatsappChange={this.handleWhatsappChange}
		  />
		  <h3 id="hdrLocation">Unidade</h3>
		  <Location
			workplace={this.state.workplace} onWorkplaceChange={this.handleWorkplaceChange}
			complementWorkplace={this.state.complementWorkplace} onComplementWorkplaceChange={this.handleComplementWorkplaceChange}
			localContact={this.state.localContact} onLocalContactChange={this.handleLocalContactChange}
		  />
		  <h3 id="hdrEquipments">Equipamentos</h3>
		  <span className="btn btn-success btn-sm" onClick={this.handleEquipmentAdd}><span className="bi bi-plus-square"></span></span>&nbsp;<span className="btn btn-danger btn-sm" onClick={this.handleEquipmentDelete}><span className="bi bi-trash"></span></span>&nbsp;<span className="btn btn-primary btn-sm" onClick={this.openEquipmentDialog}><span className="bi bi-list"></span></span>
		  <br />
		  <br />
		  <Modal show={this.state.showEquipmentDialog} onHide={this.closeEquipmentDialog}>
			<Modal.Header closeButton>
			  <Modal.Title>Adicionar Equipmentos em Lote</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			  <h4>Faixa</h4>
			  <Form.Text className="text-muted">
				Somente números
			  </Form.Text>
			  <Form.Group as={Row} className="mb-3">
				<Col sm="6">
				  <Form.Label>Início</Form.Label>
				  <InputGroup hasValidation>
					<InputGroup.Text id="basic-addon1" onClick={this.handleSearch}>pms-</InputGroup.Text>
					<FormControl id="txtEquipmentStart" placeholder="Patrimônio" aria-label="Patrimônio" name="txtEquipmentStart" className="is-invalid" onChange={this.validateEquipmentRange} />
				  </InputGroup>
				</Col>
				<Col sm="6">
				  <Form.Label>Fim</Form.Label>
				  <InputGroup hasValidation>
					<InputGroup.Text id="basic-addon2" onClick={this.handleSearch}>pms-</InputGroup.Text>
					<FormControl id="txtEquipmentEnd" placeholder="Patrimônio" aria-label="Patrimônio" name="txtEquipmentEnd" className="is-invalid" onChange={this.validateEquipmentRange} />
				  </InputGroup>
				</Col>
			  </Form.Group>
			  <Button variant="success" onClick={this.generateEquipmentList}>
				Adicionar à listagem
			  </Button>
			  <br />
			  <Form.Text className="text-muted">
				A faixa será adicionada ao final da listagem abaixo.
			  </Form.Text>
			  {this.state.addListMessage}
			  <Form.Group className="mb-3" controlId="txtEquipmentList">
				<h4>Listagem <Button id="btnEditSearch" variant="danger" onClick={this.cleanEquipmentList} className="bi bi-trash"></Button></h4>
				<Form.Control as="textarea" rows={5} required />
				<Form.Text className="text-muted">
				  Somente um patrimônio por linha no formato <b>pms-<i>123456</i></b>
				</Form.Text>
			  </Form.Group>
			</Modal.Body>
			<Modal.Footer>
			  <Button variant="primary" onClick={this.handleMultipleEquipments}>
				Gerar Lote
			  </Button>
			  <Button variant="secondary" onClick={this.closeEquipmentDialog}>
				Cancelar
			  </Button>
			</Modal.Footer>
		  </Modal>
		  {this.state.equipments}
		  <h3 id="hdrIssue">Solicitação</h3>
		  <Issue
			service={this.state.service} onServiceChange={this.handleServiceChange}
			description={this.state.description} onDescriptionChange={this.handleDescriptionChange}
		  />
		</Form>
	  </div>
	);
  }
}
