import React, { useState } from "react";
import { CardBody, Table, Button } from "reactstrap";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { Default } from 'react-spinners-css';
import usePagination from "./funcionPaginacion";
import { useHistory } from "react-router-dom";
import url from "../../config";
import ModalEliminar from "./ModalEliminar"
import Clientes from "./Clientes";



const ListTable = ({
  clientes,
  setClientes,
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
  } = usePagination({ itemsPerPage, clientes, startFrom });

  const [modalEliminar, setModalEliminar] = useState(false);
  const eliminar = () => setModalEliminar(!modalEliminar);
  const [dataEliminar, setDataEliminar] = useState([]); //le paso los datos de la api

  //funcion de busqueda
  function searchingTerm(term) {
    return function (x) {
      return x.priNombre.toLowerCase().includes(term.toLowerCase()) ||
             x.priApellido.toLowerCase().includes(term.toLowerCase()) || 
             x.numCedula.toLowerCase().includes(term.toLowerCase()) || 
             !term;
    };
  }
  const history = useHistory();
  const handleUpdateClick = (id) => {
    history.push(`/admin/clientes/${id}/editar`);
  };

  const seleccionarOpcion = (cliente, caso) => {
    if (caso === "Eliminar") {
      setDataEliminar(cliente);
      setModalEliminar(true);
      console.log(dataEliminar);
    }
  };

  return (
    <CardBody>
      <Table id="excel" className="tablesorter" responsive>
        <thead className="text-primary">
          <tr>
            <th>#</th>
            <th>Nombres</th>
            <th>Cédula</th>
            <th>Email</th>
            <th>Ciudad</th>
            <th className="text-center">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length > 0 ? (
            term.length > 0 ? (
              clientes.filter(searchingTerm(term)).map((cli, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{cli.priNombre + " " + cli.priApellido}</td>
                  <td>{cli.numCedula}</td>
                  <td>{cli.email}</td>
                  <td>{cli.ciudad}</td>
                  <td className="text-center">
                    <Button
                      className="tim-icons icon-refresh-01"
                      color="success"
                      onClick={() => handleUpdateClick(cli.id)}
                      size="sm"
                    ></Button>{" "}
                    <Button
                      className="tim-icons icon-trash-simple"
                      color="danger"
                      onClick={() => seleccionarOpcion(cli, "Eliminar")}
                      size="sm"
                    ></Button>
                  </td>
                </tr>
              ))
            ) : (
              slicedData.map((cli, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{cli.priNombre + " " + cli.priApellido}</td>
                  <td>{cli.numCedula}</td>
                  <td>{cli.email}</td>
                  <td>{cli.ciudad}</td>
                  <td className="text-center">
                    <Button
                      className="tim-icons icon-refresh-01"
                      color="success"
                      onClick={() => handleUpdateClick(cli.id)}
                      size="sm"
                    ></Button>{" "}
                    <Button
                      className="tim-icons icon-trash-simple"
                      color="danger"
                      onClick={() => seleccionarOpcion(cli, "Eliminar")}
                      size="sm"
                    ></Button>
                  </td>
                </tr>
              ))
            )
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
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
      <ModalEliminar
        isOpen={modalEliminar}
        eliminar={eliminar}
        clientes={clientes}
        setClientes={setClientes}
        dataEliminar={dataEliminar}
      />
    </CardBody>
  );
};

export default ListTable;
