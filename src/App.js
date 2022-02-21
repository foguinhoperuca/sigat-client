/* import logo from './logo.svg'; */
import './App.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import logopms from './images/logo_pms.png'

import Equipment from './Equipment';


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
		<Form.Group className="mb-3" controlId="formBasicEmail">
		  <Form.Label>Nome</Form.Label>
		  <Form.Control type="text" placeholder="Nome Completo" />
		</Form.Group>

		<Form.Group className="mb-3" controlId="formBasicLocation">
		  <Form.Label>Unidade/Local de Trabalho</Form.Label>
		  <Form.Control type="text" placeholder="Local onde está o seu equipamento" />
		</Form.Group>

		<Form.Group className="mb-3" controlId="formBasicContact">
		  <Form.Label>Telefone/Ramal Corporativo</Form.Label>
		  <Form.Control type="text" placeholder="Telefone da Prefeitura" />
		  <Form.Label>Whatsapp</Form.Label>
		  <Form.Control type="tel" placeholder="Para agilizar o contato" />
		  <br />
		  <InputGroup className="mb-3">
			<FormControl
			  placeholder="Usuário da Rede"
			  aria-label="Usuário da Rede"
			  aria-describedby="basic-addon2"
			/>
			<InputGroup.Text id="basic-addon2">@sorocaba.sp.gov.br</InputGroup.Text>
		  </InputGroup>
		</Form.Group>

		<Equipment />

		<Form.Group className="mb-3" controlId="formBasicLocation">
		  <Form.Select aria-label="Default select example">
			<option>Informe o Serviço Desejado da TI</option>
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
		  <Form.Control as="textarea" rows={5} />
		</Form.Group>

		<Button variant="warning" type="submit">
		  Enviar Chamado !
		</Button>
	  </Form>
    </div>
  );
}

export default App;


/* How open an issue?
 * - description
 */
