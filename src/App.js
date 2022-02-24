/* import logo from './logo.svg'; */
import './App.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import logopms from './images/logo_pms.png'

import Equipment from './Equipment';
import Person from './Person';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logopms} className="App-logopms" alt="logo" />
        <p>
		  Formulário para abertura de chamado da <code>informática</code>.
        </p>
        <a
          className="App-link"
          href="mailto:informatica@sorocaba.sp.gov.br?subject=Suporte Técnico&body=Help me!"
          target="_blank"
          rel="noopener noreferrer"
        >
          Enviar chamado por e-mail para o suporte
        </a>
      </header>
	  <Form className="container">
		<Person />

		<Equipment />

		<Form.Group className="mb-3" controlId="formBasicLocation">
		  <Form.Select aria-label="Default select example">
			<option>Informe o Serviço Desejado da TI Se Souber</option>
			<option value="1">Administrativo</option>
			<option value="2">Redes</option>
			<option value="3">Sistemas Internos e Legados</option>
			<option value="4">Sistemas de Terceiros</option>
			<option value="5">Suporte Técnico</option>
			<option value="6">Telefonia</option>
		  </Form.Select>
		  <Form.Text className="text-muted">
			Os serviços da TI são uma forma mais simples de encaminharmos para equipe correta atender o seu chamado.
		  </Form.Text>
		</Form.Group>

		<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
		  <Form.Label>Descrição</Form.Label>
		  <Form.Control as="textarea" rows={5} required />
		  <Form.Text className="text-muted">
			Caso mais de um patrimônio necessite de manutenção, informe abaixo utilizando-se do prefixo mais 6 números (um por linha). Ex.: pms-123456
		  </Form.Text>
		</Form.Group>

		<Button variant="primary" type="submit">
		  Enviar Chamado !
		</Button>
	  </Form>
    </div>
  );
}

export default App;
