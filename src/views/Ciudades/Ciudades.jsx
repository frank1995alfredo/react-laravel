import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../../config";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
  Button,
} from "reactstrap";
import ModalInsertar from "./ModalInsertar.jsx";
import ModalEliminar from "./ModalEliminar";
import ModalEditar from "./ModalEditar";

const ListCiudades = () => {
  const [ciudad, setCiudad] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState({
    descripcion: "",
    idciudad: 0,
  });

  const toggle = () => setModalInsertar(!modalInsertar);
  const toggle2 = () => setModalEliminar(!modalEliminar);
  const toggle3 = () => setModalEditar(!ModalEditar);

  const seleccionarOpcion = (ciudad, caso) => {
    setCiudadSeleccionada(ciudad);
    if (caso === "Editar") {
      setModalEditar(true);
      console.log(ciudadSeleccionada)
    } else {
      setModalEliminar(true);
      console.log(ciudadSeleccionada.ciudad)
    }
  };

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        let response = await fetch(`${url}/ciudades`);
        response = await response.json();
        setCiudad(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchMyAPI();
  }, []);

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">
                <strong>Listado de Ciudades</strong>
              </CardTitle>
              <Button color="info" onClick={toggle} size="sm">
                Nueva Ciudad
              </Button>
            </CardHeader>
            <CardBody>
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>#</th>
                    <th>Provincia</th>
                    <th>Ciudad</th>
                    <th>Estado</th>
                    <th className="text-center">Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {ciudad.map((item, id) => (
                    <tr key={id}>
                      <th scope="row">{id + 1}</th>
                      <td>{item.provincia}</td>
                      <td>{item.ciudad}</td>
                      <td>{item.estado ? "Activo" : ""}</td>
                      <td className="text-center">
                        <Button
                          className="tim-icons icon-refresh-01"
                          color="success"
                          onClick={() => seleccionarOpcion(item, "Editar")}
                          size="sm"
                        ></Button>{" "}
                        <Button
                          className="tim-icons icon-trash-simple"
                          color="danger"
                          onClick={() => seleccionarOpcion(item, "Eliminar")}
                          size="sm"                       
                        ></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <ModalInsertar
                isOpen={modalInsertar}
                toggle={toggle}
                ciudad={ciudad}
                setCiudad={setCiudad}
              />
              <ModalEliminar
              isOpen={modalEliminar}
              toggle2={toggle2}
              ciudadSeleccionada={ciudadSeleccionada}
              ciudad={ciudad}
              setCiudad={setCiudad}
              />
              <ModalEditar
              isOpen={modalEditar}
              toggle3={toggle3}
              ciudadSeleccionada={ciudadSeleccionada}
              ciudad={ciudad}
              setCiudad={setCiudad}
              setCiudadSeleccionada={setCiudadSeleccionada}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default ListCiudades;
