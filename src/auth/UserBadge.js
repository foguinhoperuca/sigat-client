import React from 'react';
import logopms from '../images/logo_pms.png';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export default class UserBadge extends React.Component {
  constructor(props) {
	super(props);

	this.state = {
	  isLoggedIn: localStorage.getItem("token") !== null
	}

	this.handleLogout = this.handleLogout.bind(this);
	this.handleLink = this.handleLink.bind(this);
  }

  handleLogout(event) {
	event.preventDefault();

	console.log("Logout logic goes here");

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
		console.log(response);
		console.log("TODO get other use cases like error or login unauthorized");

		localStorage.removeItem("token");
		this.setState({
		  isLoggedIn: false
		});

		return response.json();
	  })
	  .then(data => {
		console.dir(data);
		console.log("TODO do something with data response");
		console.log(localStorage.getItem("token"));
	  });
  }

  handleLink(event) {
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

  render() {
	const isLoggedIn = this.state.isLoggedIn;
	let button;

	if (isLoggedIn) {
	  button = <a className="btn btn-danger" href="/logout" onClick={this.handleLogout}>Logout</a>;
	} else {
	  button = <a className="btn btn-primary" href="/login">Login</a>;
	}

	return (
	  <div>
		{button}&nbsp;<a onClick={this.handleLink} className="btn btn-warning">Obter Dados Protegidos</a>
	  </div>
	);
  }
}
