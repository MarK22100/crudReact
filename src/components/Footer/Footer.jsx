import { Container } from "react-bootstrap";

const Footer = () => {

    return (
        <Container className=" p-0 ">
            <div className="bg-dark text-white fixed-bottom ">
                <p className="text-center p-2">Todos los derechos reservados</p>
            </div>
        </Container>
    );
};

export default Footer;