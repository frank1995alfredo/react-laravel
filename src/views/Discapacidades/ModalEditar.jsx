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
  CustomInput,
} from "reactstrap";
import axios from "axios";
import url from "../../config";

const ModalEditar = ({
  isOpen,
  editar,
  setDiscapacidades,
  discapacidades,
  disc,
}) => {
  const [discapacidad, setDiscapacidad] = useState(disc);


  //notificacion en caso de que se guarde 
  const notificationAlert = useRef(null)
  const Notify = (place) => {
     var options = {};
     options = {
       place: place,
       message: (
         <div>
           <div>
             Registro modificado satisfactoriamente
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
    await axios.put(`${url}/discapacidades/` + id, data).then((response) => {});
    setDiscapacidades(
      discapacidades.map((discapacidad) =>
        discapacidad.id === id ? data : discapacidad
      )
    );
    Notify("tr")
  };

  useEffect(() => {
    setDiscapacidad(disc);
  }, [disc]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDiscapacidad({ ...discapacidad, [name]: value });
  };

  const peticionActualizar = (event) => {
    event.preventDefault();

    actualizar(discapacidad.id, discapacidad);
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
              <strong>Actualizar Discapacidad</strong>
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={peticionActualizar}>
                <FormGroup row>
                  <Label for="descripcion" sm={3}>
                    Discapacidad
                  </Label>
                  <Col sm={8}>
                    <Input
                      type="text"
                      name="descripcion"
                      value={discapacidad.descripcion}
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
