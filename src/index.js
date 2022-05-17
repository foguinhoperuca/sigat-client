import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Home from './Home';
import Search from './otrs/Search';
import Painel from './otrs/Painel';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

/* FIXME wrap <BrowserRouter><...</BrowserRouter> with <React.StrictMode></React.StrictMode> cause componentDidMount twice in react 18. It is the expected behavior in 18 but I need to see how I can work with loading data from backend - see more at: https://blog.logrocket.com/react-suspense-data-fetching/ */
root.render(

  <BrowserRouter>
	<Routes>
	  <Route path="/" element={<Home />} />
	  <Route path="/home" element={<Home />} />
	  <Route path="/triagem" element={<App />} />
	  <Route path="pesquisar" element={<Search />} />
	  <Route path="painel" element={<Painel />} />
	  <Route path="*" element={<App />} />
	</Routes>
  </BrowserRouter>

);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
