import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

export default class TicketDetails extends React.Component {
  constructor(props) {
	super(props);

	this.state = {
	  data: props.data
	};
  }

  render() {
	return (
	  <Tab.Container id="left-tabs-example" defaultActiveKey="first">
		<Row>
		  <Col sm={3}>
			<Nav variant="pills" className="flex-column">
			  <Nav.Item>
				<Nav.Link eventKey="first">Geral</Nav.Link>
			  </Nav.Item>
			  <Nav.Item>
				<Nav.Link eventKey="second">Detalhes</Nav.Link>
			  </Nav.Item>
			</Nav>
		  </Col>
		  <Col sm={9}>
			<Tab.Content>
			  <Tab.Pane eventKey="first">
				<h4>{this.state.data.Title}<small>&nbsp;<Badge pill bg="secondary">{this.state.data.TicketID}</Badge></small></h4>
				<Row>
				  <Col sm="3">
					<Form.Group className="mb-3" controlId="formPlaintextEmail">
					  <Form.Label column sm="2">Estado</Form.Label>
					  <Form.Control readOnly defaultValue={this.state.data.State} />
					</Form.Group>
				  </Col>
				  <Col sm="3">
					<Form.Group className="mb-3" controlId="formPlaintextEmail">
					  <Form.Label column sm="2">Fila</Form.Label>
					  <Form.Control readOnly defaultValue={this.state.data.Queue} />
					</Form.Group>
				  </Col>
				  <Col sm="3">
					<Form.Group className="mb-3" controlId="formPlaintextEmail">
					  <Form.Label column sm="2">Abertura</Form.Label>
					  <Form.Control readOnly defaultValue={this.state.data.Created} />
					</Form.Group>
				  </Col>
				  <Col sm="3">
					<Form.Group className="mb-3" controlId="formPlaintextEmail">
					  <Form.Label column sm="2">Proprietário</Form.Label>
					  <Form.Control readOnly defaultValue={this.state.data.Owner} />
					</Form.Group>
				  </Col>
				</Row>
				<Row>
				  <Col sm="3">
					<Form.Group className="mb-3" controlId="formPlaintextEmail">
					  <Form.Label column sm="2">Prioridade</Form.Label>
					  <Form.Control readOnly defaultValue={this.state.data.Priority} />
					</Form.Group>
				  </Col>
				  <Col sm="3">
					<Form.Group className="mb-3" controlId="formPlaintextEmail">
					  <Form.Label column sm="2">Alteração</Form.Label>
					  <Form.Control readOnly defaultValue={this.state.data.Changed} />
					</Form.Group>
				  </Col>
				  <Col sm="3">
					<Form.Group className="mb-3" controlId="formPlaintextEmail">
					  <Form.Label column sm="2">Trancado?</Form.Label>
					  <Form.Control readOnly defaultValue={this.state.data.Lock} />
					</Form.Group>
				  </Col>
				  <Col sm="3">
					<Form.Group className="mb-3" controlId="formPlaintextEmail">
					  <Form.Label column sm="2">Tipo</Form.Label>
					  <Form.Control readOnly defaultValue={this.state.data.Type} />
					</Form.Group>
				  </Col>
				</Row>
				<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
				  <Form.Label column sm="2">Solicitante</Form.Label>
				  <Form.Control readOnly defaultValue={this.state.data.CustomerID} />
				</Form.Group>
			  </Tab.Pane>
			  <Tab.Pane eventKey="second">
				<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
				  <Form.Label column sm="2">TicketID</Form.Label>
				  <Col sm="10"><Form.Control readOnly defaultValue={this.state.data.TicketID} /></Col>
				</Form.Group>
				<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
				  <Form.Label column sm="2">Número do Ticket</Form.Label>
				  <Col sm="10"><Form.Control readOnly defaultValue={this.state.data.TicketNumber} /></Col>
				</Form.Group>
				<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
				  <Form.Label column sm="2">Responsável</Form.Label>
				  <Col sm="10"><Form.Control readOnly defaultValue={this.state.data.Responsible} /></Col>
				</Form.Group>
				<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
				  <Form.Label column sm="2">Usuário Solicitante</Form.Label>
				  <Col sm="10"><Form.Control readOnly defaultValue={this.state.data.CustomerUserID} /></Col>
				</Form.Group>
			  </Tab.Pane>
			</Tab.Content>
		  </Col>
		</Row>
	  </Tab.Container>
	);
  }
}
