import React, { useState } from "react";
import { CardBody, Table, Button } from "reactstrap";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { Default } from 'react-spinners-css';
import ModalEditar from "./ModalEditar";
import ModalEliminar from "./ModalEliminar";
import ModalInsertar from "./ModalInsertar";
import "jspdf-autotable"; //libreria para los pdfs
import { func } from "prop-types";

const ListTable = ({insertar, modalInsertar, discapacidades, setDiscapacidades, term}) => {
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const editar = () => setModalEditar(!modalEditar);
  const eliminar = () => setModalEliminar(!modalEliminar);

  const [dataEliminar, setDataEliminar] = useState([]); //le paso los datos de la api
  const initialFormState = { id: null, descripcion: "", estado: true }; //se inicializan los inputs
  const [disc, setDisc] = useState(initialFormState);

  const addDiscapacidad = (disc) => {
    disc.estado = true;
    setDiscapacidades([...discapacidades, disc]);
  };

  const seleccionarOpcion = (discapa, caso) => {
    if (caso === "Editar") {
      setDisc({
        id: discapa.id,
        descripcion: discapa.descripcion,
        estado: discapa.estado,
      });
      setModalEditar(true);
    } else {
      setDataEliminar(discapa);
      setModalEliminar(true);
      console.log(dataEliminar);
    }
  };

  //funcion de busqueda
  function searchingTerm(term) {
    return function(x) {
      return x.descripcion.toLowerCase().includes(term.toLowerCase()) || !term
    }
  }
   
  return (
    <CardBody>
      <Table id="excel" className="tablesorter" responsive>
        <thead className="text-primary">
          <tr>
            <th>#</th>
            <th>Descripcion</th>
            <th>Estado</th>
            <th className="text-center">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {
            discapacidades.length > 0 ? (
              discapacidades.filter(searchingTerm(term)).map((dis, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{dis.descripcion}</td>
                  <td>{dis.estado ? "Activo" : ""}</td>
                  <td className="text-center">
                    <Button
                      className="tim-icons icon-refresh-01"
                      color="success"
                      onClick={() => seleccionarOpcion(dis, "Editar")}
                      size="sm"
                    ></Button>{" "}
                    <Button
                      className="tim-icons icon-trash-simple"
                      color="danger"
                      onClick={() => seleccionarOpcion(dis, "Eliminar")}
                      size="sm"
                    ></Button>
                  </td>
                </tr>
              ))
            ) :  (
              <tr>
                <td colSpan="4" className="text-center">
                <Default />
                </td>
              </tr>
            )}
        </tbody>
      </Table>
      <Pagination responsive aria-label="Page navigation example">
        <PaginationItem>
          <PaginationLink className="pagination" first href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="pagination" previous href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="pagination" href="#">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="pagination" href="#">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="pagination" href="#">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="pagination" href="#">
            4
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="pagination" href="#">
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="pagination" next href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="pagination" last href="#" />
        </PaginationItem>
      </Pagination>
      <ModalInsertar
        isOpen={modalInsertar}
        insertar={insertar}
        addDiscapacidad={addDiscapacidad}
      />
      <ModalEliminar
        isOpen={modalEliminar}
        eliminar={eliminar}
        discapacidades={discapacidades}
        setDiscapacidades={setDiscapacidades}
        dataEliminar={dataEliminar}
      />
      <ModalEditar
        isOpen={modalEditar}
        editar={editar}
        discapacidades={discapacidades}
        setDiscapacidades={setDiscapacidades}
        disc={disc}
      />
    </CardBody>
  );
};

export default ListTable;
