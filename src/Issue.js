import React from 'react';
import Form from 'react-bootstrap/Form';

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
			<option>--- Informe o Serviço Desejado da TI **Se Souber** ---</option>
			<option value="1">Administrativo</option>
			<option value="2">Redes</option>
			<option value="3">Sistemas Internos e Legados</option>
			<option value="4">Sistemas de Terceiros</option>
			<option value="5">Suporte Técnico</option>
			<option value="6">Telefonia</option>
		  </Form.Select>
		  <Form.Text className="text-muted">
			Os serviços da TI são uma forma mais simples de encaminharmos para equipe correta atender o seu chamado. É opcional!
		  </Form.Text>
		</Form.Group>
		<Form.Group className="mb-3" controlId="formDescription">
		  <Form.Label>Descrição</Form.Label>
		  <Form.Control as="textarea" rows={5} required />
		  <Form.Text className="text-muted">
			Quanto mais detalhes melhor é para nossa equipe te ajudar de forma mais ágil!
		  </Form.Text>
		</Form.Group>
	  </div>
	);
  }
}
