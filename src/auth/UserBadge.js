import React from 'react';
import logopms from '../images/logo_pms.png';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default class UserBadge extends React.Component {
  constructor(props) {
	super(props);

	this.state = {
	  isLoggedIn: localStorage.getItem("token") != null,
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
	})
	  .then((response) => {
		console.log("TODO do a better handle response with codes: [200 | 400 | 401 | 500]")
		if (response.ok) {
		  localStorage.setItem("token", response.headers.get("Authorization"));
		} else {
		  console.error(response);
		  console.log("Login failed");
		  throw new Error(response);
		}

		return response.json();
	  })
	  .then(data => {
		localStorage.setItem("user", JSON.stringify(data));
		this.setState({
		  show: false,
		  isLoggedIn: true
		});
	  })
	.catch((err) => console.error(err));
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
	})
	  .then((response) => {
		console.log("TODO do a better handle response with codes: [200 | 400 | 401 | 500]")
		if (response.ok) {
		  localStorage.removeItem("token");
		  localStorage.removeItem("user");
		  this.setState({
			isLoggedIn: false
		  });
		} else {
		  console.error(response);
		  console.log("Logout failed");
		  throw new Error(response);
		}

		return response.text();
	  })
	  .then(data => console.log(data))
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
		console.log("TODO get other use cases like error or login unauthorized");

		return response.json();
	  })
	  .then(data => {
		console.log(data);
		console.log("TODO do something with data response");
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
	const isLoggedIn = this.state.isLoggedIn;
	let button;
	const user = JSON.parse(localStorage.getItem("user"));

	if (isLoggedIn) {
	  button = <>
		Olá {user.username}! <a className="btn btn-danger" href="/logout" onClick={this.handleLogout}>Logout</a>
	  </>;
	} else {
	  button = <>
		<Button variant="primary" onClick={this.handleShow}>
          Login
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
		{button}&nbsp;<a onClick={this.handleProtectedData} className="btn btn-warning">Protegido</a>&nbsp;<a onClick={this.handleUnprotectedData} className="btn btn-secondary">Desprotegido</a>
	  </div>
	);
  }
}
