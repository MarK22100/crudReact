import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ListProducts from "../sections/ListProducts";

const Administration = () => {
    const navigate = useNavigate();


    //const [prodEdit, setProdEdit] = useState(undefined);
    

    return (
        <>
            <div className="container">
        
            <div className="m-3 d-flex gap-2">
                <Button className="btn btn-success" onClick={()=>{navigate('/CreateProduct')}}>CREAR PRODUCTO</Button>
                
            </div>
            <ListProducts/>
            </div>
        </>
    );
};

export default Administration;