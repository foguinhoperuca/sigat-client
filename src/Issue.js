import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default class Issue extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	  service: '',
	  description: ''
	};
  }

  render() {
	return (
	  <div>
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
	  </div>
	);
  }
}
