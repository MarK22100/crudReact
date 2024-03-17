
import { Button, Card, Col } from "react-bootstrap";


const CardProduct = ({product}) => {

    return (
<Col xs={12} md={4}>
      <Card className="" style={{ width: "18rem", height:"32rem"}}>
        <Card.Img style={{ margin:"auto",  width: "16rem", height:"16rem"}} variant="top" src="holder.js/100px180" />
        <Card.Body variant="" className="d-flex flex-column">
          <Card.Title className="align-items-start">{product.title}</Card.Title>
          <Card.Text className="d-flex flex-column text-center">
            <span className="mb-2">{product.description}</span>
            <span className="fs-6">{product.category}</span>
          </Card.Text>
          <Button variant="primary" className="mt-auto">Ver mas</Button>
        </Card.Body>
      </Card>
    </Col>
    );
};

export default CardProduct;