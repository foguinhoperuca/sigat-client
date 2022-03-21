import React from 'react';
import Form from 'react-bootstrap/Form';

export default class Issue extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	  services: [],
	  comment: ''
	};

	/* this.handleServices = this.handleServices.bind(this); */
	this.handleServiceChange = this.handleServiceChange.bind(this);
  }

  componentDidMount() {
	let url = `/sigat-api/otrs/services/index`

	fetch(url)
	  .then(response => response.json())
	  .then(data => {
		this.setState({
		  services: data
		});
	  });
  }

  handleServiceChange(event) {
	event.preventDefault();

	const service = document.getElementById('formService').value;
	this.setState((state, props) => ({
	  comment: (document.getElementById('formService').value === 0) ? '' : state.services[service - 1].comments
	}));
  }

  render() {
	const options = this.state.services.map((service) => {
	  return <option key={service.id} value={service.id}>[{service.general_catalog.name}] {service.name}</option>
	});

	return (
	  <div>
		<Form.Group className="mb-3" controlId="formService">
		  <Form.Text className="text-muted">
			Os serviços da TI são uma forma mais simples de encaminharmos para equipe correta atender o seu chamado. É opcional!
		  </Form.Text>
		  <br />
		  <Form.Select aria-label="Default select example" onChange={this.handleServiceChange}>
			<option value="0">--- Informe o Serviço Desejado da TI **Se Souber** ---</option>
			{options}
		  </Form.Select>
		  <Form.Text className="text-muted">
			{this.state.comment}
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
