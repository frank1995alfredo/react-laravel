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

const ModalInsertar = ({ isOpen, toggle, ciudad, setCiudad }, props) => {
  const { className } = props;
  const [provincia, setProvincia] = useState([]);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState({
    descripcion: "",
    provincia_id: 0,
    provincia: "",
    estado: true,
    ciudad: "",
  });

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setCiudadSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(ciudadSeleccionada);
  };

  const peticionPost = async () => {
    await axios.post(`${url}/ciudades`, ciudadSeleccionada).then((response) => {
      //setCiudad(ciudad.concat(response.data.data))
      console.log(ciudad.concat(response.data.data));
      toggle();
    });

    setTimeout(function () {
      peticionGet();
    }, 100);
  };

  const peticionGet = async () => {
    let response = await fetch(`${url}/ciudades`);
    response = await response.json();
    //setCiudad(response.data);
    setCiudad(ciudad.concat(response.data[response.data.length - 1]));
    console.log(ciudad.concat(response.data[response.data.length - 1]));
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
          <Modal isOpen={isOpen} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle} tag="h4">
              <strong>Nueva Ciudad</strong>
            </ModalHeader>
            <ModalBody>
              <FormGroup row>
                <Label for="descripcion" sm={2}>
                  Ciudad
                </Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="descripcion"
                    id="descripcion"
                    placeholder="Ciudad"
                    onChange={handleChange2}
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
                    name="provincia_id"
                    id="idprovincia"
                    value={ciudadSeleccionada.provincia_id}
                    onChange={handleChange2}
                  >
                    {provincia.map((item, id) => (
                      <option key={id} value={item.id}>
                        {item.descripcion}
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
                  onClick={() => toggle()}
                >
                  Cancelar
                </Button>
                <Button
                  className="pull-right"
                  color="info"
                  size="sm"
                  onClick={() => peticionPost()}
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

export default ModalInsertar;
