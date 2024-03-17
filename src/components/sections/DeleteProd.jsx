import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const DeleteProd = ({id, getProducts}) => {

  const API = import.meta.env.VITE_API;

  // eslint-disable-next-line no-unused-vars
  const deleteProd = async ()=>{
    try {
      await fetch(`${API}/productos/`+ id,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json'
        }
      });
      getProducts()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Button className="" onClick={deleteProd}><FontAwesomeIcon className="pe-2" icon={faTrash}/>Eliminar</Button>
  )
}
export default DeleteProd;