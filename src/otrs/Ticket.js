import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

export default class Ticket extends React.Component {
  constructor(props) {
	super(props);

	this.state = {
	  TicketID: this.props.TicketID,
	  searchResult: this.props.searchResult,
	  alert: null
	};
  }

  componentDidMount() {
	const user = process.env.REACT_APP_OTRS_USER;
	const password = process.env.REACT_APP_OTRS_PASSWORD;
	let url = `/otrs_api/otobo/nph-genericinterface.pl/Webservice/GenericTicketConnectorREST/Ticket/${this.state.TicketID}?UserLogin=${user}&Password=${password}`;

	let alert_class = "";
	switch(this.state.searchResult) {
	  case 'Ticket Encontrado Com Sucesso!':
		alert_class = "success";
		break;
	  case 'Ticket Não Encontrado!':
		alert_class = "danger";
		break;
	  default:
		alert_class = null;
	}
	this.setState({
	  alert: <Alert variant={alert_class}>{this.state.searchResult}</Alert>
	});
	
	if (this.state.TicketID != null)
	  fetch(url)
	  .then(response => response.json())
	  .then(data => {
		console.log("data returned");
		console.log(data);
		if (data.Error === undefined) {
		  console.log(data.Ticket);
		  console.log(data.Ticket[0]);
		  console.log(data.Ticket[0].TicketID);
		  console.log(data.Ticket[0].TicketNumber);
		  this.setState({
			alert: <Alert variant={alert_class}>{this.state.searchResult}</Alert>,
			TicketID: data.Ticket[0].TicketID,
			GroupID: data.Ticket[0].GroupID,
			Queue: data.Ticket[0].Queue,
			Lock: data.Ticket[0].Lock,
			RealTillTimeNotUsed: data.Ticket[0].RealTillTimeNotUsed,
			Priority: data.Ticket[0].Priority,
			ChangeBy: data.Ticket[0].ChangeBy,
			EscalationUpdateTime: data.Ticket[0].EscalationUpdateTime,
			Title: data.Ticket[0].Title,
			Owner: data.Ticket[0].Owner,
			Responsible: data.Ticket[0].Responsible,
			TypeID: data.Ticket[0].TypeID,
			EscalationResponseTime: data.Ticket[0].EscalationResponseTime,
			CreateBy: data.Ticket[0].CreateBy,
			State: data.Ticket[0].State,
			CustomerID: data.Ticket[0].CustomerID,
			PriorityID: data.Ticket[0].PriorityID,
			TimeUnit: data.Ticket[0].TimeUnit,
			UntilTime: data.Ticket[0].UntilTime,
			CustomerUserID: data.Ticket[0].CustomerUserID,
			EscalationSolutionTime: data.Ticket[0].EscalationSolutionTime,
			Changed: data.Ticket[0].Changed,
			TicketNumber: data.Ticket[0].TicketNumber,
			QueueID: data.Ticket[0].QueueID,
			ServiceID: data.Ticket[0].ServiceID,
			ResponsibleID: data.Ticket[0].ResponsibleID,
			Created: data.Ticket[0].Created,
			OwnerID: data.Ticket[0].OwnerID,
			ArchiveFlag: data.Ticket[0].ArchiveFlag,
			EscalationTime: data.Ticket[0].EscalationTime,
			StateType: data.Ticket[0].StateType,
			LockID: data.Ticket[0].LockID,
			StateID: data.Ticket[0].StateID,
			SLAID: data.Ticket[0].SLAID,
			Age: data.Ticket[0].Age,
			UnlockTimeout: data.Ticket[0].UnlockTimeout,
			Type: data.Ticket[0].type
		  });
		} else {
		  console.log(data.Error);
		  console.log(data.Error.ErrorCode);
		  console.log(data.Error.ErrorMessage);
		  this.setState({
			/* TicketID: data.Ticket[0].TicketID, */
			GroupID: data.Error.ErrorMessage,
			Queue: data.Error.ErrorMessage,
			Lock: data.Error.ErrorMessage,
			RealTillTimeNotUsed: data.Error.ErrorMessage,
			Priority: data.Error.ErrorMessage,
			ChangeBy: data.Error.ErrorMessage,
			EscalationUpdateTime: data.Error.ErrorMessage,
			Title: data.Error.ErrorMessage,
			Owner: data.Error.ErrorMessage,
			Responsible: data.Error.ErrorMessage,
			TypeID: data.Error.ErrorMessage,
			EscalationResponseTime: data.Error.ErrorMessage,
			CreateBy: data.Error.ErrorMessage,
			State: data.Error.ErrorMessage,
			CustomerID: data.Error.ErrorMessage,
			PriorityID: data.Error.ErrorMessage,
			TimeUnit: data.Error.ErrorMessage,
			UntilTime: data.Error.ErrorMessage,
			CustomerUserID: data.Error.ErrorMessage,
			EscalationSolutionTime: data.Error.ErrorMessage,
			Changed: data.Error.ErrorMessage,
			TicketNumber: data.Error.ErrorMessage,
			QueueID: data.Error.ErrorMessage,
			ServiceID: data.Error.ErrorMessage,
			ResponsibleID: data.Error.ErrorMessage,
			Created: data.Error.ErrorMessage,
			OwnerID: data.Error.ErrorMessage,
			ArchiveFlag: data.Error.ErrorMessage,
			EscalationTime: data.Error.ErrorMessage,
			StateType: data.Error.ErrorMessage,
			LockID: data.Error.ErrorMessage,
			StateID: data.Error.ErrorMessage,
			SLAID: data.Error.ErrorMessage,
			Age: data.Error.ErrorMessage,
			UnlockTimeout: data.Error.ErrorMessage,
			Type: data.Error.ErrorMessage
		  });
		}
	  });
  }

