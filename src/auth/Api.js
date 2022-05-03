import axios from 'axios';
import moment from 'moment';

/* TODO move auth logic from UserBadge component to here. */
/* FIXME implement as object in module. Export multiple functions */

const tokenLiveTime = 30; // in minutes

// TODO configure axios
const api = axios.create();

api.interceptors.request.use(
  function(config) {
	config.headers["Authorization"] = localStorage.getItem('token');

	return (
	  localStorage.getItem('token') === null
	  || localStorage.getItem('user') === null
	  || moment().isSameOrAfter(moment(JSON.parse(localStorage.getItem('user')).updated_at).add(tokenLiveTime, 'minutes'))
	) ? Promise.reject('INTERCEPTED that user is not logged in or token live time limit was reached. REQUEST was CANCELED!!') : config;
  },
  function(error) {
	console.log('TODO handle errors in REQUEST\'s interceptor');
	console.error(error);
	return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function(response) {
	
 	console.log('TODO implement HTTP code handle (RESPONSE) and other stuffs');
 	console.log(response);
	
 	return response;
  },
  function(error) {
	
 	console.log('TODO handle errors in RESPONSE\'s interceptor');
	console.log(error);

	// Original code 
	/* console.log("RESPONSE nok");
	   if (response.status == 401) {
	   console.log("Not authorized. Need login again!");

	   localStorage.removeItem("token");
	   localStorage.removeItem("user");
	   // react logic must remain in UserBadge
	   this.props.onIsLoggedInChange('isLoggedIn', false);
	   this.props.onIsLoggedInChange('isLoggedInMessage', 'Sessão expirada!');

	   return response.text();
	   } else {
	   console.log("generic error BACKEND!!");
	   return response.json();
	   } */
	
 	return Promise.reject(error);
  }
);

export default api;
