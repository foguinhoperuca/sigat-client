import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logopms from '../images/logo_pms.png';

import DataTable from 'react-data-table-component';
import API from '../auth/Api';
import UserBadge from '../auth/UserBadge';

const columns = [
  {
    name: 'Ticket',
    selector: row => row.TicketNumber,
    sortable: true,
  },
  {
    name: 'Local',
    selector: row => row.Local,
    sortable: false,
  },
  {
    name: 'Abertura',
    selector: row => row.Created,
    sortable: true,
  },
  {
    name: 'Agente',
    selector: row => row.Owner,
    sortable: false,
  },
  {
    name: 'Estado',
    selector: row => row.State,
    sortable: true,
  },
  {
    name: 'Recarregar?',
    selector: row => row.action,
    sortable: false,
  }
];

const ExpandedComponent = ({data}) => {

};

/* TODO to smooth out the rough edges:
 * - Verify if user is logged in (client-side)
 * - Handle HTTP 401, 500, etc
 * - Show ticket detail
 * - Integrate with screening (show screening)
 */ 
export default class Painel extends React.Component {
  constructor(props) {
	super(props);
	
	this.state = {
	  isLoggedIn: localStorage.getItem("token") != null,
	  isLoggedInMessage: '',
	  loadingData: true,
	  data: [],
	  histories: []
	};

	this.handleProp = this.handleProp.bind(this);
	this.handleChange = this.handleChange.bind(this);

	this.getTicketDetail = this.getTicketDetail.bind(this);
	this.getTicketHistory = this.getTicketHistory.bind(this);

	this.inspectState = this.inspectState.bind(this);
	this.expandedComponent = this.expandedComponent.bind(this);
  }

  inspectState() {
	console.clear();
	console.log("--- data ---");
	console.log(this.state.data);
	console.log("--- history ---");
	console.log(this.state.histories);
  }

  expandedComponent({data}) {
	let histories = this.state.histories.filter((item) => {
	  return item.TicketID == data.id
	})[0];

	console.log('---------------');
	console.log(data);
	console.log(histories);
	console.log('---------------');

	
	let hist = [];
	/* histories.forEach({(element) =>
	   hist.push();
	   }); */
	
	return <>
	  <Tabs defaultActiveKey="info" id="uncontrolled-tab-example" className="mb-3">
		<Tab eventKey="screening" title="Triagem">
		  <pre>Triagem saved</pre>
		</Tab>
		<Tab eventKey="info" title="Informações">
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
					<h4>{data.Title}</h4>
					{/* <Row>
						<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
						<Form.Label column sm="2">Título</Form.Label>
						<Col sm="10"><Form.Control readOnly defaultValue={data.Title} /></Col>
						</Form.Group>
						</Row> */}
					<Row>
					  <Col sm="3">
						<Form.Group className="mb-3" controlId="formPlaintextEmail">
						  <Form.Label column sm="2">Estado</Form.Label>
						  <Form.Control readOnly defaultValue={data.State} />
						</Form.Group>
					  </Col>
					  <Col sm="3">
						<Form.Group className="mb-3" controlId="formPlaintextEmail">
						  <Form.Label column sm="2">Fila</Form.Label>
						  <Form.Control readOnly defaultValue={data.Queue} />
						</Form.Group>
					  </Col>
					  <Col sm="3">
						<Form.Group className="mb-3" controlId="formPlaintextEmail">
						  <Form.Label column sm="2">Abertura</Form.Label>
						  <Form.Control readOnly defaultValue={data.Created} />
						</Form.Group>
					  </Col>
					  <Col sm="3">
						<Form.Group className="mb-3" controlId="formPlaintextEmail">
						  <Form.Label column sm="2">Proprietário</Form.Label>
						  <Form.Control readOnly defaultValue={data.Owner} />
						</Form.Group>
					  </Col>
					</Row>
					<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					  <Form.Label column sm="2">Solicitante</Form.Label>
					  <Col sm="10"><Form.Control readOnly defaultValue={data.CustomerID} /></Col>
					</Form.Group>
				  </Tab.Pane>
				  <Tab.Pane eventKey="second">
					<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					  <Form.Label column sm="2">TicketID</Form.Label>
					  <Col sm="10"><Form.Control readOnly defaultValue={data.TicketID} /></Col>
					</Form.Group>
					<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					  <Form.Label column sm="2">Número do Ticket</Form.Label>
					  <Col sm="10"><Form.Control readOnly defaultValue={data.TicketNumber} /></Col>
					</Form.Group>


					<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					  <Form.Label column sm="2">Prioridade</Form.Label>
					  <Col sm="10"><Form.Control readOnly defaultValue={data.Priority} /></Col>
					</Form.Group>

					<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					  <Form.Label column sm="2">Responsável</Form.Label>
					  <Col sm="10"><Form.Control readOnly defaultValue={data.Responsible} /></Col>
					</Form.Group>
					<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					  <Form.Label column sm="2">Última Alteração</Form.Label>
					  <Col sm="10"><Form.Control readOnly defaultValue={data.Changed} /></Col>
					</Form.Group>


					<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					  <Form.Label column sm="2">Usuário Solicitante</Form.Label>
					  <Col sm="10"><Form.Control readOnly defaultValue={data.CustomerUserID} /></Col>
					</Form.Group>

					<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					  <Form.Label column sm="2">Trancado?</Form.Label>
					  <Col sm="10"><Form.Control readOnly defaultValue={data.Lock} /></Col>
					</Form.Group>
					<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
					  <Form.Label column sm="2">Tipo</Form.Label>
					  <Col sm="10"><Form.Control readOnly defaultValue={data.Type} /></Col>
					</Form.Group>
				  </Tab.Pane>
				</Tab.Content>
			  </Col>
			</Row>
		  </Tab.Container>
		</Tab>
		<Tab eventKey="customerService" title="Atendimento">
		  <pre>TODO show ticket history</pre>
		  <br />
		  Hist Ticket ID: {histories.TicketID}
		  <br />
		  {hist}
		</Tab>
		<Tab eventKey="equipment" title="Equipamentos">
		  <pre>Todo show all CIs</pre>
		</Tab>
		<Tab eventKey="description" title="Descrição Completa" >
		  <pre>TODO show all articles</pre>
		</Tab>
	  </Tabs>
	</>
  }

