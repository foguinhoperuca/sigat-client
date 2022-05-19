import React from 'react';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import API from '../auth/Api';

export default class TicketHistories extends React.Component {
  constructor(props) {
	super(props);

	this.state = {
	  ticketId: props.ticketId,
	  histories: props.histories
	};

	this.getHistories = this.getHistories.bind(this);
  }

  componentDidMount() {
	if (this.state.histories.length == 0) {
	  this.getHistories();
	}
  }

  getHistories() {
	API.get(`/sigat-api/otrs/tickets/history?ticket_id=${this.state.ticketId}`)
	   .then((response) => {
		 let histories = [{
		   CreateTime: <span className="bi bi-bug"></span>,
		   HistoryType: <span className="bi bi-bug"></span>
		   
		 }];

		 if ((Object.keys(response.data.sigatapi_errors)).length === 0)
		   histories = response.data.TicketHistory[0].History;
		 
		 /* FIXME catch backend's exception - cannot read properties of undefined (reading '0') --> HTTP 500 is returned and then explodes here!! */
		 this.props.onLoadMergeProp('histories', histories, this.state.ticketId);
		 this.setState({histories: histories});
	   })
	   .catch((error) => {
		 console.log(`Error getting Histories: ID ${this.state.ticketId} `);
		 console.log(error);
	   })
	;
  }

  render() {
	const hist = this.state.histories.map((history, index) => {
	  return <tr key={index}>
		<td>{history.CreateTime}</td>
		<td><Badge bg="info">{history.HistoryType}</Badge></td>
	  </tr>;
	});
	/* TODO group by creation time as is done in OTRS - Filtrar as datas; pelas datas, filtrar os registros e montar uma exibição dessa filtragem */

	return (<div>
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
	  <Button size ="sm" variant="outline-warning" onClick={() => this.getHistories() }><span className="bi bi-bezier"></span> Recarregar!</Button>
	</div>);
  }
}
