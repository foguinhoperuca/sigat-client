import React from 'react';
import Form from 'react-bootstrap/Form';

export default class Issue extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	  services: [],
	  comment: '',
	  service: '',
	  description: ''
	};

	/* this.handleServices = this.handleServices.bind(this); */
	this.handleServiceChange = this.handleServiceChange.bind(this);
	this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
	let url = `/sigat-api/otrs/services/index`

	/* TODO handle http states [400 | 401 | 500] */
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

	const service = event.target.value;
	this.setState((state, props) => ({
	  comment: (Number(service) === 0) ? '' : state.services[service - 1].comments
	  /* service: service */
	}));

	this.props.onServiceChange(service);
  }

  handleChange(event) {
	event.preventDefault();
	this.props.onDescriptionChange(event.target.value);
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
		  <Form.Select value={this.props.service} onChange={this.handleServiceChange}>
			<option value="0">--- Informe o Serviço Desejado da TI **Se Souber** ---</option>
			{options}
		  </Form.Select>
		  <Form.Text className="text-muted">
			{this.state.comment}
		  </Form.Text>
		</Form.Group>
		<Form.Group className="mb-3" controlId="formDescription">
		  <Form.Label>Descrição</Form.Label>
		  <Form.Control as="textarea" rows={5} value={this.props.description} onChange={this.handleChange} required />
		  <Form.Text className="text-muted">
			Quanto mais detalhes melhor é para nossa equipe te ajudar de forma mais ágil!
		  </Form.Text>
		</Form.Group>
	  </div>
	);
  }
}
