import React from 'react';
import logopms from '../images/logo_pms.png';
import UserBadge from './UserBadge';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

/* import { useNavigate } from "react-router-dom";
 * const navigate = useNavigate(); */

export default class Login extends React.Component {
  constructor(props) {
	super(props);

	this.state = {
	  is_logged: false
	}

	this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
	event.preventDefault();

	const data = {
	  user: {
		username: process.env.REACT_APP_SIGAT_API_USER,
		password: process.env.REACT_APP_SIGAT_API_PASSWORD
	  }
	}
	/* console.log(data); */
	
	let url = "/sigat-api/users/sign_in";
	fetch(url, {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(data)
	})
	  .then((response) => {
		console.log(response);
		console.log(response.headers.get("Authorization"));
		localStorage.setItem("token", response.headers.get("Authorization"));
		this.setState({
		  is_logged: true
		})
		
		console.log("TODO implement something with response");
		console.log("TODO get other use cases like error or login unauthorized");

		return response.json();
	  })
	  .then(data => {
		console.log(data);
		console.log("TODO do something with data response");
		console.log(localStorage.getItem("token"));

		/* TODO redirect to initial page with react-router (note: router only works as hook. Need understand how redirect (maybe using window.location or another way)) */
		window.location.assign("/");
	  });
  }

  render() {
	return (
	  <div className="App">
		<header className="App-header" id="main-header">
		  <img src={logopms} className="App-logopms" alt="logo" />
		  <p>
	        Área Reservada ao <code>Cliente</code>
		  </p>
		</header>
		<Navbar bg="light" expand="sm" sticky="top">
		  <Container>
			<Navbar.Brand href="#main-header">SIGAT</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
			  <Nav className="me-auto">
				<a className="btn btn-outline-dark" href="mailto:informatica@sorocaba.sp.gov.br?subject=Suporte Portal TI&body=Por gentileza entre em contato comigo pelo ramal: " target="_blank" rel="noopener noreferrer">Suporte por E-mail</a>
				<Nav.Link as={Link} to="/">Abrir Chamado</Nav.Link>
			  </Nav>
			  <Nav>
				<UserBadge isLoggedIn={this.state.is_logged} />
			  </Nav>
			</Navbar.Collapse>
		  </Container>
		</Navbar>
	    <Form className="container" onSubmit={this.handleSubmit}>
		  <Form.Group className="mb-3" controlId="formUsername">
			<Form.Label>Usuário</Form.Label>
			<Form.Control placeholder="Usuário da Rede" aria-label="Usuário da Rede" required defaultValue="XXX" />
			<Form.Text className="text-muted">
			  É o mesmo utilizado para o logon na rede MS Windows.
			</Form.Text>
		  </Form.Group>
		  <Form.Group className="mb-3" controlId="formPassword">
			<Form.Label>Senha</Form.Label>
			<Form.Control type="password" placeholder="Password" required defaultValue="XXX" />
		  </Form.Group>
		  <Button variant="primary" type="submit">
			Enviar
		  </Button>
		</Form>
	  </div>
	);
  }
}
