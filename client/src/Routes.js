import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import PageNotFound from "./component/PageNotFound";
import AddRole from "./component/role/AddRole";
import Home from "./component/role/Home";
import Edit from "./component/role/EditRole";
import Details from "./component/role/Details";
import HomeUser from "./component/user/HomeUser";
import AddUser from "./component/user/AddUser";
import EditUser from "./component/user/EditUser";
import DetailsUser from "./component/user/DetailsUser";
import File from "./component/File";
import AgentDashboard from "./component/AgentDashboard";
import Report from "./component/Report";
import SendMsg from "./component/SendMsg";
import SendMail from "./component/SendMail";
import ReadCsv from "./component/ReadCsv";
import CsvSave from "./component/CsvSave";
import Appointment from "./component/Appointment";

const Routess = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoute path="/private" exact component={AgentDashboard} />
        <PrivateRoute path="/report" exact component={Report} />
        <PrivateRoute path="/sms" exact component={SendMsg} />
        <PrivateRoute path="/mail" exact component={SendMail} />
        <PrivateRoute path="/read" exact component={ReadCsv} />
        <Route path="/csvv" exact component={CsvSave} />
        <AdminRoute path="/admin" exact component={App} />
        <AdminRoute path="/role" exact component={Home} />
        <Route path="/users" exact component={HomeUser} />
        <AdminRoute path="/addrole" exact component={AddRole} />
        <AdminRoute path="/edit/:id" exact component={Edit} />
        <AdminRoute path="/view/:id" exact component={Details} />
        <AdminRoute path="/adduser" exact component={AddUser} />
        <AdminRoute path="/edit/user/:id" exact component={EditUser} />
        <AdminRoute path="/view/user/:id" exact component={DetailsUser} />
        <AdminRoute path="/letter" exact component={Appointment} />
        {/* <AdminRoute path="/file" exact component={File} /> */}

        <Route path="*" exact component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routess;
