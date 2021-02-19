import React, { useState } from "react";
import {
  CardBody,
  Table,
  Button,
} from "reactstrap";
import "jspdf-autotable"; //libreria para los pdfs
import ModalEditar from "./ModalEditar";
import ModalEliminar from "./ModalEliminar";
import ModalInsertar from "./ModalInsertar";

const ListTable = ({insertar, modalInsertar, provincias, setProvincias}) => {
 
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
    console.log(provincias)

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
          {provincias.map((pro, index) => (
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
          ))}
        </tbody>
      </Table>
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
