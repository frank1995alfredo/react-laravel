import React, { useState, useEffect, useRef } from "react";
import { withRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
  FormGroup,
  Input,
  Form,
} from "reactstrap";

import url from "../../config";
import ListTable from "./ListTable";
import FormAgregar from "./FormAgregar";

const Clientes = () => {
  const [clientes, setClientes] = useState([]); //ayuda a recorrer la data en la tabla
  const [term, setTerm] = useState(""); //termino de busqueda
  const [comp, setComp] = useState(false);
  useEffect(() => {
    async function fetchMyAPI() {
      try {
        let response = await fetch(`${url}/clientes`);
        response = await response.json();
        setClientes(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMyAPI();
  }, []);

  const click = () => {
    setComp(true);
  };

  return (
    <div className="content">
      {comp === true ? (
        ""
      ) : (
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
                  <strong>Lista de Clientes</strong>
                </CardTitle>
                <Form inline>
                  <Link
                    to="/admin/clientes/agregar"
                    className="btn btn btn-info btn-sm" 
                  >
                    Nuevo cliente
                  </Link>
                  <Switch>
                    <Route
                      path="/admin/clientes/agregar"
                      component={FormAgregar}
                    />
                  </Switch>
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
                //insertar={insertar}
                clientes={clientes}
                setClientes={setClientes}
              />
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Clientes;
