import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import logopms from '../images/logo_pms.png'
import Ticket from './Ticket';

export default class Search extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	  TicketID: '',
	  ticket: <Ticket />
	};

	this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
	event.preventDefault();

	const user = '';
	const password = '';
	let url = `http://digeo-stage.sorocaba.sp.gov.br/otobo/nph-genericinterface.pl/Webservice/GenericTicketConnectorREST/Ticket/${this.state.TicketID}?UserLogin=${user}&Password=${password}`;

	fetch(url)
	  .then(response => response.json())
	  .then(data => {
		console.log("data returned");
		console.log(data);
	  });
  }

  render() {
	return (
	  <div className="App">
		<header className="App-header" id="main-header">
		  <img src={logopms} className="App-logopms" alt="logo" />
		  <p>
	        Pesquisa de Chamados
			<br />
			{/* TODO implement it */}
			{/* <Link to="/" className="App-link">Abra um chamado aqui!</Link> */}
		  </p>
		</header>
		<Navbar bg="light" expand="sm" sticky="top">
		  <Container>
			<Navbar.Brand href="#main-header">SIGAT</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
			  <Nav className="me-auto">
				<Nav.Link href="#generic-data-ticket">Informações Gerais</Nav.Link>
				<Nav.Link href="#detail-data-ticket">Detalhes</Nav.Link>
			  </Nav>
			  <Form className="d-flex">
				<Navbar.Text className="me-3">Ticket</Navbar.Text>
				<FormControl
				  type="search"
				  placeholder="ex: 2022021402000014"
				  className="me-1"
				  aria-label="Search"
				/>
				<Button variant="outline-success">Pesquisar</Button>
			  </Form>
			  <Nav>
				<Nav.Link href="/">Abrir chamado</Nav.Link>				
			  </Nav>
			</Navbar.Collapse>
		  </Container>
		</Navbar>
		<div className="container" >
		  {this.state.ticket}
		  {/* <Ticket TicketID={this.state.TicketID} /> */}
		</div>
	  </div>
	);
  }
}

