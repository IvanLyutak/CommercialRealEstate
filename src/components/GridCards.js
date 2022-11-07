import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import "./GridCards.css"

function GridCards({objects}) {
  
  return (
    <Row xs={1} md={3} className="g-4">
      {objects.map((object) => (
        <Col key={Math.random()}>
          <Card>
            <Card.Img variant="top" src={object["image"]} />
            <Card.Body>
              <Card.Title>{object["title"]}</Card.Title>
              <Card.Text className="gridCardsText">
                {object["text"]}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default GridCards;