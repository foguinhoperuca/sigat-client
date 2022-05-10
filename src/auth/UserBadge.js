import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import ApiPlayground from './ApiPlayground';

/* TODO set token as property of user */
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

  render() {
	const test_buttons = (process.env.REACT_APP_ENVIRONMENT === "development") ? <ApiPlayground onUserStatusChange={this.props.onIsLoggedInChange} /> : '';
	const isLoggedIn = this.props.isLoggedIn;
	let button;
	const user = JSON.parse(localStorage.getItem("user"));

	/* TODO use a good UI (already btn btn-primary) with Nav.Link history function */
	if (isLoggedIn) {
	  button = <>
		Olá <Badge bg="info">{user.username}</Badge>!&nbsp;<a className="btn btn-danger btn-sm" href="/logout" onClick={this.handleLogout}><span className="bi bi-arrow-down"></span><span className="bi bi-door-closed"></span></a>
	  </>;
	} else {
	  button = <>
		<Badge bg="warning">
		  {this.props.isLoggedInMessage}
		</Badge>
		&nbsp;
		<Button variant="primary" onClick={this.handleShow}>
          <span className="bi bi-arrow-up"></span><span className="bi bi-door-open"></span>
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
