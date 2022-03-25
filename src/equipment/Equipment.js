import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

export default class Equipment extends React.Component {
  constructor(props) {
	super(props)
	this.state = {
	  numRegistro: props.numRegistro,
	  descrBem: null,
	  isValid: false,
	  validate_class_name: null
	};

	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleSearch = this.handleSearch.bind(this);
	this.handleDestroy = this.handleDestroy.bind(this);
  }

  componentDidMount() {
	if (this.state.numRegistro !== undefined) {
	  let patr = `/gestaoti/reports/show_sim_assets/${this.state.numRegistro}.json`;

	  this.setState({
		descrBem: <Spinner animation="border" role="status" variant="info" size="sm"><span className="visually-hidden">Loading...</span></Spinner>
	  });

	  fetch(patr)
		.then(response => response.json())
		.then(data => {
		  if (data["numRegistro"] === undefined) {
			this.setState({
			  validate_class_name: "is-invalid",
			  descrBem: "Patrimônio não encontrado!"
			});
		  } else {
			this.setState({
			  numRegistro: data["numRegistro"],
			  descrBem: data["descrBem"],
			  isValid: true,
			  validate_class_name: "is-valid"
			});
		  }
		});
	}
  }

  handleChange(event) {
	this.setState({
	  numRegistro: event.target.value,
	  descrBem: null
	});
  }

  handleSubmit(event) {
	event.preventDefault();

	let patr = `/gestaoti/reports/show_sim_assets/${this.state.numRegistro}.json`;

	this.setState({
	  descrBem: <Spinner animation="border" role="status" variant="info" size="sm"><span className="visually-hidden">Loading...</span></Spinner>
	});

	fetch(patr)
	  .then(response => response.json())
	  .then(data => {
		if (data["numRegistro"] === undefined) {
		  this.setState({
			validate_class_name: "is-invalid",
			descrBem: "Patrimônio não encontrado!"
		  });
		} else {
		  this.setState({
			numRegistro: data["numRegistro"],
			descrBem: data["descrBem"],
			isValid: true,
			validate_class_name: "is-valid"
		  });
		}
	  });
  }

  handleSearch(event) {
	event.preventDefault();
	this.setState({
	  isValid: false,
	  descrBem: null,
	  validate_class_name: null
	});

	console.log("TODO implement validation by descrBem!!");
  }

  handleDestroy(event) {
	event.preventDefault();
	this.props.onDestroyArbitraryEquipment(this.props.equipmentsIndex);
  }

  render() {
	return (
	  <div>
		<Form.Group className="mb-3" controlId="formEquipment">
		  <InputGroup className="mb-3" hasValidation>
			<InputGroup.Text id="basic-addon1" onClick={this.handleSearch}>pms-</InputGroup.Text>
			<FormControl
			placeholder="Patrimônio"
			name="txtEquipment"
			onChange={this.handleChange}
			disabled={this.state.isValid}
			className={this.state.validate_class_name}
			value={this.state.numRegistro}
			required
			/>
			<Button disabled={this.state.isValid} variant="info" onClick={this.handleSubmit}>
			  <span className="bi bi-search"></span>
			</Button>
			<Button id="btnEditSearch" variant="warning" onClick={this.handleSearch} className="bi bi-pencil-square"></Button>
			{/* TODO implement local delete */}
			<Button id="btnEditDestroy" variant="danger" onClick={this.handleDestroy} className="bi bi-trash">{this.props.equipmentsIndex}</Button>
		  </InputGroup>
		  {this.state.descrBem}
		  <br />
		  <Form.Text className="text-muted">
			Somente equipamentos da Prefeitura ou serviço relacionados as atividades da Prefeitura serão atendidos.
		  </Form.Text>
		</Form.Group>
	  </div>
	);
  }
}
