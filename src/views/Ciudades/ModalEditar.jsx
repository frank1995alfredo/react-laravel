import React, { useState, useEffect } from "react";
import url from "../../config";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  FormGroup,
  Label,
  Input,
  Card,
} from "reactstrap";
import axios from "axios";

const ModalEditar = ({ isOpen, toggle3, ciudad, setCiudad, ciudadSeleccionada, setCiudadSeleccionada }, props) => {
  const { className } = props;
  const [ provincia, setProvincia ] = useState([]);
 
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setCiudadSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(ciudadSeleccionada);
  };

  const peticionPatch = async () => {
    await axios.patch(`${url}/ciudades/`+ ciudadSeleccionada.id, ciudadSeleccionada)
    .then((response) => {
      var dataNueva = ciudad;
      dataNueva.map((consola) => {
        if (ciudadSeleccionada.id === consola.id) {
          consola.ciudad = ciudadSeleccionada.descripcion;
          consola.id = ciudadSeleccionada.id;
          console.log(consola)
        }
      });
      setCiudad(dataNueva);
      console.log(dataNueva.id);
      toggle3()
    });
  };

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        let response = await fetch(`${url}/provincias`);
        response = await response.json();
        setProvincia(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMyAPI();
  }, []);

  return (
    <div className="content">
      <Col md="12">
        <Card>
          <Modal isOpen={isOpen} toggle={toggle3} className={className}>
            <ModalHeader toggle={toggle3} tag="h4">
              <strong>Actualizar Ciudad</strong>
            </ModalHeader>
            <ModalBody>
              <FormGroup row>
                <Label for="descripcion" sm={2}>
                  Ciudad
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    placeholder={`${ciudadSeleccionada.ciudad}`}
                    onChange={handleChange2}
                    name="descripcion"
                    id="descripcion"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleSelect" sm={2}>
                  Provincia
                </Label>
                <Col sm={10}>
                  <Input
                    type="select"
                    name="idprovincia"
                    id="idprovincia"        
                    onChange={handleChange2}
                  >
                    <option value={ciudadSeleccionada.id}>{ciudadSeleccionada.provincia}</option>
                    {provincia.map((item, id) => (
                      <option key={id} value={item.id}>
                        {
                          item.descripcion
                        }
                      </option>
                    ))}
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup>
                <Button
                  className="pull-right"
                  color="danger"
                  size="sm"
                  onClick={() => toggle3()}
                >
                  Cancelar
                </Button>
                <Button
                  className="pull-right"
                  color="info"
                  size="sm"
                  onClick={() => peticionPatch()}
                >
                  Guardar
                </Button>
              </FormGroup>
            </ModalBody>
          </Modal>
        </Card>
      </Col>
    </div>
  );
};

export default ModalEditar;
