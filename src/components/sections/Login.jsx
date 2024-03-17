import { Form, Button, Modal } from 'react-bootstrap';
import clsx from 'clsx';
import * as Yup from "yup";
import { useFormik } from 'formik';
import axios from 'axios';


const Login = ({isOpen, handleClose}) => {

const API = import.meta.env.VITE_API_BCK;

const LoginSchema = Yup.object().shape({
  email:Yup.string().email("Formato invalido").min(7).max(128).required("El email es requerido"),
  password:Yup.string().min(8).max(20).required("La contraseña es requrida")
})
const initialValues={
  email:"",
  password:""
}
const Formik=useFormik({
  initialValues,
  validationSchema: LoginSchema,
  validateOnBlur:true,
  validationOnChange:true,
  onSubmit: async (values)=> {
    console.log("VALUES--->", values);
    try {
      const response = await axios.post(`${API}/users/login`, values);
      console.log("RESPUESTA LOGIN ", response.data);
      if (response.status===200) {
        Formik.resetForm();
        handleClose() 
      }
      else{
        alert("OCURRIO UN ERROR")
      }
    } catch (error) {
      console.log(error);
    }
  }


})


    return (
      <>
        <Modal show={isOpen} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={Formik.handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="Correo Electronico" name='email'
                {...Formik.getFieldProps("email")}
                className={clsx(
                  "form-control",
                  {
                    "is-invalid": Formik.touched.email && Formik.errors.email,
                  },
                  {
                    "is-valid": Formik.touched.email && !Formik.errors.email,
                  }
                )}
                />
              {Formik.touched.email && Formik.errors.email && (
              <div className="mt-2 text-danger fw-bolder">
                <span role="alert">{Formik.errors.email}</span>
              </div>
            )}
                <Form.Text className="text-muted">          
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name='password'
                {...Formik.getFieldProps("password")}
                className={clsx(
                  "form-control",
                  {
                    "is-invalid": Formik.touched.password && Formik.errors.password,
                  },
                  {
                    "is-valid": Formik.touched.password && !Formik.errors.password,
                  }
                )}
                />
              {Formik.touched.password && Formik.errors.password && (
              <div className="mt-2 text-danger fw-bolder">
                <span role="alert">{Formik.errors.password}</span>
              </div>
            )}
              </Form.Group>
                <Button className='mx-1' variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button className='mx-1' variant="primary" type="submit">
                  Submit
                </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
};

export default Login;