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
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

/* import { Link } from "react-router-dom"; */

export default class App extends React.Component {
  constructor(props) {
	super(props);

	/* Need execute bind before initialize the state otherwise will not be possible use the state inside handleArtibraryEquipmentDelete */
	this.handleArbitrayEquipmentDelete = this.handleArbitrayEquipmentDelete.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleLink = this.handleLink.bind(this);
	this.handleEquipmentDelete = this.handleEquipmentDelete.bind(this);
	this.handleEquipmentAddMultiple = this.handleEquipmentAddMultiple.bind(this);
	this.equipmentDialog = this.equipmentDialog.bind(this);
	this.handleProp = this.handleProp.bind(this);

	this.state = {
	  issue: '',
	  showEquipmentDialog: false,
	  isLoggedIn: localStorage.getItem("token") != null,
	  isLoggedInMessage: '',
	  screening_id: null,
	  ticket_number: '',
	  created_at: '',
	  isSending: '',

	  /*
	  equipments: [<Equipment key={0} /> ],
	  username: '',
	  name: '',
	  department: '',
	  phone: '',
	  whatsapp: '',
	  workplace: '',
	  complementWorkplace: '',
	  localContact: '',
	  service: '',
	  description: ''
	  */

	  latestEquipmentKey: 1,
	  /* FIXME just for test purpose. Remove it before send to production!! */
	  equipments: (process.env.REACT_APP_ENVIRONMENT !== "development") ? [<Equipment key={1} equipmentsIndex={1} onDestroyArbitraryEquipment={this.handleArbitrayEquipmentDelete} /> ] : [<Equipment numRegistro={307005} key={1} equipmentsIndex={1} onDestroyArbitraryEquipment={this.handleArbitrayEquipmentDelete} />],
	  username: (process.env.REACT_APP_ENVIRONMENT !== "development") ? '' : 'jecampos',
	  name: (process.env.REACT_APP_ENVIRONMENT !== "development") ? '' : 'Jefferson Luiz Oliveira de Campos',
	  department: 'Seção de Sistemas | Divisao de Gestao de Tecnologia de Informacao | Área de Organização e Sistemas | SEPLAN',
	  phone: (process.env.REACT_APP_ENVIRONMENT !== "development") ? '' : '2707',
	  whatsapp: (process.env.REACT_APP_ENVIRONMENT !== "development") ? '' : '15-99723-3588',
	  workplace: (process.env.REACT_APP_ENVIRONMENT !== "development") ? '' : 'Paço Municipal',
	  complementWorkplace: (process.env.REACT_APP_ENVIRONMENT !== "development") ? '' : 'Primeiro Andar',
	  localContact: (process.env.REACT_APP_ENVIRONMENT !== "development") ? '' : 'Xistovsky',
	  service: (process.env.REACT_APP_ENVIRONMENT !== "development") ? '' : 0,
	  description: (process.env.REACT_APP_ENVIRONMENT !== "development") ? '' : 'Teste Portal TI usando ReactJS state.'
	};
  }

  handleArbitrayEquipmentDelete(position) {
	this.setState((state, props) => {
	  return {
		equipments: state.equipments.filter((item, j) => item.key != position)
	  }
	});
  }

  handleSubmit(event) {
	/* TODO implement final validation before send data */
	/* const form = event.currentTarget; */
	/* if (form.checkValidity() === false) {
	   console.log("checkValidity failed!!");
	   event.preventDefault();
	   event.stopPropagation();
	   } */

	this.setState({isSending: <Spinner animation="border" role="status" variant="info" size="sm"></Spinner>});

	let url = `/sigat-api/screenings`;
	let equipment = "";
	document.getElementsByName("txtEquipment").forEach((eqpmnt, index) => {
	  equipment = equipment.concat("pms-", eqpmnt.value, " :: ");
	});
	equipment = equipment.replace(/ :: $/, "");

	let screening = {
	  logged_username: JSON.parse(localStorage.getItem("user")).username,
	  username: this.state.username,
	  name: this.state.name,
	  department: this.state.department,
	  phone: this.state.phone,
	  whatsapp: this.state.whatsapp,
	  workplace: this.state.workplace,
	  complementWorkplace: this.state.complementWorkplace,
	  localContact: this.state.localContact,
	  equipment: equipment,
	  service: `(${this.state.service}) - ${document.getElementById('formService').options[document.getElementById('formService').selectedIndex].text}`,
	  description: this.state.description
	};
	console.log(screening);

	fetch(url, {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
		'Authorization': localStorage.getItem('token')
	  },
	  body: JSON.stringify(screening)
	}).then(response => {
	  console.log(response);

	  if (response.ok) {
		console.log("Ticket created!!");
		return response.json();
	  } else {
		console.log("Ticket not created!!");
		if (response.status == 401) {
		  console.log("Not authorized. Need login again!");

		  localStorage.removeItem("token");
		  localStorage.removeItem("user");
		  this.setState({
			isLoggedIn: false,
			isLoggedInMessage: 'Sessão expirada!'
		  });

		  return response.text();
		} else {
		  console.log("generic error BACKEND!!");
		  return response.json();
		}
	  }
	}).then(data => {
	  this.setState({
		screening_id: data["id"],
		ticket_number: data["ticket_number"],
		created_at: data["created_at"],
		isSending: ''
	  });
	  console.log(data);
	});

