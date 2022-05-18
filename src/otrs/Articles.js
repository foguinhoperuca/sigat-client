import React from 'react';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default class Articles extends React.Component {
  constructor(props) {
	super(props);

	this.state = {
	  articles: props.articles
	};
  }

  render() {	
	let navArticles = "";
	let articles = <pre>Nenhum artigo para exibir!!</pre>;
	let firstArticle = "";

	if (this.state.articles !== undefined) {
	  navArticles = this.state.articles.map((article, index) => {
		if (index == 0) {
		  firstArticle = `articleId_${article.ArticleID}`;
		}

		return <Nav.Item key={index}><Nav.Link eventKey={`articleId_${article.ArticleID}`}>#{article.ArticleID} de {article.CreateTime}</Nav.Link></Nav.Item>;
	  });
	  articles = this.state.articles.map((article, index) => {
		return <Tab.Pane eventKey={`articleId_${article.ArticleID}`} key={index}>
		  <Row>
			<Col sm="4">
			  <Form.Group className="mb-3" controlId="articleChangeTime">
				<Form.Label column sm="6">Alterado em</Form.Label>
				<Form.Control readOnly defaultValue={article.ChangeTime} />
			  </Form.Group>
			</Col>
			<Col sm="8">
			  <Form.Group className="mb-3" controlId="articleTo">
				<Form.Label column sm="4">Remetente</Form.Label>
				<Form.Control readOnly defaultValue={article.From} />
			  </Form.Group>
			</Col>
		  </Row>
		  <Form.Group as={Row} className="mb-3" controlId="articleSubject">
			<Form.Label column sm="2">Assunto</Form.Label>
			<Col sm="10"><Form.Control readOnly defaultValue={article.Subject} /></Col>
		  </Form.Group>
		  <Form.Group as={Row} className="mb-3" controlId="articleBody">
			<Form.Label column sm="2">Descrição</Form.Label>
			<Col sm="10"><Form.Control as="textarea" rows={15} value={article.Body} readOnly /></Col>
		  </Form.Group>
		</Tab.Pane>
	  });
	}
	
	return (
	  <Tab.Container id="articles" defaultActiveKey={firstArticle}>
		<Row>
		  <Col sm={3}>
			<Nav variant="pills" className="flex-column">
			  {navArticles}
			</Nav>
		  </Col>
		  <Col sm={9}>
			<Tab.Content>
			  {articles}
			</Tab.Content>
		  </Col>
		</Row>
	  </Tab.Container>
	);
  }
}
