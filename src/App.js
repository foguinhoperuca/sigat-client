import React from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logopms from './images/logo_pms.png'

import Equipment from './Equipment';
import Person from './Person';
import Issue from './Issue';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

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
	let workplace = document.getElementById('formWorkplace').value;
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
Unidade/Local de Trabalho: ${workplace}
Contato: ${phone}
Whatsapp: ${whatsapp}
Patrimônio: ${equipment}
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
	        Formulário para abertura de chamado da <code>informática</code>.
		  </p>
		  <a onClick={this.handleLink} className="App-link" href={this.state.issue} target="_blank" rel="noopener noreferrer">Enviar chamado por e-mail para o suporte</a>
		</header>
		<Navbar bg="light" expand="sm" sticky="top">
		  <Container>
			<Navbar.Brand href="#main-header">SIGAT</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
			  <Nav className="me-auto">
				<Nav.Link href="#hdrPerson">Dados Pessoais</Nav.Link>
				<Nav.Link href="#hdrEquipments">Equipamentos</Nav.Link>
				<Nav.Link href="#hdrIssue">Chamado</Nav.Link>
			  </Nav>
			  <div className="d-flex">
				<a onClick={this.handleLink} className="btn btn-success" href={this.state.issue} target="_blank" rel="noopener noreferrer">Enviar</a>
			  </div>
			</Navbar.Collapse>
		  </Container>
		</Navbar>
		<Form className="container" action={this.state.issue} onSubmit={this.handleLink}>
		  <h3 id="hdrPerson">Dados Pessoais</h3>
		  <Person />
		  <h3 id="hdrEquipments">Equipamentos</h3>
	      <span className="btn btn-success btn-sm" onClick={this.handleEquipmentAdd}><span className="bi bi-plus-square"></span></span>&nbsp;<span className="btn btn-danger btn-sm" onClick={this.handleEquipmentDelete}><span className="bi bi-trash"></span></span>&nbsp;
		  <br />
		  <br />
	      {this.state.equipments}
	      <h3 id="hdrIssue">Chamado</h3>
	      <Issue />
		</Form>
      </div>
	);
  }
}
