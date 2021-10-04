import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col  } from 'reactstrap';
import Axios from 'axios';
import {useHistory} from "react-router-dom";

interface urlLista{
  url_curta: string,
  url_origem: string,
  cliques: number,
  data_criada: Date,
  id: number
}



function UrlPage() {

  
  const history = useHistory();

  const [urlOrigem, setUrlOrigem] = useState('');
  const [urlCurta, setUrlCurta] = useState('');
  const [urlCurtaLista, setUrlCurtaLista] = useState<urlLista[]>([])
  var [refresh, setRefresh] = useState(true)

  useEffect(()=> {
    if (refresh || urlCurta != ""){
      Axios.get('http://localhost:3001/api/get',{ withCredentials: true }).then((response)=> {
        if(response.data != "")  {
          console.log(response)
          setUrlCurtaLista(response.data)
        }
        setRefresh(false)    
      })
    }
    
  }, [urlCurta, refresh])//variavéis que o useEffect está observando

  const submitURL = () => {

    Axios.post('http://localhost:3001/api/insert', {
      urlOrigem: urlOrigem
    },{ withCredentials: true }).then((res)=> {
    setUrlCurta(res.data.urlCurta)
    } );

  };

  const deletarUrl = (id: number) => {
    Axios.delete('http://localhost:3001/api/delete/'+ id,{ withCredentials: true })
    .then((res)=> {
      setRefresh(true)
    } );
  };

  
  const logout = () => {
    Axios.get('http://localhost:3001/logout',{ withCredentials: true })
    .then((res)=> {
      //if (res.data.ok == 1){
        history.push("/")
      //}
    } );
  };

  return (
    <div className="App">
      <div>
        <h1>Encurtador de URL</h1>
        
        <a href='#' onClick={()=>logout()}>Logout</a>
      </div>

      <Col>

      <div className="form">
        <label>Url</label>
        <input type="text" name="urlOrigem" onChange={(e)=>{
          setUrlOrigem(e.target.value)
        }}/>
        <Button outline color="success" onClick={submitURL}>Submeter</Button>
        <label>Url Curta</label>
        <input type="text" name="urlCurta" readOnly value={urlCurta} />
        

      </div>
      </Col>

      <div>
        {urlCurtaLista.map( (val) => {

          return(<h1><a href={val.url_curta}>{val.url_curta}</a> {val.url_origem} 
          <button className="" onClick={()=> deletarUrl(val.id)}>Deletar</button></h1>); 

        })}

      </div>


    </div>
  );
}

export default UrlPage;
