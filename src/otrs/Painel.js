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
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import logopms from '../images/logo_pms.png';
import DataTable from 'react-data-table-component';
import API from '../auth/Api';
import UserBadge from '../auth/UserBadge';
import CIComputer from './CIComputer';
import CILocation from './CILocation';
import TicketDetails from './TicketDetails';
import TicketHistories from './TicketHistories';
import Articles from './Articles';

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

export default class Painel extends React.Component {
  constructor(props) {
	super(props);
	
	this.state = {
	  isLoggedIn: localStorage.getItem("token") != null,
	  isLoggedInMessage: '',
	  loadingData: true,
	  data: [],
	  histories: [],
	  locations: [],
	  computers: []
	};

	this.handleProp = this.handleProp.bind(this);
	this.handleMergeProp = this.handleMergeProp.bind(this);
	this.fetchData = this.fetchData.bind(this);
	this.expandedComponent = this.expandedComponent.bind(this);
	this.getTicketDetail = this.getTicketDetail.bind(this);
  }

  componentDidMount() {
	if (this.state.isLoggedIn) {
	  this.fetchData();
	} else {
	  console.log("ComponentDidMount not logged in!!");
	}
  }

  fetchData() {
	const user = JSON.parse(localStorage.getItem("user"));

	API.get(`/sigat-api/otrs/tickets/index?customer=${user.username}`)
	   .then((response) => {
		 console.log(response.data);
		 console.log(response.data.TicketID == undefined);

		 let tickets = [];
		 let histories = [];
		 let locations = [];
		 let computers = [];

		 if (response.data.TicketID == undefined) {
		   this.setState({
			 loadingData: false,
			 data: [{
			   id: 0,
			   action: <span className="bi bi-bug"></span>,
			   TicketNumber: <span className="bi bi-bug"></span>,
			   Created: <span className="bi bi-bug"></span>,
			   Owner: <span className="bi bi-bug"></span>,
			   State: <span className="bi bi-bug"></span>
			 }]
		   });
		 } else {
		   response.data.TicketID.forEach((tid) => {
			 tickets.push({
			   id: tid,
			   action: <Button variant="outline-primary" onClick={() => this.getTicketDetail(tid) }><span className="bi bi-bezier"></span></Button>,
			   TicketNumber: `Ticket ID ${tid}`,
			   Created: <Spinner animation="border" role="status" variant="info" size="sm"><span className="visually-hidden">Loading...</span></Spinner>,
			   Owner: <Spinner animation="border" role="status" variant="info" size="sm"><span className="visually-hidden">Loading...</span></Spinner>,
			   State: <Spinner animation="border" role="status" variant="info" size="sm"><span className="visually-hidden">Loading...</span></Spinner>
			 });

			 histories.push({
			   TicketID: tid,
			   histories: []
			 });

			 locations.push({
			   TicketID: tid,
			   locations: []
			 });

			 computers.push({
			   TicketID: tid,
			   computers: []
			 });
		   });

		   this.setState({ loadingData: false, data: tickets, histories: histories, locations: locations, computers: computers }, () => {
			 response.data.TicketID.forEach((tid) => {
			   this.getTicketDetail(tid);
			 });
		   });
		 }
	   })
	   .catch((error) => {
		 console.log("Error with getting customer tickets");
		 console.error(error);
	   })
	;
  }

  expandedComponent({data}) {
	return (
	  <>
		<Tabs defaultActiveKey="info" id="painel" className="mb-3">
		  <Tab eventKey="info" title="Informações">
			<TicketDetails data={data} />
		  </Tab>
		  <Tab eventKey="location" title="Unidades Associadas">
			<CILocation ticketId={data.TicketID} locations={this.state.locations.filter((item) => item.TicketID == data.id)[0].locations} onLoadLocations={this.handleMergeProp} />
		  </Tab>
		  <Tab eventKey="equipment" title="Equipamentos">
			<CIComputer ticketId={data.TicketID} computers={this.state.computers.filter((item) => item.TicketID == data.id)[0].computers} onLoadComputers={this.handleMergeProp} />
		  </Tab>
		  <Tab eventKey="description" title="Interações" >
			<Articles articles ={data.Article} />
		  </Tab>
		  <Tab eventKey="customerService" title="Atendimento">
			{/* FIXME this code is exploding sometimes: filter is not working - some times data can't get by and undefined.map occurs... */}
			<TicketHistories ticketId={data.TicketID} histories={this.state.histories.filter((item) => item.TicketID == data.id)[0].histories} onLoadMergeProp={this.handleMergeProp} />
		  </Tab>
		</Tabs>
	  </>
	);
  }

  // FIXME when loading, fields with "loading" placeholder isn't updating - occurs only when tab is open before dynamic loading
  getTicketDetail(ticketId) {
	API.get(`/sigat-api/otrs/tickets/show?ticket_id=${ticketId}&all_articles=true`)
	   .then((response) => {
		 let ticket = null;

		 if (Object.keys(response.data.sigatapi_errors).length !== 0) {
		   console.log("Error getting data from backend!");
		   ticket = {
			 id: ticketId,
			 action: <Button variant="outline-primary" onClick={() => this.getTicketDetail(ticketId) }><span className="bi bi-bezier"></span></Button>,
			 TicketNumber: <span className="bi bi-bug"></span>,
			 Created: <span className="bi bi-bug"></span>,
			 Owner: <span className="bi bi-bug"></span>,
			 State: <span className="bi bi-bug"></span>
		   }
		 } else {
		   ticket = {
			 id: ticketId,
			 action: <Button variant="outline-info" onClick={() => this.getTicketDetail(ticketId) }><span className="bi bi-bezier"></span></Button>
		   };
		   ticket = {...response.data.Ticket[0], ...ticket};
		 }

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

  handleProp(prop, value) {
	this.setState({[prop]: value}, () => {
	  /* TODO implement function signature with a callback. */
	  if (prop == 'isLoggedIn' && value == true)
		this.fetchData();
	});
  }

  handleMergeProp(prop, value, tid) {
	this.setState((state, props) => {
	  return {
		[prop]: state[prop].map((item) => (item.TicketID == tid) ? {...item, [prop]: value} : item)
	  };
	});
  }

  render() {
	const panel = (this.state.isLoggedIn) ? <DataTable columns={columns} data={this.state.data} expandableRowsComponent={this.expandedComponent} expandableRows pagination /> : <><br /><Alert variant="danger">Efetue o login antes de enviar o chamado para triagem!</Alert></>;
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
				<Button variant="outline-warning" onClick={() => this.fetchData() }><span className="bi bi-bezier"></span> Recarregar</Button>
			  </Nav>
			  <Nav>
				<UserBadge isLoggedIn={this.state.isLoggedIn} isLoggedInMessage={this.state.isLoggedInMessage} onIsLoggedInChange={this.handleProp} />
			  </Nav>
			</Navbar.Collapse>
		  </Container>
		</Navbar>
		<div className="container">
		  {panel}
		</div>
	  </div>
	);
  }
}
