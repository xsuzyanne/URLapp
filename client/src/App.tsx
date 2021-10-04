import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col  } from 'reactstrap';
import Axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Login';
import UrlPage from './UrlPage';




function App() {
  
  return (
    <Router>
      <Switch>
        <Route path="/urls">
          <UrlPage></UrlPage>
        </Route>        
        <Route path="/">
          <Login></Login>
        </Route>
      </Switch>

 </Router> );
}



export default App;
