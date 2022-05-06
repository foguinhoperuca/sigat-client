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
	  TicketID: null,
	  TicketNumber: '2022030402000013', // 2022030402000013
	  searchResult: null
	  , tid: 17
	};

	this.handleSearch = this.handleSearch.bind(this);
	this.handleChange = this.handleChange.bind(this);
  }

  handleSearch(event) {
	event.preventDefault();

	/* this.setState(state => ({ tid: state.tid + 1 })); */

	let url = `/gestaoti/otrs/search_ticket?ticket_number=${this.state.TicketNumber}`;
	console.log(url);
	fetch(url)
	  .then(response => response.json())
	  .then(data => {
		console.log("data returned");
		console.log(data);
		console.log(data.TicketID);
		if (data.TicketID === undefined) {
		  console.log(data);
		  this.setState({
			TicketID: null,
			searchResult: 'Ticket Não Encontrado!'
		  });
		} else {
		  console.log(data.TicketID[0]);
		  this.setState({
			TicketID: data.TicketID[0],
			searchResult: 'Ticket Encontrado Com Sucesso!'
		  });
		}
	  });
  }

  handleChange(event) {
	this.setState({
	  TicketNumber: event.target.value
	});
  }

  render() {
	return (
	  <div className="App">
		<header className="App-header" id="main-header">
		  <img src={logopms} className="App-logopms" alt="logo" />
		  <p>
	        Pesquisa de Chamados
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
			  <Form className="d-flex" onSubmit={this.handleSearch}>
				<Navbar.Text className="me-3">Ticket</Navbar.Text>
				<FormControl
				  type="search"
				  placeholder="ex: 2022021402000014"
				  className="me-1"
				  aria-label="Search"
				  value={this.state.TicketNumber}
				  onChange={this.handleChange}
				/>
				<Button variant="outline-success" onClick={this.handleSearch}>Pesquisar</Button>
			  </Form>
			  <Nav>
				<Nav.Link as={Link} to="/">Abrir Chamado</Nav.Link>
			  </Nav>
			</Navbar.Collapse>
		  </Container>
		</Navbar>
		<div className="container" >
	      <Ticket key={this.state.TicketID} TicketID={this.state.TicketID} searchResult={this.state.searchResult} />
		</div>
	  </div>
	);
  }
}
