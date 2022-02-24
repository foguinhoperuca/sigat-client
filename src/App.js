import React from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/* import logo from './logo.svg'; */
import logopms from './images/logo_pms.png'

import Equipment from './Equipment';
import Person from './Person';


export default class App extends React.Component {

  constructor(props) {
	super(props);

	this.state = {
	  issue: ''
	};

	this.handleLink = this.handleLink.bind(this);
  }

  handleLink(event) {
	let username = document.getElementById('formBasicEmail').value;
	let name = document.getElementById('formName').value;
	let workplace = document.getElementById('formWorkplace').value;
	let phone = document.getElementById('formPhone').value;
	let whatsapp = document.getElementById('formWhatsapp').value;
	let equipment = document.getElementById('formEquipment').value;
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

  render() {
	return (
      <div className="App">
		<header className="App-header">
          <img src={logopms} className="App-logopms" alt="logo" />
          <p>
			Formulário para abertura de chamado da <code>informática</code>.
          </p>
		  <a
			onClick={this.handleLink}
			className="App-link"
			href={this.state.issue}
			target="_blank"
			rel="noopener noreferrer"
			>
			Enviar chamado por e-mail para o suporte
		  </a>
		</header>
		<Form className="container">
		  <Person username={this.handlePersonUsername} />
		  <Equipment />
		  <Form.Group className="mb-3" controlId="formService">
			<Form.Select aria-label="Default select example">
			  <option>--- Informe o Serviço Desejado da TI Se Souber ---</option>
			  <option value="1">Administrativo</option>
			  <option value="2">Redes</option>
			  <option value="3">Sistemas Internos e Legados</option>
			  <option value="4">Sistemas de Terceiros</option>
			  <option value="5">Suporte Técnico</option>
			  <option value="6">Telefonia</option>
			</Form.Select>
			<Form.Text className="text-muted">
			  Os serviços da TI são uma forma mais simples de encaminharmos para equipe correta atender o seu chamado.
			</Form.Text>
		  </Form.Group>
		  <Form.Group className="mb-3" controlId="formDescription">
			<Form.Label>Descrição</Form.Label>
			<Form.Control as="textarea" rows={5} required />
			<Form.Text className="text-muted">
			  Caso mais de um patrimônio necessite de manutenção, informe abaixo utilizando-se do prefixo mais 6 números (um por linha). Ex.: pms-123456
			</Form.Text>
		  </Form.Group>
		  <Button variant="primary" type="submit">
			Enviar Chamado !
		  </Button>
		</Form>
      </div>
	);
  }
}
