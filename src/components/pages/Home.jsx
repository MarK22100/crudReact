import { useEffect } from "react";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import CardProduct from "../sections/CardProduct"
import axios from "axios";


const Home = () => {
    const [products, setProducts] = useState([]);

    const API = import.meta.env.VITE_API;
    
    const getProducts = async () =>{
        try{
            const response =await axios.get(`${API}/productos`)
            console.log("RESPONSE AXIOS", response);

            setProducts(response.data);
        }
        catch (error){
            console.log("ERROR-->", error);
        }
    };

    useEffect(()=>{
        getProducts();
        
        return()=>{
            setProducts([]);
        };
    }, []);

    return (
        <>
        <div>
            <div className="text-center">
                <h2>CATALOGO DE PRODUCTOS</h2>
            </div>

            <div className="text-center">
            <Container>
          <Row>
            {products.map((element, index)=>{
              return(
                <CardProduct product={element} key={index}/>
              )
            })}
          </Row>
        </Container>
            </div>
            </div>
        </>
    );
};

export default Home;