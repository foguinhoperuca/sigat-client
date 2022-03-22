import React from 'react';
import './App.css';
import Equipment from './equipment/Equipment';
import MultipleEquipmentForm from './equipment/MultipleEquipmentForm';
import Person from './Person';
import Location from './Location';
import Issue from './Issue';
import UserBadge from './auth/UserBadge';
import logopms from './images/logo_pms.png';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';

/* import { Link } from "react-router-dom"; */

export default class App extends React.Component {

  constructor(props) {
	super(props);

	this.state = {
	  issue: '',
	  equipments: [
		<Equipment key={0} />
	  ],

	  showEquipmentDialog: false,

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

	this.equipmentDialog = this.equipmentDialog.bind(this);
	this.handleEquipmentAddMultiple = this.handleEquipmentAddMultiple.bind(this);

	/* TODO implement in one fuction only using this.setState({[name]: value}); */
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

  /* TODO Use key={} */
  handleEquipmentAddMultiple(eqps) {
	this.setState(function(state, props) {
	  return {
		equipments: state.equipments.concat(eqps)
	  }
	});
  }

  handleEquipmentAdd(event) {
	event.preventDefault();

	this.handleEquipmentAddMultiple(<Equipment />);
  }

  equipmentDialog(show) {
	this.setState({showEquipmentDialog: show});
  }

  /* TODO all handle <props> Change must be inside one function */
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

  handleDescriptionChange(value) {
	this.setState({description: value});
  }

  handleServiceChange(value) {
	this.setState({service: value});
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
		  <MultipleEquipmentForm
			showEquipmentDialog={this.state.showEquipmentDialog} onCloseEquipmentDialog={this.equipmentDialog} onHandleEquipmentAddMultiple={this.handleEquipmentAddMultiple}
		  />
		  <span className="btn btn-success btn-sm" onClick={this.handleEquipmentAdd}><span className="bi bi-plus-square"></span></span>&nbsp;<span className="btn btn-danger btn-sm" onClick={this.handleEquipmentDelete}><span className="bi bi-trash"></span></span>&nbsp;<span className="btn btn-primary btn-sm" onClick={() => this.equipmentDialog(true) }><span className="bi bi-list"></span></span>
		  <br />
		  <br />
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
