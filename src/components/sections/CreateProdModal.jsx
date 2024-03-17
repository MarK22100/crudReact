import { clsx } from "clsx";
import { useFormik } from "formik";
import { Button, Form, Modal } from "react-bootstrap";
//import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";

const CreateProdModal = ({show, handleClose, getProducts}) => {
    //const navigate = useNavigate();
    const API = import.meta.env.VITE_API;

    const ProductSchema = Yup.object().shape({
        title: Yup.string()
          .min(4, "Minimo de 4 caracteres")
          .max(20, "Maximo de 20 caracteres")
          .required("El titulo es requerido"),
        description: Yup.string()
          .min(10, "Minimo de 10 caracteres")
          .max(200, "Maximo de 200 caracteres")
          .required("Descripcion requerida"),
        category: Yup.string().required("La categoria es requerida")
      });

      const initialValues = {
        title : "",
        description:"",
        category:""
    }
    const Formik = useFormik({
        initialValues,
        validationSchema : ProductSchema,
        validateOnBlur:true,
        validateOnChange:true,
        onSubmit:(values)=>{
        console.log("Values of formik --->", values);

        Swal.fire({
          title: "Estas seguro de guardar este producto?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Guardar"
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await fetch(`${API}/productos`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              });
              //console.log("RESPONSE", response);
              //console.log(response.status);
              if (response.status === 201) {
                Formik.resetForm();
                Swal.fire({
                  title: "Exito!",
                  text: "se creo un nuevo producto",
                  icon: "success"
                });
                CloseModal()
              }
            } catch (error) {
              console.log("ERROR-->", error);
            }         
          }
        });
      },
    })
    const CloseModal=()=>{
        getProducts();
        Formik.resetForm();   
        handleClose();
      };
      
    return (
        <div>
    <Modal show={show} onHide={CloseModal} backdrop='static'
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          CREAR PRODUCTO
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={Formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Titulo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el titulo del producto"
              minLength={4}
              //maxLength={20}
              //value={title}
              /*onChange={(e)=>{
                  setTitle(e.currentTarget.value);
                }}*/
              name="title"
              {...Formik.getFieldProps("title")}
              className={clsx(
                "form-control",
                {
                  "is-invalid": Formik.touched.title && Formik.errors.title,
                },
                {
                  "is-valid": Formik.touched.title && !Formik.errors.title,
                }
              )}
            />
            {Formik.touched.title && Formik.errors.title && (
              <div className="mt-2 text-danger fw-bolder">
                <span role="alert">{Formik.errors.title}</span>
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese una descripción"
              as="textarea"
              rows={3}
              name="description"
              {...Formik.getFieldProps("description")}
              className={clsx(
                "form-control",
                {
                  "is-invalid":
                    Formik.touched.description && Formik.errors.description,
                },
                {
                  "is-valid":
                    Formik.touched.description && !Formik.errors.description,
                }
              )}
            />
            {Formik.touched.description && Formik.errors.description && (
              <div className="mt-2 text-danger fw-bolder">
                <span role="alert">{Formik.errors.description}</span>
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Categoria</Form.Label>
            <Form.Select
              aria-label="category"
              name="category"
              {...Formik.getFieldProps("category")}
              className={clsx(
                "from-control",
                {
                  "is-invalid" : Formik.touched.category && Formik.errors.category,
                },
                {
                  "is-valid" : Formik.touched.category && !Formik.errors.category,
                }
              )}
            >
              <option value="">Seleccione una categoria</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Limpieza">Limpieza</option>
            </Form.Select>
            {Formik.touched.category && Formik.errors.category && (
              <div className="mt-2 text-danger fw-bolder">
                <span role="alert">{Formik.errors.category}</span>
              </div>
            )}
          </Form.Group>

          <Button variant="primary" type="submit">
            Guardar
          </Button>
          <Button
              variant="danger"
              onClick={() => {
               CloseModal();
              }}
              className="mx-2"
            >
              Cerrar
            </Button>
        </Form>
      </Modal.Body>
    </Modal>
        </div>
    );
};

export default CreateProdModal;