

import React, { useRef } from "react";
import NotificationAlert from "react-notification-alert";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  FormGroup,
  Label,
  Card,
} from "reactstrap";
import axios from "axios";
import url from "../../config";
const ModalEliminar = ({
  isOpen,
  eliminar,
  clientes,
  setClientes,
  dataEliminar,
}) => {
  
  //notificacion en caso de que se guarde
  const notificationAlert = useRef(null);
  const Notify = (place) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Cliente <strong>{dataEliminar.priNombre + " " + dataEliminar.priApellido}</strong> eliminada
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

  const peticionDelete = async () => {
    await axios
      .delete(`${url}/clientes/` + dataEliminar.id)
      .then((response) => {
        setClientes(clientes.filter((cliente) => cliente.id !== dataEliminar.id));
        Notify("tr");
        eliminar();
      });
  };

  return (
    <div className="content">
      <div className="react-notification-alert-container">
        <NotificationAlert ref={notificationAlert} />
      </div>
      <Col md="12">
        <Card>
          <Modal isOpen={isOpen} toggle={eliminar}>
            <ModalHeader toggle={eliminar} tag="h4">
              <strong>Eliminar Clientes</strong>
            </ModalHeader>
            <ModalBody>
              <FormGroup row>
                <Label for="descripcion" sm={10}>
                  Esta seguro que desea eliminar{" "}
                  <strong> {dataEliminar.priNombre + " " + dataEliminar.priApellido}</strong>
                </Label>
              </FormGroup>
              <FormGroup>
                <Button
                  className="pull-right"
                  color="danger"
                  size="sm"
                  onClick={() => eliminar()}
                >
                  Cancelar
                </Button>
                <Button
                  color="info"
                  size="sm"
                  onClick={() => peticionDelete()}
                  className="pull-right"
                >
                  Eliminar
                </Button>
              </FormGroup>
            </ModalBody>
          </Modal>
        </Card>
      </Col>
    </div>
  );
};

export default ModalEliminar;
