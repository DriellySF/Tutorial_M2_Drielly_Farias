const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const localhost = '127.0.0.1';
const sqlite3 = require('sqlite3').verbose();
const PATH = "./frontend/curriculo.db";

const app = express();
app.use(express.json());

app.use(express.static("../frontend/"));

// LETRA R NO CRUD 
app.get('/listaFormacao', (req, res) => {
  var db = new sqlite3.Database(PATH); // Abre o banco
  var sql = 'SELECT * FROM TblPESSOA';
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});

app.get('/formacao', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  var db = new sqlite3.Database(PATH); // Abre o banco
  var sql = 'SELECT DATA_DE_INICIO, DATA_DE_CONCLUSAO, CURSO, DESCRICAO FROM TblFORMACAO ORDER BY DATA_DE_INICIO';
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});

app.listen(3000, localhost, () => {
  console.log('Servidor rodando em http://localhost:3000/');
});


// let btn = document.querySelector("#btn");
// let list = document.querySelector("#list");

// btn.addEventListener("click", function(){
//     fetch('http://localhost:3000/formacao')
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(response){
//         response.data.forEach(function(TblFORMACAO){
//             let item =document.createElement("li");

//             item.innerHTML="'<p>'+TblFORMACAO.DESCRICAO '</p>'";

//             list.appendChild(item);
//         })
//     })
// })