import React from 'react';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import API from '../auth/Api';

export default class CILocation extends React.Component {
  constructor(props) {
	super(props);

	this.state = {
	  ticketId: props.ticketId,
	  locations: props.locations
	};

	if (this.state.locations.length == 0) {
	  API.get(`/sigat-api/otrs/locations/by_ticket?ticket_id=${this.state.ticketId}`)
		 .then((response) => {
		   this.props.onLoadLocations('locations', response.data, this.state.ticketId);
		   this.setState({locations: response.data});
		 })
		 .catch((error) => {
		   console.log(`Error getting Location: ID ${this.state.ticketId} `);
		   console.log(error);
		 })
	  ;
	}
  }

  render() {
	let locations_data;

	if (this.state.locations.length > 0) {
	  locations_data = this.state.locations.map((location, index) => {
		return <tr key={index}>
		  <td>{location.id}</td>
		  <td>{location.name}</td>
		  <td>{location.configitem_number}</td>
		  <td><Badge bg="info">{location.incident_state}</Badge></td>
		</tr>;
	  });
	} else {
	  locations_data = <tr className="table-danger">
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
		  {locations_data}
		</tbody>
	  </Table>
	</div>);
  }
}
