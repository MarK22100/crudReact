import { Button, Table } from "react-bootstrap";
import Product from "./Product";
import { useEffect, useState } from "react";
import UpdateProdModal from "./UpdateProdModal";
import CreateProdModal from "./CreateProdModal";


const ListProducts = () => {
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [showCreateM, setCreateM] = useState(false)
    const [prodEdit, setProdEdit] = useState(undefined);
    
    const handleShow = (prod) => {
      setProdEdit(prod);
      setShow(true);
    };
    const handleClose = () => {
        setProdEdit(undefined);
        setShow(false);
      };
      
      const handleShowCreate = () =>{
        setCreateM(true);
      }
      const handleCloseCreate = () =>{
        setCreateM(false);
      }


    const API = import.meta.env.VITE_API;

    const getProducts = async () =>{
        try {
            const response = await fetch(`${API}/productos`);
            const resJson = await response.json();
            console.log(resJson);
            setProducts(resJson);
        } catch (error) {
            console.log("este es error en fetch productos ---> ",error);
        }
    }

    useEffect(()=>{
        getProducts();

        return()=>{
            setProducts([]);
        };
    },[]);

    return (
        <>
        <Button className="btn btn-primary" onClick={()=>{handleShowCreate()}}>MODAL CREAR PRODUCTO</Button>

        <CreateProdModal show={showCreateM} handleClose={handleCloseCreate} getProducts={getProducts}/>

        <UpdateProdModal show={show} handleClose={handleClose} producto={prodEdit} getProducts={getProducts}/>

        
        
        <div className="">
            <div className="text-center">
                <h2>LISTADO DE PRODUCTOS</h2>
            </div>
            <div className="table-responsive">
          <Table striped bordered hover variant="dark" className="responsive">
            <thead>
                <tr>
                <th>ID</th>
                <th>TITULO</th>
                <th>DESCRIPCION</th>
                <th>CATEGORIA</th>
                <th>ACCIONES</th>
                </tr>
            </thead>
                <tbody>
                    {products.map((element)=> {
                        return <Product products={element} key={element.id} handleShow={handleShow} getProducts={getProducts}/>
                    })}
                </tbody>
        </Table>
        </div>
        </div>
        </>
    );
};

export default ListProducts;