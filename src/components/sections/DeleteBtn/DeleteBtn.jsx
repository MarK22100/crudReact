import { Button } from "react-bootstrap";
import "./DeleteBtn.css"
import axios from "axios";



const DeleteBtn = ({id, getProducts}) => {
    const API = import.meta.env.VITE_API
    const HandleDelete = async () => {
        try {
            await axios.delete(`${API}/productos/` + id);
            getProducts()
        } catch (error) {
            console.log("Error--->", error.message);
        }
        }
    return ( 
    <Button type="button" variant="danger" onClick={HandleDelete}>
        ELIMINAR
    </Button>
    );
}
 
export default DeleteBtn;