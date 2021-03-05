import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
  FormGroup,
  Input,
  Form,
} from "reactstrap";
import url from "../../config";

import ReactHTMLTableToExcel from "react-html-table-to-excel";
import jsPDF from "jspdf"; //libreria para los pdfs
import "jspdf-autotable"; //libreria para los pdfs
import ListTable from "./ListTable";

const Discapacidades = () => {
  const [discapacidades, setDiscapacidades] = useState([]); //ayuda a recorrer la data en la tabla
  const [term, setTerm] = useState(""); //termino de busqueda
  const [modalInsertar, setModalInsertar] = useState(false);
  const insertar = () => setModalInsertar(!modalInsertar);

  //reporte en pdf de la lista de discapacidades
  const Print = () => {
    const doc = new jsPDF();
    let hoy = new Date();
    let fechaActual =
      hoy.getFullYear() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getDate();
    doc.text("Lista de discapacidades", 70, 10); //le damos las coordenadas x = 70, y = 10
    doc.text("Fecha: " + `${fechaActual}`, 145, 10);
    doc.autoTable({
      head: [["#", "Descripcion", "Estado"]],
      body: discapacidades.map((disc, index) => [
        index + 1,
        disc.descripcion,
        disc.estado === true ? "Activo" : "",
      ]),
    });
    let fechaActual2 =
      hoy.getFullYear() + "_" + (hoy.getMonth() + 1) + "_" + hoy.getDate();
    doc.save("Discapacidades" + `${fechaActual2}` + ".pdf");
  };

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        let response = await fetch(`${url}/discapacidades`);
        response = await response.json();
        setDiscapacidades(response.data);
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
                <strong>Lista de Discapacidades</strong>
              </CardTitle>
              <Form inline>
                <Button color="info" onClick={insertar} size="sm">
                  Nueva Discapacidad
                </Button>{" "}
                <Button color="primary" onClick={Print} size="sm">
                  PDF
                </Button>{" "}
                <ReactHTMLTableToExcel
                  className="btn btn-warning btn-sm"
                  table="excel"
                  filename="DiscapacidadesExcel"
                  sheet="Sheet"
                  buttonText="Excel"
                />
                <Col md="6">
                  <FormGroup>
                    <i className="tim-icons icon-zoom-split"></i>{" "}
                    <Input
                      placeholder="Buscar"
                      type="text"
                      onChange={(e) => setTerm(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Form>
            </CardHeader>
            <ListTable
              itemsPerPage={10}
              startFrom={1}
              term={term}
              insertar={insertar}
              modalInsertar={modalInsertar}
              setModalInsertar={setModalInsertar}
              discapacidades={discapacidades}
              setDiscapacidades={setDiscapacidades}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Discapacidades;
