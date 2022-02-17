import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="mailto:informatica@sorocaba.sp.gov.br?subject=Suporte Técnico&body=Help me!"
          target="_blank"
          rel="noopener noreferrer"
        >
          Enviar e-mail para o suporte
        </a>
      </header>
    </div>
  );
}

export default App;
