import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
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
    name: 'Solicitante',
    selector: row => row.CustomerID,
    sortable: false,
  },
  {
    name: 'Local',
    selector: row => row.Local,
    sortable: false,
  },
  {
    name: 'Data Abertura',
    selector: row => row.Created,
    sortable: true,
  },
  {
    name: 'Responsável',
    selector: row => row.Responsible,
    sortable: false,
  },
  {
    name: 'Status',
    selector: row => row.State,
    sortable: true,
  },
  {
    name: 'Recarregar?',
    selector: row => row.action,
    sortable: false,
  }
];

const ExpandedComponent = ({data}) => <pre>{data.Title}</pre>;

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
	  data: []
	};

	this.handleProp = this.handleProp.bind(this);
	this.handleChange = this.handleChange.bind(this);

	this.getTicketDetail = this.getTicketDetail.bind(this);
  }

  componentDidMount() {
	console.clear();

	const user = JSON.parse(localStorage.getItem("user"));
	API.get(`/gestaoti/otrs/list_ticket_by_customer?customer=${user.username}`)
	   .then((response) => {
		 console.debug(response.data);

		 let tickets = response.data.TicketID.map((tid, index) => {
		   return {
			 id: tid,
			 action: <Button variant="outline-primary" onClick={() => this.getTicketDetail(tid) }><span className="bi bi-bezier"></span></Button>,
			 TicketNumber: `Ticket ID ${tid}`,
			 CustomerID: `Carregando dados`,
			 Local: `Carregando dados`,
			 Created: `Carregando dados`,
			 Responsible: `Carregando dados`,
			 State: `Carregando dados`,
			 Title: `TicketID: ${tid} :: `
		   };		   
		 });
		 
		 this.setState({
		   loadingData: false,
		   data: tickets
		 });

		 response.data.TicketID.map((tid, index) => {
		   this.getTicketDetail(tid);		   
		 });
	   })
	   .catch((error) => {
		 console.log("Error with getting customer tickets");
		 console.error(error);
	   })
	;
  }

  getTicketDetail(ticketId) {
	API.get(`/gestaoti/otrs/get_ticket?ticket_id=${ticketId}`)
	   .then((response) => {
		 console.log(`getTicketDetail for ${ticketId}`);
		 /* console.log(response.data.Ticket[0]); */

		 let ticket = {
		   id: ticketId,
		   action: <Button variant="outline-info" onClick={() => this.getTicketDetail(ticketId) }><span className="bi bi-bezier"></span></Button>,
		   TicketNumber: response.data.Ticket[0].TicketNumber,
		   CustomerID: response.data.Ticket[0].CustomerID,
		   Local: 'TODO implement it!',
		   Created: response.data.Ticket[0].Created,
		   Responsible: response.data.Ticket[0].Responsible,
		   State: response.data.Ticket[0].State,
		   Title: `TicketID ${ticketId} -- ${response.data.Ticket[0].Title}`
		 };

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
				{/* <Nav.Link href="#generic-data-ticket">Informações Gerais</Nav.Link> */}
				{/* <Nav.Link href="#detail-data-ticket">Detalhes</Nav.Link> */}
				<Nav.Link as={Link} to="/">Abrir Chamado</Nav.Link>
			  </Nav>
			  {/* <Form className="d-flex" onSubmit={this.handleSearch}>
				  <Navbar.Text className="me-3">Ticket</Navbar.Text>
				  <FormControl
				  type="search"
				  placeholder="ex: 2022021402000014"
				  className="me-1"
				  aria-label="Search"
				  value={this.state.TicketNumber}
				  onChange={this.handleChange}
				  />
				  <Button variant="outline-success" onClick={this.handleSearch}>Pesquisar</Button>
				  </Form> */}
			  {/* <Nav>
				  <Nav.Link as={Link} to="/">Abrir Chamado</Nav.Link>
				  </Nav> */}
			  <Nav>
				<UserBadge isLoggedIn={this.state.isLoggedIn} isLoggedInMessage={this.state.isLoggedInMessage} onIsLoggedInChange={this.handleProp} />
			  </Nav>
			</Navbar.Collapse>
		  </Container>
		</Navbar>
		<div className="container" >
	      {/* <Ticket key={this.state.TicketID} TicketID={this.state.TicketID} searchResult={this.state.searchResult} /> */}




		  <br />
		  <DataTable
			columns={columns}
			data={this.state.data}
			expandableRows
			expandableRowsComponent={ExpandedComponent}
			pagination
			progressPending={this.state.loadingData}
		  />

		</div>
	  </div>
	);
  }
}
