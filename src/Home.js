import React from 'react';
import logopms from './images/logo_pms.png';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import UserBadge from './auth/UserBadge';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Stack from 'react-bootstrap/Stack'

import KonamiCode from 'konami-code-js';

export default class Home extends React.Component {
  constructor(props) {
	super(props);

	this.state = {
	  isLoggedIn: localStorage.getItem("token") != null,
	  isLoggedInMessage: '',
	  devmode: false
	};

	this.handleNavigation = this.handleNavigation.bind(this);
	this.handleProp = this.handleProp.bind(this);
  }

  handleNavigation(event) {
	console.log("TODO implement login in home page!");

	switch(event.target.id) {
	  case 'btnScreening':
		window.location.assign('/triagem');
		break;
	  case 'btnPainel':
		window.location.assign('/painel');
		break;
	  case 'btnSearch':
		window.location.assign('/pesquisar');
		break;
	  default:
		/* TODO implement an alert! */
		console.error("Not found option!!");
		window.location.assign('/home');
	}

	event.preventDefeatult();
  }

  handleProp(prop, value) {
	this.setState({[prop]: value});
  }

  render() {
	const warning = (this.state.isLoggedIn) ? '' : <><Alert variant="warning">Efetue o login antes de enviar o chamado para triagem!</Alert></>;

	let kc = new KonamiCode({listener: document.getElementById("hdrMenu")});

	const self = this;
	kc.setCallback(function () {
      /* kc.disable(); */
	  console.clear();
	  console.log("Konami Code exec!");
	  alert("Com a benção do Pai de Todos da TI ;) você destravou as features de desenvolvimento!!");

	  self.setState((state, props) => {
		return {
		  devmode: !state.devmode
		}
	  });
	});

	return (
	  <div className="Home">
		<header className="App-header" id="main-header">
		  <img src={logopms} className="App-logopms" alt="logo" />
		  <p>
			Portal do Cliente <code>PMS/TI</code>.
		  </p>
		</header>
		<Navbar bg="light" expand="sm" sticky="top">
		  <Container>
			<Navbar.Brand href="#main">SIGAT</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
			  <Nav className="me-auto">
				<Nav.Link href="#hdrMenu">Menu</Nav.Link>
			  </Nav>
			  <Nav>
				<UserBadge isLoggedIn={this.state.isLoggedIn} isLoggedInMessage={this.state.isLoggedInMessage} onIsLoggedInChange={this.handleProp} />
			  </Nav>
			</Navbar.Collapse>
		  </Container>
		</Navbar>
		<Stack gap={1} className="col-md-12 align-items-center">
		  <h1 id="hdrMenu">Menu</h1>
		</Stack>
		<Stack gap={1} className="col-md-11 mx-auto">
		  {warning}
		  <Button id="btnScreening" variant="primary" disabled={!this.state.isLoggedIn} onClick={this.handleNavigation}>Abrir Novo Chamado</Button>
		  <small><Form.Text className="text-muted">Tenha em mãos um ramal para contato e o patrimônio do equipamento. Você precisará se identificar além de apontar o local onde encontra-se o equipamento.</Form.Text></small>
		  <Button id="btnPainel" variant="secondary" disabled={!this.state.devmode} onClick={this.handleNavigation}>Painel</Button>
		  <small><Form.Text className="text-muted"><strong>[EM DESENVOLVIMENTO]</strong> Veja os seus chamados com a TI!</Form.Text></small>
		  <Button id="btnSearch" variant="outline-secondary" disabled={!this.state.devmode} onClick={this.handleNavigation}>Pesquisar Ticket</Button>
		  <small><Form.Text className="text-muted"><strong>[EM DESENVOLVIMENTO]</strong> Você precisará ter o número do Ticket em mãos!</Form.Text></small>
		</Stack>
	  </div>
	);
  }
}
