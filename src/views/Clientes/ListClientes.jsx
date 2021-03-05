import React, { useEffect, useState } from "react";
import { withRouter, Switch, Route, Link } from "react-router-dom";
import Clientes from "./Clientes"
import FormAgregar from "./FormAgregar"
import FormEditar from "./FormEditar"


const ListClientes = () => {
    return (
        <div className="content">
        <Switch>
          <Route path="/admin/clientes" exact component={Clientes} />
          <Route path="/admin/clientes/agregar" component={FormAgregar} />
          <Route path="/admin/clientes/:id/editar" component={FormEditar} />
        </Switch>
        </div>
    )
}

export default ListClientes;