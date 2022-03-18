import React from 'react';
import './App.css';
import Equipment from './Equipment';
import Person from './Person';
import Issue from './Issue';
import UserBadge from './auth/UserBadge';
import Form from 'react-bootstrap/Form';
import logopms from './images/logo_pms.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import { Link } from "react-router-dom";

export default class App extends React.Component {

  constructor(props) {
	super(props);

	this.state = {
	  issue: '',
	  equipments: [
		<Equipment />
	  ]
	};

	this.handleLink = this.handleLink.bind(this);
	this.handleEquipmentDelete = this.handleEquipmentDelete.bind(this);
	this.handleEquipmentAdd = this.handleEquipmentAdd.bind(this);
  }

  handleLink(event) {
	/* TODO lift up children props */
	let username = document.getElementById('formBasicEmail').value;
	let name = document.getElementById('formName').value;
	let department = document.getElementById('formDepartment').value;
	let workplace = document.getElementById('formWorkplace').value;
	let complementWorkplace = document.getElementById('formComplementWorkplace').value;
	let localContact = document.getElementById('formLocalContact').value;
	let phone = document.getElementById('formPhone').value;
	let whatsapp = document.getElementById('formWhatsapp').value;
	let equipment = "";
	document.getElementsByName("txtEquipment").forEach((eqpmnt, index) => {
	  equipment = equipment.concat("pms-", eqpmnt.value, " :: ");
	});
	equipment = equipment.replace(/ :: $/, "");
	let service = document.getElementById('formService').options[document.getElementById('formService').selectedIndex].text;
	let description = document.getElementById('formDescription').value;

	let subject = `Suporte Técnico ${service}`;
	let body = encodeURI(`Responsável Abertura Chamado: ${name} (${username}@sorocaba.sp.gov.br)
Secretaria: ${department}
Local da Solicitação: ${workplace}
Complemento do Local da Solicitação: ${complementWorkplace}
Contato no Local: ${localContact}
Telefone Corporativo: ${phone}
Whatsapp: ${whatsapp}
Patrimônio(s): ${equipment}
Serviço TI: ${service}
Descrição: ${description}`);

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
		  <Person />
		  <h3 id="hdrEquipments">Equipamentos</h3>
		  <span className="btn btn-success btn-sm" onClick={this.handleEquipmentAdd}><span className="bi bi-plus-square"></span></span>&nbsp;<span className="btn btn-danger btn-sm" onClick={this.handleEquipmentDelete}><span className="bi bi-trash"></span></span>
		  <br />
		  <br />
		  {this.state.equipments}
		  <h3 id="hdrIssue">Solicitação</h3>
		  <Issue />
		</Form>
	  </div>
	);
  }
}
