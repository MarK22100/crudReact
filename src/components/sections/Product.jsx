import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DeleteBtn from "./DeleteBtn/DeleteBtn";
import DeleteProd from "./DeleteProd";






const Product = ({ products, handleShow, getProducts }) => {
  const navigate = useNavigate();
  return (
    <>
      <tr>
        <td>{products.id}</td>
        <td>{products.title}</td>
        <td>{products.description}</td>
        <td>{products.category}</td>
        <td className="d-flex gap-2 py-3 justify-content-center">
        <Button
            type="button"
            onClick={() => {
              navigate(`/UpdateProduct/${products.id}`);
            }}
            variant="warning"
          >
            EDITAR
          </Button>
          <Button
            type="button"
            variant="success"
            onClick={() => {
              console.log("desde boton modal");
              handleShow(products);
              getProducts()
            }}
            >
            M.EDITAR
          </Button>
          <DeleteBtn id={products.id} getProducts={getProducts}/>
          <DeleteProd id={products.id} getProducts={getProducts} ></DeleteProd>
          
        </td>
      </tr>
    </>
  );
};

export default Product;
