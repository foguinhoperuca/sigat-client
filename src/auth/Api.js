import axios from 'axios';
import moment from 'moment';

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
	console.error(error);
	return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function(response) {
	console.debug(response);

 	return response;
  },
  function(error) {
	if (error.response !== undefined && error.response.status === 401) {
	  console.log("Not authorized. Need login again!");
	  localStorage.removeItem("token");
	  localStorage.removeItem("user");
	} else {
	  console.log("generic error: request can't be made OR BACKEND returned error (otherside response code 2xx or 401 - maybe a 5xx error)!!");
	  console.error(error);
	}

 	return Promise.reject(error);
  }
);

export default api;

/* TODO move auth logic from UserBadge component to here. */

export function login(username, password) {
  console.log("login normal function");

  api.get('/sigat-api/sim/search_sim_asset')
	 .then((response) => {
	   console.log('axios inside login - Api module!!');
	   console.log(response);
	   console.log(response.data);
	 })
	 .catch(function (error) {
	   console.error(error);
	 });

  return true;
};

export const logout = () => {
  console.log('logout arrow function');

  return false;
};