  componentDidMount() {
	/* console.clear(); */

	const user = JSON.parse(localStorage.getItem("user"));
	API.get(`/gestaoti/otrs/list_ticket_by_customer?customer=${user.username}`)
	   .then((response) => {
		 console.debug(response.data);

		 let tickets = [];
		 let histories = [];
		 response.data.TicketID.forEach((tid) => {
		   tickets.push({
			 id: tid,
			 action: <Button variant="outline-primary" onClick={() => this.getTicketDetail(tid) }><span className="bi bi-bezier"></span></Button>,
			 TicketNumber: `Ticket ID ${tid}`,
			 Local: `Carregando dados`,
			 Created: `Carregando dados`,
			 Owner: `Carregando dados`,
			 State: `Carregando dados`
		   });

		   histories.push({
			 TicketID: tid,
			 History: null
		   });
		 });

		 this.setState({ loadingData: false, data: tickets, histories: histories }, () => {
		   response.data.TicketID.forEach((tid) => {
			 this.getTicketDetail(tid);

			 this.getTicketHistory(tid);
			 /* console.log(`TODO call CI for ${tid}`);
				console.log(`TODO call SCREENING for ${tid}`); */
		   });
		 });
	   })
	   .catch((error) => {
		 console.log("Error with getting customer tickets");
		 console.error(error);
	   })
	;
  }

  // FIXME when loading, fields with "loading" placeholder isn't updating - occurs only when tab is open before dynamic loading
  getTicketDetail(ticketId) {
	API.get(`/gestaoti/otrs/get_ticket?ticket_id=${ticketId}`)
	   .then((response) => {
		 console.debug(response.data.Ticket[0]);

		 let ticket = {
		   id: ticketId,
		   action: <Button variant="outline-info" onClick={() => this.getTicketDetail(ticketId) }><span className="bi bi-bezier"></span></Button>
		 };
		 ticket = {...response.data.Ticket[0], ...ticket};

		 this.setState((state, props) => {
		   return {
			 data: state.data.map((item) => (item.id == ticketId) ? ticket : item)
		   }
		 });
	   })
	   .catch((error) => {
		 console.log(`Error getting single Ticket: ID ${ticketId} `);
	   })
	;
  }

  getTicketHistory(ticketId) {
	API.get(`/sigat-api/otrs/tickets/history?ticket_id=${ticketId}`)
	   .then((response) => {
		 console.debug(response.data);

		 this.setState((state, props) => {
		   return {
			 histories: state.histories.map((item) => (item.TicketID == ticketId) ? {...item, ...response.data.TicketHistory[0]} : item)
		   }
		 });
	   })
	   .catch((error) => {
		 console.log(`Error getting Ticket History: ID ${ticketId} `);
		 console.log(error);
	   })
	;
  }

  handleProp(prop, value) {
	this.setState({[prop]: value});
  }

  handleChange(event) {
	this.setState({
	  TicketNumber: event.target.value
	});
  }

  render() {
	return (
	  <div className="App">
		<header className="App-header" id="main-header">
		  <img src={logopms} className="App-logopms" alt="logo" />
		  <p>
	        Pesquisa de Chamados
		  </p>
		</header>
		<Navbar bg="light" expand="sm" sticky="top">
		  <Container>
			<Navbar.Brand href="#main-header">SIGAT</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
			  <Nav className="me-auto">
				<Nav.Link as={Link} to="/">Abrir Chamado</Nav.Link>
				<Button variant="outline-success" onClick={this.inspectState}>Inspecionar State</Button>
			  </Nav>
			  <Nav>
				<UserBadge isLoggedIn={this.state.isLoggedIn} isLoggedInMessage={this.state.isLoggedInMessage} onIsLoggedInChange={this.handleProp} />
			  </Nav>
			</Navbar.Collapse>
		  </Container>
		</Navbar>
		<div className="container" >
		  <DataTable
		  columns={columns}
		  data={this.state.data}
		  expandableRows
			expandableRowsComponent={this.expandedComponent}
		  pagination
			progressPending={this.state.loadingData}
		  />
		</div>
	  </div>
	);
  }
}
