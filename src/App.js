import React from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logopms from './images/logo_pms.png'

import Equipment from './Equipment';
import Person from './Person';
import Issue from './Issue';

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
	this.handleMultipleEquipmentTest = this.handleMultipleEquipmentTest.bind(this);
  }

  handleMultipleEquipmentTest(event) {
	event.preventDefault();
	console.log("TODO test/implement get multiple equipment input value");
	/* FIXME how to get multiple values (not first only - get element by class!?)?! */
	let equipment = document.getElementById('formEquipment').value;
	console.log(equipment);
  }

  handleLink(event) {
	/* TODO lift up children props */
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
	    <header className="App-header">
		  <img src={logopms} className="App-logopms" alt="logo" />
		  <p>
	        Formulário para abertura de chamado da <code>informática</code>.
		  </p>
		  <a onClick={this.handleLink} className="App-link" href={this.state.issue} target="_blank" rel="noopener noreferrer">Enviar chamado por e-mail para o suporte</a>
		</header>
		<Form className="container" action={this.state.issue} onSubmit={this.handleLink}>
		  <h3>Dados Pessoais</h3>
		  <Person />
		  <h3>Equipamentos</h3>
	      <span className="btn btn-success btn-sm" onClick={this.handleEquipmentAdd}><span className="bi bi-plus-square"></span></span>&nbsp;<span className="btn btn-danger btn-sm" onClick={this.handleEquipmentDelete}><span className="bi bi-trash"></span></span>&nbsp;<span className="btn btn-warning btn-sm" onClick={this.handleMultipleEquipmentTest}><span className="bi bi-radioactive"></span></span>
		  <br />
		  <br />
	      {this.state.equipments}
	      <h3>Chamado</h3>
	      <Issue />
		  {/* TODO work with form action to send e-mail! */}
		  {/* <Button variant="primary" type="submit">Enviar Chamado !!</Button> */}
		</Form>
      </div>
	);
  }
}
