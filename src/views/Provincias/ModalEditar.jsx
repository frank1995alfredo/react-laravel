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

const ModalEditar = ({ isOpen, editar, provincias, setProvincias, prov }) => {
  const [provincia, setProvincia] = useState(prov);
  
   //notificacion en caso de que se guarde 
   const notificationAlert = useRef(null)
   const Notify = (place) => {
      var options = {};
      options = {
        place: place,
        message: (
          <div>
            <div>
              Resgistro modificado satisfactoriamente
            </div>
          </div>
        ),
        type: "success",
        icon: "tim-icons icon-bell-55",
        autoDismiss: 7
      };

      notificationAlert.current.notificationAlert(options)
  
    };

  const actualizar = async (id, data) => {
    await axios.put(`${url}/provincias/` + id, data).then((response) => {});
    setProvincias(
      provincias.map((provincia) => (provincia.id === id ? data : provincia))
    );
    Notify("tr")
  };

  useEffect(() => {
    setProvincia(prov);
  }, [prov]);

  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProvincia({ ...provincia, [name]: value });
  };

  const peticionActualizar = (event) => {
    event.preventDefault();
    actualizar(provincia.id, provincia);
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
              <strong>Actualizar Provincia</strong>
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={peticionActualizar}>
                <FormGroup row>
                  <Label for="descripcion" sm={3}>
                    Provincia
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="text"
                      name="descripcion"
                      value={provincia.descripcion}
                      id="descripcion"
                      onChange={handleInputChange}
                    />
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
