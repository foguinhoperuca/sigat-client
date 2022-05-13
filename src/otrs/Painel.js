import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
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
	  histories: [],
	  locations: []
	};

	this.handleProp = this.handleProp.bind(this);
	this.handleChange = this.handleChange.bind(this);

	this.getTicketDetail = this.getTicketDetail.bind(this);
	this.getTicketHistory = this.getTicketHistory.bind(this);
	this.getLocations = this.getLocations.bind(this);

	this.inspectState = this.inspectState.bind(this);
	this.expandedComponent = this.expandedComponent.bind(this);
  }

  inspectState() {
	console.clear();
	console.log("--- data ---");
	console.log(this.state.data);
	console.log("--- history ---");
	console.log(this.state.histories);
	console.log("--- location ---");
	console.log(this.state.locations);
  }

  componentDidMount() {
	const user = JSON.parse(localStorage.getItem("user"));
	API.get(`/gestaoti/otrs/list_ticket_by_customer?customer=${user.username}`)
	   .then((response) => {
		 console.debug(response.data);

		 let tickets = [];
		 let histories = [];
		 let locations = [];
		 response.data.TicketID.forEach((tid) => {
		   tickets.push({
			 id: tid,
			 action: <Button variant="outline-primary" onClick={() => this.getTicketDetail(tid) }><span className="bi bi-bezier"></span></Button>,
			 TicketNumber: `Ticket ID ${tid}`,
			 Created: `Carregando dados`,
			 Owner: `Carregando dados`,
			 State: `Carregando dados`
		   });

		   histories.push({
			 TicketID: tid,
			 History: null
		   });

		   locations.push({
			 TicketID: tid,
			 Locations: null
		   });
		 });

		 this.setState({ loadingData: false, data: tickets, histories: histories, locations: locations }, () => {
		   response.data.TicketID.forEach((tid) => {
			 this.getTicketDetail(tid);

			 this.getTicketHistory(tid);

			 /* TODO implement search location's id backend */
			 this.getLocations(tid);
		   });
		 });
	   })
	   .catch((error) => {
		 console.log("Error with getting customer tickets");
		 console.error(error);
	   })
	;
  }

  expandedComponent({data}) {
	/* FIXME this code is exploding sometimes: filter is not working - some times data can't get by and undefined.map occurs... */
	const hist = this.state.histories.filter((item) => item.TicketID == data.id)[0].History.map((history, index) => {
	  return <tr key={index}>
		<td>{history.CreateTime}</td>
		<td><Badge bg="info">{history.HistoryType}</Badge></td>
	  </tr>;
	  /* return <div key={index}>
		 <Row>
		 <Col sm="6">
		 <Form.Group className="mb-3" controlId="historyCreateTime">
		 <Form.Label column sm="2">Data Alteração</Form.Label>
		 <Form.Control readOnly defaultValue={history.CreateTime} />
		 </Form.Group>
		 </Col>
		 <Col sm="6">
		 <Form.Group className="mb-3" controlId="historyHistoryType">
		 <Form.Label column sm="2">Tipo Alteração</Form.Label>
		 <Form.Control readOnly defaultValue={history.HistoryType} />
		 </Form.Group>
		 </Col>
		 </Row>
		 <hr />
		 </div>; */
	});
	/* TODO group by creation time as is done in OTRS - Filtrar as datas; pelas datas, filtrar os registros e montar uma exibição dessa filtragem */
	/* let groupedByCreationTime;
	   createTimes = this.state.histories.filter((item) => item.TicketID == data.id)[0].History.filter((v, i, a) => a.indexOf(v) === i);
	   createTimes.forEach((createTime) => {
	   filtered =
	   groupedByCreationTime += <>
	   </>;
	   }); */


	let navArticles = "";
	let articles = <pre>Nenhum artigo para exibir!!</pre>;
	let firstArticle = "";
	if (data.Article !== undefined) {
	  navArticles = data.Article.map((article, index) => {
		if (index == 0)
		  firstArticle = `articleId_${article.ArticleID}`;

		return <Nav.Item key={index}><Nav.Link eventKey={`articleId_${article.ArticleID}`}>#{article.ArticleID} de {article.CreateTime}</Nav.Link></Nav.Item>;
	  });
	  articles = data.Article.map((article, index) => {
		return <Tab.Pane eventKey={`articleId_${article.ArticleID}`} key={index}>
		  <Row>
			<Col sm="4">
			  <Form.Group className="mb-3" controlId="articleChangeTime">
				<Form.Label column sm="6">Alterado em</Form.Label>
				<Form.Control readOnly defaultValue={article.ChangeTime} />
			  </Form.Group>
			</Col>
			<Col sm="8">
			  <Form.Group className="mb-3" controlId="articleTo">
				<Form.Label column sm="4">Remetente</Form.Label>
				<Form.Control readOnly defaultValue={article.From} />
			  </Form.Group>
			</Col>
		  </Row>
		  <Form.Group as={Row} className="mb-3" controlId="articleSubject">
			<Form.Label column sm="2">Assunto</Form.Label>
			<Col sm="10"><Form.Control readOnly defaultValue={article.Subject} /></Col>
		  </Form.Group>
		  <Form.Group as={Row} className="mb-3" controlId="articleBody">
			<Form.Label column sm="2">Descrição</Form.Label>
			<Col sm="10"><Form.Control as="textarea" rows={15} value={article.Body} readOnly /></Col>
		  </Form.Group>
	  </Tab.Pane>
	  });
	}

	const locations = this.state.locations.filter((item) => item.TicketID == data.id)[0].Locations;

	let locations_data;
	if (locations.length > 0) {
	  locations_data = this.state.locations.filter((item) => item.TicketID == data.id)[0].Locations.map((location, index) => {
		return <tr key={index}>
		  <td>{location.id}</td>
		  <td>{location.name}</td>
		  <td>{location.configitem_number}</td>
		  <td><Badge bg="info">{location.incident_state}</Badge></td>
		</tr>;
	  });
	} else {
	  locations_data = <tr>
		<td>#N/A</td>
		<td>#N/A</td>
		<td>#N/A</td>
		<td><Badge bg="danger">#N/A</Badge></td>
	  </tr>;
	}

	return <>
	  <Tabs defaultActiveKey="info" id="painel" className="mb-3">
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
		<Tab eventKey="location" title="Unidades Associadas">
		  <Table striped bordered hover>
			<thead>
			  <tr>
				<th>#</th>
				<th>Nome</th>
				<th>Número</th>
				<th>Estado de Incidente</th>
			  </tr>
			</thead>
			<tbody>
			  {locations_data}
			</tbody>
		  </Table>
		</Tab>
		<Tab eventKey="equipment" title="Equipamentos">
		  <pre>Todo show all CIs</pre>
		</Tab>
		<Tab eventKey="description" title="Interações" >
		  <Tab.Container id="articles" defaultActiveKey={firstArticle}>
			<Row>
			  <Col sm={3}>
				<Nav variant="pills" className="flex-column">
				  {navArticles}
				</Nav>
			  </Col>
			  <Col sm={9}>
				<Tab.Content>
				  {articles}
				</Tab.Content>
			  </Col>
			</Row>
		  </Tab.Container>
		</Tab>
		<Tab eventKey="customerService" title="Atendimento">
		  <Table striped bordered hover>
			<thead>
			  <tr>
				<th>Data Alteração</th>
				<th>Tipo Alteração</th>
			  </tr>
			</thead>
			<tbody>
			  {hist}
			</tbody>
		  </Table>
		</Tab>
	  </Tabs>
	</>
  }

  // FIXME when loading, fields with "loading" placeholder isn't updating - occurs only when tab is open before dynamic loading
  getTicketDetail(ticketId) {
	API.get(`/sigat-api/otrs/tickets/show?ticket_id=${ticketId}&all_articles=true`)
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
			 /* FIXME catch backend's exception - cannot read properties of undefined (reading '0') --> HTTP 500 is returned and then explodes here!! */
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

  getLocations(ticketId) {
	API.get(`/sigat-api/otrs/locations/by_ticket?ticket_id=${ticketId}`)
	   .then((response) => {
		 this.setState((state, props) => {
		   return {
			 locations: state.locations.map((item) => (item.TicketID == ticketId) ? {...item, Locations: response.data} : item)
		   }
		 });
	   })
	   .catch((error) => {
		 console.log(`Error getting Location: ID ${ticketId} `);
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
