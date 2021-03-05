import React, { useState, useEffect } from "react";
import { CardBody, Table, Button } from "reactstrap";
import { Default } from "react-spinners-css";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import ModalEliminar from "./ModalEliminar";
import ModalInsertar from "./ModalInsertar";
import ModalEditar from "./ModalEditar";
import usePagination from "./funcionPaginacion";

const ListTable = ({
  insertar,
  modalInsertar,
  ciudades,
  setCiudades,
  term,
  itemsPerPage,
  startFrom,
}) => {

  const {
    slicedData,
    pagination,
    prevPage,
    nextPage,
    changePage,
  } = usePagination({ itemsPerPage, ciudades, startFrom });

  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const editar = () => setModalEditar(!modalEditar);
  const eliminar = () => setModalEliminar(!modalEliminar);

  const [dataEliminar, setDataEliminar] = useState([]); //le paso los datos de la api
  const initialFormState = {
    id: null,
    provincia_id: 0,
    descripcion: "",
    ciudad: "",
    estado: true,
  }; //se inicializan los inputs
  const [ciu, setCiu] = useState(initialFormState);

  const addCiudad = (ciu) => {
    ciu.estado = true;
    setCiudades([...ciudades, ciu]);
  };

  const seleccionarOpcion = (ciudad, caso) => {
    if (caso === "Editar") {
      setCiu({
        id: ciudad.id,
        provincia_id: ciudad.provincia_id,
        descripcion: ciudad.ciudad,
        provincia: ciudad.provincia,
      });
      setModalEditar(true);
    } else {
      setDataEliminar(ciudad);
      setModalEliminar(true);
    }
  };

  //funcion de busqueda
  function searchingTerm(term) {
    return function (x) {
      return (
        x.ciudad.toLowerCase().includes(term.toLowerCase()) ||
        x.provincia.toLowerCase().includes(term.toLowerCase()) ||
        !term
      );
    };
  }

  return (
    <CardBody>
      <Table id="excel" className="tablesorter" responsive>
        <thead className="text-primary">
          <tr>
            <th>#</th>
            <th>Ciudad</th>
            <th>Provincia</th>
            <th>Estado</th>
            <th className="text-center">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {ciudades.length > 0 ? (
            term.length > 0 ? (
            ciudades.filter(searchingTerm(term)).map((ciu, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{ciu.ciudad}</td>
                <td>{ciu.provincia}</td>
                <td>{ciu.estado ? "Activo" : ""}</td>
                <td className="text-center">
                  <Button
                    className="tim-icons icon-refresh-01"
                    color="success"
                    onClick={() => seleccionarOpcion(ciu, "Editar")}
                    size="sm"
                  ></Button>{" "}
                  <Button
                    className="tim-icons icon-trash-simple"
                    color="danger"
                    onClick={() => seleccionarOpcion(ciu, "Eliminar")}
                    size="sm"
                  ></Button>
                </td>
              </tr>
            ))
          ) : (
            slicedData.map((ciu, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{ciu.ciudad}</td>
                <td>{ciu.provincia}</td>
                <td>{ciu.estado ? "Activo" : ""}</td>
                <td className="text-center">
                  <Button
                    className="tim-icons icon-refresh-01"
                    color="success"
                    onClick={() => seleccionarOpcion(ciu, "Editar")}
                    size="sm"
                  ></Button>{" "}
                  <Button
                    className="tim-icons icon-trash-simple"
                    color="danger"
                    onClick={() => seleccionarOpcion(ciu, "Eliminar")}
                    size="sm"
                  ></Button>
                </td>
              </tr> 
            ))
           )
          ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  <Default />
                </td>
              </tr>
          )}
        </tbody>
      </Table>
      <Pagination aria-label="Page navigation example">
        <PaginationItem>
          <PaginationLink className="pagination" first href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className="pagination"
            onClick={prevPage}
            previous
            href="#"
          />
        </PaginationItem>
        {pagination.map((page) => {
          if (!page.ellipsis) {
            return (
              <PaginationItem key={page.id}>
                <PaginationLink
                  className={page.current ? "pagination" : "pagination"}
                  onClick={(e) => changePage(page.id, e)}
                  href="#"
                >
                  {page.id}
                </PaginationLink>
              </PaginationItem>
            );
          } else {
            return (
              <li key={page.id}>
                <span className="pagination-ellipsis">&hellip;</span>
              </li>
            );
          }
        })}
        <PaginationItem>
          <PaginationLink
            className="pagination"
            onClick={nextPage}
            next
            href="#"
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="pagination" last href="#" />
        </PaginationItem>
      </Pagination>

      <ModalInsertar
        isOpen={modalInsertar}
        insertar={insertar}
        addCiudad={addCiudad}
      />
      <ModalEliminar
        isOpen={modalEliminar}
        eliminar={eliminar}
        ciudades={ciudades}
        setCiudades={setCiudades}
        dataEliminar={dataEliminar}
      />
      <ModalEditar
        isOpen={modalEditar}
        editar={editar}
        ciudades={ciudades}
        setCiudades={setCiudades}
        ciu={ciu}
      />
    </CardBody>
  );
};

export default ListTable;
