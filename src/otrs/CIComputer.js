import React from 'react';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import API from '../auth/Api';

export default class CIComputer extends React.Component {
  constructor(props) {
	super(props);

	this.state = {
	  ticketId: props.ticketId,
	  computers: props.computers
	};

	if (this.state.computers.length == 0) {
	  API.get(`/sigat-api/otrs/computers/by_ticket?ticket_id=${this.state.ticketId}`)
		 .then((response) => {
		   this.props.onLoadComputers('computers', response.data, this.state.ticketId);
		   this.setState({computers: response.data});
		 })
		 .catch((error) => {
		   console.log(`Error getting Computer: ID ${this.state.ticketId} `);
		   console.log(error);
		 })
	  ;
	}
  }

  render() {
	let computers_data;

	if (this.state.computers.length > 0) {
	  computers_data = this.state.computers.map((computer, index) => {
		return <tr key={index}>
		  <td>{computer.id}</td>
		  <td>{computer.name}</td>
		  <td>{computer.configitem_number}</td>
		  <td><Badge bg="info">{computer.incident_state}</Badge></td>
		</tr>;
	  });
	} else {
	  computers_data = <tr className="table-danger">
		<td><Badge bg="warning">#N/A</Badge></td>
		<td><Badge bg="warning">#N/A</Badge></td>
		<td><Badge bg="warning">#N/A</Badge></td>
		<td><Badge bg="warning">#N/A</Badge></td>
	  </tr>;
	}

	return (<div>
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
		  {computers_data}
		</tbody>
	  </Table>
	</div>);
  }
}
