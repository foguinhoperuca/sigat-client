import React from 'react';

import Equipment from './Equipment';

import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'

export default class MultipleEquipmentForm extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	  addListMessage: ''
	};

	this.closeDialog = this.closeDialog.bind(this);
	this.validateEquipmentRange = this.validateEquipmentRange.bind(this);
	this.generateEquipmentList = this.generateEquipmentList.bind(this);
	this.cleanEquipmentList = this.cleanEquipmentList.bind(this);
	this.handleMultipleEquipments = this.handleMultipleEquipments.bind(this);
  }

  closeDialog() {
	this.props.onCloseEquipmentDialog(false);
  }

  validateEquipmentRange(event) {
	const asset = Number(event.target.value) || null;

	if (isNaN(asset) || asset == null) {
	  event.target.classList.remove("is-valid");
	  event.target.classList.add("is-invalid");
	} else {
	  event.target.classList.remove("is-invalid");
	  event.target.classList.add("is-valid");
	}
  }

  generateEquipmentList(event) {
	event.preventDefault();
	const eqp_start = document.getElementById("txtEquipmentStart");
	const eqp_end = document.getElementById("txtEquipmentEnd");
	const eqp_list = document.getElementById("txtEquipmentList");

	if (!eqp_start.classList.contains("is-valid") || !eqp_end.classList.contains("is-valid")) {
	  this.setState({
		addListMessage: <Alert variant="danger">Somente números!</Alert>
	  });
	} else if (Number(eqp_end.value) <= Number(eqp_start.value)) {
	  this.setState({
		addListMessage: <Alert variant="warning">Patrimônio inicial deve ser maior que o patrimônio final!</Alert>
	  });
	} else {
	  let i = eqp_start.value
	  if (eqp_list.value !== '') {
		eqp_list.value += "\n"
	  }
	  while (i <= eqp_end.value) {
		eqp_list.value += (i !== Number(eqp_end.value)) ? i + "\n" : i;
		i++;
	  }
	  this.setState({
		addListMessage: ''
	  });
	}
  }

  cleanEquipmentList(event) {
	event.preventDefault();

	document.getElementById("txtEquipmentList").value = "";
  }

  handleMultipleEquipments(event) {
	event.preventDefault();

	let eqps = document.getElementById("txtEquipmentList").value.split("\n").map((eqp, index) => {
	  return {
		numRegistro: eqp,
		onDestroyArbitraryEquipment: this.props.onHandleArbitrayEquipmentDelete
	  };
	});

	this.props.onHandleEquipmentAddMultiple(eqps);
	this.props.onCloseEquipmentDialog(false);
  }

  render() {
	return (
	  <div>
		<Modal show={this.props.showEquipmentDialog} onHide={this.closeDialog}>
		  <Modal.Header closeButton>
			<Modal.Title>Adicionar Equipmentos em Lote</Modal.Title>
		  </Modal.Header>
		  <Modal.Body>
			<h4>Faixa</h4>
			<Form.Text className="text-muted">
			  Somente números
			</Form.Text>
			<Form.Group as={Row} className="mb-3">
			  <Col sm="6">
				<Form.Label>Início</Form.Label>
				<InputGroup hasValidation>
				  <InputGroup.Text id="basic-addon1" onClick={this.handleSearch}>pms-</InputGroup.Text>
				  <FormControl id="txtEquipmentStart" placeholder="Patrimônio" aria-label="Patrimônio" name="txtEquipmentStart" className="is-invalid" onChange={this.validateEquipmentRange} />
				</InputGroup>
			  </Col>
			  <Col sm="6">
				<Form.Label>Fim</Form.Label>
				<InputGroup hasValidation>
				  <InputGroup.Text id="basic-addon2" onClick={this.handleSearch}>pms-</InputGroup.Text>
				  <FormControl id="txtEquipmentEnd" placeholder="Patrimônio" aria-label="Patrimônio" name="txtEquipmentEnd" className="is-invalid" onChange={this.validateEquipmentRange} />
				</InputGroup>
			  </Col>
			</Form.Group>
			<Button variant="success" onClick={this.generateEquipmentList}>
			  Adicionar à listagem
			</Button>
			<br />
			<Form.Text className="text-muted">
			  A faixa será adicionada ao final da listagem abaixo.
			</Form.Text>
			{this.state.addListMessage}
			<Form.Group className="mb-3" controlId="txtEquipmentList">
			  <h4>Listagem <Button id="btnEditSearch" variant="danger" onClick={this.cleanEquipmentList} className="bi bi-trash"></Button></h4>
			  <Form.Control as="textarea" rows={5} required />
			  <Form.Text className="text-muted">
				Somente um patrimônio por linha no formato <b>pms-<i>123456</i></b>
			  </Form.Text>
			</Form.Group>
		  </Modal.Body>
		  <Modal.Footer>
			<Button variant="primary" onClick={this.handleMultipleEquipments}>
			  Gerar Lote
			</Button>
		  </Modal.Footer>
		</Modal>
	  </div>
	);
  }
}
