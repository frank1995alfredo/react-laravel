import React, { useEffect, useState } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import url from "../../config";
import axios from "axios";

const FormAgregar = () => {
  const initialFormState = {
    id: null,
    discapacidad_id: 0,
    ciudad_id: 0,
    priNombre: "",
    segNombre: "",
    priApellido: "",
    segApellido: "",
    fechNacimiento: "",
    numCedula: "",
    codigoCli: "",
    direccion: "",
    email: "",
    telefono: "",
    nivelDiscapacidad: "1",
    genero: "Masculino",
  };

  const [cliente, setCliente] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.currentTarget;
    setCliente({ ...cliente, [name]: value });
    console.log(cliente);
  };

  const [ciudad, setCiudad] = useState([]);
  const [discapacidad, setDiscapacidad] = useState([]);


  const peticionPost = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${url}/clientes`, cliente).then((response) => {
        console.log(response)
        setCliente(initialFormState)
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function Ciudades() {
      try {
        let response = await fetch(`${url}/ciudades`);
        response = await response.json();
        setCiudad(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    async function Discapacidades() {
      try {
        let response = await fetch(`${url}/discapacidades`);
        response = await response.json();
        setDiscapacidad(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    Ciudades();
    Discapacidades();
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Agregar Cliente</h5>
              </CardHeader>
              <CardBody>
                  <Row>
                    <Col className="px-md-3" md="3">
                      <FormGroup>
                        <label>Primer Nombre</label>
                        <Input
                          placeholder="Primer Nombre"
                          name="priNombre"
                          value={cliente.priNombre}
                          onChange={handleInputChange}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Segundo Nombre</label>
                        <Input
                          placeholder="Segundo Nombre"
                          name="segNombre"
                          value={cliente.segNombre}
                          onChange={handleInputChange}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-3" md="3">
                      <FormGroup>
                        <label>Primer Apellido</label>
                        <Input
                          placeholder="Primer Apellido"
                          name="priApellido"
                          value={cliente.priApellido}
                          onChange={handleInputChange}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label>Segundo Apellido</label>
                        <Input
                          placeholder="Segundo Apellido"
                          name="segApellido"
                          value={cliente.segApellido}
                          onChange={handleInputChange}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="3">
                      <FormGroup>
                        <label>Fecha Nacimiento</label>
                        <Input
                          placeholder="Company"
                          name="fechNacimiento"
                          value={cliente.fechNacimiento}
                          onChange={handleInputChange}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="3">
                      <FormGroup>
                        <label>N. Cedula</label>
                        <Input
                          placeholder="N. Cedula"
                          name="numCedula"
                          value={cliente.numCedula}
                          onChange={handleInputChange}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="3">
                      <FormGroup>
                        <label>Codigo Cliente</label>
                        <Input
                          placeholder="Codigo Cliente"
                          name="codigoCli"
                          value={cliente.codigoCli}
                          onChange={handleInputChange}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="3">
                      <FormGroup>
                        <label>Direccion</label>
                        <Input
                          placeholder="Direccion"
                          name="direccion"
                          value={cliente.direccion}
                          onChange={handleInputChange}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="3">
                      <FormGroup>
                        <label>Email</label>
                        <Input
                          placeholder="email@gmail.com"
                          name="email"
                          value={cliente.email}
                          onChange={handleInputChange}
                          type="email"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="2">
                      <FormGroup>
                        <label>Telefono</label>
                        <Input
                          type="text"
                          name="telefono"
                          value={cliente.telefono}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="3">
                      <FormGroup>
                        <Label for="exampleSelect">Genero</Label>
                        <Input
                          type="select"
                          name="genero"
                          onChange={handleInputChange}
                          id="exampleSelect"
                        >
                          <option value="Masculino">Masculino</option>
                          <option value="Femenino">Femenino</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <Label for="exampleSelect">Discapacidad</Label>
                        <Input
                          type="select"
                          name="discapacidad_id"
                          onChange={handleInputChange}
                          id="exampleSelect"
                        >
                          <option>Seleccione una discapacidad</option>
                          {discapacidad.map((disc) => (
                            <option value={disc.id} key={disc.id}>
                              {disc.descripcion}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="2">
                      <FormGroup>
                        <label>Nivel Discapacidad</label>
                        <Input
                          type="select"
                          name="nivelDiscapacidad"
                          onChange={handleInputChange}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label for="exampleSelect">Ciudad</Label>
                        <Input
                          type="select"
                          name="ciudad_id"
                          value={cliente.ciudad_id}
                          onChange={handleInputChange}
                          id="ciudad_id"
                        >
                          <option value="0">Seleccione una ciudad</option>
                          {ciudad.map((ciu) => (
                            <option value={ciu.id} key={ciu.id}>
                              {ciu.ciudad}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <CardFooter>
                    <Button
                      className="btn-fill"
                      color="info"
                      size="sm"
                      onClick={peticionPost}
                    >
                      Guardar
                    </Button>
                    <Link
                      to="/admin/clientes"
                      className="btn btn-danger btn-sm"
                    >
                      Cancelar
                    </Link>
                  </CardFooter>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default FormAgregar;
