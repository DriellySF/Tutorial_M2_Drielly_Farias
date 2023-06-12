const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const PATH = 'curriculo.db';

const hostname = '127.0.0.1';
const port = 3071;
const app = express();

/* Servidor aplicação */

app.use(express.static("../frontend/"));
/* Definição dos endpoints */

/******** CRUD ************/
app.use(express.json());

// Retorna todos registros (é o R do CRUD - Read)
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


app.listen(port, hostname, () => {
  console.log(`Page server running at http://${hostname}:${port}/`);
});