import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

export default class UserBadge extends React.Component {
  constructor(props) {
	super(props);

	this.state = {
	  show: false
	}

	this.handleLogin = this.handleLogin.bind(this);
	this.handleLogout = this.handleLogout.bind(this);
	this.handleShow = this.handleShow.bind(this);
	this.handleClose = this.handleClose.bind(this);

	this.handleProtectedData = this.handleProtectedData.bind(this);
	this.handleUnprotectedData = this.handleUnprotectedData.bind(this);
  }

  handleLogin(event) {
	event.preventDefault();

	const data = {
	  user: {
		username: document.getElementById('txtUsername').value,
		password: document.getElementById('txtPassword').value
	  }
	}
	
	let url = "/sigat-api/users/sign_in";
	fetch(url, {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(data)
	}).then((response) => {
	  if (response.ok) {
		localStorage.setItem("token", response.headers.get("Authorization"));
	  } else {
		console.error(response);
		console.log("Login failed");
		throw new Error(response);
	  }

	  return response.json();
	}).then(data => {
	  localStorage.setItem("user", JSON.stringify(data));
	  this.props.onIsLoggedInChange('isLoggedIn', true);
	  this.setState({
		show: false
	  });
	}).catch((err) => console.error(err));
  }

  handleLogout(event) {
	event.preventDefault();

	let url = "/sigat-api/users/sign_out";
	fetch(url, {
	  method: 'DELETE',
	  headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Authorization': localStorage.getItem("token")
	  }
	}).then((response) => {
	  if (response.ok) {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		this.props.onIsLoggedInChange('isLoggedIn', false);
		this.props.onIsLoggedInChange('isLoggedInMessage', '');
	  } else {
		console.error(response);
		console.log("Logout failed");
		throw new Error(response);
	  }

	  return response.text();
	}).then(data => console.log(data))
	  .catch((err) => console.error(err));
  }

  handleShow(event) {
	this.setState({show: true});
  }

  handleClose(event) {
	this.setState({show: false});
  }

  handleProtectedData(event) {
	event.preventDefault();
	let url = "/sigat-api/sim/show_sim_asset/307005";
	fetch(url, {
	  method: 'GET',
	  headers: {
		'Content-Type': 'application/json',
		'Authorization': localStorage.getItem('token')
	  }
	})
	  .then((response) => {
		console.log(response);

		if (response.ok) {
		  console.log("RESPONSE OK");
		  return response.json();
		} else {
		  console.log("RESPONSE nok");
		  if (response.status == 401) {
			console.log("Not authorized. Need login again!");

			localStorage.removeItem("token");
			localStorage.removeItem("user");
			this.props.onIsLoggedInChange('isLoggedIn', false);
			this.props.onIsLoggedInChange('isLoggedInMessage', 'Sessão expirada!');

			return response.text();
		  } else {
			console.log("generic error BACKEND!!");
			return response.json();
		  }
		}
	  })
	  .then(data => {
		console.log(data);
		console.log("Handling test protected route!");
	  })
	  .catch((err) => {
		console.log("catch error client-side");
		console.error(err);
	  });
  }

  handleUnprotectedData(event) {
	event.preventDefault();
	let url = "/sigat-api/sim/search_sim_asset";
	fetch(url, {
	  method: 'GET',
	  headers: {
		'Content-Type': 'application/json',
		'Authorization': localStorage.getItem('token')
	  }
	})
	  .then((response) => {
		console.log(response);
		console.log("TODO get other use cases like error or login unauthorized");

		return response.json();
	  })
	  .then(data => {
		console.log(data);
		console.log("TODO do something with data response");
	  });
  }

  render() {
	const test_buttons = (process.env.REACT_APP_ENVIRONMENT === "development") ? <>&nbsp;<Button onClick={this.handleProtectedData} variant="outline-warning"><span className="bi bi-door-open"></span></Button>&nbsp;<Button onClick={this.handleUnprotectedData} variant="outline-dark"><span className="bi bi-door-closed"></span></Button></> : '';
	const isLoggedIn = this.props.isLoggedIn;
	let button;
	const user = JSON.parse(localStorage.getItem("user"));

	/* TODO use a good UI (alredy btn btn-primary) with Nav.Link history function */
	if (isLoggedIn) {
	  button = <>
		Olá <Badge bg="info">{user.username}</Badge>!&nbsp;<a className="btn btn-danger" href="/logout" onClick={this.handleLogout}>Logout <span className="bi bi-door-closed"></span></a>
	  </>;
	} else {
	  button = <>
		<Badge bg="warning">
		  {this.props.isLoggedInMessage}
		</Badge>
		&nbsp;
		<Button variant="primary" onClick={this.handleShow}>
          Login&nbsp; <span className="bi bi-door-open"></span>
		</Button>
		<Modal show={this.state.show} onHide={this.handleClose}>
		  <Modal.Header closeButton>
			<Modal.Title>Acesso a Área Restrita</Modal.Title>
		  </Modal.Header>
		  <Modal.Body>
			<Form className="container" onSubmit={this.handleLogin}>
			  <Form.Group className="mb-3" controlId="txtUsername">
				<Form.Label>Usuário</Form.Label>
				<Form.Control placeholder="Usuário da Rede" aria-label="Usuário da Rede" required defaultValue={process.env.REACT_APP_SIGAT_API_USER} />
				<Form.Text className="text-muted">
				  É o mesmo utilizado para o logon na rede MS Windows.
				</Form.Text>
			  </Form.Group>
			  <Form.Group className="mb-3" controlId="txtPassword">
				<Form.Label>Senha</Form.Label>
				<Form.Control type="password" placeholder="Password" required defaultValue={process.env.REACT_APP_SIGAT_API_PASSWORD} />
			  </Form.Group>
			  <Button variant="primary" type="submit">
				Enviar
			  </Button>
			</Form>
		  </Modal.Body>
		  <Modal.Footer>.
			<Button variant="secondary" onClick={this.handleClose}>
			  Cancelar
			</Button>
		  </Modal.Footer>
		</Modal>
	  </>;
	}

	return (
	  <div>
		{button}{test_buttons}
	  </div>
	);
  }
}
