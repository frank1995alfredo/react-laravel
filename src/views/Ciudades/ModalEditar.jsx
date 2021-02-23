import React, { useState, useEffect, useRef } from "react";
import NotificationAlert from "react-notification-alert";
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
  Form,
} from "reactstrap";
import axios from "axios";
import url from "../../config";

const ModalEditar = ({ isOpen, editar, ciudades, setCiudades, ciu }) => {
  const [ciudad, setCiudad] = useState(ciu);
  const [provincia, setProvincia] = useState([]);

  useEffect(() => {
    setCiudad(ciu);
    console.log(ciudad);
  }, [ciu]);

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        let response = await fetch(`${url}/provincias`);
        response = await response.json();
        setProvincia(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMyAPI();
  }, []);

  //notificacion en caso de que se guarde
  const notificationAlert = useRef(null);
  const Notify = (place) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>Registro modificado satisfactoriamente</div>
        </div>
      ),
      type: "success",
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };

    notificationAlert.current.notificationAlert(options);
  };

   //notificacion en caso de que falten datos
   const Notify2 = (place) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>Por favor llene todos los campos.</div>
        </div>
      ),
      type: "info",
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlert.current.notificationAlert(options);
  };

  const actualizar = async (id, data) => {
   try {
    await axios.put(`${url}/ciudades/` + id, data).then((response) => {
        setCiudades(
          ciudades.map((ciudad) =>
            ciudad.id === id ? response.data.data[0] : ciudad
          )
        );
        Notify("tr");
      });
   } catch (error) {
       Notify2("tr");
       console.log(error)
   }
   
    /* setCiudades(
      ciudades.map((ciudad) =>
        ciudad.id === id ? data : ciudad
      )
    );*/
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCiudad({ ...ciudad, [name]: value });
    console.log(ciudad);
  };

  const peticionActualizar = (event) => {
        
        event.preventDefault();
        actualizar(ciudad.id, ciudad);
        editar();
  };

  return (
    <div className="content">
      <div className="react-notification-alert-container">
        <NotificationAlert ref={notificationAlert} />
      </div>
      <Col md="12">
        <Card>
          <Modal isOpen={isOpen} toggle={editar}>
            <ModalHeader toggle={editar} tag="h4">
              <strong>Actualizar Ciudad</strong>
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={peticionActualizar}>
                <FormGroup row>
                  <Label for="ciudad" sm={3}>
                    Ciudad
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="text"
                      name="descripcion"
                      value={ciudad.descripcion}
                      id="descripcion"
                      onChange={handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="descripcion" sm={3}>
                    Provincia
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="select"
                      onChange={handleInputChange}
                      name="provincia_id"
                      id="exampleSelect"
                    >
                      <option value={ciudad.provincia_id}>
                        {ciudad.provincia}
                      </option>
                      {provincia.map((prov) => (
                        <option value={prov.id} key={prov.id}>
                          {prov.descripcion}
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
                    onClick={() => editar()}
                  >
                    Cancelar
                  </Button>
                  <Button className="pull-right" color="info" size="sm">
                    Guardar
                  </Button>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
        </Card>
      </Col>
    </div>
  );
};

export default ModalEditar;
