const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')
const { nanoid } = require('nanoid')
const session = require('express-session')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bancourl'
});

app.use(session({secret:'suzy'}))
//app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'DELETE'],
    credentials: true
  }));
app.use(express.json())


app.use(bodyParser.urlencoded({extended: true}))



app.get('/logout', (req, res)=> {
    console.log("deslogando")
    req.session.destroy()
    res.send({ok:1})
});



app.get('/api/get', (req, res)=> {

    let sess = req.session
    //console.log(req.sessionID)
    console.log(sess)
    /*if (sess.id_usuario == undefined){
        res.redirect("http://localhost:3001/")
        return;
    }*/

    const sqlSelect = "SELECT * FROM listaurl WHERE id_usuario = ?";
    db.query(sqlSelect, sess.id_usuario, (err, result) => {
        res.send(result)
    })

})
// http://localhost:3001/HsK6ZJOY
app.get('/:id', (req, res)=> {

    let id = "http://localhost:3001/" + req.params.id
    let sess = req.session

   
    const sqlSelect = "SELECT * FROM listaurl WHERE url_curta = ? AND id_usuario = ?";
    db.query(sqlSelect, [id, sess.id_usuario], (err, result) => {
     //   console.log(result[0].url_origem)

        if (result.length > 0) { //Fazer um update para somar cliques
            var urlOrigem = result[0].url_origem
            //update listaurl set cliques = cliques+1 where url_curta = ?

            res.redirect(urlOrigem)
        } else {
            res.send("Endereço incorreto")
        }
        
    })

})

app.post("/api/insert", (req, res)=> {

    let urlOrigem = req.body.urlOrigem
    const urlCurta = "http://localhost:3001/"+nanoid(8)
    let sess = req.session


    // Caso o cliente não digite "http" (vai dar resultado -1), então será adicionado ao início
    if( urlOrigem.indexOf("http") == -1  ) {
        urlOrigem = "http://" + urlOrigem
    }

    const sqlInsert = "INSERT INTO listaurl(url_origem, url_curta, id_usuario) VALUES (?,?, ?) "
    db.query(sqlInsert, [urlOrigem, urlCurta,sess.id_usuario], (err, result) => {
        //console.log(result)
        res.send({urlCurta: urlCurta})
    })
});

app.delete("/api/delete/:id", (req, res)=> {

    let id = req.params.id
    let sess = req.session


    const sqlDelete = "DELETE FROM listaurl WHERE id = ? AND id_usuario = ?"
    db.query(sqlDelete, [id, sess.id_usuario], (err, result) => {
        //console.log(result)
        res.send({ok: 1})

    })


});

//
//Usuários
//

app.post("/usuarios/login", (req, res)=> {

    let email = req.body.email
    let senha = req.body.senha


    const sql = "SELECT * FROM usuarios WHERE email= ? AND senha= ?"
    db.query(sql, [email,senha] , (err, result) => {
        if (result.length > 0) {
            //console.log(result[0])
            req.session.id_usuario = result[0].id_login
            
            res.send({ok: 1} )
        } else {
            res.send({ok: 0} )
        }
    })
});


app.listen(3001, ()=> {
    console.log("Rodando na porta 3001");
});