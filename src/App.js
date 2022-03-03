import React from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/* import logo from './logo.svg'; */
import logopms from './images/logo_pms.png'

import Equipment from './Equipment';
import Person from './Person';
import Issue from './Issue';

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
		<Form className="container" action={this.state.issue} onSubmit={this.handleLink}>
		  <Person username={this.handlePersonUsername} />
		  <Equipment />
		  <Issue />
		  {/* TODO work with form action to send e-mail! */}
		  {/* <Button variant="primary" type="submit">
			  Enviar Chamado !!
			  </Button> */}
		</Form>
      </div>
	);
  }
}
