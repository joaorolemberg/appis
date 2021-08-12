import React from "react";
import Login from "pages/Login";
import Erro404 from "pages/Erro404";
import Logado from "pages/Logado";
import { BrowserRouter, Switch, Route, Router } from "react-router-dom";
import StoreProvider from "components/StoreProvider";
import  RoutesPrivate from "components/Routes/RoutesPrivate";
const Root = () => (
  <BrowserRouter>
    <StoreProvider>
      <Switch>
        <Route path="/login" exact={true} component={Login} />
        <RoutesPrivate path="/" exact={true} component={Logado}/>
        <Route path="*" component={Erro404} />
      </Switch>
    </StoreProvider>
  </BrowserRouter>
);
export default Root;
