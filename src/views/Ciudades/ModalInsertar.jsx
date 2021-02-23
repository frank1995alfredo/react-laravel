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
  CardBody,
} from "reactstrap";
import axios from "axios";
import url from "../../config";

const ModalInsertar = ({ isOpen, insertar, addCiudad }) => {
  const initialFormState = {
    id: null,
    provincia_id: 0,
    descripcion: "",
    ciudad: "",
    provincia: "",
  }; //se inicializan los inputs

  const [ciu, setCiu] = useState(initialFormState);
  const [provincias, setProvincias] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.currentTarget;
    setCiu({ ...ciu, [name]: value });
    console.log(ciu);
  };

  //notificacion en caso de que se guarde
  const notificationAlert = useRef(null);
  const Notify = (place) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Ciudad <strong>{ciu.descripcion}</strong> agregada
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
  const Notify2 = (place) => {
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
             Por favor llene todos los datos.
          </div>
        </div>
      ),
      type: "info",
      icon: "tim-icons icon-bell-55",
      autoDismiss: 7,
    };
    notificationAlert.current.notificationAlert(options);
  };

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        let response = await fetch(`${url}/provincias`);
        response = await response.json();
        setProvincias(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMyAPI();
  }, []);

  const peticionPost = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${url}/ciudades`, ciu).then((response) => {
        addCiudad(response.data.data[0]); //[0] hace que pueda acceder al elemento json
        console.log(response.data.data[0]);
        setCiu(initialFormState);
        Notify("tr");
        insertar();
      });
    } catch (error) {
      Notify2("tr")
      console.log(error);
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
                  <strong>Nueva Ciudad</strong>
                </label>
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={peticionPost}>
                  <FormGroup row>
                    <Label for="descripcion" sm={3}>
                      Ciudad
                    </Label>
                    <Col sm={8}>
                      <Input
                        type="text"
                        name="descripcion"
                        value={ciu.descripcion}
                        id="Descripcion"
                        placeholder="Ciudad"
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
                        <option value="0">Seleccione una provincia</option>
                        {provincias.map((prov) => (
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
