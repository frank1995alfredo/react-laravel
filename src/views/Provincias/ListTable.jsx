import React, { useState, useEffect } from "react";
import { CardBody, Table, Button, Row } from "reactstrap";
import { Default } from 'react-spinners-css';
import "jspdf-autotable"; //libreria para los pdfs
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import ModalEditar from "./ModalEditar";
import ModalEliminar from "./ModalEliminar";
import ModalInsertar from "./ModalInsertar";
import usePagination from "./funcionPaginacion";


const ListTable = ({ insertar, modalInsertar, provincias, setProvincias, term, itemsPerPage, startFrom }) => {

  const { slicedData, pagination, prevPage, nextPage, changePage } = usePagination({ itemsPerPage, provincias, startFrom }); 
  
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);

  const eliminar = () => setModalEliminar(!modalEliminar);
  const editar = () => setModalEditar(!modalEditar);

  const [dataEliminar, setDataEliminar] = useState([]); //le paso los datos de la api
  const initialFormState = { id: null, descripcion: "", estado: true }; //se inicializan los inputs
  const [prov, setProv] = useState(initialFormState);

  const addProvincia = (prov) => {
    prov.estado = true;
    setProvincias([...provincias, prov]);
  };

  const seleccionarOpcion = (provin, caso) => {
    if (caso === "Editar") {
      setProv({
        id: provin.id,
        descripcion: provin.descripcion,
        estado: provin.estado,
      });
      setModalEditar(true);
    
    } else {
      setDataEliminar(provin);
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
          { provincias.length > 0  ? (
           term.length > 0 ? ( provincias.filter(searchingTerm(term)).map((pro, index) =>(
              
            <tr key={index}>
            <td>{index + 1}</td>
            <td>{pro.descripcion}</td>
            <td>{pro.estado ? "Activo" : ""}</td>
            <td className="text-center">
              <Button
                className="tim-icons icon-refresh-01"
                color="success"
                onClick={() => seleccionarOpcion(pro, "Editar")}
                size="sm"
              ></Button>{" "}
              <Button
                className="tim-icons icon-trash-simple"
                color="danger"
                onClick={() => seleccionarOpcion(pro, "Eliminar")}
                size="sm"
              ></Button>
            </td>
          </tr>
           ))) :  slicedData.map((pro, index) => (
                 
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{pro.descripcion}</td>
                <td>{pro.estado ? "Activo" : ""}</td>
                <td className="text-center">
                  <Button
                    className="tim-icons icon-refresh-01"
                    color="success"
                    onClick={() => seleccionarOpcion(pro, "Editar")}
                    size="sm"
                  ></Button>{" "}
                  <Button
                    className="tim-icons icon-trash-simple"
                    color="danger"
                    onClick={() => seleccionarOpcion(pro, "Eliminar")}
                    size="sm"
                  ></Button>
                </td>
              </tr>
             
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
              <Default />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      
      
      <Pagination  aria-label="Page navigation example">
        <PaginationItem>
          <PaginationLink className="pagination" first href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="pagination" onClick={prevPage}  previous href="#" />
        </PaginationItem>
         {
            pagination.map((page) => {
              if (!page.ellipsis) {
                return  <PaginationItem  key={page.id}>
                  <PaginationLink className={page.current ? 'pagination' : 'pagination'} onClick={(e) => changePage(page.id, e)} href="#">
                  {page.id}
                  </PaginationLink>
                </PaginationItem>
              } else {
                return <li key={page.id}><span className="pagination-ellipsis">&hellip;</span></li>
              }
            })
         }
        <PaginationItem>
          <PaginationLink className="pagination" onClick={nextPage} next href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="pagination" last href="#" />
        </PaginationItem>
      </Pagination>
      
      <ModalInsertar
        isOpen={modalInsertar}
        insertar={insertar}
        addProvincia={addProvincia}
      />
      <ModalEliminar
        isOpen={modalEliminar}
        eliminar={eliminar}
        provincias={provincias}
        setProvincias={setProvincias}
        dataEliminar={dataEliminar}
      />
      <ModalEditar
        isOpen={modalEditar}
        editar={editar}
        provincias={provincias}
        setProvincias={setProvincias}
        prov={prov}
      />
    </CardBody>
  );
};

export default ListTable;
