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
  Card,
} from "reactstrap";
import axios from "axios";

const ModalEliminar = ({
  isOpen,
  toggle2,
  ciudad,
  setCiudad,
  ciudadSeleccionada,
}) => {
  const peticionDelete = async () => {
    await axios
      .delete(`${url}/ciudades/` + ciudadSeleccionada.id)
      .then((response) => {
        setCiudad(
          ciudad.filter((ciudad) => ciudad.id !== ciudadSeleccionada.id)
        );
        toggle2();
      });
  };

  return (
    <div className="content">
      <Col md="12">
        <Card>
          <Modal isOpen={isOpen} toggle={toggle2}>
            <ModalHeader toggle={toggle2} tag="h4">
             <strong>Eliminar Ciudad</strong> 
            </ModalHeader>
            <ModalBody>
              <FormGroup row>
                <Label for="descripcion" sm={10}>
                  Esta seguro que desea eliminar{" "}
                  <strong>
                    {" "}
                    {ciudadSeleccionada && ciudadSeleccionada.ciudad}{" "}
                  </strong>
                </Label>
              </FormGroup>
              <FormGroup>
                  <Button  className="pull-right"  color="danger" size="sm" onClick={() => toggle2()}>
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
