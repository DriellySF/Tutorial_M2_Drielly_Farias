const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const localhost = "127.0.0.1";
const sqlite3 = require("sqlite3").verbose();
const PATH = "./curriculo.db";

const app = express();

// LETRA R NO CRUD
app.get("/listaFormacao", (req, res) => {
  var db = new sqlite3.Database(PATH); // Abre o banco
  var sql = "SELECT * FROM TblPESSOA";
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows); //
  });
  db.close(); // Fecha o banco
});
app.listen(3000, localhost, () => {
  console.log("Servidor rodando em http://localhost:3000/");
});
