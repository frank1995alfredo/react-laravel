import React, { useState, useRef } from "react";
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
  CardBody,
} from "reactstrap";
import axios from "axios";
import url from "../../config";
import { bool } from "prop-types";

const ModalInsertar = ({ isOpen, insertar, addDiscapacidad }) => {
  const initialFormState = { id: null, descripcion: "", estado: bool }; //se inicializan los inputs
  const [disc, setDisc] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.currentTarget;
    setDisc({ ...disc, [name]: value });
  };

  //notificacion en caso de que se guarde
  const notificationAlert = useRef(null);
  const NotificacionAgg = (place) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Discapacidad <strong>{disc.descripcion}</strong> agregada
            satisfactoriamente
          </div>
        </div>
      ),
      type: "success",
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlert.current.notificationAlert(options);
  };

  //notificacion en caso de que falten datos
  const NotificacionDatos = (place) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>Por favor ingrese una descripcion.</div>
        </div>
      ),
      type: "info",
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlert.current.notificationAlert(options);
  };

  //notificacion en caso de que ya exista un registro
  const NotificacionExistencia = (place, message) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>{message}</div>
        </div>
      ),
      type: "info",
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlert.current.notificationAlert(options);
  };

  //peticion para guardar
  const peticionPost = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${url}/discapacidades`, disc).then((response) => {
        if (
          response.data.message
        ) {
          NotificacionExistencia("tr", response.data.message);
        } else {
          addDiscapacidad(response.data.data);
          setDisc(initialFormState);
          NotificacionAgg("tr");
          insertar();
        }
      });
    } catch (error) {
      NotificacionDatos("tr");
    }
  };

  return (
    <div className="content">
      <div className="react-notification-alert-container">
        <NotificationAlert ref={notificationAlert} />
      </div>
      <Col md="12">
        <Card>
          <CardBody>
            <Modal
              className={
                document.body.className === "white-content"
                  ? "modal2"
                  : "modal3"
              }
              isOpen={isOpen}
              toggle={insertar}
            >
              <ModalHeader toggle={insertar} tag="h4">
                <label>
                  {" "}
                  <strong>Nueva Discapacidad</strong>
                </label>
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={peticionPost}>
                  <FormGroup row>
                    <Label for="descripcion" sm={3}>
                      Discapacidad
                    </Label>
                    <Col sm={8}>
                      <Input
                        type="text"
                        name="descripcion"
                        value={disc.descripcion}
                        id="descripcion"
                        placeholder="Descripcion"
                        onChange={handleInputChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Button
                      className="pull-right"
                      color="danger"
                      size="sm"
                      onClick={() => insertar()}
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
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};
export default ModalInsertar;