  render() {
	return (
	  <div>
		<h1>Informações do Ticket</h1>
		O resultado da sua pesquisa é: {this.state.alert}
		<h2 id="generic-data-ticket">Geral</h2>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">TicketID</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.TicketID} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">Número do Ticket</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.TicketNumber} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">Fila</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.Queue} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">Título</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.Title} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">Prioridade</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.Priority} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">Proprietário</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.Owner} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">Responsável</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.Responsible} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">Data da Criação</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.Created} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">Última Alteração</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.Changed} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">Solicitante</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.CustomerID} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">Usuário Solicitante</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.CustomerUserID} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">Estado</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.State} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">Trancado?</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.Lock} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">Tipo</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.Type} /></Col>
		</Form.Group>
		<h2 id="detail-data-ticket">Detalhes</h2>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">Group ID</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.GroupID} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">RealTillTimeNotUsed</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.RealTillTimeNotUsed} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">ChangeBy</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.ChangeBy} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">EscalationUpdateTime</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.EscalationUpdateTime} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">TypeID</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.TypeID} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">EscalationResponseTime</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.EscalationResponseTime} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">CreateBy</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.CreateBy} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">PriorityID</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.PriorityID} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">TimeUnit</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.TimeUnit} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">UntilTime</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.UntilTime} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">EscalationSolutionTime</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.EscalationSolutionTime} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">QueueID</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.QueueID} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">ServiceID</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.ServiceID} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">ResponsibleID</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.ResponsibleID} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">OwnerID</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.OwnerID} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">ArchiveFlag</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.ArchiveFlag} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">EscalationTime</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.EscalationTime} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">StateType</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.StateType} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">LockID</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.LockID} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">StateID</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.StateID} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">SLAID</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.SLAID} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">Age</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.Age} /></Col>
		</Form.Group>
		<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
		  <Form.Label column sm="2">UnlockTimeout</Form.Label>
		  <Col sm="10"><Form.Control readOnly defaultValue={this.state.UnlockTimeout} /></Col>
		</Form.Group>
	  </div>
	);
  }
}
