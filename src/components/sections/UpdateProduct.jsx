import clsx from 'clsx';
import * as Yup from "yup";
import { useFormik} from "formik";
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API;

const UpdateProduct = () => {
    const [productEdit, setProductEdit]= useState(undefined);

    const getProduct = async()=>{
        try {
            const {data}= await axios.get(`${API}/productos/${id}`);
            setProductEdit(data);
        } catch (error) {
            console.log("Error--->", error);
        }
    }

    const {id} = useParams();
    useEffect(()=>{
        console.log("Valor del id seleccionado --->", id);
        getProduct()
    },[])
    const navigate = useNavigate()
    //VARIABLES DE ENTORNO
  //INICIO DE CONFIGURACION DE FORMIK
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
          title: "Estas seguro de editar este producto?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Guardar"
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await fetch(`${API}/productos/${id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              });
              //console.log("RESPONSE", response);
              //console.log(response.status);
              if (response.status === 200) {
               // Formik.resetForm();
                Swal.fire({
                  title: "Exito!",
                  text: "Se edito el producto con exito",
                  icon: "success"
                });
                navigate('/Administration')
              }
            } catch (error) {
              console.log("ERROR-->", error);
            }         
          }
        });
      },
    })
console.log("producto API-STATE--->", productEdit);

useEffect(()=>{
    if (productEdit !== undefined) {
        Formik.setFieldValue('title', productEdit.title, true);
        Formik.setFieldValue('description', productEdit.description, true);
        Formik.setFieldValue('category', productEdit.category, true);
    }
},[productEdit])
    return (
        <div className="container py-3 my-3">
        <div className="text-center">
          <h2>Editar Producto</h2>
        </div>
        <Button className='btn btn-secondary' onClick={()=>{navigate("/Administration")}}>Atras</Button>
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
          </Form.Group>

          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Form>
      </div>
    );
};

export default UpdateProduct;