	event.preventDefault();
	event.stopPropagation();
  }

  handleLink(event) {
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
	this.setState({equipments: []});
  }

  handleEquipmentAddMultiple(eqps) {
	this.setState(function(state, props) {
	  let newerEquipments = [];

	  eqps.forEach((eqp, index) => {
		const uid = state.latestEquipmentKey + (index + 1);

		newerEquipments.push(React.createElement(
		  Equipment,
		  {
			...eqp,
			...{
			  key: uid,
			  equipmentsIndex: uid
			}
		  },
		  null));
	  });

	  return {
		equipments: state.equipments.concat(newerEquipments),
		latestEquipmentKey: state.latestEquipmentKey + newerEquipments.length
	  }
	});
  }

  equipmentDialog(show) {
	this.setState({showEquipmentDialog: show});
  }

  handleProp(prop, value) {
	this.setState({[prop]: value});
  }

  render() {
	let action;

	if (!this.state.isLoggedIn) {
	  action = <Alert variant="danger">Efetue o login antes de enviar o chamado para triagem!</Alert>;
	} else if (this.state.screening_id != null) {
	  action = <Alert variant="info">Ticket enviado com sucesso para triagem! Triagem #{this.state.screening_id} - Ticket Number: {this.state.ticket_number} - Criado em: {this.state.created_at}</Alert>;
	} else {
	  action = <Button type="submit" variant="success">Enviar {this.state.isSending}</Button>;
	}

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
				<a onClick={this.handleLink} className="btn btn-secondary" href={this.state.issue} target="_blank" rel="noopener noreferrer">Enviar por E-mail</a>
			  </Nav>
			  {/* FIXME disabled for now... */}
			  {/* <Nav><Nav.Link as={Link} to="/pesquisar">Pesquisar Chamados</Nav.Link></Nav> */}
			  <Nav>
				<UserBadge isLoggedIn={this.state.isLoggedIn} isLoggedInMessage={this.state.isLoggedInMessage} onIsLoggedInChange={this.handleProp} />
			  </Nav>
			</Navbar.Collapse>
		  </Container>
		</Navbar>
		<Form className="container" action={this.state.issue} onSubmit={this.handleSubmit}>
		  <h3 id="hdrPerson">Informações</h3>
		  <Person
			username={this.state.username} onUsernameChange={this.handleProp}
			name={this.state.name} onNameChange={this.handleProp}
			department={this.state.department} onDepartmentChange={this.handleProp}
			phone={this.state.phone} onPhoneChange={this.handleProp}
			whatsapp={this.state.whatsapp} onWhatsappChange={this.handleProp}
		  />
		  <h3 id="hdrLocation">Unidade</h3>
		  <Location
			workplace={this.state.workplace} onWorkplaceChange={this.handleProp}
			complementWorkplace={this.state.complementWorkplace} onComplementWorkplaceChange={this.handleProp}
			localContact={this.state.localContact} onLocalContactChange={this.handleProp}
		  />
		  <h3 id="hdrEquipments">Equipamentos</h3>
		  <MultipleEquipmentForm
			showEquipmentDialog={this.state.showEquipmentDialog}
			onCloseEquipmentDialog={this.equipmentDialog}
			onHandleEquipmentAddMultiple={this.handleEquipmentAddMultiple}
			onHandleArbitrayEquipmentDelete={this.handleArbitrayEquipmentDelete}
		  />
		  <span className="btn btn-success btn-sm" onClick={() => this.handleEquipmentAddMultiple([{onDestroyArbitraryEquipment: this.handleArbitrayEquipmentDelete}])}><span className="bi bi-plus-square"></span> 1</span>&nbsp;<span className="btn btn-danger btn-sm" onClick={this.handleEquipmentDelete}><span className="bi bi-trash"></span></span>&nbsp;<span className="btn btn-primary btn-sm" onClick={() => this.equipmentDialog(true) }><span className="bi bi-list"></span></span>
		  <br />
		  <br />
		  {this.state.equipments}
		  <h3 id="hdrIssue">Solicitação</h3>
		  <Issue
			service={this.state.service} onServiceChange={this.handleProp}
			description={this.state.description} onDescriptionChange={this.handleProp}
		  />
		  {action}
		</Form>
	  </div>
	);
  }
}
