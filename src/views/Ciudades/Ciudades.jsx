
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";

import url from "../../config";

import ReactHTMLTableToExcel from "react-html-table-to-excel";
import jsPDF from "jspdf"; //libreria para los pdfs
import "jspdf-autotable"; //libreria para los pdfs
import ListTable from "./ListTable";

const Ciudades = () => {

   const [ciudades, setCiudades] = useState([]);
   
   useEffect(() => {
    async function fetchMyAPI() {
      try {
        let response = await fetch(`${url}/ciudades`);
        response = await response.json();
        setCiudades(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMyAPI();
  }, []);

    return(
        <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
                  <strong>Lista de Ciudades</strong>
                </CardTitle>
                <Button color="info" onClick="" size="sm">
                Nueva Ciudad
              </Button>{" "}
              <Button color="primary" onClick="" size="sm">
                PDF
              </Button>
              <ReactHTMLTableToExcel
                className="btn btn-warning btn-sm"
                table="excel"
                filename="CiudadesExcel"
                sheet="Sheet"
                buttonText="Excel"
              />
              </CardHeader>
              <ListTable
               //insertar = {insertar}
               //modalInsertar = {modalInsertar}
              // setModalInsertar = {setModalInsertar}
               ciudades = {ciudades}
               setCiudades = {setCiudades}
              />
            </Card>
          </Col>
        </Row>
      </div>
    )
}

export default Ciudades;