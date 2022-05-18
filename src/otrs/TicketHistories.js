import React from 'react';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';

export default class TicketHistories extends React.Component {
  constructor(props) {
	super(props);

	this.state = {
	  histories: props.histories
	};
  }

  render() {
	const hist = this.state.histories.map((history, index) => {
	  return <tr key={index}>
		<td>{history.CreateTime}</td>
		<td><Badge bg="info">{history.HistoryType}</Badge></td>
	  </tr>;
	});
	/* TODO group by creation time as is done in OTRS - Filtrar as datas; pelas datas, filtrar os registros e montar uma exibição dessa filtragem */
	
	return (
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
	);
  }
}
