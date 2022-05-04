import React from 'react';
import Button from 'react-bootstrap/Button';
import API from './Api';
import {login} from './Api';
import {logout} from './Api';

export default class ApiPlaygroung extends React.Component {
  constructor(props) {
	super(props);

	this.handleProtectedData = this.handleProtectedData.bind(this);
	this.handleUnprotectedData = this.handleUnprotectedData.bind(this);
	this.handleAPIProtected = this.handleAPIProtected.bind(this);
	this.handleAPIUnprotected = this.handleAPIUnprotected.bind(this);
  }

  handleProtectedData(event) {
	event.preventDefault();

	const reactProps = this.props;

	console.clear();
	
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

			reactProps.onUserStatusChange('isLoggedIn', false);
			reactProps.onUserStatusChange('isLoggedInMessage', 'Sessão expirada!');

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

	console.clear();

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

  handleAPIProtected(event) {
	console.clear();
	const reactProps = this.props;
	API.get('/sigat-api/sim/show_sim_asset/307005')
	   .then((response) => {
		 console.log('Axios handle success response - PROTECTED DATA');
		 console.log(response);
		 console.log(response.data);
	   })
	   .catch(function (error) {
		 reactProps.onUserStatusChange('isLoggedIn', false);
		 reactProps.onUserStatusChange('isLoggedInMessage', 'Sessão expirada!');
		 console.log('HANDLE error api Protected');
	   });
  }

  // Not make sense call unprotected by API: API forces send credentials.
  handleAPIUnprotected(event) {
	console.clear();
	/* console.log(`call login: ${login()}`);
	   console.log(`call login: ${logout()}`); */

	const reactProps = this.props;
	API.get('/sigat-api/sim/search_sim_asset')
	   .then((response) => {
		 console.log('Axios handle success response - UNprotected DATA');
		 console.log(response);
		 console.log(response.data);
	   })
	   .catch(function (error) {
		 reactProps.onUserStatusChange('isLoggedIn', false);
		 reactProps.onUserStatusChange('isLoggedInMessage', 'Sessão expirada!');
		 console.log('error api UNprotected');
	   });
  }

  render() {
	return (
	  <>
	  &nbsp;<Button onClick={this.handleProtectedData} variant="outline-warning"><span className="bi bi-door-open"></span></Button>&nbsp;<Button onClick={this.handleUnprotectedData} variant="outline-dark"><span className="bi bi-door-closed"></span></Button>&nbsp;<Button onClick={this.handleAPIUnprotected} variant="outline-info"><span className="bi bi-bezier"></span></Button>&nbsp;<Button onClick={this.handleAPIProtected} variant="primary"><span className="bi bi-bezier"></span></Button>
	  </>
	);
  }
}
