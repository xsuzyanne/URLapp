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




function App() {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const submit = () => {

    Axios.post('http://localhost:3001/usuarios/login', {
      email: email,
      senha: senha 
    }).then((res)=> {
    //setUrlCurta(res.data.urlCurta)
    } );

  };

  
  return (
    <Router>
    <div className="App">
      <div>
        <h1>Página de Login</h1>
        

      </div>

      <Form className="login">

      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="exampleEmail" className="mr-sm-2">Email</Label>
        <Input type="email" name="email" id="exampleEmail"  placeholder="email@com" 
        onChange={(e)=>{setEmail(e.target.value)} }/>
      </FormGroup>

      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="examplePassword" className="mr-sm-2">Senha</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="Digite aqui sua senha..." 
        onChange={(e)=>{setSenha(e.target.value)}} />
      </FormGroup>

      <Button outline color="success" onClick={() => submit()}>Entrar</Button>
    </Form>


    </div>
 </Router> );

}

export default App;
