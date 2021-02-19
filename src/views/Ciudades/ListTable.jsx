
import React, { useState, useEffect }  from "react";
import {
    CardBody,
    Table,
    Button,
  } from "reactstrap";
  import ModalEliminar from "./ModalEliminar";

const ListTable = ({ciudades, setCiudades}) => {


    const [modalEliminar, setModalEliminar] = useState(false);

    const eliminar = () => setModalEliminar(!modalEliminar);

    const [dataEliminar, setDataEliminar] = useState([]); //le paso los datos de la api
    const initialFormState = { id: null, descripcion: "", estado: true }; //se inicializan los inputs
    const [ciu, setCiu] = useState(initialFormState);

    const seleccionarOpcion = (discapa, caso) => {
        if (caso === "Editar") {
          setCiu({
            id: discapa.id,
            descripcion: discapa.descripcion,
            estado: discapa.estado,
          });
         // setModalEditar(true);
        } else {
          setDataEliminar(discapa);
          setModalEliminar(true);
          console.log(dataEliminar);
        }
      };

    return(
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
            {ciudades.map((ciu, index) => (
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
            ))}
          </tbody>
        </Table>
        <ModalEliminar
        isOpen={modalEliminar}
        eliminar={eliminar}
        ciudades={ciudades}
        setCiudades={setCiudades}
        dataEliminar={dataEliminar}
      />
      </CardBody>
    )
}

export default ListTable;